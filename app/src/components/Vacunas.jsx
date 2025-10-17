import React, { useState } from 'react';
import './CausaHospitalizacion.css';

const Vacunas = () => {
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
                    <h1>Cobertura de Vacunación</h1>
                </header>
            </div>
            <main className="graficas-grid">
                <section className="contenedor-grafica">
                    <h2>Cobertura de vacunación por departamento</h2>
                    <img
                        className="imagen-grafica"
                        src="https://ik.imagekit.io/nhu6ngxhk/imagenes_estadistica/cobertura%20de%20vacunas%20nacional.png"
                        alt=""
                        onClick={() =>
                            abrirModal(
                                'https://ik.imagekit.io/nhu6ngxhk/imagenes_estadistica/cobertura%20de%20vacunas%20nacional.png',
                                ''
                            )
                        }
                    />
                </section>

                <section className="contenedor-grafica">
                    <h2>Relación entre población y vacunación</h2>
                    <img
                        className="imagen-grafica"
                        src="https://ik.imagekit.io/nhu6ngxhk/imagenes_estadistica/relacion%20entre%20poblacion%20y%20vacunas.png"
                        alt=""
                        onClick={() =>
                            abrirModal(
                                'https://ik.imagekit.io/nhu6ngxhk/imagenes_estadistica/relacion%20entre%20poblacion%20y%20vacunas.png',
                                ''
                            )
                        }
                    />
                </section>

                <section className="contenedor-grafica">
                    <h2>Top 10 departamentos con mayor población vacunada</h2>
                    <img
                        className="imagen-grafica"
                        src="https://ik.imagekit.io/nhu6ngxhk/imagenes_estadistica/top%2010%20poblacion%20vacunada.png"
                        alt=""
                        onClick={() =>
                            abrirModal(
                                'https://ik.imagekit.io/nhu6ngxhk/imagenes_estadistica/top%2010%20poblacion%20vacunada.png',
                                ''
                            )
                        }
                    />
                </section>

                <section className="contenedor-grafica">
                    <h2>Distribución de cobertura</h2>
                    <img
                        className="imagen-grafica"
                        src="https://ik.imagekit.io/nhu6ngxhk/imagenes_estadistica/distribucion%20vacunas.png"
                        alt=""
                        onClick={() =>
                            abrirModal(
                                'https://ik.imagekit.io/nhu6ngxhk/imagenes_estadistica/distribucion%20vacunas.png',
                                ''
                            )
                        }
                    />
                </section>

                <section className="contenedor-grafica">
                    <h2>Resumen</h2>
                    <img
                        className="imagen-grafica"
                        src="https://ik.imagekit.io/nhu6ngxhk/imagenes_estadistica/resumen%20vacunas.png"
                        alt=""
                        onClick={() =>
                            abrirModal(
                                'https://ik.imagekit.io/nhu6ngxhk/imagenes_estadistica/resumen%20vacunas.png',
                                ''
                            )
                        }
                    />
                </section>
            </main>

            <section className="analisis-estadistico">
                <div className="analisis-card">
                    <h2>📊 ANÁLISIS ESTADÍSTICO - POBLACIÓN Y COBERTURA DE VACUNACIÓN</h2>
                    <ul>
                        <li><strong>Total población analizada:</strong> 16,232,457</li>
                        <li><strong>Departamentos analizados:</strong> 19</li>
                        <li><strong>Población vacunada estimada:</strong> 10,621,014</li>
                        <li><strong>Población no vacunada estimada:</strong> 5,611,443</li>
                    </ul>
                </div>

                <div className="analisis-card">
                    <h3>🏥 COBERTURA DE VACUNACIÓN</h3>
                    <ul>
                        <li><strong>Cobertura promedio:</strong> 63.7%</li>
                        <li><strong>Cobertura máxima:</strong> 70% (Guatemala)</li>
                        <li><strong>Cobertura mínima:</strong> 57% (Totonicapán)</li>
                        <li><strong>Desviación estándar:</strong> 3.99</li>
                    </ul>
                </div>

                <div className="analisis-card">
                    <h3>📈 ANÁLISIS DE DISTRIBUCIÓN</h3>
                    <ul>
                        <li><strong>Departamentos con cobertura alta (≥68%):</strong> 4</li>
                        <li><strong>Departamentos con cobertura media (60–67%):</strong> 12</li>
                        <li><strong>Departamentos con cobertura baja (&lt;60%):</strong> 3</li>
                    </ul>
                </div>

                <div className="analisis-card">
                    <h3>🎯 DEPARTAMENTOS DESTACADOS</h3>
                    <ul>
                        <li><strong>Mayor población:</strong> Guatemala (3,015,081)</li>
                        <li><strong>Mayor cobertura:</strong> Guatemala (70%)</li>
                        <li><strong>Menor cobertura:</strong> Totonicapán (57%)</li>
                    </ul>
                </div>

                <div className="analisis-card">
                    <h3>📋 BRECHAS IMPORTANTES</h3>
                    <ul>
                        <li><strong>Población total no vacunada:</strong> 5,611,443</li>
                        <li><strong>Departamentos con &gt;100,000 no vacunados:</strong> 18</li>
                        <li><strong>Tasa de vacunación necesaria para meta 80%:</strong> 2,364,952 personas más</li>
                    </ul>
                </div>
            </section>

            {/* === Modal === */}
            {modalOpen && (
                <div className="modal" onClick={cerrarModal}>
                    <div
                        className="modal-content"
                        onClick={(e) => e.stopPropagation()} // evita cerrar si clic dentro
                    >
                        <span className="close" onClick={cerrarModal}>
                            &times;
                        </span>
                        <img src={modalImage} alt={modalCaption} />
                        <p>{modalCaption}</p>
                    </div>
                </div>
            )}
        </>
    )
}

export default Vacunas