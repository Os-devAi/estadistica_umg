import React, { useState } from 'react';
import './CausaHospitalizacion.css';

const Poblacion = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalImage, setModalImage] = useState('');
    const [modalCaption, setModalCaption] = useState('');

    const abrirModal = (src, alt) => {
        setModalImage(src);
        setModalCaption(alt);
        setModalOpen(true);
    };

    const cerrarModal = () => {
        setModalOpen(false);
    };

    return (
        <>
            <div className="causa-hospitalizacion">
                <header className="app-header">
                    <h1>Población</h1>
                </header>
            </div>

            <main className="graficas-grid">
                <section className="contenedor-grafica">
                    <h2>Distribucíon por departamentos 2024</h2>
                    <img
                        className="imagen-grafica"
                        src="https://ik.imagekit.io/nhu6ngxhk/imagenes_estadistica/distribucion%20de%20poblacion.png"
                        alt=""
                        onClick={() =>
                            abrirModal(
                                'https://ik.imagekit.io/nhu6ngxhk/imagenes_estadistica/distribucion%20de%20poblacion.png',
                                ''
                            )
                        }
                    />
                </section>

                <section className="contenedor-grafica">
                    <h2>Distribucíon por departamentos 2024</h2>
                    <img
                        className="imagen-grafica"
                        src="https://ik.imagekit.io/nhu6ngxhk/imagenes_estadistica/distribucion%20acumulativa.png"
                        alt=""
                        onClick={() =>
                            abrirModal(
                                'https://ik.imagekit.io/nhu6ngxhk/imagenes_estadistica/distribucion%20acumulativa.png',
                                ''
                            )
                        }
                    />
                </section>

                <section className="contenedor-grafica">
                    <h2>Distribucíon diagrama de caja y bigotes</h2>
                    <img
                        className="imagen-grafica"
                        src="https://ik.imagekit.io/nhu6ngxhk/imagenes_estadistica/diagrama%20bigotes.png"
                        alt=""
                        onClick={() =>
                            abrirModal(
                                'https://ik.imagekit.io/nhu6ngxhk/imagenes_estadistica/diagrama%20bigotes.png',
                                ''
                            )
                        }
                    />
                </section>

                <section className="contenedor-grafica">
                    <h2>Resumen</h2>
                    <img
                        className="imagen-grafica"
                        src="https://ik.imagekit.io/nhu6ngxhk/imagenes_estadistica/resumen.png"
                        alt=""
                        onClick={() =>
                            abrirModal(
                                'https://ik.imagekit.io/nhu6ngxhk/imagenes_estadistica/resumen.png',
                                ''
                            )
                        }
                    />
                </section>
            </main>

            <section className="analisis-estadistico">

                <div className="analisis-card">
                    <h2>📊 ANÁLISIS ESTADÍSTICO - POBLACIÓN POR DEPARTAMENTOS GUATEMALA 2024</h2>
                    <ul>
                        <li><strong>Total población nacional:</strong> 19,692,924</li>
                        <li><strong>Número de departamentos:</strong> 22</li>
                        <li><strong>Promedio de población por departamento:</strong> 895,133</li>
                    </ul>
                </div>

                <div className="analisis-card">
                    <h3>📈 ESTADÍSTICAS DESCRIPTIVAS</h3>
                    <ul>
                        <li><strong>Mediana:</strong> 535,794</li>
                        <li><strong>Desviación estándar:</strong> 1,117,501</li>
                        <li><strong>Rango:</strong> 196,917 - 5,629,725</li>
                        <li><strong>Coeficiente de variación:</strong> 124.8%</li>
                    </ul>
                </div>

                <div className="analisis-card">
                    <h3>🏆 DEPARTAMENTOS DESTACADOS</h3>
                    <ul>
                        <li><strong>Mayor población:</strong> Guatemala (5,629,725)</li>
                        <li><strong>Menor población:</strong> El Progreso (196,917)</li>
                        <li><strong>Departamentos con &gt;1,000,000 hab.:</strong> Guatemala, Huehuetenango, Alta Verapaz, San Marcos, Quiché, Quetzaltenango</li>
                    </ul>
                </div>

                <div className="analisis-card">
                    <h3>📋 ANÁLISIS DE DISTRIBUCIÓN</h3>
                    <ul>
                        <li><strong>Índice de Gini:</strong> 0.439</li>
                        <li><strong>Cuartil Q1 (25%):</strong> 424,670</li>
                        <li><strong>Cuartil Q3 (75%):</strong> 983,210</li>
                        <li><strong>Departamentos arriba del promedio:</strong> 6</li>
                        <li><strong>Departamentos abajo del promedio:</strong> 16</li>
                    </ul>
                </div>

                <div className="analisis-card">
                    <h3>🌎 DISTRIBUCIÓN POR DENSIDAD</h3>
                    <ul>
                        <li><strong>Alta densidad (&gt;1M):</strong> 6 departamentos</li>
                        <li><strong>Media densidad (500K–1M):</strong> 6 departamentos</li>
                        <li><strong>Baja densidad (&lt;500K):</strong> 10 departamentos</li>
                    </ul>
                </div>

                <div className="analisis-card">
                    <h3>📌 Tabla: Población estimada por departamento (2024)</h3>
                    <div className="table-wrap">
                        <table className="tabla-poblacion">
                            <thead>
                                <tr>
                                    <th>Departamento</th>
                                    <th>Población estimada 2024</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr><td>Guatemala</td><td>5,629,725</td></tr>
                                <tr><td>Huehuetenango</td><td>1,454,019</td></tr>
                                <tr><td>Alta Verapaz</td><td>1,407,025</td></tr>
                                <tr><td>San Marcos</td><td>1,222,951</td></tr>
                                <tr><td>Quiché</td><td>1,119,425</td></tr>
                                <tr><td>Quetzaltenango</td><td>1,036,385</td></tr>
                                <tr><td>Escuintla</td><td>823,684</td></tr>
                                <tr><td>Chimaltenango</td><td>771,887</td></tr>
                                <tr><td>Petén</td><td>640,918</td></tr>
                                <tr><td>Suchitepéquez</td><td>626,419</td></tr>
                                <tr><td>Jutiapa</td><td>563,684</td></tr>
                                <tr><td>Totonicapán</td><td>507,905</td></tr>
                                <tr><td>Sololá</td><td>487,906</td></tr>
                                <tr><td>Chiquimula</td><td>459,294</td></tr>
                                <tr><td>Izabal</td><td>458,107</td></tr>
                                <tr><td>Santa Rosa</td><td>456,928</td></tr>
                                <tr><td>Jalapa</td><td>413,918</td></tr>
                                <tr><td>Sacatepéquez</td><td>408,476</td></tr>
                                <tr><td>Retalhuleu</td><td>386,783</td></tr>
                                <tr><td>Baja Verapaz</td><td>344,655</td></tr>
                                <tr><td>Zacapa</td><td>275,913</td></tr>
                                <tr><td>El Progreso</td><td>196,917</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>

            </section>


            {/* === Modal === */}
            {
                modalOpen && (
                    <div className="modal" onClick={cerrarModal}>
                        <div
                            className="modal-content"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <span className="close" onClick={cerrarModal}>
                                &times;
                            </span>
                            <img src={modalImage} alt={modalCaption} />
                            <p>{modalCaption}</p>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default Poblacion