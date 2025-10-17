import React, { useState } from 'react';
import './CausaHospitalizacion.css';

const AtencionMediaca = () => {
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
                    <h1>Atención Médica y Tratamientos</h1>
                </header>
            </div>

            <main className="graficas-grid">

                <section className="contenedor-grafica">
                    <h2>Distribucíon 2023 vs 2024</h2>
                    <img
                        className="imagen-grafica"
                        src="https://ik.imagekit.io/nhu6ngxhk/imagenes_estadistica/atencion%20medica.png"
                        alt=""
                        onClick={() =>
                            abrirModal(
                                'https://ik.imagekit.io/nhu6ngxhk/imagenes_estadistica/atencion%20medica.png',
                                ''
                            )
                        }
                    />
                </section>

                <section className="contenedor-grafica">
                    <h2>Distribucíon 2023 vs 2024 por departamento</h2>
                    <img
                        className="imagen-grafica"
                        src="https://ik.imagekit.io/nhu6ngxhk/imagenes_estadistica/distribucion%20por%20departamento.png"
                        alt=""
                        onClick={() =>
                            abrirModal(
                                'https://ik.imagekit.io/nhu6ngxhk/imagenes_estadistica/distribucion%20por%20departamento.png',
                                ''
                            )
                        }
                    />
                </section>

                <section className="contenedor-grafica">
                    <h2>Tratamientos 2024 por departamento</h2>
                    <img
                        className="imagen-grafica"
                        src="https://ik.imagekit.io/nhu6ngxhk/imagenes_estadistica/tratamientos%202024%20departamentos.png"
                        alt=""
                        onClick={() =>
                            abrirModal(
                                'https://ik.imagekit.io/nhu6ngxhk/imagenes_estadistica/tratamientos%202024%20departamentos.png',
                                ''
                            )
                        }
                    />
                </section>

                <section className="contenedor-grafica">
                    <h2>Top cambios en tratameintos 2023 vs 2024</h2>
                    <img
                        className="imagen-grafica"
                        src="https://ik.imagekit.io/nhu6ngxhk/imagenes_estadistica/cambio%20en%20tratameintos.png"
                        alt=""
                        onClick={() =>
                            abrirModal(
                                'https://ik.imagekit.io/nhu6ngxhk/imagenes_estadistica/cambio%20en%20tratameintos.png',
                                ''
                            )
                        }
                    />
                </section>
            </main>

            {/* === Sección de análisis estadístico === */}
            <section className="analisis-estadistico">
                <div className="analisis-card">
                    <h2>📊 TASA DE ATENCIÓN MÉDICA - GUATEMALA</h2>
                    <ul>
                        <li><strong>Consultas médicas:</strong> 350</li>
                        <li><strong>Consultas de cirugía:</strong> 50</li>
                        <li><strong>Consultas obstétricas:</strong> 25</li>
                    </ul>
                </div>

                <div className="analisis-card">
                    <h3>📈 CAMBIOS RECIENTES (2023 - 2024)</h3>
                    <ul>
                        <li><strong>Mayor aumento:</strong> Retalhuleu (+6.6%)</li>
                        <li><strong>Mayor disminución:</strong> Guatemala (-19.9%)</li>
                        <li><strong>Cambio promedio nacional:</strong> -0.5%</li>
                    </ul>

                </div>
                <div className="analisis-card">
                    <h3>🏆 DEPARTAMENTOS DESTACADOS</h3>
                    <ul>
                        <li><strong>Más consultas médicas:</strong> Guatemala</li>
                        <li><strong>Más cirugía:</strong> Guatemala</li>
                        <li><strong>Más obstetricia:</strong> Guatemala</li>
                    </ul>
                </div>
                <div className="analisis-card">
                    <h3>📋 RESUMEN NACIONAL</h3>
                    <ul>
                        <li><strong>Departamentos con aumento de atención:</strong> 14</li>
                        <li><strong>Departamentos con disminución:</strong> 5</li>
                        <li><strong>Departamentos sin cambios:</strong> 3</li>
                    </ul>
                </div>

            </section >

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

export default AtencionMediaca