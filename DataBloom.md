# 🌸 DataBloom — Aprende programación y analítica desde cero

Proyecto completo en React con diseño rosado, lecciones progresivas, ejercicios, puntos y medallas.

## 1. Qué incluye

- 6 lecciones de lógica de programación.
- 8 lecciones de Python.
- 8 lecciones de SQL.
- 6 lecciones de analítica con pandas.
- Editor que ejecuta Python y SQL reales.
- Explicaciones, ejemplos, pistas y soluciones.
- Desbloqueo progresivo.
- 25 XP por cada lección completada por primera vez.
- Cuatro medallas, una por etapa.
- Progreso guardado en el navegador.
- Exportación e importación de progreso.
- Diseño adaptable a celulares y computadores.

Es una aplicación introductoria para aprender y practicar. No requiere cuentas ni un backend.

La aplicación se construye con React y JavaScript. Los lenguajes que la estudiante aprende dentro de ella son Python y SQL.

## 2. Requisitos

Para construir el proyecto:

1. Instala Node.js 24 desde https://nodejs.org/
2. Instala un editor como Visual Studio Code.
3. Usa un navegador actualizado.
4. Mantén conexión a internet para instalar dependencias y cargar los motores de Python y SQL.

No necesitas instalar Python ni un servidor SQL para usar los ejercicios.

Comprueba Node y npm:

```bash
node --version
npm --version
```

## 3. Crear el proyecto

En una terminal:

```bash
mkdir databloom
cd databloom
mkdir src
mkdir public
mkdir tests
```

Crea estos archivos:

```text
databloom/
  package.json
  index.html
  public/
    runner.js
  src/
    main.jsx
    progress.js
    curriculum.js
    App.jsx
    styles.css
  tests/
    progress.test.js
```

Copia cada bloque siguiente en el archivo indicado.

No copies las líneas de delimitación de Markdown dentro de los archivos.

## 4. Archivo package.json

```json
{
  "name": "databloom",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "node --test tests/*.test.js"
  },
  "dependencies": {
    "react": "19.1.1",
    "react-dom": "19.1.1"
  },
  "devDependencies": {
    "vite": "7.1.7"
  },
  "engines": {
    "node": ">=22.12.0"
  }
}
```

## 5. Archivo index.html

```html
<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#fff1f6" />
    <meta
      name="description"
      content="Aprende lógica, Python, SQL y analítica de datos paso a paso."
    />
    <title>DataBloom · Tu talento florece</title>
  </head>

  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

## 6. Archivo src/main.jsx

```jsx
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

## 7. Archivo src/progress.js

Este archivo controla los prerrequisitos, evita puntos duplicados y valida el progreso recuperado.

```javascript
export const KEY = "databloom.progress.v1";

export function sanitize(value, lessons) {
  const source =
    value && typeof value === "object" ? value : {};

  const ids = new Set(
    Array.isArray(source.done) ? source.done : []
  );

  const done = [];

  // Solo acepta lecciones consecutivas desde el inicio.
  for (const lesson of lessons) {
    if (!ids.has(lesson.id)) break;
    done.push(lesson.id);
  }

  return {
    version: 1,
    name:
      typeof source.name === "string"
        ? source.name.slice(0, 35)
        : "",
    done
  };
}

export function unlock(lessons, done, id) {
  const index = lessons.findIndex(
    lesson => lesson.id === id
  );

  return (
    index >= 0 &&
    lessons
      .slice(0, index)
      .every(lesson => done.includes(lesson.id))
  );
}

export function complete(state, lessons, id) {
  if (
    state.done.includes(id) ||
    !unlock(lessons, state.done, id)
  ) {
    return state;
  }

  return {
    ...state,
    done: [...state.done, id]
  };
}

export function earned(routes, lessons, done) {
  return routes.filter(route => {
    const group = lessons.filter(
      lesson => lesson.route === route.id
    );

    return (
      group.length > 0 &&
      group.every(lesson => done.includes(lesson.id))
    );
  });
}

export function normalize(text) {
  return String(text).replace(/\r/g, "").trim();
}
```

## 8. Archivo src/curriculum.js

Aquí están las cuatro rutas y las 28 lecciones completas.

Los pequeños constructores `quiz` y `practice` evitan repetir campos en cada lección.

```javascript
export const routes = [
  {
    id: "logic",
    title: "Semilla de lógica",
    emoji: "🌱",
    description: "Piensa en pasos y resuelve problemas.",
    medal: "Mente lógica"
  },
  {
    id: "python",
    title: "Jardín de Python",
    emoji: "🐍",
    description: "Escribe tus primeros programas con datos.",
    medal: "Creadora Python"
  },
  {
    id: "sql",
    title: "Universo SQL",
    emoji: "🔎",
    description: "Consulta, filtra y relaciona tablas.",
    medal: "Exploradora SQL"
  },
  {
    id: "data",
    title: "Florecer con datos",
    emoji: "🌸",
    description: "Limpia, analiza y comunica hallazgos.",
    medal: "Analista en flor"
  }
];

export const seed = `
CREATE TABLE clientes (
  id INTEGER PRIMARY KEY,
  nombre TEXT
);

INSERT INTO clientes VALUES
(1, 'Ana'),
(2, 'Luis');

CREATE TABLE ventas (
  id INTEGER PRIMARY KEY,
  producto TEXT,
  categoria TEXT,
  precio REAL,
  cantidad INTEGER,
  cliente_id INTEGER
);

