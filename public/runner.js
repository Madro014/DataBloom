self.onmessage = async ({ data }) => {
  try {
    if (data.type === "python") {
      const base =
        "https://cdn.jsdelivr.net/pyodide/v0.29.2/full/";

      importScripts(base + "pyodide.js");

      const py = await loadPyodide({
        indexURL: base
      });

      if (data.pandas) {
        await py.loadPackage("pandas");
      }

      self.postMessage({ kind: "ready" });

      let output = "";

      function append(text) {
        output += text + "\n";

        if (output.length > 20000) {
          throw new Error(
            "La salida supera 20.000 caracteres."
          );
        }
      }

      py.setStdout({ batched: append });
      py.setStderr({ batched: append });

      await py.runPythonAsync(data.code);

      self.postMessage({
        kind: "result",
        output: output.trim()
      });

      return;
    }

    if (data.type === "sql") {
      const base =
        "https://cdn.jsdelivr.net/npm/sql.js@1.13.0/dist/";

      importScripts(base + "sql-wasm.js");

      const SQL = await initSqlJs({
        locateFile: file => base + file
      });

      const db = new SQL.Database();

      try {
        db.run(data.seed);

        self.postMessage({ kind: "ready" });

        const results = db.exec(data.code);
        const last = results.at(-1);

        self.postMessage({
          kind: "result",
          columns: last?.columns || [],
          rows: last?.values || []
        });
      } finally {
        db.close();
      }

      return;
    }

    throw new Error("Lenguaje no compatible.");
  } catch (error) {
    self.postMessage({
      kind: "error",
      error: String(
        error.message || error
      ).slice(0, 3000)
    });
  }
};