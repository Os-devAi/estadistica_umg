import React, { useState } from 'react';
import './CausaHospitalizacion.css';

const PromedioDias = () => {
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
                    <h1>Promedio de días de hospitalizacion segun departamento</h1>
                </header>
            </div>

            <main className="graficas-grid">

                <section className="contenedor-grafica">
                    <h2>Distribución </h2>
                    <img
                        className="imagen-grafica"
                        src="https://ik.imagekit.io/nhu6ngxhk/imagenes_estadistica/distribucion.png?updatedAt=1760684784719"
                        alt=""
                        onClick={() =>
                            abrirModal(
                                'https://ik.imagekit.io/nhu6ngxhk/imagenes_estadistica/distribucion.png?updatedAt=1760684784719',
                                ''
                            )
                        }
                    />
                </section>

                <section className="contenedor-grafica">
                    <h2>Las 10 departamentos con mayor número de pacientes egresados</h2>
                    <img
                        className="imagen-grafica"
                        src="https://ik.imagekit.io/nhu6ngxhk/imagenes_estadistica/top%2010%20departamentos%20con%20mayor%20egresados.jpeg"
                        alt=""
                        onClick={() =>
                            abrirModal(
                                'https://ik.imagekit.io/nhu6ngxhk/imagenes_estadistica/top%2010%20departamentos%20con%20mayor%20egresados.jpeg',
                                ''
                            )
                        }
                    />
                </section>

                <section className="contenedor-grafica">
                    <h2>Las 5 departamentos con mayor y menor tiempo de estancia</h2>
                    <img
                        className="imagen-grafica"
                        src="https://ik.imagekit.io/nhu6ngxhk/imagenes_estadistica/top%20mas%20top%20menos.png"
                        alt=""
                        onClick={() =>
                            abrirModal(
                                'https://ik.imagekit.io/nhu6ngxhk/imagenes_estadistica/top%20mas%20top%20menos.png',
                                ''
                            )
                        }
                    />
                </section>

                <section className="contenedor-grafica">
                    <h2>Estadísticas</h2>
                    <img
                        className="imagen-grafica"
                        src="https://ik.imagekit.io/nhu6ngxhk/imagenes_estadistica/estadisticas%20de%20pacientes%20y%20estadias.png"
                        alt=""
                        onClick={() =>
                            abrirModal(
                                'https://ik.imagekit.io/nhu6ngxhk/imagenes_estadistica/estadisticas%20de%20pacientes%20y%20estadias.png',
                                ''
                            )
                        }
                    />
                </section>

                <section className="contenedor-grafica">
                    <h2>Promedio de días de estadia por departamento</h2>
                    <img
                        className="imagen-grafica"
                        src="https://ik.imagekit.io/nhu6ngxhk/imagenes_estadistica/promedio%20dias%20por%20departamento.jpeg"
                        alt=""
                        onClick={() =>
                            abrirModal(
                                'https://ik.imagekit.io/nhu6ngxhk/imagenes_estadistica/promedio%20dias%20por%20departamento.jpeg',
                                ''
                            )
                        }
                    />
                </section>

                <section className="contenedor-grafica">
                    <h2>Relación entre número de pacientes y días de estancia</h2>
                    <img
                        className="imagen-grafica"
                        src="https://ik.imagekit.io/nhu6ngxhk/imagenes_estadistica/relacion%20entre%20pacientes%20y%20dias.png?updatedAt=1760684662254"
                        alt=""
                        onClick={() =>
                            abrirModal(
                                'https://ik.imagekit.io/nhu6ngxhk/imagenes_estadistica/relacion%20entre%20pacientes%20y%20dias.png?updatedAt=1760684662254',
                                ''
                            )
                        }
                    />
                </section>

            </main>

            {/* === Sección de análisis estadístico === */}
            <section className="analisis-estadistico">
                <h2>📊 Análisis Estadístico Completo</h2>

                <div className="analisis-card">
                    <h3>1️⃣ ESTADÍSTICAS DE PACIENTES EGRESADOS:</h3>
                    <ul>
                        <li><strong>Total nacional:</strong> 346,825</li>
                        <li><strong>Media:</strong> 15,632</li>
                        <li><strong>Mediana:</strong> 7,319</li>
                        <li><strong>Desviación estándar:</strong> 30,384</li>
                        <li><strong>Rango:</strong> 2,430 - 147,953</li>
                    </ul>
                </div>

                <div className="analisis-card">
                    <h3>2️⃣ ESTADÍSTICAS DE DÍAS DE ESTANCIA:</h3>
                    <ul>
                        <li><strong>Media:</strong> 1.64 días</li>
                        <li><strong>Mediana:</strong> 1.62 días</li>
                        <li><strong>Desviación estándar:</strong> 0.26 días</li>
                        <li><strong>Rango:</strong> 1.19 - 2.27 días</li>
                    </ul>
                </div>

                <div className="analisis-card">
                    <h3>3️⃣ DEPARTAMENTOS DESTACADOS:</h3>
                    <ul>
                        <li><strong>Más pacientes:</strong> Guatemala</li>
                        <li><strong>Menos pacientes:</strong> Santa Rosa</li>
                        <li><strong>Mayor estancia:</strong> Alta Verapaz (2.27 días)</li>
                        <li><strong>Menor estancia:</strong> Suchitepéquez (1.19 días)</li>
                    </ul>
                </div>
            </section>

            {/* === Modal === */}
            {modalOpen && (
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
            )}
        </>
    );
}

export default PromedioDias