INSERT INTO ventas VALUES
(1, 'Cuaderno', 'Papeleria', 10, 2, 1),
(2, 'Lapiz', 'Papeleria', 5, 4, 2),
(3, 'Cuaderno', 'Papeleria', 10, 3, 1),
(4, 'Mochila', 'Accesorios', 30, 2, 2);
`;

function quiz(
  id,
  title,
  theory,
  example,
  prompt,
  options,
  answer,
  explain,
  hint
) {
  return {
    id,
    route: "logic",
    type: "quiz",
    minutes: 8,
    title,
    theory,
    example,
    prompt,
    options,
    answer,
    explain,
    hint
  };
}

function practice(
  id,
  route,
  title,
  theory,
  example,
  prompt,
  starter,
  solution,
  expected,
  hint
) {
  return {
    id,
    route,
    type: route === "sql" ? "sql" : "python",
    pandas: route === "data",
    minutes: route === "data" ? 20 : 15,
    title,
    theory,
    example,
    prompt,
    starter,
    solution,
    expected,
    hint
  };
}

export const lessons = [
  quiz(
    "l1",
    "Un problema, pequeños pasos",
    [
      "Programar es dar instrucciones precisas para resolver una tarea. Un algoritmo es una secuencia ordenada y finita de pasos.",
      "Entrada es lo que recibes; proceso es lo que haces; salida es el resultado. Antes de escribir código, explica qué quieres conseguir."
    ],
    "ENTRADA: precios 10 y 20\nPROCESO: sumar 10 + 20\nSALIDA: 30",
    "¿Qué orden permite calcular el promedio de dos notas?",
    [
      "Mostrar → sumar → leer",
      "Leer → sumar → dividir entre 2 → mostrar",
      "Dividir → mostrar → leer"
    ],
    1,
    "Primero necesitas las notas. Después sumas, divides la suma entre dos y muestras el resultado.",
    "No puedes calcular con datos que todavía no tienes."
  ),

  quiz(
    "l2",
    "Variables y tipos de datos",
    [
      "Una variable tiene un nombre y un valor. Piensa en una caja etiquetada: ventas puede guardar una cantidad.",
      'Un número permite calcular; un texto representa palabras; un booleano es verdadero o falso. "20" es texto; 20 es número.'
    ],
    'nombre = "Luna" → texto\nventas = 20 → número\nmeta_lograda = verdadero → booleano',
    "Para sumar ventas de 20 y 15, ¿qué tipos conviene usar?",
    [
      'Textos "20" y "15"',
      "Booleanos",
      "Números 20 y 15"
    ],
    2,
    'Los números permiten obtener 35. Unir los textos podría producir "2015".',
    "Una cantidad que se va a sumar debe ser numérica."
  ),

  quiz(
    "l3",
    "Operadores y comparaciones",
    [
      "Los operadores +, -, * y / sirven para sumar, restar, multiplicar y dividir. Los paréntesis indican qué calcular primero.",
      "Una comparación produce verdadero o falso: > significa mayor; <, menor; >=, mayor o igual; == compara igualdad."
    ],
    "ingreso = 100\ncosto = 60\nganancia = ingreso - costo\n¿ganancia >= 40? → verdadero",
    "Si ingreso = 90 y costo = 55, ¿ganancia >= 40 es verdadero?",
    [
      "Sí, porque 90 es mayor que 40",
      "No, porque la ganancia es 35",
      "Sí, porque la ganancia es 145"
    ],
    1,
    "90 - 55 = 35. Después comparas: 35 no es mayor o igual que 40.",
    "Calcula la ganancia antes de comparar."
  ),

  quiz(
    "l4",
    "Decidir con condiciones",
    [
      "Una condición permite elegir qué hacer. SI la condición se cumple, ejecutas una acción; SI NO, ejecutas otra.",
      "Y exige que ambas condiciones se cumplan. O exige al menos una. Prueba también los valores límite."
    ],
    "SI total >= 100 Y es_socia:\n    aplicar descuento\nSI NO:\n    mantener precio",
    "Una socia compra exactamente 100. ¿Recibe el descuento?",
    [
      "Sí",
      "No, necesita comprar más de 100",
      "No, ser socia no importa"
    ],
    0,
    "Sí: >= incluye la igualdad y también se cumple que es socia.",
    "Mayor o igual incluye exactamente 100."
  ),

  quiz(
    "l5",
    "Repetir con un bucle",
    [
      "Un bucle repite instrucciones. Un bucle para recorre elementos; uno mientras continúa mientras se cumple una condición.",
      "Un acumulador guarda un resultado parcial. Para sumar ventas, empieza en cero y agrega cada venta. El bucle debe poder terminar."
    ],
    "total = 0\nPARA venta EN [10, 20, 5]:\n    total = total + venta\nMOSTRAR total",
    "¿Qué valor final tiene total?",
    ["5", "3", "35"],
    2,
    "El acumulador pasa de 0 a 10, luego a 30 y finalmente a 35.",
    "Sigue el valor de total después de cada repetición."
  ),

  quiz(
    "l6",
    "Funciones y depuración",
    [
      "Una función reúne instrucciones bajo un nombre. Puede recibir parámetros y devolver un resultado para reutilizar una solución.",
      "Depurar es encontrar y corregir errores. Compara lo esperado con lo obtenido usando un ejemplo pequeño. Equivocarte aporta información."
    ],
    "FUNCIÓN promedio(a, b):\n    DEVOLVER a + b / 2\n\nCon 10 y 20 devuelve 20, pero debería dar 15.",
    "¿Cómo corriges la función?",
    [
      "Devolver a + b",
      "Devolver (a + b) / 2",
      "Devolver a / b"
    ],
    1,
    "Los paréntesis hacen que primero se sumen las notas. (10 + 20) / 2 = 15.",
    "Sin paréntesis, la división se calcula antes que la suma."
  ),

  practice(
    "p1",
    "python",
    "Hola, Python",
    [
      "Python es un lenguaje de programación. print() muestra un valor. Los textos se escriben entre comillas.",
      "Los comentarios empiezan con #. El editor de esta página ejecuta Python real; utiliza Ejecutar y comprobar."
    ],
    'print("Hola, Luna")\n# Salida: Hola, Luna',
    "Muestra exactamente: Hola, datos",
    "# Escribe tu primer print\n",
    'print("Hola, datos")',
    "Hola, datos",
    'Usa print("Hola, datos"). Conserva la coma y el espacio.'
  ),

  practice(
    "p2",
    "python",
    "Variables y operaciones",
    [
      "En Python, = asigna un valor a una variable. Los nombres distinguen mayúsculas y minúsculas.",
      "Una expresión combina valores y operadores. Precio multiplicado por cantidad calcula el ingreso de una venta."
    ],
    "precio = 8\ncantidad = 3\nprint(precio * cantidad)",
    "Con precio 12 y cantidad 4, calcula e imprime el ingreso.",
    "precio = 12\ncantidad = 4\n# Calcula el ingreso\n",
    "precio = 12\ncantidad = 4\nprint(precio * cantidad)",
    "48",
    "Multiplica las variables usando *."
  ),

  practice(
    "p3",
    "python",
    "Tu primera decisión",
    [
      "if evalúa una condición y else define la alternativa. Los encabezados terminan con dos puntos.",
      "Las instrucciones interiores llevan cuatro espacios. El operador >= incluye la igualdad."
    ],
    'ventas = 30\nif ventas >= 50:\n    print("Meta")\nelse:\n    print("En camino")',
    "Con ventas = 120, imprime Meta si ventas >= 100; en otro caso imprime En camino.",
    "ventas = 120\n# Completa el if y el else\n",
    'ventas = 120\nif ventas >= 100:\n    print("Meta")\nelse:\n    print("En camino")',
    "Meta",
    "Usa if ventas >= 100: y aplica sangría al print interior."
  ),

  practice(
    "p4",
    "python",
    "Listas y bucles",
    [
      "Una lista guarda varios valores entre corchetes. for venta in ventas recorre cada elemento.",
      "total += venta equivale a total = total + venta. Imprime fuera del bucle para mostrar solo el resultado final."
    ],
    "total = 0\nfor numero in [2, 3]:\n    total += numero\nprint(total)",
    "Suma [10, 20, 30] usando un bucle e imprime el total.",
    "ventas = [10, 20, 30]\ntotal = 0\n",
    "ventas = [10, 20, 30]\ntotal = 0\nfor venta in ventas:\n    total += venta\nprint(total)",
    "60",
    "El print final no debe tener sangría."
  ),

  practice(
    "p5",
    "python",
    "Funciones reutilizables",
    [
      "def crea una función. Los parámetros reciben valores y return devuelve el resultado. print lo muestra.",
      "sum(lista) suma elementos y len(lista) los cuenta. Una lista vacía no tiene promedio; aquí devolveremos None."
    ],
    "def doble(numero):\n    return numero * 2\nprint(doble(6))",
    "Crea promedio(valores): devuelve None si está vacía; si no, devuelve sum(valores) / len(valores). Imprime promedio([10, 20, 30]).",
    "# Define la función antes de llamarla\n",
    "def promedio(valores):\n    if len(valores) == 0:\n        return None\n    return sum(valores) / len(valores)\nprint(promedio([10, 20, 30]))",
    "20.0",
    "La división / produce aquí 20.0."
  ),

  practice(
    "p6",
    "python",
    "Diccionarios y registros",
    [
      "Un diccionario relaciona claves y valores. Puede representar un registro con producto, precio y cantidad.",
      'Consulta una clave con venta["precio"]. Una lista de diccionarios puede representar varias filas.'
    ],
    'venta = {"precio": 9, "cantidad": 2}\nprint(venta["precio"] * venta["cantidad"])',
    "Calcula el ingreso total de las ventas 10 × 2 y 5 × 4.",
    'ventas = [{"precio": 10, "cantidad": 2}, {"precio": 5, "cantidad": 4}]\n',
    'ventas = [{"precio": 10, "cantidad": 2}, {"precio": 5, "cantidad": 4}]\ntotal = 0\nfor venta in ventas:\n    total += venta["precio"] * venta["cantidad"]\nprint(total)',
    "40",
    "Cada venta aporta precio multiplicado por cantidad."
  ),

  practice(
    "p7",
    "python",
    "Limpiar y convertir datos",
    [
      "strip() elimina espacios en los extremos de un texto. int() convierte un texto numérico en entero.",
      "try / except ValueError permite manejar una conversión inválida. Un dato faltante o incorrecto no equivale automáticamente a cero."
    ],
    'texto = " 12 "\nnumero = int(texto.strip())\nprint(numero + 1)',
    'Convierte " 10 ", "20" y "error"; omite el valor inválido e imprime la suma válida.',
    'datos = [" 10 ", "20", "error"]\ntotal = 0\n',
    'datos = [" 10 ", "20", "error"]\ntotal = 0\nfor dato in datos:\n    try:\n        total += int(dato.strip())\n    except ValueError:\n        pass\nprint(total)',
    "30",
    "Usa try y except dentro del bucle. pass permite continuar."
  ),

  practice(
    "p8",
    "python",
    "Mini proyecto: resumen de ventas",
    [
      "Combina listas y operaciones para responder una pregunta. El total muestra volumen acumulado; el promedio resume el valor por observación.",
      "max() encuentra el valor mayor. Un resumen debe indicar qué datos se usaron y no afirmar más de lo que muestran."
    ],
    "valores = [4, 8]\nprint(sum(valores))\nprint(sum(valores) / len(valores))\nprint(max(valores))",
    "Para [20, 20, 30, 60], imprime en tres líneas: total, promedio y mayor venta.",
    "ventas = [20, 20, 30, 60]\n",
    "ventas = [20, 20, 30, 60]\nprint(sum(ventas))\nprint(sum(ventas) / len(ventas))\nprint(max(ventas))",
    "130\n32.5\n60",
    "Divide el total entre cuatro para obtener el promedio."
  ),

  practice(
    "s1",
    "sql",
    "Tablas y SELECT",
    [
      "Una tabla contiene filas y columnas. SQL permite consultar esos datos. Usaremos una base SQLite de práctica.",
      "SELECT elige columnas, FROM indica la tabla y ORDER BY fija el orden. Cada ejecución comienza con los mismos datos."
    ],
    "SELECT nombre FROM clientes ORDER BY id;",
    "Consulta producto y cantidad de ventas, ordenando por id.",
    "-- Escribe tu consulta\n",
    "SELECT producto, cantidad FROM ventas ORDER BY id;",
    [["Cuaderno", 2], ["Lapiz", 4], ["Cuaderno", 3], ["Mochila", 2]],
    "Selecciona producto y cantidad desde ventas."
  ),

  practice(
    "s2",
    "sql",
    "Filtrar con WHERE",
    [
      "WHERE conserva filas que cumplen una condición. Usa comillas simples para textos y números sin comillas para cantidades.",
      "AND combina condiciones que deben cumplirse juntas. OR acepta al menos una."
    ],
    "SELECT nombre FROM clientes WHERE id = 1;",
    "Muestra producto y cantidad cuando cantidad >= 3, ordenando por id.",
    "-- Usa WHERE\n",
    "SELECT producto, cantidad FROM ventas WHERE cantidad >= 3 ORDER BY id;",
    [["Lapiz", 4], ["Cuaderno", 3]],
    "WHERE se escribe antes de ORDER BY."
  ),

  practice(
    "s3",
    "sql",
    "Ordenar y limitar",
    [
      "ORDER BY columna DESC ordena de mayor a menor. ASC ordena de menor a mayor.",
      "LIMIT limita el número de filas. Agrega otro criterio para resolver empates de forma predecible."
    ],
    "SELECT producto FROM ventas ORDER BY cantidad DESC, id ASC LIMIT 1;",
    "Muestra producto y precio de la venta con mayor precio unitario. Devuelve una fila.",
    "-- Ordena por precio\n",
    "SELECT producto, precio FROM ventas ORDER BY precio DESC, id ASC LIMIT 1;",
    [["Mochila", 30]],
    "Usa precio DESC y LIMIT 1."
  ),

  practice(
    "s4",
    "sql",
    "Agregaciones y métricas",
    [
      "SUM suma, AVG promedia y COUNT(*) cuenta filas. Son funciones de agregación.",
      "El ingreso por fila es precio * cantidad. AS asigna un alias a una columna calculada."
    ],
    "SELECT COUNT(*) AS numero_ventas FROM ventas;",
    "Devuelve una fila con el ingreso total y el número de ventas, en ese orden.",
    "-- Usa SUM y COUNT\n",
    "SELECT SUM(precio * cantidad) AS ingreso, COUNT(*) AS numero_ventas FROM ventas;",
    [[130, 4]],
    "SUM(precio * cantidad) calcula el ingreso de todas las filas."
  ),

  practice(
    "s5",
    "sql",
    "Agrupar con GROUP BY",
    [
      "GROUP BY forma grupos para calcular una métrica por categoría.",
      "Selecciona la categoría y una agregación. Puedes ordenar por el alias de la métrica."
    ],
    "SELECT categoria, COUNT(*) FROM ventas GROUP BY categoria;",
    "Muestra categoria e ingreso total por categoría, de mayor a menor ingreso.",
    "-- Agrupa por categoria\n",
    "SELECT categoria, SUM(precio * cantidad) AS ingreso FROM ventas GROUP BY categoria ORDER BY ingreso DESC;",
    [["Papeleria", 70], ["Accesorios", 60]],
    "Agrupa por categoria y ordena por ingreso DESC."
  ),

  practice(
    "s6",
    "sql",
    "Filtrar grupos con HAVING",
    [
      "WHERE filtra filas antes de agrupar. HAVING filtra grupos después de calcular sus agregaciones.",
      "Puedes agrupar ingresos por categoría y conservar solo los grupos que superan una meta."
    ],
    "SELECT categoria, COUNT(*) AS n FROM ventas GROUP BY categoria HAVING COUNT(*) > 1;",
    "Devuelve categoria e ingreso de los grupos cuyo ingreso total sea mayor que 65.",
    "-- Usa HAVING\n",
    "SELECT categoria, SUM(precio * cantidad) AS ingreso FROM ventas GROUP BY categoria HAVING SUM(precio * cantidad) > 65 ORDER BY categoria;",
    [["Papeleria", 70]],
    "Aplica HAVING SUM(precio * cantidad) > 65."
  ),

  practice(
    "s7",
    "sql",
    "Relacionar tablas con JOIN",
    [
      "Una clave primaria identifica una fila. ventas.cliente_id se relaciona con clientes.id.",
      "JOIN combina filas relacionadas. Los alias v y c ayudan a distinguir columnas. Una unión incorrecta puede duplicar datos."
    ],
    "SELECT v.producto, c.nombre\nFROM ventas AS v\nJOIN clientes AS c ON v.cliente_id = c.id\nORDER BY v.id;",
    "Muestra el nombre de cada cliente y su ingreso total, de mayor a menor ingreso.",
    "-- Une, agrupa y ordena\n",
    "SELECT c.nombre, SUM(v.precio * v.cantidad) AS ingreso FROM ventas AS v JOIN clientes AS c ON v.cliente_id = c.id GROUP BY c.id, c.nombre ORDER BY ingreso DESC;",
    [["Luis", 80], ["Ana", 50]],
    "Después del JOIN agrupa por c.id, c.nombre."
  ),

  practice(
    "s8",
    "sql",
    "Mini proyecto: producto estrella",
    [
      "Una pregunta analítica debe definir su métrica. Aquí producto estrella significa mayor ingreso acumulado, no mayor cantidad.",
      "Agrupa todas las ventas de un producto antes de ordenar. Interpretar la pregunta importa tanto como escribir SQL."
    ],
    "-- Pregunta → métrica → agrupación → orden → respuesta",
    "Obtén producto, unidades totales e ingreso total del producto con más ingresos. Devuelve una fila.",
    "-- Construye tu consulta final\n",
    "SELECT producto, SUM(cantidad) AS unidades, SUM(precio * cantidad) AS ingreso FROM ventas GROUP BY producto ORDER BY ingreso DESC, producto ASC LIMIT 1;",
    [["Mochila", 2, 60]],
    "Mochila ingresa 60; Cuaderno suma 50 y Lapiz suma 20."
  ),

  practice(
    "d1",
    "data",
    "Primera tabla con pandas",
    [
      "La analítica convierte datos en respuestas útiles: preguntar, reunir, limpiar, explorar y comunicar.",
      "pandas es una biblioteca de Python. Un DataFrame representa una tabla y shape informa sus dimensiones."
    ],
    'import pandas as pd\ndf = pd.DataFrame({"venta": [10, 20]})\nprint(df.shape[0])',
    "Crea una tabla con ingreso = [20, 20, 30, 60]. Imprime su número de filas.",
    "import pandas as pd\n",
    'import pandas as pd\ndf = pd.DataFrame({"ingreso": [20, 20, 30, 60]})\nprint(df.shape[0])',
    "4",
    "df.shape[0] devuelve la cantidad de filas."
  ),

  practice(
    "d2",
    "data",
    "Valores faltantes y duplicados",
    [
      "Un valor faltante no significa cero. Antes de eliminar o rellenar datos, piensa cómo podría cambiar la conclusión.",
      "drop_duplicates() elimina repetidos y dropna() elimina filas con ausentes. Aquí decidimos quitar ambos como ejercicio; en casos reales debes justificarlo."
    ],
    "limpio = df.drop_duplicates().dropna()",
    "Usa ingreso = [20, 20, None, 60]. Elimina duplicados y ausentes. Imprime cuántas filas quedan.",
    'import pandas as pd\ndf = pd.DataFrame({"ingreso": [20, 20, None, 60]})\n',
    'import pandas as pd\ndf = pd.DataFrame({"ingreso": [20, 20, None, 60]})\nlimpio = df.drop_duplicates().dropna()\nprint(len(limpio))',
    "2",
    "Después de limpiar quedan 20 y 60."
  ),

  practice(
    "d3",
    "data",
    "Columnas calculadas y filtros",
    [
      "Puedes crear una columna multiplicando otras dos. pandas opera fila por fila sin que escribas un bucle.",
      "df[condicion] selecciona filas. Este patrón se parece a WHERE en SQL."
    ],
    'df["ingreso"] = df["precio"] * df["cantidad"]\nmayores = df[df["ingreso"] > 25]',
    "Calcula ingreso con los datos iniciales y suma únicamente las filas con ingreso > 25.",
    'import pandas as pd\ndf = pd.DataFrame({"precio": [10, 5, 10, 30], "cantidad": [2, 4, 3, 2]})\n',
    'import pandas as pd\ndf = pd.DataFrame({"precio": [10, 5, 10, 30], "cantidad": [2, 4, 3, 2]})\ndf["ingreso"] = df["precio"] * df["cantidad"]\nprint(df[df["ingreso"] > 25]["ingreso"].sum())',
    "90",
    "Las filas seleccionadas aportan 30 y 60."
  ),

  practice(
    "d4",
    "data",
    "Media, mediana y valores extremos",
    [
      "La media es la suma dividida por la cantidad. La mediana es el valor central tras ordenar; con cantidad par, promedia los dos centrales.",
      "Un valor extremo puede mover mucho la media. Comparar ambas métricas ayuda a describir los datos."
    ],
    "s = pd.Series([1, 2, 9])\nprint(s.mean())\nprint(s.median())",
    "Para [20, 20, 30, 130], imprime media y mediana, una por línea.",
    "import pandas as pd\ns = pd.Series([20, 20, 30, 130])\n",
    "import pandas as pd\ns = pd.Series([20, 20, 30, 130])\nprint(s.mean())\nprint(s.median())",
    "50.0\n25.0",
    "Usa mean() y median(). Observa cómo 130 eleva la media."
  ),

  practice(
    "d5",
    "data",
    "Preparar datos para visualizar",
    [
      "Las barras comparan categorías; las líneas muestran cambios en el tiempo; la dispersión explora relaciones numéricas.",
      "Antes de graficar, agrega al nivel correcto. groupby() agrupa, sum() suma y sort_values() ordena."
    ],
    'resumen = df.groupby("categoria")["ingreso"].sum()',
    "Agrupa ingresos por categoría. Imprime categoría y total, de mayor a menor, usando print(categoria, total).",
    'import pandas as pd\ndf = pd.DataFrame({"categoria": ["Papeleria", "Papeleria", "Accesorios"], "ingreso": [20, 50, 60]})\n',
    'import pandas as pd\ndf = pd.DataFrame({"categoria": ["Papeleria", "Papeleria", "Accesorios"], "ingreso": [20, 50, 60]})\nresumen = df.groupby("categoria")["ingreso"].sum().sort_values(ascending=False)\nfor categoria, total in resumen.items():\n    print(categoria, total)',
    "Papeleria 70\nAccesorios 60",
    "Recorre resumen.items() después de ordenar con ascending=False."
  ),

  practice(
    "d6",
    "data",
    "Proyecto final: una conclusión útil",
    [
      "Una conclusión útil contiene una métrica, un hallazgo, una limitación y una siguiente pregunta. Cuatro ventas no permiten afirmar una tendencia general.",
      "Calcula cuánto representa la venta mayor sobre el total. Una f-string inserta valores en texto y :.2f muestra dos decimales. Correlación no demuestra causalidad."
    ],
    'porcentaje = 25 / 100 * 100\nprint(f"Participación: {porcentaje:.2f}%")',
    "Para ingresos [20, 20, 30, 60], imprime Total: 130 y, en otra línea, Mayor venta: 46.15%. Después explica qué investigarías con más datos.",
    "import pandas as pd\ns = pd.Series([20, 20, 30, 60])\n",
    'import pandas as pd\ns = pd.Series([20, 20, 30, 60])\ntotal = s.sum()\nporcentaje = s.max() / total * 100\nprint(f"Total: {total}")\nprint(f"Mayor venta: {porcentaje:.2f}%")',
    "Total: 130\nMayor venta: 46.15%",
    "Divide 60 entre 130 y multiplica por 100. Usa :.2f."
  )
];
```

