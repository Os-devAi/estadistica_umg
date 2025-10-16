import React, { useEffect, useState, useMemo } from 'react';
import Papa from 'papaparse';
import { Bar, Line, Doughnut } from 'react-chartjs-2';
import {
  BarChart,
  Bar as RechartsBar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line as RechartsLine,
  PieChart,
  Pie,
  Cell,
  ScatterChart,
  Scatter,
  ReferenceLine
} from 'recharts';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip as ChartJSTooltip,
  Legend as ChartJSLegend,
  ArcElement
} from 'chart.js';
import './CSVAnalysis.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  ChartJSTooltip,
  ChartJSLegend,
  ArcElement
);

const ConsultasDashboard = () => {
  const [chartData, setChartData] = useState(null);
  const [processedData, setProcessedData] = useState([]);
  const [selectedYear, setSelectedYear] = useState('2024');
  const [topNDepartments, setTopNDepartments] = useState(10);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('barras');
  const [consulta, setConsulta] = useState('interna');
  const [csvUrl, setCSVUrl] = useState('https://ik.imagekit.io/nhu6ngxhk/archivos_estadistica/consulta_interna.csv?updatedAt=1760549406437');

  // Cargar datos cuando cambie la URL
  useEffect(() => {
    loadCSVFromURL();
  }, [csvUrl]); // Agregar csvUrl como dependencia

  const loadCSVFromURL = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(csvUrl);

      if (!response.ok) {
        throw new Error(`Error al cargar el archivo: ${response.status}`);
      }

      const csvText = await response.text();

      Papa.parse(csvText, {
        header: true,
        complete: (result) => {
          if (result.errors.length > 0) {
            setError(`Errores en el parsing: ${result.errors.map(e => e.message).join(', ')}`);
            return;
          }
          const processed = processCSVData(result.data);
          setProcessedData(processed);
          createChartData(processed);
          setLoading(false);
        },
        error: (error) => {
          setError(`Error parsing CSV: ${error.message}`);
          setLoading(false);
        }
      });

    } catch (err) {
      setError(`No se pudo cargar el archivo: ${err.message}`);
      setLoading(false);
    }
  };

  const processCSVData = (data) => {
    return data
      .filter(row =>
        row.departamento_recidencia &&
        !row.departamento_recidencia.includes('Todos los departamentos') &&
        !row.departamento_recidencia.includes('Extranjero') &&
        !row.departamento_recidencia.includes('Ignorado')
      )
      .map(row => ({
        departamento: row.departamento_recidencia,
        '2020': parseInt(row['2020'].replace(/,/g, '') || 0),
        '2021': parseInt(row['2021'].replace(/,/g, '') || 0),
        '2022': parseInt(row['2022'].replace(/,/g, '') || 0),
        '2023': parseInt(row['2023'].replace(/,/g, '') || 0),
        '2024': parseInt(row['2024'].replace(/,/g, '') || 0)
      }));
  };

  const createChartData = (data) => {
    const sortedData = [...data].sort((a, b) => b[selectedYear] - a[selectedYear]);
    const topData = sortedData.slice(0, topNDepartments);

    const labels = topData.map(row => row.departamento);

    setChartData({
      labels,
      datasets: [
        {
          label: `Consultas ${consulta} ${selectedYear}`,
          data: topData.map(row => row[selectedYear]),
          backgroundColor: consulta === 'interna' ? 'rgba(74, 107, 255, 0.6)' : 'rgba(255, 107, 107, 0.6)',
          borderColor: consulta === 'interna' ? 'rgba(74, 107, 255, 1)' : 'rgba(255, 107, 107, 1)',
          borderWidth: 2,
          borderRadius: 4,
        }
      ]
    });
  };

  // Datos para gráficas comparativas
  const comparisonData = useMemo(() => {
    return processedData
      .sort((a, b) => b['2024'] - a['2024'])
      .slice(0, 22)
      .map(dept => ({
        departamento: dept.departamento,
        '2020': dept['2020'],
        '2021': dept['2021'],
        '2022': dept['2022'],
        '2023': dept['2023'],
        '2024': dept['2024']
      }));
  }, [processedData]);

  // Datos para gráfica de líneas
  const lineChartData = useMemo(() => {
    const topDepts = processedData
      .sort((a, b) => b['2024'] - a['2024'])
      .slice(0, 5);

    return ['2020', '2021', '2022', '2023', '2024'].map(year => {
      const dataPoint = { year };
      topDepts.forEach(dept => {
        dataPoint[dept.departamento] = dept[year];
      });
      return dataPoint;
    });
  }, [processedData]);

  // Datos para gráfica de pastel
  const pieChartData = useMemo(() => {
    const total2024 = processedData.reduce((sum, dept) => sum + dept['2024'], 0);
    return processedData
      .sort((a, b) => b['2024'] - a['2024'])
      .slice(0, 8)
      .map(dept => ({
        name: dept.departamento,
        value: dept['2024'],
        percentage: ((dept['2024'] / total2024) * 100).toFixed(1)
      }));
  }, [processedData]);

  // Cálculo de medidas de tendencia central
  const medidasTendenciaCentral = useMemo(() => {
    if (processedData.length === 0) return null;

    const valores = processedData.map(dept => dept[selectedYear]).sort((a, b) => a - b);
    const n = valores.length;

    // Media
    const media = valores.reduce((a, b) => a + b, 0) / n;

    // Mediana
    const mediana = n % 2 === 0
      ? (valores[n / 2 - 1] + valores[n / 2]) / 2
      : valores[Math.floor(n / 2)];

    // Moda
    const frecuencia = {};
    let maxFreq = 0;
    let moda = [];

    valores.forEach(val => {
      frecuencia[val] = (frecuencia[val] || 0) + 1;
      if (frecuencia[val] > maxFreq) {
        maxFreq = frecuencia[val];
        moda = [val];
      } else if (frecuencia[val] === maxFreq) {
        moda.push(val);
      }
    });

    // Cuartiles
    const q1 = valores[Math.floor(n * 0.25)];
    const q3 = valores[Math.floor(n * 0.75)];

    // Rango intercuartílico
    const rangoIntercuartilico = q3 - q1;

    // Desviación estándar
    const varianza = valores.reduce((acc, val) => acc + Math.pow(val - media, 2), 0) / n;
    const desviacionEstandar = Math.sqrt(varianza);

    // Varianza
    const varianzaMuestral = valores.reduce((acc, val) => acc + Math.pow(val - media, 2), 0) / (n - 1);

    return {
      media: Math.round(media),
      mediana: Math.round(mediana),
      moda: moda.length > 3 ? 'Múltiples modas' : moda.map(m => Math.round(m)).join(', '),
      modaValores: moda,
      q1: Math.round(q1),
      q3: Math.round(q3),
      rangoIntercuartilico: Math.round(rangoIntercuartilico),
      desviacionEstandar: Math.round(desviacionEstandar),
      varianza: Math.round(varianza),
      varianzaMuestral: Math.round(varianzaMuestral),
      min: Math.min(...valores),
      max: Math.max(...valores),
      valores
    };
  }, [processedData, selectedYear]);

  // Datos para gráfica de distribución con medidas de tendencia central
  const distributionChartData = useMemo(() => {
    if (!medidasTendenciaCentral) return [];

    return medidasTendenciaCentral.valores.map((valor, index) => ({
      x: index + 1,
      y: valor,
      departamento: processedData.find(dept => dept[selectedYear] === valor)?.departamento || 'Desconocido'
    }));
  }, [medidasTendenciaCentral, processedData, selectedYear]);

  // Colores para las gráficas
  const COLORS = ['#4A6BFF', '#FF6B6B', '#4ECDC4', '#FFD166', '#6A0572', '#118AB2', '#06D6A0', '#EF476F'];

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 14,
            family: "'Inter', sans-serif"
          }
        }
      },
      title: {
        display: true,
        text: `Top ${topNDepartments} Departamentos - Consultas ${consulta} ${selectedYear}`,
        font: {
          size: 16,
          family: "'Inter', sans-serif",
          weight: 'bold'
        }
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        titleColor: '#333',
        bodyColor: '#666',
        borderColor: '#e2e8f0',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
      }
    },
    scales: {
      x: {
        ticks: {
          maxRotation: 45,
          minRotation: 45,
          font: {
            family: "'Inter', sans-serif"
          }
        },
        grid: {
          color: 'rgba(226, 232, 240, 0.5)'
        }
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Número de Consultas',
          font: {
            family: "'Inter', sans-serif",
            size: 12
          }
        },
        grid: {
          color: 'rgba(226, 232, 240, 0.5)'
        }
      }
    }
  };

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 14,
            family: "'Inter', sans-serif"
          }
        }
      },
      title: {
        display: true,
        text: `Evolución de Consultas ${consulta} (2020-2024) - Top 5 Departamentos`,
        font: {
          size: 16,
          family: "'Inter', sans-serif",
          weight: 'bold'
        }
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        titleColor: '#333',
        bodyColor: '#666',
        borderColor: '#e2e8f0',
        borderWidth: 1,
        cornerRadius: 8,
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Número de Consultas',
          font: {
            family: "'Inter', sans-serif",
            size: 12
          }
        },
        grid: {
          color: 'rgba(226, 232, 240, 0.5)'
        }
      },
      x: {
        grid: {
          color: 'rgba(226, 232, 240, 0.3)'
        },
        ticks: {
          font: {
            family: "'Inter', sans-serif"
          }
        }
      }
    }
  };

  useEffect(() => {
    if (processedData.length > 0) {
      createChartData(processedData);
    }
  }, [selectedYear, topNDepartments, processedData, consulta]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <h2>Cargando datos...</h2>
        <p>Cargando archivo CSV desde: {csvUrl}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Error al cargar los datos</h2>
        <p>{error}</p>
        <button onClick={loadCSVFromURL} className="retry-button">
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Análisis de Consultas por Departamento</h1>
        <p className="data-source">
          Visualizando: Consulta {consulta === 'interna' ? 'Interna' : 'Externa'}
        </p>
      </header>

      {/* Selector de tipo de consulta */}
      <div className="tabs-container">
        <button
          className={`tab-button ${consulta === 'interna' ? 'active' : ''}`}
          onClick={() => {
            setCSVUrl('https://ik.imagekit.io/nhu6ngxhk/archivos_estadistica/consulta_interna.csv?updatedAt=1760549406437');
            setConsulta('interna');
          }}
        >
          📈 Consulta Interna
        </button>
        <button
          className={`tab-button ${consulta === 'externa' ? 'active' : ''}`}
          onClick={() => {
            setCSVUrl('https://ik.imagekit.io/nhu6ngxhk/archivos_estadistica/consulta_externa.csv?updatedAt=1760629427472');
            setConsulta('externa');
          }}
        >
          📈 Consulta Externa
        </button>
      </div>

      <div className="controls-container">
        <div className="control-group">
          <label className="control-label">Año:</label>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="control-select"
          >
            <option value="2020">2020</option>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
          </select>
        </div>

        <div className="control-group">
          <label className="control-label">Top Departamentos:</label>
          <select
            value={topNDepartments}
            onChange={(e) => setTopNDepartments(Number(e.target.value))}
            className="control-select"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={22}>Todos</option>
          </select>
        </div>
      </div>

      <div className="tabs-container">
        <button
          className={`tab-button ${activeTab === 'barras' ? 'active' : ''}`}
          onClick={() => setActiveTab('barras')}
        >
          📈 Gráfica de Barras
        </button>
        <button
          className={`tab-button ${activeTab === 'comparativa' ? 'active' : ''}`}
          onClick={() => setActiveTab('comparativa')}
        >
          🔄 Comparativa por Años
        </button>
        <button
          className={`tab-button ${activeTab === 'lineas' ? 'active' : ''}`}
          onClick={() => setActiveTab('lineas')}
        >
          📊 Evolución Temporal
        </button>
        <button
          className={`tab-button ${activeTab === 'tendencia' ? 'active' : ''}`}
          onClick={() => setActiveTab('tendencia')}
        >
          📐 Medidas de Tendencia
        </button>
      </div>

      <div className="charts-container">
        {activeTab === 'barras' && (
          <div className="chart-section">
            <h2>Gráfica de Barras - Departamento vs Consultas {consulta}</h2>
            <div className="chart-wrapper">
              {chartData && <Bar data={chartData} options={barOptions} />}
            </div>
          </div>
        )}

        {activeTab === 'comparativa' && (
          <div className="chart-section">
            <h2>Comparativa por Años - Consultas {consulta}</h2>
            <div className="chart-wrapper">
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={comparisonData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis
                    dataKey="departamento"
                    angle={-45}
                    textAnchor="end"
                    height={80}
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px'
                    }}
                  />
                  <Legend />
                  <RechartsBar dataKey="2020" fill={COLORS[0]} name="2020" />
                  <RechartsBar dataKey="2021" fill={COLORS[1]} name="2021" />
                  <RechartsBar dataKey="2022" fill={COLORS[2]} name="2022" />
                  <RechartsBar dataKey="2023" fill={COLORS[3]} name="2023" />
                  <RechartsBar dataKey="2024" fill={COLORS[4]} name="2024" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {activeTab === 'lineas' && (
          <div className="chart-section">
            <h2>Evolución Temporal - Consultas {consulta}</h2>
            <div className="chart-wrapper">
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={lineChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="year" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px'
                    }}
                  />
                  <Legend />
                  <RechartsLine
                    type="monotone"
                    dataKey="Guatemala"
                    stroke={COLORS[0]}
                    strokeWidth={3}
                    dot={{ fill: COLORS[0], strokeWidth: 2, r: 4 }}
                  />
                  <RechartsLine
                    type="monotone"
                    dataKey="Retalhuleu"
                    stroke={COLORS[1]}
                    strokeWidth={3}
                    dot={{ fill: COLORS[1], strokeWidth: 2, r: 4 }}
                  />
                  <RechartsLine
                    type="monotone"
                    dataKey="Suchitepéquez"
                    stroke={COLORS[2]}
                    strokeWidth={3}
                    dot={{ fill: COLORS[2], strokeWidth: 2, r: 4 }}
                  />
                  <RechartsLine
                    type="monotone"
                    dataKey="Quetzaltenango"
                    stroke={COLORS[3]}
                    strokeWidth={3}
                    dot={{ fill: COLORS[3], strokeWidth: 2, r: 4 }}
                  />
                  <RechartsLine
                    type="monotone"
                    dataKey="San Marcos"
                    stroke={COLORS[4]}
                    strokeWidth={3}
                    dot={{ fill: COLORS[4], strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {activeTab === 'tendencia' && medidasTendenciaCentral && (
          <div className="chart-section">
            <h2>Medidas de Tendencia Central - Consultas {consulta} {selectedYear}</h2>

            {/* Gráfica de distribución con medidas */}
            <div className="chart-wrapper">
              <ResponsiveContainer width="100%" height={400}>
                <ScatterChart data={distributionChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis
                    dataKey="x"
                    name="Posición"
                    tick={{ fontSize: 12 }}
                    label={{ value: 'Departamentos (ordenados)', position: 'insideBottom', offset: -5 }}
                  />
                  <YAxis
                    tick={{ fontSize: 12 }}
                    label={{ value: 'Número de Consultas', angle: -90, position: 'insideLeft' }}
                  />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="custom-tooltip">
                            <p className="tooltip-label">{`Departamento: ${data.departamento}`}</p>
                            <p className="tooltip-value">{`Consultas: ${data.y.toLocaleString()}`}</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <ReferenceLine
                    y={medidasTendenciaCentral.media}
                    stroke="#4A6BFF"
                    strokeWidth={2}
                    label={{ value: `Media: ${medidasTendenciaCentral.media.toLocaleString()}`, position: 'right' }}
                  />
                  <ReferenceLine
                    y={medidasTendenciaCentral.mediana}
                    stroke="#FF6B6B"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    label={{ value: `Mediana: ${medidasTendenciaCentral.mediana.toLocaleString()}`, position: 'right' }}
                  />
                  <ReferenceLine
                    y={medidasTendenciaCentral.q1}
                    stroke="#4ECDC4"
                    strokeWidth={1}
                    strokeDasharray="3 3"
                  />
                  <ReferenceLine
                    y={medidasTendenciaCentral.q3}
                    stroke="#4ECDC4"
                    strokeWidth={1}
                    strokeDasharray="3 3"
                  />
                  <Scatter data={distributionChartData} fill="#8884d8" />
                </ScatterChart>
              </ResponsiveContainer>
            </div>

            {/* Tabla de medidas */}
            <div className="measures-container">
              <h3>Resumen de Medidas Estadísticas</h3>
              <div className="measures-grid">
                <div className="measure-card">
                  <div className="measure-icon">📊</div>
                  <div className="measure-value">{medidasTendenciaCentral.media.toLocaleString()}</div>
                  <div className="measure-label">Media Aritmética</div>
                  <div className="measure-description">Promedio de consultas por departamento</div>
                </div>

                <div className="measure-card">
                  <div className="measure-icon">⚖️</div>
                  <div className="measure-value">{medidasTendenciaCentral.mediana.toLocaleString()}</div>
                  <div className="measure-label">Mediana</div>
                  <div className="measure-description">Valor central de la distribución</div>
                </div>

                <div className="measure-card">
                  <div className="measure-icon">🔢</div>
                  <div className="measure-value">{medidasTendenciaCentral.moda}</div>
                  <div className="measure-label">Moda</div>
                  <div className="measure-description">Valor(es) más frecuente(s)</div>
                </div>

                <div className="measure-card">
                  <div className="measure-icon">📏</div>
                  <div className="measure-value">{medidasTendenciaCentral.desviacionEstandar.toLocaleString()}</div>
                  <div className="measure-label">Desviación Estándar</div>
                  <div className="measure-description">Dispersión de los datos</div>
                </div>

                <div className="measure-card">
                  <div className="measure-icon">📐</div>
                  <div className="measure-value">{medidasTendenciaCentral.varianza.toLocaleString()}</div>
                  <div className="measure-label">Varianza</div>
                  <div className="measure-description">Variabilidad de los datos</div>
                </div>

                <div className="measure-card">
                  <div className="measure-icon">📋</div>
                  <div className="measure-value">{medidasTendenciaCentral.rangoIntercuartilico.toLocaleString()}</div>
                  <div className="measure-label">Rango Intercuartílico</div>
                  <div className="measure-description">Q3 - Q1 (dispersión del 50% central)</div>
                </div>
              </div>

              {/* Información adicional */}
              <div className="additional-info">
                <h4>Información Adicional</h4>
                <div className="info-grid">
                  <div className="info-item">
                    <span className="info-label">Mínimo:</span>
                    <span className="info-value">{medidasTendenciaCentral.min.toLocaleString()}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Máximo:</span>
                    <span className="info-value">{medidasTendenciaCentral.max.toLocaleString()}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Primer Cuartil (Q1):</span>
                    <span className="info-value">{medidasTendenciaCentral.q1.toLocaleString()}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Tercer Cuartil (Q3):</span>
                    <span className="info-value">{medidasTendenciaCentral.q3.toLocaleString()}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Rango:</span>
                    <span className="info-value">{(medidasTendenciaCentral.max - medidasTendenciaCentral.min).toLocaleString()}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Número de Departamentos:</span>
                    <span className="info-value">{processedData.length}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="stats-container">
        <h3>Resumen Estadístico {selectedYear} - Consultas {consulta}</h3>
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-value">
              {processedData.reduce((sum, dept) => sum + dept[selectedYear], 0).toLocaleString()}
            </div>
            <div className="stat-label">Total Consultas</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">
              {Math.max(...processedData.map(dept => dept[selectedYear])).toLocaleString()}
            </div>
            <div className="stat-label">Máximo</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">
              {Math.round(processedData.reduce((sum, dept) => sum + dept[selectedYear], 0) / processedData.length).toLocaleString()}
            </div>
            <div className="stat-label">Promedio por Depto.</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultasDashboard;