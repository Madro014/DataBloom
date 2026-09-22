# 🌸 DataBloom · Tu talento florece

Plataforma educativa web, moderna e interactiva para aprender lógica de programación, Python, SQL y analítica de datos con pandas desde cero, directamente en el navegador.

![DataBloom Banner](https://img.shields.io/badge/DataBloom-Aprende%20desde%20cero-ff7597?style=for-the-badge&logoColor=white)
![React 19](https://img.shields.io/badge/React-19.1.1-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-7.1.7-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Python](https://img.shields.io/badge/Pyodide-WebAssembly-3776AB?style=for-the-badge&logo=python&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-sql.js-003B57?style=for-the-badge&logo=sqlite&logoColor=white)

---

## 📖 Acerca de DataBloom

**DataBloom** es una aplicación diseñada para brindar una experiencia de aprendizaje amable, progresiva y práctica. No requiere configurar servidores, crear cuentas ni instalar Python o bases de datos locales: todo el código se compila y ejecuta de manera segura en el propio navegador de la estudiante mediante tecnologías WebAssembly.

Cuenta con una interfaz amigable con paleta floral rosada, diseñada tanto para computadores como para dispositivos móviles.

---

## ✨ Características Principales

- **28 lecciones progresivas**:
  - 🌱 **Semilla de lógica** (6 lecciones): Algoritmos, variables, tipos, condiciones, bucles y funciones mediante quizzes conceptuales.
  - 🐍 **Jardín de Python** (8 lecciones): Variables, colecciones (listas, diccionarios), transformaciones y ejercicios prácticos evaluados en tiempo real.
  - 🔎 **Universo SQL** (8 lecciones): Consultas `SELECT`, filtros `WHERE`, ordenamiento, agregaciones (`GROUP BY`, `HAVING`) y combinaciones de tablas (`INNER JOIN`) sobre SQLite.
  - 🌸 **Florecer con datos** (6 lecciones): Manipulación de DataFrames, limpieza de datos, métricas descriptivas e interpretación con **pandas**.
- **Laboratorio interactivo integrado**:
  - Ejecución real en un **Web Worker** aislado para no congelar la interfaz.
  - Motor de Python y pandas potenciado por [Pyodide](https://pyodide.org/).
  - Motor de bases de datos relacionales potenciado por [sql.js](https://sql.js.org/) (SQLite en WebAssembly).
- **Gamificación y avance**:
  - +25 XP por cada lección completada por primera vez (hasta 700 XP).
  - 4 medallas coleccionables: *Mente lógica*, *Creadora Python*, *Exploradora SQL* y *Analista en flor*.
  - Desbloqueo secuencial que fomenta el aprendizaje ordenado.
- **Pistas y soluciones**:
  - Consejos guiados y soluciones explicadas para desbloquear dudas sin penalización.
- **Persistencia y portabilidad**:
  - Progreso almacenado automáticamente en `localStorage`.
  - Herramientas de **Exportar** e **Importar** progreso en formato JSON para continuar en otros dispositivos.
- **Diseño 100% responsivo**:
  - Adaptable a pantallas táctiles y móviles, optimizado para interacción táctil fluida.

---

## 🗂️ Estructura del Proyecto

```text
DataBloom/
├── .gitignore               # Exclusiones de control de versiones
├── DataBloom.md             # Especificación técnica y didáctica completa
├── index.html               # Punto de entrada HTML
├── package.json             # Dependencias y scripts
├── package-lock.json        # Árbol exacto de dependencias
├── README.md                # Documentación del repositorio
├── public/
│   └── runner.js            # Web Worker para Pyodide y sql.js
├── src/
│   ├── App.jsx              # Interfaz de usuario, editor interactivo y estado
│   ├── curriculum.js        # 28 lecciones, esquemas y base SQLite semilla
│   ├── main.jsx             # Punto de montaje de React 19
│   ├── progress.js          # Saneamiento, desbloqueo y cálculo de medallas
│   └── styles.css           # Sistema de diseño y estilos CSS responsivos
└── tests/
    └── progress.test.js     # Suite de pruebas unitarias automatizadas
```

---

## 🚀 Requisitos e Instalación

### Requisitos previos

- [Node.js](https://nodejs.org/) v22.12.0 o superior
- [npm](https://www.npmjs.com/) v10 o superior
- Conexión a internet para descargar dependencias y cargar los motores Pyodide / sql.js desde CDN.

### Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/Madro014/DataBloom.git
   cd DataBloom
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

---

## 💻 Scripts Disponibles

- **Iniciar entorno de desarrollo**:
  ```bash
  npm run dev
  ```
  Abre [http://localhost:5173/](http://localhost:5173/) en tu navegador.

- **Compartir en red local (para probar desde el celular)**:
  ```bash
  npm run dev -- --host 0.0.0.0
  ```

- **Ejecutar pruebas unitarias**:
  ```bash
  npm test
  ```

- **Compilar para producción**:
  ```bash
  npm run build
  ```
  Los archivos optimizados se generarán en la carpeta `dist/`.

- **Previsualizar la compilación de producción**:
  ```bash
  npm run preview
  ```

---

## 🧪 Pruebas Unitarias

El proyecto incluye pruebas con el ejecutor nativo de Node (`node:test` y `node:assert/strict`), asegurando:
1. Prevención de saltos arbitrarios de lecciones y duplicación de puntos.
2. Saneamiento estricto de datos corruptos o manipulados al restaurar copias de seguridad.
3. Asignación correcta de medallas solo tras culminar cada etapa.
4. Coherencia total de los contenidos y esquemas de las 28 lecciones del currículo.

Ejecuta:
```bash
npm test
```

---

## 🛠️ Tecnologías Utilizadas

- **Framework**: [React 19](https://react.dev/)
- **Empaquetador**: [Vite 7](https://vite.dev/)
- **Entorno Python**: [Pyodide](https://pyodide.org/) (WebAssembly)
- **Base de Datos**: [sql.js](https://sql.js.org/) / SQLite
- **Librería de Datos**: [pandas](https://pandas.pydata.org/)
- **Estilos**: CSS nativo con variables personalizables y diseño accesible

---

## 🌸 Créditos y Licencia

Desarrollado con dedicación para abrir caminos en la programación y la ciencia de datos.
Distribuido bajo licencia MIT.