## 9. Archivo public/runner.js

Ejecuta los programas en un Web Worker para mantener la interfaz separada del trabajo del intérprete.

Python utiliza Pyodide. SQL utiliza SQLite mediante sql.js.

```javascript
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
```

## 10. Archivo src/App.jsx

Incluye la pantalla, lecciones, editor, medallas, puntos y respaldo del progreso.

```jsx
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
```

## 11. Archivo src/styles.css

```css
:root {
  font-family: "Trebuchet MS", system-ui, sans-serif;
  color: #482739;
  background: #fff9fb;
  font-synthesis: none;
  line-height: 1.6;
  font-weight: 400;
  --rose: #a92a62;
  --line: #efcedc;
  --muted: #725365;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
}

button,
input,
textarea {
  font: inherit;
}

button,
a,
input,
textarea,
summary {
  touch-action: manipulation;
}

button {
  cursor: pointer;
  border: 1px solid #dba4ba;
  background: white;
  color: #6e294a;
  border-radius: 12px;
  padding: 10px 16px;
  font-weight: 700;
  transition: background 0.15s;
}

button:hover:not(:disabled) {
  background: #fce2ed;
}

button:disabled {
  cursor: not-allowed;
  opacity: 0.58;
}

button:focus-visible,
a:focus-visible,
input:focus-visible,
textarea:focus-visible,
summary:focus-visible {
  outline: 3px solid #842954;
  outline-offset: 4px;
}

a {
  color: var(--rose);
}

h1,
h2,
h3,
p {
  margin-top: 0;
}

h2 {
  font-size: 1.65rem;
  line-height: 1.3;
}

h3 {
  font-size: 1.05rem;
}

p {
  color: var(--muted);
}

.shell {
  max-width: 1240px;
  margin: auto;
  padding: 0 32px;
}

.topbar {
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  border-bottom: 1px solid var(--line);
}

.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  font-size: 1.6rem;
  letter-spacing: -1px;
  font-weight: 800;
}

.brand span {
  font-size: 2.4rem;
}

.pill {
  background: #fce8f0;
  border: 1px solid var(--line);
  border-radius: 30px;
  padding: 6px 16px;
  font-size: 0.8rem;
  color: #793451;
}

.hero {
  display: grid;
  grid-template-columns: 1.7fr 1fr;
  gap: 40px;
  align-items: center;
  padding: 58px 0 42px;
}

.eyebrow {
  font-weight: 800;
  font-size: 0.72rem;
  letter-spacing: 1.6px;
  color: #9d3762;
}

.hero h1 {
  font-size: clamp(2.8rem, 5.5vw, 4.6rem);
  letter-spacing: -3px;
  line-height: 1.1;
  margin: 18px 0 24px;
}

.hero em {
  font-family: Georgia, serif;
  font-weight: 400;
  color: var(--rose);
}

.hero p {
  max-width: 560px;
  font-size: 1.03rem;
}

.primary {
  background: var(--rose);
  color: white;
  border-color: var(--rose);
  padding: 12px 21px;
}

.primary:hover:not(:disabled) {
  background: #84204b;
}

.flower-card {
  aspect-ratio: 1;
  width: 100%;
  max-width: 330px;
  justify-self: center;
  border-radius: 45% 45% 20% 20%;
  background: radial-gradient(
    circle at 45% 32%,
    #ffe8b9 0%,
    #ffe1ee 45%,
    #f7c7df 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  transform: rotate(4deg);
  border: 8px solid white;
  box-shadow: 0 12px 30px #ad557419;
  text-align: center;
  color: #793451;
}

.flower {
  font-size: 9rem;
  line-height: 1.1;
  color: #ad3f76;
  text-shadow: 4px 6px #f9b7ce;
}

.flower-card > span {
  font-family: Georgia, serif;
  font-size: 1.2rem;
  font-style: italic;
}

.sparkle {
  font-size: 1.5rem;
  color: #8b4262;
  margin-top: 8px;
}

.dashboard {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr 1fr 1.2fr;
  gap: 24px;
  padding: 24px;
  background: white;
  border: 1px solid var(--line);
  border-radius: 20px;
  align-items: center;
}

.dashboard strong {
  display: block;
  font-size: 1.6rem;
  color: #923558;
}

.dashboard span,
.dashboard label {
  font-size: 0.8rem;
  color: var(--muted);
}

.name input {
  display: block;
  width: 100%;
  border: 0;
  border-bottom: 1px solid #dba4ba;
  background: #fff9fb;
  padding: 7px 8px;
  margin-top: 5px;
  color: #482739;
}

progress {
  display: block;
  width: 100%;
  height: 12px;
  margin-top: 10px;
  border: 0;
  border-radius: 8px;
  overflow: hidden;
  accent-color: var(--rose);
}

progress::-webkit-progress-bar {
  background: #f9e4ed;
}

progress::-webkit-progress-value {
  background: var(--rose);
}

.section-title {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 20px;
  margin: 40px 0 20px;
}

.section-title h2 {
  margin: 6px 0 0;
}

.section-title > p {
  font-size: 0.8rem;
  margin: 0;
}

.route-grid,
.medal-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.route-card {
  text-align: left;
  padding: 22px 18px;
  border-color: var(--line);
  border-radius: 18px;
  font-weight: 400;
}

.route-card.active {
  border: 2px solid var(--rose);
  background: #fff0f6;
  padding: 21px 17px;
}

.route-icon {
  display: block;
  font-size: 2rem;
  margin-bottom: 14px;
}

.route-card small {
  font-size: 0.65rem;
  letter-spacing: 1.4px;
  font-weight: 700;
}

.route-card h3 {
  margin: 8px 0;
}

.route-card p {
  font-size: 0.8rem;
  min-height: 42px;
}

.route-card strong {
  font-size: 0.75rem;
}

.study {
  display: grid;
  grid-template-columns: 265px minmax(0, 1fr);
  gap: 24px;
  margin: 36px 0;
  scroll-margin-top: 16px;
  align-items: start;
}

.syllabus {
  background: #fff0f6;
  border: 1px solid var(--line);
  border-radius: 18px;
  padding: 22px 14px;
}

.syllabus h2 {
  font-size: 1.2rem;
  margin: 10px 6px 22px;
}

.syllabus .eyebrow {
  display: block;
  margin-left: 6px;
  font-size: 0.6rem;
}

.syllabus nav {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.syllabus button {
  display: flex;
  align-items: center;
  gap: 10px;
  text-align: left;
  border: 0;
  background: transparent;
  font-size: 0.8rem;
  padding: 11px 8px;
  font-weight: 500;
}

.syllabus button.current {
  background: white;
  box-shadow: 0 3px 12px #92355812;
  font-weight: 800;
}

.syllabus button span {
  display: grid;
  place-items: center;
  min-width: 26px;
  height: 26px;
  border-radius: 50%;
  background: #f7d9e5;
  color: #76364f;
}

.syllabus > p {
  font-size: 0.75rem;
  margin: 20px 8px 0;
}

.study-content {
  min-width: 0;
}

.lesson {
  background: white;
  border: 1px solid var(--line);
  border-radius: 20px;
  padding: 32px;
}

.lesson h2 {
  margin: 9px 0 22px;
}

.lesson p {
  font-size: 0.95rem;
}

.lesson h3 {
  margin: 22px 0 10px;
}

pre {
  background: #362936;
  color: #fff1f7;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
  border-radius: 12px;
  padding: 18px;
  font-family: ui-monospace, Consolas, monospace;
  font-size: 0.84rem;
  line-height: 1.65;
  overflow-x: auto;
}

summary {
  cursor: pointer;
  font-size: 0.86rem;
  font-weight: 700;
  color: #873455;
  padding: 8px 0;
}

.challenge {
  border-top: 1px solid var(--line);
  margin-top: 24px;
}

fieldset {
  border: 0;
  padding: 0;
  margin: 0 0 20px;
}

legend {
  font-size: 0.8rem;
  margin-bottom: 8px;
}

.option {
  display: flex;
  align-items: center;
  gap: 10px;
  border: 1px solid var(--line);
  padding: 13px;
  margin: 9px 0;
  border-radius: 12px;
  font-size: 0.9rem;
  cursor: pointer;
}

.option.selected {
  background: #fff0f6;
  border-color: var(--rose);
}

input[type="radio"] {
  accent-color: var(--rose);
}

.editor-label {
  display: block;
  font-weight: 700;
  font-size: 0.9rem;
  margin-bottom: 8px;
}

.editor {
  width: 100%;
  min-height: 220px;
  resize: vertical;
  border: 1px solid #bd91aa;
  background: #fffafd;
  border-radius: 12px;
  padding: 18px;
  color: #462b40;
  font-family: ui-monospace, Consolas, monospace;
  font-size: 0.92rem;
  line-height: 1.7;
  tab-size: 4;
}

.actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin: 12px 0;
}

.text-button {
  border: 0;
  background: transparent;
  font-size: 0.8rem;
  padding: 6px;
}

.feedback {
  font-weight: 700;
  margin-bottom: 0;
  color: #72324f;
}

.note {
  background: #fff5dc;
  border: 1px solid #ead19b;
  border-radius: 12px;
  padding: 16px;
  color: #654928;
}

.error {
  background: #fff0f0;
  color: #922d38;
}

.continue {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  background: #f3f8ed;
  border: 1px solid #cfddbf;
  padding: 18px;
  border-radius: 16px;
  margin-top: 14px;
}

.continue > span {
  font-size: 0.85rem;
  font-weight: 700;
  color: #43612f;
}

.table-wrap {
  overflow: auto;
}

table {
  border-collapse: collapse;
  width: 100%;
  font-size: 0.85rem;
}

th,
td {
  padding: 10px;
  border: 1px solid var(--line);
  text-align: left;
}

th {
  background: #fff0f6;
}

.medal {
  text-align: center;
  border: 1px dashed #c6adb8;
  padding: 24px 12px;
  border-radius: 18px;
  background: #fbf5f8;
}

.medal > span {
  font-size: 2.4rem;
}

.medal h3 {
  margin: 10px 0 4px;
}

.medal p {
  font-size: 0.75rem;
  margin: 0;
}

.medal.won {
  background: #fff4d8;
  border: 1px solid #dec28a;
}

.graduation {
  background: #fff0f6;
  padding: 26px;
  border-radius: 18px;
  margin-top: 22px;
}

.backup {
  margin: 40px 0 20px;
  border-top: 1px solid var(--line);
  padding-top: 28px;
}

.backup h2 {
  font-size: 1.1rem;
}

.backup p {
  font-size: 0.85rem;
}

.backup button {
  font-size: 0.8rem;
}

footer {
  text-align: center;
  color: var(--muted);
  font-size: 0.75rem;
  padding: 28px 0;
}

.chart {
  margin: 22px 0;
  padding: 18px;
  background: #fff4f8;
  border-radius: 14px;
}

.chart figcaption {
  font-weight: 700;
  margin-bottom: 12px;
}

.chart > div {
  display: flex;
  gap: 10px;
  align-items: center;
}

.chart span {
  min-width: 85px;
  font-size: 0.8rem;
}

.chart meter {
  flex: 1;
  min-width: 0;
  height: 24px;
}

.chart p,
.lesson .small {
  font-size: 0.75rem;
}

@media (max-width: 900px) {
  .dashboard {
    grid-template-columns: 1fr 1fr;
  }

  .route-grid,
  .medal-grid {
    grid-template-columns: 1fr 1fr;
  }

  .study {
    grid-template-columns: 220px minmax(0, 1fr);
  }

  .lesson {
    padding: 22px;
  }

  .flower {
    font-size: 7rem;
  }

  .flower-card > span {
    font-size: 1rem;
  }
}

@media (max-width: 650px) {
  .shell {
    padding: 0 16px;
  }

  .topbar {
    height: 72px;
  }

  .pill {
    font-size: 0.65rem;
    padding: 4px 9px;
  }

  .brand {
    font-size: 1.3rem;
  }

  .hero {
    grid-template-columns: 1fr;
    padding: 32px 0;
    gap: 24px;
  }

  .hero h1 {
    letter-spacing: -2px;
  }

  .flower-card {
    display: none;
  }

  .dashboard {
    padding: 18px;
    gap: 18px;
  }

  .section-title {
    display: block;
  }

  .section-title > p {
    margin-top: 12px;
  }

  .route-grid,
  .medal-grid {
    gap: 10px;
  }

  .route-card {
    padding: 16px 12px;
  }

  .route-card.active {
    padding: 15px 11px;
  }

  .route-card h3 {
    font-size: 0.95rem;
  }

  .route-card p {
    font-size: 0.75rem;
  }

  .study {
    grid-template-columns: 1fr;
  }

  .syllabus nav {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  .syllabus h2 {
    margin-bottom: 12px;
  }

  .syllabus > p {
    display: none;
  }

  .lesson {
    padding: 20px 16px;
  }

  .lesson h2 {
    font-size: 1.5rem;
  }

  .continue {
    flex-direction: column;
    align-items: stretch;
  }

  .medal h3 {
    font-size: 0.9rem;
  }

  .editor {
    font-size: 16px;
  }

  .eyebrow {
    font-size: 0.63rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  * {
    scroll-behavior: auto !important;
    transition: none !important;
  }
}
```

