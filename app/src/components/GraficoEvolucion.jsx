import React, { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Definición de paletas de colores
const colors = {
  linePalette: ["#4e79a7", "#f28e2b", "#e15759", "#76b7b2", "#59a14f", "#edc949", "#af7aa1", "#ff9da7", "#9c755f", "#bab0ac"],
  barPalette: ["#a1c9f4", "#8cd17d", "#ff9d9a", "#d4a6c8", "#fcc685", "#70b8b8", "#b9cced", "#ad7fa8", "#6c8c49", "#fcd7b4"],
  stackPalette: ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"]
};

// --- RUTA DEL ARCHIVO CSV ---
const DATA_FILE_PATH = 'datos_para_react.csv';

// Columnas de años a analizar (para asegurar el orden)
const YEARS = ['2020', '2021', '2022', '2023', '2024'];

// Inyección directa del script de Tailwind para asegurar su carga ANTES que el renderizado de React.
if (typeof document !== 'undefined' && !document.getElementById('tailwind-script')) {
  const script = document.createElement('script');
  script.src = 'https://cdn.tailwindcss.com';
  script.id = 'tailwind-script';
  document.head.appendChild(script);
}

/**
 * Función de limpieza: Limpia comas y convierte a entero.
 * @param {string} value
 * @returns {number}
 */
const cleanValue = (value) => {
  if (typeof value !== 'string') return 0;
  const cleaned = value.replace(/[,"]|(\.\.\.)/g, '').trim();
  const num = parseInt(cleaned, 10);
  return isNaN(num) ? 0 : num;
};

/**
 * Función de parseo de CSV SIMPLE para el formato: Dept, Año, Valor.
 * @param {string} csvText
 * @returns {Array<Object>}
 */
const parseCSV = (csvText) => {
  const rawLines = csvText.trim().split('\n').filter(line => line.trim().length > 0);
  if (rawLines.length <= 1) return [];

  // Los encabezados son: departamento_recidencia,Año,Valor
  const headers = rawLines[0].split(',').map(h => h.trim());
  const data = [];

  // Iterar desde la segunda línea (datos)
  for (let i = 1; i < rawLines.length; i++) {
    const line = rawLines[i].trim();
    // Usar un split simple ya que no hay comas en los valores numéricos
    const values = line.split(',').map(v => v.trim());

    if (values.length === headers.length) {
      const row = {};
      headers.forEach((header, index) => {
        row[header] = values[index];
      });
      data.push(row);
    }
  }

  // Filtrar la fila de 'Ignorado' y 'Extranjero' si existen para la visualización
  return data.filter(row =>
    row.departamento_recidencia !== 'Ignorado' &&
    row.departamento_recidencia !== 'Extranjero' &&
    row.departamento_recidencia // Asegurarse de que el departamento no es null
  );
};

/**
 * Convierte los datos del Formato Largo (Dept, Año, Valor) al Formato Ancho (Año, Dept1, Dept2, ...)
 * necesario para Recharts.
 * @param {Array<Object>} rawData - Datos limpios y parseados (Formato Largo).
 * @returns {{ lineChartData: Array<Object>, barChartData: Array<Object>, departments: Array<string> }}
 */
const transformData = (rawData) => {
  // 1. Pivotear los datos: Long Format -> Wide Format
  const pivotedDataMap = {};
  const departmentsSet = new Set();

  rawData.forEach(row => {
    const dept = row.departamento_recidencia;
    const year = row.Año;
    const value = cleanValue(row.Valor); // Limpiar y convertir Valor a número

    if (dept && year) {
      departmentsSet.add(dept);

      if (!pivotedDataMap[year]) {
        pivotedDataMap[year] = { Año: year };
      }
      // Asignar el valor al año bajo la clave del departamento
      pivotedDataMap[year][dept] = value;
    }
  });

  const allDepartments = Array.from(departmentsSet);

  // 2. Generar lineChartData (Evolución Anual - Wide Format, años como filas)
  // Formato: [{ Año: '2020', Guatemala: 143253, ElProgreso: 2286, ... }, ...]
  const lineChartData = YEARS.map(year => {
    const yearData = pivotedDataMap[year] || { Año: year };
    // Asegurar que todos los departamentos estén presentes (con 0 si faltan)
    allDepartments.forEach(dept => {
      if (yearData[dept] === undefined) {
        yearData[dept] = 0;
      }
    });
    return yearData;
  });

  // 3. Generar barChartData (Distribución Agrupada - Wide Format, departamentos como filas)
  // Formato: [{ departamento: 'Guatemala', 2020: 143253, 2021: 107989, ... }, ...]
  const barChartData = allDepartments.map(dept => {
    const deptData = { departamento_recidencia: dept };
    YEARS.forEach(year => {
      const yearRow = pivotedDataMap[year];
      // Buscar el valor del departamento para ese año
      deptData[year] = yearRow && yearRow[dept] !== undefined ? yearRow[dept] : 0;
    });
    return deptData;
  });

  return { lineChartData, barChartData, departments: allDepartments };
};

// --- Componente de Gráfico de Líneas (Evolución Anual) ---
const EvolucionAnualChart = ({ data, departments }) => (
  <div className="bg-white p-6 rounded-xl shadow-xl h-[400px] lg:h-[500px] border border-gray-100">
    <h2 className="text-xl font-bold mb-4 text-gray-800">1. Evolución Anual por Departamento</h2>
    <ResponsiveContainer width="100%" height="90%">
      <LineChart
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
        <XAxis dataKey="Año" />
        <YAxis tickFormatter={(value) => new Intl.NumberFormat('es-GT').format(value)} />
        <Tooltip formatter={(value) => new Intl.NumberFormat('es-GT').format(value)} />
        <Legend wrapperStyle={{ paddingTop: 20 }} />
        {departments.map((dept, index) => (
          <Line
            key={dept}
            type="monotone"
            dataKey={dept}
            stroke={colors.linePalette[index % colors.linePalette.length]}
            dot={false}
            strokeWidth={2}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  </div>
);

// --- Componente de Gráfico de Barras (Distribución Geográfica) ---
const DistribucionAgrupadaChart = ({ data, departments }) => (
  <div className="bg-white p-6 rounded-xl shadow-xl h-[400px] lg:h-[500px] border border-gray-100">
    <h2 className="text-xl font-bold mb-4 text-gray-800">2. Distribución Geográfica Agrupada por Año</h2>
    <ResponsiveContainer width="100%" height="90%">
      <BarChart
        data={data}
        layout="vertical"
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
        <XAxis type="number" tickFormatter={(value) => new Intl.NumberFormat('es-GT').format(value)} />
        <YAxis dataKey="departamento_recidencia" type="category" width={120} />
        <Tooltip formatter={(value) => new Intl.NumberFormat('es-GT').format(value)} />
        <Legend wrapperStyle={{ paddingTop: 20 }} />
        {YEARS.map((year, index) => (
          <Bar
            key={year}
            dataKey={year}
            fill={colors.barPalette[index % colors.barPalette.length]}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  </div>
);

// --- Componente de Gráfico de Barras Apiladas ---
const DistribucionApiladaChart = ({ data, departments }) => (
  <div className="bg-white p-6 rounded-xl shadow-xl h-[400px] lg:h-[500px] border border-gray-100">
    <h2 className="text-xl font-bold mb-4 text-gray-800">3. Contribución Anual Total (Apilada)</h2>
    <ResponsiveContainer width="100%" height="90%">
      <BarChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
        <XAxis dataKey="Año" />
        <YAxis tickFormatter={(value) => new Intl.NumberFormat('es-GT').format(value)} />
        <Tooltip formatter={(value) => new Intl.NumberFormat('es-GT').format(value)} />
        <Legend wrapperStyle={{ paddingTop: 20 }} />
        {departments.map((dept, index) => (
          <Bar
            key={dept}
            dataKey={dept}
            stackId="a" // La clave para apilar las barras
            fill={colors.stackPalette[index % colors.stackPalette.length]}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  </div>
);

// --- Componente Principal de la Aplicación (Dashboard) ---
const App = () => {
  const [chartData, setChartData] = useState({
    lineChartData: [],
    barChartData: [],
    departments: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Carga asíncrona de datos
  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch(DATA_FILE_PATH);
        if (!response.ok) {
          throw new Error(`Error ${response.status}: El archivo '${DATA_FILE_PATH}' no se pudo cargar. Asegúrate de que está en la carpeta 'public'.`);
        }
        const csvText = await response.text();

        const rawData = parseCSV(csvText);

        if (rawData.length > 0) {
          const transformed = transformData(rawData);
          setChartData(transformed);
          setIsLoading(false);
        } else {
          setError('El archivo CSV está vacío o no contiene datos válidos para el procesamiento.');
          setIsLoading(false);
        }

      } catch (err) {
        console.error("Error loading or parsing data:", err);
        setError(`Error general durante la carga de datos: ${err.message}`);
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // --- Renderizado Condicional ---

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="text-xl font-medium text-gray-600 animate-pulse">Cargando dashboard...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-red-50 text-red-700 p-8 rounded-lg text-center">
        <p className="text-2xl font-extrabold mb-4">🚨 ¡Error Crítico de Datos! 🚨</p>
        <p className="text-lg font-mono mb-2">
          <span className="font-bold">Archivo esperado:</span> <span className="font-mono">{DATA_FILE_PATH}</span>
        </p>
        <p className="text-md max-w-lg">
          {error}
        </p>
        <p className="text-sm mt-4 text-gray-600">
          Asegúrese de que el archivo esté en la carpeta `public` y que la estructura de la columna sea exactamente: <span className="font-mono">departamento_recidencia,Año,Valor</span>
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8 font-sans">
      <header className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
          📊 Análisis de Datos Geográficos (2020-2024)
        </h1>
        <p className="text-gray-600">Visualización de evolución y distribución por departamento.</p>
      </header>

      <main className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* GRÁFICO 1: EVOLUCIÓN (Líneas) */}
        <div className="lg:col-span-2">
          <EvolucionAnualChart
            data={chartData.lineChartData}
            departments={chartData.departments}
          />
        </div>

        {/* GRÁFICO 2: DISTRIBUCIÓN (Barras Agrupadas) - Vertical */}
        <DistribucionAgrupadaChart
          data={chartData.barChartData}
          departments={chartData.departments}
        />

        {/* GRÁFICO 3: CONTRIBUCIÓN (Barras Apiladas) - Horizontal */}
        <DistribucionApiladaChart
          data={chartData.lineChartData}
          departments={chartData.departments}
        />
      </main>

      <footer className="mt-12 text-center text-sm text-gray-500 border-t pt-4">
        Dashboard interactivo creado con React, Recharts y Tailwind CSS.
      </footer>
    </div>
  );
};

export default App;
