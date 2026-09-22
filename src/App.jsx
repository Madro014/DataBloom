import React, {
  useEffect,
  useRef,
  useState
} from "react";

import {
  lessons,
  routes,
  seed
} from "./curriculum.js";

import {
  KEY,
  sanitize,
  unlock,
  complete,
  earned,
  normalize
} from "./progress.js";

function loadProgress() {
  try {
    return sanitize(
      JSON.parse(localStorage.getItem(KEY)),
      lessons
    );
  } catch {
    return sanitize(null, lessons);
  }
}

function Lesson({ lesson, passed, onPass }) {
  const [code, setCode] = useState(
    lesson.starter || ""
  );

  const [choice, setChoice] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [message, setMessage] = useState("");
  const [output, setOutput] = useState(null);
  const [busy, setBusy] = useState(false);

  const workerRef = useRef(null);
  const timerRef = useRef(null);

  function cleanup() {
    workerRef.current?.terminate();
    workerRef.current = null;
    clearTimeout(timerRef.current);
  }

  useEffect(() => {
    return () => cleanup();
  }, []);

  function pass() {
    onPass(lesson.id);

    setMessage(
      passed
        ? "🌷 ¡Bien hecho! Repasar fortalece lo aprendido."
        : "🎉 ¡Lo lograste! +25 XP y un nuevo paso desbloqueado."
    );
  }

  function checkQuiz() {
    if (choice === lesson.answer) {
      pass();
    } else {
      setMessage(
        "Todavía no. " +
        lesson.explain +
        " Puedes intentarlo otra vez sin perder puntos."
      );
    }
  }

  function stop(text) {
    cleanup();
    setBusy(false);
    setMessage(text);
  }

  function run() {
    if (busy || !code.trim()) return;

    setBusy(true);
    setOutput(null);
    setMessage(
      "Preparando el laboratorio. La primera carga puede tardar…"
    );

    try {
      const base = new URL(
        import.meta.env.BASE_URL,
        window.location.href
      );

      const worker = new Worker(
        new URL("runner.js", base)
      );

      workerRef.current = worker;

      timerRef.current = setTimeout(() => {
        stop(
          "La carga tardó demasiado. Revisa tu conexión y vuelve a intentarlo."
        );
      }, 120000);

      worker.onerror = event => {
        stop(
          "No se pudo iniciar el laboratorio: " +
          (event.message || "revisa la conexión.")
        );
      };

      worker.onmessage = ({ data }) => {
        if (data.kind === "ready") {
          clearTimeout(timerRef.current);

          timerRef.current = setTimeout(() => {
            stop(
              "Se detuvo el programa tras 10 segundos. Revisa si hay un bucle que no termina."
            );
          }, 10000);

          setMessage("Ejecutando tu código…");
          return;
        }

        if (data.kind === "error") {
          stop(
            "El programa necesita un ajuste. Lee el error y consulta la pista."
          );

          setOutput({ error: data.error });
          return;
        }

        if (data.kind === "result") {
          cleanup();
          setBusy(false);
          setOutput(data);

          const correct =
            lesson.type === "sql"
              ? JSON.stringify(data.rows) ===
                JSON.stringify(lesson.expected)
              : normalize(data.output) ===
                normalize(lesson.expected);

          if (correct) {
            pass();
          } else {
            setMessage(
              "Tu código se ejecutó. Compara el resultado con el esperado y vuelve a intentarlo. ¡Cada ajuste cuenta!"
            );
          }
        }
      };

      worker.postMessage({
        type: lesson.type,
        code,
        pandas: lesson.pandas,
        seed
      });
    } catch (error) {
      stop(
        "No se pudo abrir el laboratorio: " +
        error.message
      );
    }
  }

  return (
    <article className="lesson">
      <div className="eyebrow">
        TU PRÓXIMO PASO · {lesson.minutes} MIN APROX.
      </div>

      <h2>{lesson.title}</h2>

      {lesson.theory.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}

      <h3>Un ejemplo para empezar</h3>

      <pre>
        <code>{lesson.example}</code>
      </pre>

      {lesson.type === "sql" && (
        <details>
          <summary>Ver tablas y datos de práctica</summary>
          <pre>{seed}</pre>
        </details>
      )}

      <section className="challenge">
        <h3>✦ Tu pequeño reto</h3>
        <p>{lesson.prompt}</p>

        {lesson.type === "quiz" ? (
          <>
            <fieldset>
              <legend>Selecciona una respuesta</legend>

              {lesson.options.map((option, index) => (
                <label
                  key={option}
                  className={
                    "option " +
                    (choice === index ? "selected" : "")
                  }
                >
                  <input
                    type="radio"
                    name={lesson.id}
                    checked={choice === index}
                    onChange={() => {
                      setChoice(index);
                      setMessage("");
                    }}
                  />

                  {option}
                </label>
              ))}
            </fieldset>

            <button
              className="primary"
              disabled={choice === null}
              onClick={checkQuiz}
            >
              Comprobar respuesta
            </button>
          </>
        ) : (
          <>
            <label
              className="editor-label"
              htmlFor="editor"
            >
              Tu código {lesson.type === "sql" ? "SQL" : "Python"}
            </label>

            <textarea
              id="editor"
              className="editor"
              spellCheck={false}
              autoCapitalize="off"
              autoCorrect="off"
              value={code}
              onChange={event => setCode(event.target.value)}
              disabled={busy}
            />

            <div className="actions">
              <button
                className="primary"
                disabled={busy || !code.trim()}
                onClick={run}
              >
                {busy
                  ? "Preparando / ejecutando…"
                  : "▷ Ejecutar y comprobar"}
              </button>

              {busy && (
                <button
                  onClick={() => {
                    stop(
                      "Ejecución cancelada. Puedes volver a intentarlo."
                    );
                  }}
                >
                  Detener
                </button>
              )}
            </div>

            <details>
              <summary>Resultado esperado</summary>

              <pre>
                {lesson.type === "sql"
                  ? JSON.stringify(lesson.expected, null, 2)
                  : lesson.expected}
              </pre>

              {lesson.type === "sql" && (
                <p className="small">
                  Se comparan valores y orden de filas y columnas.
                  Los alias pueden variar.
                </p>
              )}
            </details>
          </>
        )}

        <div className="actions">
          <button
            className="text-button"
            aria-expanded={showHint}
            onClick={() => setShowHint(!showHint)}
          >
            💡 {showHint ? "Ocultar pista" : "Necesito una pista"}
          </button>

          {lesson.type !== "quiz" && (
            <button
              className="text-button"
              aria-expanded={showSolution}
              onClick={() => setShowSolution(!showSolution)}
            >
              {showSolution ? "Ocultar solución" : "Ver solución"}
            </button>
          )}
        </div>

        {showHint && (
          <p className="note">{lesson.hint}</p>
        )}

        {showSolution && (
          <>
            <p>
              Lee cada línea, explica qué hace y después
              intenta escribirla por tu cuenta.
            </p>

            <pre>{lesson.solution}</pre>
          </>
        )}

        <p
          className="feedback"
          role="status"
          aria-live="polite"
        >
          {message}
        </p>

        {output && (
          <section aria-label="Salida del programa">
            <h3>Resultado de tu programa</h3>

            {output.error ? (
              <pre className="error">{output.error}</pre>
            ) : lesson.type === "sql" ? (
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      {output.columns.map((column, index) => (
                        <th key={index}>{column}</th>
                      ))}
                    </tr>
                  </thead>

                  <tbody>
                    {output.rows.slice(0, 100).map((row, index) => (
                      <tr key={index}>
                        {row.map((value, cellIndex) => (
                          <td key={cellIndex}>
                            {value === null ? "NULL" : String(value)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>

                {output.rows.length > 100 && (
                  <p>Vista limitada a 100 filas.</p>
                )}
              </div>
            ) : (
              <pre>
                {output.output ||
                  "(Sin salida: usa print para mostrar resultados)"}
              </pre>
            )}
          </section>
        )}
      </section>

      {lesson.id === "d5" && passed && (
        <figure className="chart">
          <figcaption>
            Ingresos por categoría · datos del ejercicio
          </figcaption>

          <div>
            <span>Papelería</span>
            <meter
              aria-label="Papelería: 70"
              min="0"
              max="80"
              value="70"
            />
            <strong>70</strong>
          </div>

          <div>
            <span>Accesorios</span>
            <meter
              aria-label="Accesorios: 60"
              min="0"
              max="80"
              value="60"
            />
            <strong>60</strong>
          </div>

          <p>
            Ambas barras usan la misma escala.
          </p>
        </figure>
      )}
    </article>
  );
}

export default function App() {
  const [progress, setProgress] = useState(loadProgress);

  const [current, setCurrent] = useState(() => {
    const saved = loadProgress();

    return (
      lessons.find(lesson => !saved.done.includes(lesson.id))?.id ||
      lessons[0].id
    );
  });

  const [notice, setNotice] = useState("");
  const [storageError, setStorageError] = useState("");
  const [resetOpen, setResetOpen] = useState(false);

  const importRef = useRef(null);

  const lesson =
    lessons.find(item => item.id === current) || lessons[0];

  const route = routes.find(item => item.id === lesson.route);
  const medals = earned(routes, lessons, progress.done);

  const next = lessons.find(
    item => !progress.done.includes(item.id)
  );

  const xp = progress.done.length * 25;
  const level = Math.floor(xp / 100) + 1;
  const percent = Math.round(
    progress.done.length / lessons.length * 100
  );

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(progress));
      setStorageError("");
    } catch {
      setStorageError(
        "No se puede guardar en este navegador. Exporta tu progreso antes de cerrar."
      );
    }
  }, [progress]);

  function select(id) {
    setCurrent(id);
    setNotice("");
  }

  function exportProgress() {
    const blob = new Blob(
      [JSON.stringify(progress, null, 2)],
      { type: "application/json" }
    );

    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");

    anchor.href = url;
    anchor.download = "databloom-progreso.json";

    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();

    setTimeout(() => URL.revokeObjectURL(url), 1000);

    setNotice(
      "Respaldo descargado. Guárdalo para recuperar tu avance."
    );
  }

  async function importProgress(event) {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file) return;

    try {
      if (file.size > 100000) {
        throw new Error("El archivo es demasiado grande.");
      }

      const value = JSON.parse(await file.text());

      if (
        !value ||
        value.version !== 1 ||
        !Array.isArray(value.done) ||
        !value.done.every(id => typeof id === "string")
      ) {
        throw new Error(
          "El formato no corresponde a un respaldo de DataBloom."
        );
      }

      const restored = sanitize(value, lessons);

      setProgress(previous => ({
        ...previous,
        name: previous.name || restored.name,
        done:
          restored.done.length > previous.done.length
            ? restored.done
            : previous.done
      }));

      setNotice(
        "Progreso importado. Se conservaron tus logros anteriores."
      );
    } catch (error) {
      setNotice("No se pudo importar: " + error.message);
    }
  }

  function goNext() {
    const index = lessons.findIndex(
      item => item.id === lesson.id
    );

    if (index < lessons.length - 1) {
      select(lessons[index + 1].id);

      document.getElementById("study")?.scrollIntoView({
        behavior: "smooth"
      });
    } else {
      document.getElementById("medals")?.scrollIntoView({
        behavior: "smooth"
      });
    }
  }

  return (
    <div className="shell">
      <header className="topbar">
        <a className="brand" href="#inicio">
          <span aria-hidden="true">✿</span> DataBloom
        </a>

        <span className="pill">Aprende a tu ritmo ♡</span>
      </header>

      <main id="inicio">
        <section className="hero">
          <div>
            <span className="eyebrow">
              DE TU PRIMERA IDEA A TU PRIMER ANÁLISIS
            </span>

            <h1>
              Tu talento también
              <br />
              puede <em>florecer.</em>
            </h1>

            <p>
              Un paso pequeño hoy. Una nueva habilidad mañana.
              Lógica, Python y SQL para descubrir historias
              en los datos.
            </p>

            <button
              className="primary"
              onClick={() => {
                select(next?.id || lessons[0].id);

                document.getElementById("study")?.scrollIntoView({
                  behavior: "smooth"
                });
              }}
            >
              {!next
                ? "Volver a practicar →"
                : xp
                  ? "Continuar mi aventura →"
                  : "Comenzar desde cero →"}
            </button>
          </div>

          <div className="flower-card" aria-hidden="true">
            <div className="flower">✿</div>
            <span>
              Un error también
              <br />
              es una forma de aprender.
            </span>
            <div className="sparkle">✧ ♡ ✧</div>
          </div>
        </section>

        <section className="dashboard" aria-label="Tu progreso">
          <label className="name">
            ¿Cómo te llamas?

            <input
              maxLength={35}
              placeholder="Tu nombre"
              value={progress.name}
              onChange={event => {
                const name = event.target.value;

                setProgress(previous => ({
                  ...previous,
                  name
                }));
              }}
            />
          </label>

          <div>
            <strong>{xp} XP</strong>
            <span>Nivel {level} · +25 XP por lección</span>
          </div>

          <div>
            <strong>
              {progress.done.length}/{lessons.length}
            </strong>
            <span>Pequeños pasos completados</span>
          </div>

          <div>
            <label htmlFor="overall">
              Tu jardín crece · {percent}%
            </label>
            <progress id="overall" max="100" value={percent} />
          </div>
        </section>

        {storageError && (
          <p role="alert" className="note">
            {storageError}
          </p>
        )}

        <div className="section-title">
          <div>
            <span className="eyebrow">TU MAPA DE APRENDIZAJE</span>

            <h2>
              {progress.name
                ? `${progress.name}, este es tu camino`
                : "Todo empieza con una semilla"}
            </h2>
          </div>

          <p>15–20 minutos por sesión · sin penalizaciones</p>
        </div>

        <section className="route-grid" aria-label="Etapas">
          {routes.map((item, index) => {
            const group = lessons.filter(
              entry => entry.route === item.id
            );

            const count = group.filter(
              entry => progress.done.includes(entry.id)
            ).length;

            const available = unlock(
              lessons,
              progress.done,
              group[0].id
            );

            return (
              <button
                key={item.id}
                className={
                  "route-card " +
                  (route.id === item.id ? "active" : "")
                }
                disabled={!available}
                onClick={() => {
                  select(
                    group.find(
                      entry => !progress.done.includes(entry.id)
                    )?.id || group[0].id
                  );
                }}
              >
                <span className="route-icon">{item.emoji}</span>

                <small>
                  ETAPA {index + 1}
                  {!available && " · BLOQUEADA"}
                </small>

                <h3>{item.title}</h3>
                <p>{item.description}</p>

                <strong>
                  {count}/{group.length} lecciones
                  {count === group.length && " ✓"}
                </strong>
              </button>
            );
          })}
        </section>

        <section id="study" className="study">
          <aside className="syllabus">
            <span className="eyebrow">
              {route.emoji} {route.title}
            </span>

            <h2>Una lección a la vez</h2>

            <nav aria-label="Lecciones de la etapa">
              {lessons
                .filter(item => item.route === route.id)
                .map((item, index) => (
                  <button
                    key={item.id}
                    className={current === item.id ? "current" : ""}
                    aria-current={
                      current === item.id ? "step" : undefined
                    }
                    disabled={
                      !unlock(lessons, progress.done, item.id)
                    }
                    onClick={() => select(item.id)}
                  >
                    <span>
                      {progress.done.includes(item.id)
                        ? "✓"
                        : index + 1}
                    </span>

                    {item.title}
                  </button>
                ))}
            </nav>

            <p>
              Las pistas son parte del aprendizaje.
              Puedes repetir las lecciones completadas.
            </p>
          </aside>

          <div className="study-content">
            <Lesson
              key={lesson.id}
              lesson={lesson}
              passed={progress.done.includes(lesson.id)}
              onPass={id => {
                setProgress(previous =>
                  complete(previous, lessons, id)
                );
              }}
            />

            {progress.done.includes(lesson.id) && (
              <div className="continue">
                <span>🌼 Lección completada</span>

                <button className="primary" onClick={goNext}>
                  {lesson.id === lessons.at(-1).id
                    ? "Ver mis logros"
                    : "Siguiente lección →"}
                </button>
              </div>
            )}
          </div>
        </section>

        <section id="medals">
          <div className="section-title">
            <div>
              <span className="eyebrow">
                CELEBRA LO QUE YA SABES
              </span>

              <h2>Tu colección de medallas</h2>
            </div>

            <p>{medals.length} de {routes.length} etapas conquistadas</p>
          </div>

          <div className="medal-grid">
            {routes.map(item => {
              const won = medals.some(
                medal => medal.id === item.id
              );

              return (
                <div
                  key={item.id}
                  className={"medal " + (won ? "won" : "")}
                >
                  <span>{won ? item.emoji : "♡"}</span>
                  <h3>{item.medal}</h3>

                  <p>
                    {won
                      ? "¡La ganaste!"
                      : "Completa la etapa para obtenerla"}
                  </p>
                </div>
              );
            })}
          </div>

          {!next && (
            <div className="graduation">
              <h2>🎓 ¡Tu primer jardín de datos está completo!</h2>

              <p>
                Terminaste {lessons.length} lecciones y ganaste {xp} XP.
                Ahora puedes practicar con un CSV propio,
                crear un gráfico y explicar un hallazgo con sus
                limitaciones.
              </p>

              <p>
                Estas medallas celebran tu práctica.
                No equivalen a una certificación profesional.
              </p>
            </div>
          )}
        </section>

        <section className="backup">
          <h2>Cuida tu avance</h2>

          <p>
            El progreso se guarda en este navegador.
            Exporta un respaldo para cambiar de dispositivo
            o antes de borrar los datos del navegador.
          </p>

          <div className="actions">
            <button onClick={exportProgress}>
              Exportar progreso
            </button>

            <button onClick={() => importRef.current?.click()}>
              Importar progreso
            </button>

            <input
              ref={importRef}
              type="file"
              accept=".json,application/json"
              hidden
              onChange={importProgress}
            />

            <button onClick={() => setResetOpen(true)}>
              Reiniciar
            </button>
          </div>

          {resetOpen && (
            <div className="note">
              <p>
                ¿Borrar nombre, puntos y medallas de este navegador?
                Exporta primero si quieres conservarlos.
              </p>

              <div className="actions">
                <button
                  onClick={() => {
                    setProgress(sanitize(null, lessons));
                    setCurrent(lessons[0].id);
                    setResetOpen(false);
                    setNotice("Tu ruta empieza de nuevo.");
                  }}
                >
                  Sí, borrar mi progreso
                </button>

                <button onClick={() => setResetOpen(false)}>
                  Conservar mi progreso
                </button>
              </div>
            </div>
          )}

          <p role="status">{notice}</p>
        </section>
      </main>

      <footer>
        Hecho para aprender con curiosidad, calma y confianza.
        ✿ DataBloom
      </footer>
    </div>
  );
}