## 12. Archivo tests/progress.test.js

Estas pruebas comprueban reglas de avance y consistencia básica del curso.

```javascript
import test from "node:test";
import assert from "node:assert/strict";

import {
  sanitize,
  unlock,
  complete,
  earned,
  normalize
} from "../src/progress.js";

import {
  lessons,
  routes
} from "../src/curriculum.js";

test("no permite saltos ni puntos duplicados", () => {
  const empty = sanitize(null, lessons);

  assert.equal(
    unlock(lessons, [], lessons[1].id),
    false
  );

  assert.deepEqual(
    complete(empty, lessons, lessons[1].id),
    empty
  );

  const one = complete(
    empty,
    lessons,
    lessons[0].id
  );

  assert.equal(one.done.length, 1);

  assert.deepEqual(
    complete(one, lessons, lessons[0].id),
    one
  );

  assert.equal(
    unlock(lessons, one.done, lessons[1].id),
    true
  );
});

test("sanea datos recuperados", () => {
  assert.deepEqual(
    sanitize(
      { done: ["fantasma", lessons[2].id] },
      lessons
    ).done,
    []
  );

  assert.deepEqual(
    sanitize(
      { done: [lessons[0].id, lessons[0].id] },
      lessons
    ).done,
    [lessons[0].id]
  );

  assert.equal(
    sanitize({ name: 42, done: null }, lessons).name,
    ""
  );
});

test("medallas solo al completar una etapa", () => {
  const logic = lessons
    .filter(lesson => lesson.route === "logic")
    .map(lesson => lesson.id);

  assert.equal(
    earned(routes, lessons, logic.slice(0, -1)).length,
    0
  );

  assert.equal(
    earned(routes, lessons, logic).length,
    1
  );

  assert.equal(
    earned(
      routes,
      lessons,
      lessons.map(lesson => lesson.id)
    ).length,
    4
  );
});

test("currículo completo y coherente", () => {
  assert.equal(lessons.length, 28);

  assert.equal(
    new Set(lessons.map(lesson => lesson.id)).size,
    28
  );

  for (const lesson of lessons) {
    assert.ok(
      routes.some(route => route.id === lesson.route)
    );

    assert.ok(
      lesson.theory.length >= 2 &&
      lesson.prompt &&
      lesson.hint
    );

    if (lesson.type === "quiz") {
      assert.ok(lesson.options[lesson.answer]);
    } else {
      assert.ok(lesson.solution);
      assert.ok(lesson.expected);
    }
  }

  assert.equal(normalize("Hola\r\n"), "Hola");
});
```

