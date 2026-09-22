export const routes = [
  {
    id: "intro",
    title: "Tutorial Básico",
    emoji: "🐣",
    description: "Descubre qué es Python, variables, sintaxis y ciclos.",
    medal: "Primeros Pasos"
  },
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
  route,
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
    route,
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
    "t0",
    "intro",
    "¿Qué es programar?",
    [
      "Programar es dar instrucciones exactas paso a paso a una máquina. A esta secuencia lógica se le llama algoritmo.",
      "Imagina una rutina de cuidado facial: el orden importa. Si aplicas crema antes de limpiar, no funcionará. Las máquinas necesitan esa misma precisión."
    ],
    "1. Lavar rostro\n2. Aplicar mascarilla\n3. Esperar 15 min\n4. Enjuagar\n5. Aplicar crema",
    "¿Cuál es el algoritmo correcto para preparar la piel?",
    [
      "Aplicar mascarilla → Lavar rostro → Enjuagar mascarilla",
      "Lavar rostro → Aplicar mascarilla → Esperar 15 min → Enjuagar",
      "Esperar 15 min → Enjuagar → Lavar rostro → Aplicar mascarilla"
    ],
    1,
    "Primero se debe limpiar el rostro, luego aplicar el producto, dejarlo actuar y finalmente retirarlo. El orden lógico es fundamental.",
    "Piensa en qué estado debe estar la piel antes de recibir un tratamiento."
  ),

  practice(
    "t1",
    "intro",
    "Tu primera instrucción en Python",
    [
      "En Python, le damos órdenes directas a la computadora. La orden print() le dice a la máquina que muestre un mensaje.",
      "Los textos siempre deben ir rodeados de comillas. ¡Es como decirle a un asistente exactamente qué decir!"
    ],
    "print(\"Rutina terminada\")\n# El símbolo # permite escribir comentarios que la máquina ignora.",
    "Escribe código para que la computadora muestre exactamente el texto: Rostro limpio",
    "# Escribe tu instrucción abajo:\n",
    "print(\"Rostro limpio\")",
    "Rostro limpio",
    "Usa la función print() y asegúrate de escribir el texto entre comillas tal cual se pide."
  ),

  practice(
    "t2",
    "intro",
    "Guardando datos (Variables)",
    [
      "Una variable es como un frasco etiquetado donde guardamos un dato para usarlo después. Existen textos (str), números enteros (int), números decimales (float) y booleanos (bool).",
      "Para saber qué tipo de dato hay en una variable, usamos la orden type()."
    ],
    "pasos = 3                # Entero (int)\nproducto = \"Sérum\"         # Texto (str)\nterminado = True         # Booleano (bool)\nprint(type(producto))",
    "Crea una variable llamada 'tiempo' con el número entero 15 e imprime su tipo usando print(type(tiempo)).",
    "# Crea la variable tiempo abajo e imprime su tipo\n",
    "tiempo = 15\nprint(type(tiempo))",
    "<class 'int'>",
    "Recuerda que los números enteros no llevan comillas."
  ),

  quiz(
    "t3",
    "intro",
    "Errores y Sintaxis",
    [
      "La máquina es muy estricta. Si te equivocas en una letra, un símbolo o un espacio, no entenderá la instrucción. A esto se le llama error de sintaxis.",
      "En Python, las mayúsculas y minúsculas son diferentes (Print no es lo mismo que print)."
    ],
    "print(\"Aplicar crema) \n# ¡Falta la comilla al final!",
    "Si le dices a la máquina: print(\"Aplicar crema) (sin la comilla final), ¿qué pasará?",
    [
      "Entenderá que es un texto y lo arreglará sola.",
      "Dará un error de sintaxis porque falta cerrar las comillas.",
      "Imprimirá el texto pero sin comillas."
    ],
    1,
    "La computadora no adivina tus intenciones. Si la instrucción está incompleta, detendrá el programa y mostrará un error (SyntaxError).",
    "¿Puede la computadora saber dónde termina el texto si no lo indicas?"
  ),

  practice(
    "t4",
    "intro",
    "Automatizando con ciclos",
    [
      "En lugar de escribir la misma orden muchas veces, usamos un ciclo 'for' para que la máquina repita una tarea.",
      "El ciclo recorre una lista de elementos. ¡No olvides los dos puntos (:) al final y la sangría (espacios) adentro para indicar qué se repite!"
    ],
    "for paso in [\"Limpiar\", \"Tónico\", \"Crema\"]:\n    print(paso)",
    "Usa un ciclo for para recorrer e imprimir cada elemento de la lista: [\"Exfoliar\", \"Hidratar\", \"Proteger\"]",
    "rutina = [\"Exfoliar\", \"Hidratar\", \"Proteger\"]\n# Escribe el ciclo for abajo:\n",
    "rutina = [\"Exfoliar\", \"Hidratar\", \"Proteger\"]\nfor paso in rutina:\n    print(paso)",
    "Exfoliar\nHidratar\nProteger",
    "Usa for paso in rutina: y en la siguiente línea (con sangría) usa print(paso)."
  ),

  quiz(
    "l1",
    "logic",
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
    "logic",
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
    "logic",
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
    "logic",
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
    "logic",
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
    "logic",
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

  quiz(
    "s0",
    "sql",
    "¿Qué es una Base de Datos?",
    [
      "Imagina el inventario y la agenda de una clínica estética. Si guardas todo en papeles sueltos, encontrar algo será un caos. Una Base de Datos organiza todo en 'Tablas', que son como archiveros exclusivos (uno para Clientas, otro para Tratamientos).",
      "SQL (Structured Query Language) es el idioma exacto que usas para pedirle a tu asistente (la computadora) que busque información específica en esos archiveros. A esto se le llama hacer una 'consulta' o 'query'."
    ],
    "En vez de decir 'búscame los tratamientos de limpieza', le dices en SQL:\nSELECT nombre FROM Tratamientos WHERE tipo = 'Limpieza';",
    "Si quieres saber qué clientas están registradas en tu clínica, ¿qué concepto usarías para organizar y guardar esa lista inicial?",
    [
      "Una Tabla (como un archivero ordenado solo para Clientas).",
      "Un Ciclo for (para repetir el nombre de las clientas).",
      "Una Variable de texto (str)."
    ],
    0,
    "¡Exacto! En bases de datos, agrupamos la información de la misma categoría (como clientas, citas o productos) dentro de Tablas.",
    "Piensa en el archivero grande donde guardas fichas del mismo tipo."
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