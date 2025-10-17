import React, { useState } from 'react';
import './CausaHospitalizacion.css';

const Hospitales = () => {
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
                    <h1>Hospitales / C. Salud</h1>
                </header>
            </div>


            <main className="graficas-grid">
                <section className="contenedor-grafica">
                    <h2>Distribución de Hospitales</h2>
                    <img
                        className="imagen-grafica"
                        src="https://ik.imagekit.io/nhu6ngxhk/imagenes_estadistica/distribucion%20hospitales.png"
                        alt=""
                        onClick={() =>
                            abrirModal(
                                'https://ik.imagekit.io/nhu6ngxhk/imagenes_estadistica/distribucion%20hospitales.png',
                                ''
                            )
                        }
                    />
                </section>

                <section className="contenedor-grafica">
                    <h2>Diagrama de caja y bigotes</h2>
                    <img
                        className="imagen-grafica"
                        src="https://ik.imagekit.io/nhu6ngxhk/imagenes_estadistica/caja%20y%20bigotes%20hospitales.png"
                        alt=""
                        onClick={() =>
                            abrirModal(
                                'https://ik.imagekit.io/nhu6ngxhk/imagenes_estadistica/caja%20y%20bigotes%20hospitales.png',
                                ''
                            )
                        }
                    />
                </section>

                <section className="contenedor-grafica">
                    <h2>Resumen Estadísticas</h2>
                    <img
                        className="imagen-grafica"
                        src="https://ik.imagekit.io/nhu6ngxhk/imagenes_estadistica/resumen%20esta%20hospitales.png"
                        alt=""
                        onClick={() =>
                            abrirModal(
                                'https://ik.imagekit.io/nhu6ngxhk/imagenes_estadistica/resumen%20esta%20hospitales.png',
                                ''
                            )
                        }
                    />
                </section>

                

            </main>

            <section className="analisis-estadistico">

                <div className="analisis-card">
                    <h2>🏥 INFORMACIÓN GENERAL - HOSPITALES NACIONALES</h2>
                    <ul>
                        <li><strong>Total de hospitales nacionales:</strong> 48</li>
                        <li><strong>Número de departamentos cubiertos:</strong> 21</li>
                        <li><strong>Promedio de hospitales por departamento:</strong> 2.43</li>
                    </ul>
                </div>

                <div className="analisis-card">
                    <h3>📊 ESTADÍSTICAS DESCRIPTIVAS</h3>
                    <ul>
                        <li><strong>Mediana:</strong> 2.0</li>
                        <li><strong>Moda:</strong> 2</li>
                        <li><strong>Desviación estándar:</strong> 1.12</li>
                        <li><strong>Rango:</strong> 2 - 7</li>
                        <li><strong>Coeficiente de variación:</strong> 46.17%</li>
                    </ul>
                </div>

                <div className="analisis-card">
                    <h3>📈 ANÁLISIS DE DISTRIBUCIÓN</h3>
                    <ul>
                        <li><strong>Cuartil Q1 (25%):</strong> 2.0</li>
                        <li><strong>Cuartil Q3 (75%):</strong> 2.0</li>
                        <li><strong>Índice de Gini:</strong> 0.098</li>
                    </ul>
                </div>

                <div className="analisis-card">
                    <h3>🏆 DEPARTAMENTOS DESTACADOS</h3>
                    <ul>
                        <li><strong>Mayor número de hospitales:</strong> Guatemala (7)</li>
                        <li><strong>Departamentos con 3+ hospitales:</strong> Guatemala, Alta Verapaz, Huehuetenango, Quetzaltenango, San Marcos</li>
                    </ul>
                </div>

                <div className="analisis-card">
                    <h3>📋 DISTRIBUCIÓN POR CATEGORÍAS</h3>
                    <ul>
                        <li><strong>Alta densidad (3+ hospitales):</strong> 5 departamentos</li>
                        <li><strong>Media densidad (2 hospitales):</strong> 16 departamentos</li>
                        <li><strong>Departamentos arriba del promedio:</strong> 5</li>
                        <li><strong>Departamentos en/bajo el promedio:</strong> 16</li>
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

export default Hospitales