## 13. Instalar dependencias

Abre una terminal dentro de `databloom`, donde está `package.json`.

Ejecuta:

```bash
npm install
```

Espera a que termine.

Este comando crea:

- `node_modules`: dependencias instaladas.
- `package-lock.json`: registro de versiones instaladas.

No tienes que escribir esos archivos a mano.

Conserva `package-lock.json` si compartes el proyecto o lo guardas en Git. Permite repetir la instalación con `npm ci`.

## 14. Iniciar la aplicación

Ejecuta:

```bash
npm run dev
```

Abre la dirección que aparezca en la terminal, normalmente:

```text
http://localhost:5173/
```

Mantén la terminal abierta.

Para detener el servidor:

```text
Ctrl + C
```

No abras `index.html` con doble clic. La aplicación necesita ejecutarse mediante Vite o un servidor web.

## 15. Probar desde el celular

Si el celular y el computador están en la misma red:

```bash
npm run dev -- --host 0.0.0.0
```

En el celular abre la dirección de red que muestre Vite.

El progreso de cada navegador es independiente. Usa Exportar e Importar si quieres trasladarlo.

## 16. Comprobar y compilar

Para ejecutar las pruebas:

```bash
npm test
```

Para generar la versión de producción:

```bash
npm run build
```

Esto crea la carpeta `dist`.

