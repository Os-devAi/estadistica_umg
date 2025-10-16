// App.js
import React, { useState, useMemo, useEffect } from 'react';
import './CausaHospitalizacion.css';
import Papa from 'papaparse';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    PieChart, Pie, Cell, LineChart, Line
} from 'recharts';

const CSV_URL = 'https://ik.imagekit.io/nhu6ngxhk/archivos_estadistica/interna_causa_atencion_sexo_edades.csv?updatedAt=1760649619603';

// Colores para las gráficas
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

function CausaHospitalizacion() {
    const [selectedAgeGroup, setSelectedAgeGroup] = useState('Todas las edades');
    const [selectedCause, setSelectedCause] = useState('Todas las causas');
    const [rawData, setRawData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Cargar datos desde la URL
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);

                console.log('Iniciando carga de datos desde:', CSV_URL);

                const response = await fetch(CSV_URL);
                if (!response.ok) {
                    throw new Error(`Error HTTP: ${response.status}`);
                }

                const csvText = await response.text();
                console.log('Texto CSV recibido');

                // Parsear manualmente para debug
                const lines = csvText.split('\n');
                console.log('Primeras líneas:', lines.slice(0, 5));

                Papa.parse(csvText, {
                    header: true,
                    skipEmptyLines: true,
                    complete: (results) => {
                        console.log('Datos parseados:', results.data.length);
                        console.log('Columnas:', results.meta.fields);

                        if (results.data.length > 0) {
                            setRawData(results.data);
                        } else {
                            throw new Error('CSV vacío o no se pudieron parsear datos');
                        }
                        setLoading(false);
                    },
                    error: (error) => {
                        console.error('Error en parseo:', error);
                        throw new Error('Error parseando CSV');
                    }
                });
            } catch (err) {
                console.error('Error:', err);
                setError(err.message);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Función para limpiar números
    const cleanNumber = (str) => {
        if (!str || str === '-' || str === ' -' || str.trim() === '') return 0;

        // Limpiar el string
        const cleanStr = String(str).replace(/[,\s]/g, '').trim();
        const num = parseInt(cleanStr);

        return isNaN(num) ? 0 : num;
    };

    // Procesar datos
    const processedData = useMemo(() => {
        if (!rawData || rawData.length === 0) return [];

        return rawData
            .filter(row => row.grupos_de_edad && row.causa_de_atencion)
            .map(row => ({
                grupos_de_edad: (row.grupos_de_edad || '').trim(),
                causa_de_atencion: (row.causa_de_atencion || '').trim(),
                Total: cleanNumber(row.Total),
                Hombres: cleanNumber(row.Hombres),
                Mujeres: cleanNumber(row.Mujeres),
                Ignorado: cleanNumber(row.Ignorado)
            }))
            .filter(row => row.Total > 0); // Solo filas con datos válidos
    }, [rawData]);

    // Filtrar datos según selección
    const filteredData = useMemo(() => {
        return processedData.filter(row =>
            (selectedAgeGroup === 'Todas las edades' || row.grupos_de_edad === selectedAgeGroup) &&
            (selectedCause === 'Todas las causas' || row.causa_de_atencion === selectedCause)
        );
    }, [processedData, selectedAgeGroup, selectedCause]);

    // Obtener grupos de edad únicos
    const ageGroups = useMemo(() => {
        const groups = [...new Set(processedData.map(row => row.grupos_de_edad))];
        return groups.sort((a, b) => {
            if (a === 'Todas las edades') return -1;
            if (b === 'Todas las edades') return 1;
            if (a === 'Ignorado') return 1;
            if (b === 'Ignorado') return -1;
            return a.localeCompare(b, undefined, { numeric: true });
        });
    }, [processedData]);

    // Obtener causas únicas
    const causes = useMemo(() => {
        const uniqueCauses = [...new Set(processedData.map(row => row.causa_de_atencion))];
        return uniqueCauses.sort((a, b) => {
            if (a === 'Todas las causas') return -1;
            if (b === 'Todas las causas') return 1;
            return a.localeCompare(b);
        });
    }, [processedData]);

    // DATOS PARA GRÁFICAS

    // 1. Distribución por grupos de edad (Top 10)
    const ageGroupDistribution = useMemo(() => {
        const distribution = {};
        processedData.forEach(row => {
            if (row.grupos_de_edad !== 'Todas las edades') {
                distribution[row.grupos_de_edad] = (distribution[row.grupos_de_edad] || 0) + row.Total;
            }
        });

        return Object.entries(distribution)
            .map(([name, value]) => ({ name, value }))
            .sort((a, b) => b.value - a.value)
            .slice(0, 10);
    }, [processedData]);

    // 2. Top 10 causas más comunes
    const topCauses = useMemo(() => {
        const causeTotals = {};
        processedData.forEach(row => {
            if (row.causa_de_atencion !== 'Todas las causas') {
                causeTotals[row.causa_de_atencion] = (causeTotals[row.causa_de_atencion] || 0) + row.Total;
            }
        });

        return Object.entries(causeTotals)
            .map(([name, value]) => ({ name, value }))
            .sort((a, b) => b.value - a.value)
            .slice(0, 10);
    }, [processedData]);

    // 3. Distribución por género para datos filtrados
    const genderData = useMemo(() => {
        const totalHombres = filteredData.reduce((sum, row) => sum + row.Hombres, 0);
        const totalMujeres = filteredData.reduce((sum, row) => sum + row.Mujeres, 0);
        const totalIgnorado = filteredData.reduce((sum, row) => sum + row.Ignorado, 0);

        return [
            { name: 'Hombres', value: totalHombres },
            { name: 'Mujeres', value: totalMujeres },
            { name: 'Ignorado', value: totalIgnorado }
        ].filter(item => item.value > 0);
    }, [filteredData]);

    // 4. Evolución por grupos de edad para una causa específica
    const ageTrendData = useMemo(() => {
        if (selectedCause === 'Todas las causas') return [];

        const ageOrder = [
            '0 - 4 años', '5 - 9 años', '10 - 14 años', '15 - 19 años',
            '20 - 24 años', '25 - 29 años', '30 - 34 años', '35 - 39 años',
            '40 - 44 años', '45 - 49 años', '50 - 54 años', '55 - 59 años',
            '60 - 64 años', '65 - 69 años', '70 - 74 años', '75 - 79 años', '80 y más'
        ];

        const trend = {};
        processedData.forEach(row => {
            if (row.causa_de_atencion === selectedCause && ageOrder.includes(row.grupos_de_edad)) {
                trend[row.grupos_de_edad] = (trend[row.grupos_de_edad] || 0) + row.Total;
            }
        });

        return ageOrder
            .filter(age => trend[age])
            .map(age => ({
                name: age,
                atenciones: trend[age]
            }));
    }, [processedData, selectedCause]);

    // 5. Distribución de causas por grupo de edad seleccionado
    const causesByAgeGroup = useMemo(() => {
        if (selectedAgeGroup === 'Todas las edades') return [];

        return processedData
            .filter(row => row.grupos_de_edad === selectedAgeGroup && row.causa_de_atencion !== 'Todas las causas')
            .sort((a, b) => b.Total - a.Total)
            .slice(0, 10)
            .map(row => ({
                name: row.causa_de_atencion.length > 30
                    ? row.causa_de_atencion.substring(0, 30) + '...'
                    : row.causa_de_atencion,
                atenciones: row.Total
            }));
    }, [processedData, selectedAgeGroup]);

    // Cálculos estadísticos (igual que antes)
    const stats = useMemo(() => {
        const totals = filteredData.map(row => row.Total).filter(val => val > 0);
        if (totals.length === 0) return null;

        const sortedTotals = [...totals].sort((a, b) => a - b);
        const n = sortedTotals.length;

        const mean = totals.reduce((sum, val) => sum + val, 0) / n;
        const median = n % 2 === 0
            ? (sortedTotals[n / 2 - 1] + sortedTotals[n / 2]) / 2
            : sortedTotals[Math.floor(n / 2)];

        const frequency = {};
        let maxFreq = 0;
        let mode = [];
        totals.forEach(val => {
            frequency[val] = (frequency[val] || 0) + 1;
            if (frequency[val] > maxFreq) {
                maxFreq = frequency[val];
                mode = [val];
            } else if (frequency[val] === maxFreq) {
                mode.push(val);
            }
        });

        const q1Index = Math.floor(n * 0.25);
        const q3Index = Math.floor(n * 0.75);
        const q1 = sortedTotals[q1Index] || 0;
        const q3 = sortedTotals[q3Index] || 0;

        const range = Math.max(...totals) - Math.min(...totals);
        const variance = totals.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / n;
        const stdDev = Math.sqrt(variance);

        return {
            count: n,
            mean: Math.round(mean * 100) / 100,
            median: Math.round(median * 100) / 100,
            mode: [...new Set(mode)].map(val => Math.round(val * 100) / 100),
            range: Math.round(range * 100) / 100,
            variance: Math.round(variance * 100) / 100,
            stdDev: Math.round(stdDev * 100) / 100,
            q1: Math.round(q1 * 100) / 100,
            q2: Math.round(median * 100) / 100,
            q3: Math.round(q3 * 100) / 100,
            min: Math.min(...totals),
            max: Math.max(...totals)
        };
    }, [filteredData]);

    // Distribución por género
    const genderDistribution = useMemo(() => {
        const totalHombres = filteredData.reduce((sum, row) => sum + row.Hombres, 0);
        const totalMujeres = filteredData.reduce((sum, row) => sum + row.Mujeres, 0);
        const totalIgnorado = filteredData.reduce((sum, row) => sum + row.Ignorado, 0);
        const totalGeneral = totalHombres + totalMujeres + totalIgnorado;

        return {
            hombres: totalHombres,
            mujeres: totalMujeres,
            ignorado: totalIgnorado,
            total: totalGeneral,
            porcentajeHombres: totalGeneral > 0 ? (totalHombres / totalGeneral * 100) : 0,
            porcentajeMujeres: totalGeneral > 0 ? (totalMujeres / totalGeneral * 100) : 0,
            porcentajeIgnorado: totalGeneral > 0 ? (totalIgnorado / totalGeneral * 100) : 0
        };
    }, [filteredData]);

    if (loading) {
        return (
            <div className="causa-hospitalizacion">
                <div className="loading">
                    <div className="spinner"></div>
                    <h2>Cargando datos...</h2>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="causa-hospitalizacion">
                <div className="error">
                    <h2>Error al cargar los datos</h2>
                    <p>{error}</p>
                    <button onClick={() => window.location.reload()}>Reintentar</button>
                </div>
            </div>
        );
    }

    return (
        <div className="causa-hospitalizacion">
            <header className="app-header">
                <h1>Análisis Estadístico de Causas de Atención Médica</h1>
                <p>Visualización interactiva de datos hospitalarios</p>
            </header>

            <div className="controls">
                <div className="filter-group">
                    <label>Grupo de Edad:</label>
                    <select value={selectedAgeGroup} onChange={(e) => setSelectedAgeGroup(e.target.value)}>
                        {ageGroups.map(group => (
                            <option key={group} value={group}>{group}</option>
                        ))}
                    </select>
                </div>

                <div className="filter-group">
                    <label>Causa de Atención:</label>
                    <select value={selectedCause} onChange={(e) => setSelectedCause(e.target.value)}>
                        {causes.map(cause => (
                            <option key={cause} value={cause}>{cause}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* SECCIÓN DE GRÁFICAS */}
            <div className="charts-section">
                <h2>Visualizaciones de Datos</h2>

                <div className="charts-grid">
                    {/* Gráfica 1: Distribución por Grupos de Edad */}
                    <div className="chart-card">
                        <h3>Top 10 Grupos de Edad con Más Atenciones</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={ageGroupDistribution}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                                <YAxis />
                                <Tooltip formatter={(value) => [value.toLocaleString(), 'Atenciones']} />
                                <Legend />
                                <Bar dataKey="value" name="Atenciones" fill="#8884d8" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Gráfica 2: Top 10 Causas */}
                    <div className="chart-card">
                        <h3>Top 10 Causas de Atención Más Comunes</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={topCauses} layout="vertical">
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis type="number" />
                                <YAxis type="category" dataKey="name" width={150} />
                                <Tooltip formatter={(value) => [value.toLocaleString(), 'Atenciones']} />
                                <Legend />
                                <Bar dataKey="value" name="Atenciones" fill="#82ca9d" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Gráfica 3: Distribución por Género */}
                    <div className="chart-card">
                        <h3>Distribución por Género (Datos Filtrados)</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={genderData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(1)}%)`}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {genderData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip formatter={(value) => [value.toLocaleString(), 'Atenciones']} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Gráfica 4: Evolución por Edad para Causa Seleccionada */}
                    {ageTrendData.length > 0 && (
                        <div className="chart-card">
                            <h3>Evolución por Edad: {selectedCause}</h3>
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={ageTrendData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                                    <YAxis />
                                    <Tooltip formatter={(value) => [value.toLocaleString(), 'Atenciones']} />
                                    <Legend />
                                    <Line type="monotone" dataKey="atenciones" stroke="#ff8042" activeDot={{ r: 8 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    )}

                    {/* Gráfica 5: Top Causas por Grupo de Edad Seleccionado */}
                    {causesByAgeGroup.length > 0 && (
                        <div className="chart-card">
                            <h3>Top 10 Causas para {selectedAgeGroup}</h3>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={causesByAgeGroup}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                                    <YAxis />
                                    <Tooltip formatter={(value) => [value.toLocaleString(), 'Atenciones']} />
                                    <Legend />
                                    <Bar dataKey="atenciones" name="Atenciones" fill="#0088FE" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    )}
                </div>
            </div>

            {/* SECCIÓN DE ESTADÍSTICAS (igual que antes) */}
            <div className="stats-container">
                <div className="data-info">
                    <p><strong>Total de registros:</strong> {processedData.length}</p>
                    <p><strong>Registros filtrados:</strong> {filteredData.length}</p>
                    <p><strong>Total atenciones:</strong> {genderDistribution.total.toLocaleString()}</p>
                </div>

                {stats && (
                    <>
                        <div className="stats-section">
                            <h3>Medidas de Tendencia Central</h3>
                            <div className="stats-grid">
                                <div className="stat-card">
                                    <h4>Media</h4>
                                    <div className="stat-value">{stats.mean.toLocaleString()}</div>
                                    <p>Promedio de atenciones</p>
                                </div>
                                <div className="stat-card">
                                    <h4>Mediana</h4>
                                    <div className="stat-value">{stats.median.toLocaleString()}</div>
                                    <p>Valor central ordenado</p>
                                </div>
                                <div className="stat-card">
                                    <h4>Moda</h4>
                                    <div className="stat-value">
                                        {stats.mode.slice(0, 3).map(m => m.toLocaleString()).join(', ')}
                                        {stats.mode.length > 3 && '...'}
                                    </div>
                                    <p>Valor(es) más frecuente(s)</p>
                                </div>
                            </div>
                        </div>

                        <div className="stats-section">
                            <h3>Medidas de Dispersión</h3>
                            <div className="stats-grid">
                                <div className="stat-card">
                                    <h4>Rango</h4>
                                    <div className="stat-value">{stats.range.toLocaleString()}</div>
                                </div>
                                <div className="stat-card">
                                    <h4>Desviación Estándar</h4>
                                    <div className="stat-value">{stats.stdDev.toLocaleString()}</div>
                                </div>
                                <div className="stat-card">
                                    <h4>Varianza</h4>
                                    <div className="stat-value">{stats.variance.toLocaleString()}</div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default CausaHospitalizacion;