Para revisar esa compilación localmente:

```bash
npm run preview
```

Abre la dirección que muestre la terminal.

## 17. Cómo usar la plataforma

1. Escribe tu nombre.
2. Pulsa Comenzar desde cero.
3. Lee la explicación.
4. Revisa el ejemplo.
5. Resuelve el ejercicio.
6. Usa la pista cuando lo necesites.
7. Al acertar, recibes 25 XP.
8. La siguiente lección queda disponible.
9. Al completar una etapa, recibes su medalla.
10. Al terminar las 28 lecciones, tendrás 700 XP y cuatro medallas.

Repetir ejercicios no duplica los puntos.

No se pierden puntos por equivocarse o usar pistas.

## 18. Plan de estudio sugerido

| Semana | Objetivo |
|---|---|
| 1 | Algoritmos, entradas, salidas y variables |
| 2 | Operadores, condiciones, bucles y funciones |
| 3 | Primeros programas en Python |
| 4 | Listas, diccionarios y limpieza |
| 5 | Consultas básicas en SQL |
| 6 | Agrupaciones, HAVING y JOIN |
| 7 | Tablas y limpieza con pandas |
| 8 | Métricas, interpretación y proyecto final |

Puedes dedicar 15–20 minutos por sesión, tres o cuatro veces por semana. El ritmo es orientativo.

Después de cada ejercicio:

- Explica qué hace cada línea.
- Cambia un dato.
- Predice qué resultado obtendrás.
- Ejecuta y compara.
- Anota lo que aprendiste.

## 19. Cómo se evalúan los ejercicios

### Lógica

Se compara la respuesta seleccionada con la respuesta correcta.

### Python y pandas

El código se ejecuta realmente y se compara la salida textual con el resultado esperado.

Se ignoran saltos de línea y espacios al principio y al final, pero se conservan diferencias internas.

Por ejemplo:

```text
20
```

y:

```text
20.0
```

no son la misma salida textual.

### SQL

La consulta se ejecuta realmente.

Se comparan los valores y el orden de filas y columnas. Los alias pueden ser diferentes.

Cada ejecución reconstruye la base de datos de ejemplo.

### Límite del evaluador

Cada ejercicio comprueba un caso y su resultado. No demuestra que se haya utilizado la técnica pedida ni verifica múltiples entradas.

Alguien podría escribir directamente el resultado esperado. Por eso es una herramienta de autoaprendizaje, no una evaluación de alto impacto.

Para comprobar comprensión, pide explicar el código y resolver una variación.

## 20. Guardado del progreso

Se guarda automáticamente:

- Nombre.
- Lecciones completadas.
- Versión del formato de progreso.

Los puntos y medallas se calculan a partir de las lecciones completadas.

No se guardan:

- Borradores del editor.
- Historial de intentos.
- Salidas anteriores.
- Notas personales.

Al cambiar de lección o recargar, el editor vuelve al código inicial.

Exporta el progreso antes de borrar los datos del navegador o cambiar de dispositivo.

La importación conserva el avance válido más largo y no borra los logros que ya existen.

## 21. Funcionamiento del laboratorio

Los motores se descargan desde `cdn.jsdelivr.net`.

- Python: Pyodide.
- SQL: sql.js con SQLite.
- Analítica: pandas dentro de Pyodide.

La primera carga puede tardar y consumir decenas de megabytes.

Cada intento crea un worker nuevo. El navegador puede reutilizar archivos descargados mediante su caché.

Límites:

- Preparación del motor: hasta 120 segundos.
- Ejecución del programa: hasta 10 segundos.
- Salida textual de Python: hasta 20.000 caracteres.
- Vista de resultados SQL: hasta 100 filas.

El botón Detener permite cancelar una carga o una ejecución.

La aplicación no es completamente offline. Necesita acceso a los motores, salvo que ya estén disponibles en caché o se modifique para alojarlos localmente.

El worker mantiene el trabajo separado de la interfaz, pero no debe considerarse un aislamiento para ejecutar código malicioso. El código educativo ejecutado puede tener acceso a capacidades de red del navegador.

## 22. Personalización

### Cambiar el nombre

Busca `DataBloom` en:

- `index.html`
- `src/App.jsx`

### Cambiar colores

Edita estas variables en `src/styles.css`:

```css
--rose: #a92a62;
--line: #efcedc;
--muted: #725365;
```

También puedes modificar los colores literales de fondos y tarjetas.

Mantén suficiente contraste entre textos y fondos.

### Agregar lecciones

En `src/curriculum.js`:

1. Copia una llamada a `quiz` o `practice`.
2. Usa un identificador nuevo.
3. Colócala en el orden correcto.
4. Escribe teoría, ejemplo, reto y pista.
5. Incluye una solución y resultado esperado.
6. Actualiza la prueba que fija el total de 28 lecciones.

El orden del arreglo `lessons` define los prerrequisitos.

No cambies identificadores de lecciones ya utilizadas sin preparar una migración del progreso.

Insertar una lección en medio de una ruta ya completada puede hacer que el saneamiento conserve únicamente el tramo anterior a esa nueva lección.

## 23. Pruebas manuales recomendadas

| Acción | Resultado esperado |
|---|---|
| Abrir Python antes de terminar lógica | Etapa bloqueada |
| Responder mal | Mensaje de ayuda y posibilidad de reintentar |
| Completar una lección | +25 XP |
| Repetirla | No suma puntos adicionales |
| Recargar la página | Conserva progreso en el mismo navegador y dirección |
| Ejecutar código incorrecto | Error legible |
| Ejecutar un bucle infinito | Se detiene después del límite |
| Pulsar Detener | Cancela el intento |
| Importar JSON inválido | Muestra error sin borrar el avance |
| Cancelar el reinicio | Conserva el progreso |
| Confirmar el reinicio | Vuelve a cero |
| Abrir en pantalla pequeña | Distribución adaptable |

La versión inicial se compiló y sus reglas de progreso se probaron. También se comprobaron las soluciones con Python/pandas y SQLite.

La revisión visual y la ejecución completa de los motores dentro de un navegador no se pudieron completar en el entorno de preparación. Realiza estas comprobaciones antes de publicarla.

## 24. Publicación

Para un hosting estático:

- Comando de instalación: `npm install`
- Comando de compilación: `npm run build`
- Carpeta de salida: `dist`

Si tienes un `package-lock.json` guardado, usa `npm ci` para repetir la instalación.

El hosting debe servir `runner.js` y permitir descargar los recursos de `cdn.jsdelivr.net`.

Para publicar en una subcarpeta:

```bash
npm run build -- --base=/databloom/
```

Después verifica que Python, SQL y pandas funcionan desde la dirección publicada.

Esta guía no publica automáticamente una página.

## 25. Qué no incluye esta versión

- Registro e inicio de sesión.
- Sincronización automática entre dispositivos.
- Panel docente.
- Certificados oficiales.
- Editor con autocompletado.
- Guardado automático del código escrito.
- Entrada interactiva mediante `input()`.
- Carga de CSV personales.
- Gráficos generados con matplotlib.
- Evaluación con múltiples casos de prueba.

La comparación visual incluida en la lección de categorías corresponde a los datos de ese ejercicio.

Los puntos se guardan en el navegador y pueden modificarse manualmente: son motivacionales.

## 26. Siguientes mejoras educativas

Cuando la estudiante complete la ruta, puedes agregar:

1. Cargar un CSV pequeño.
2. Explorar sus columnas y tipos.
3. Identificar valores ausentes.
4. Formular tres preguntas.
5. Calcular métricas.
6. Crear un gráfico.
7. Redactar una conclusión con limitaciones.
8. Construir un portafolio.

Después pueden estudiarse:

- Fechas y texto en pandas.
- LEFT JOIN y valores NULL.
- Subconsultas y CTE.
- Funciones de ventana.
- Visualización con matplotlib.
- Estadística descriptiva.
- Análisis exploratorio.
- Comunicación de resultados.

## 27. Solución de problemas

| Problema | Solución |
|---|---|
| npm no se reconoce | Instala Node.js y abre nuevamente la terminal |
| No encuentra package.json | Entra en la carpeta databloom |
| vite no se reconoce | Ejecuta npm install y espera a que termine |
| Pantalla vacía | Revisa los nombres de archivos y la consola del navegador |
| Python o SQL no cargan | Comprueba conexión, bloqueadores y acceso al CDN |
| pandas tarda | La biblioteca necesita una descarga adicional |
| No aprueba una salida parecida | Revisa decimales, mayúsculas, espacios y orden |
| SQL no encuentra una columna | Consulta Ver tablas y datos de práctica |
| Se perdió el avance | Revisa navegador, dirección y puerto; importa tu respaldo |

## 28. Documentación para seguir aprendiendo

- React: https://react.dev/learn
- Vite: https://vite.dev/guide/
- Python: https://docs.python.org/3/tutorial/
- Pyodide: https://pyodide.org/en/stable/
- sql.js: https://sql.js.org/documentation/
- SQLite: https://www.sqlite.org/lang.html
- pandas: https://pandas.pydata.org/docs/getting_started/intro_tutorials/

# Fin del documento