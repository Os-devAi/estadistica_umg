import React, { useState } from 'react';
import './CausaHospitalizacion.css';

function CausaHospitalizacion() {
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
        <div className="causa-hospitalizacion">
            <header className="app-header">
                <h1>Análisis Estadístico de Causas de Atención Médica</h1>
                <p className="subtitulo">
                    Visualización de datos de hospitalización y atención médica
                </p>
            </header>

            <main className="graficas-grid">
                <section className="contenedor-grafica">
                    <h2>Las 10 causas más comunes de consulta interna</h2>
                    <img
                        className="imagen-grafica"
                        src="https://ik.imagekit.io/nhu6ngxhk/imagenes_estadistica/top_causas_de_atencion.jpeg"
                        alt="Causas más comunes de consulta interna"
                        onClick={() =>
                            abrirModal(
                                'https://ik.imagekit.io/nhu6ngxhk/imagenes_estadistica/top_causas_de_atencion.jpeg',
                                'Causas más comunes de consulta interna'
                            )
                        }
                    />
                </section>

                <section className="contenedor-grafica">
                    <h2>Distribución de atenciones médicas por edad</h2>
                    <img
                        className="imagen-grafica"
                        src="https://ik.imagekit.io/nhu6ngxhk/imagenes_estadistica/distribucion%20por%20grupos%20de%20edad.jpeg"
                        alt="Distribución de atenciones por edad"
                        onClick={() =>
                            abrirModal(
                                'https://ik.imagekit.io/nhu6ngxhk/imagenes_estadistica/distribucion%20por%20grupos%20de%20edad.jpeg',
                                'Distribución de atenciones por edad'
                            )
                        }
                    />
                </section>

                <section className="contenedor-grafica">
                    <h2>Comparación de atención entre hombres y mujeres según rangos de edad</h2>
                    <img
                        className="imagen-grafica"
                        src="https://ik.imagekit.io/nhu6ngxhk/imagenes_estadistica/comparativa%20de%20atencion%20hombre%20mujeres%20por%20edad.jpeg"
                        alt="Comparación hombres vs mujeres"
                        onClick={() =>
                            abrirModal(
                                'https://ik.imagekit.io/nhu6ngxhk/imagenes_estadistica/comparativa%20de%20atencion%20hombre%20mujeres%20por%20edad.jpeg',
                                'Comparación hombres vs mujeres'
                            )
                        }
                    />
                </section>

                <section className="contenedor-grafica">
                    <h2>Distribución de enfermedades renales por grupo de edad</h2>
                    <img
                        className="imagen-grafica"
                        src="https://ik.imagekit.io/nhu6ngxhk/imagenes_estadistica/evolucion%20de%20enfermedades%20renales.jpeg"
                        alt="Comparación hombres vs mujeres"
                        onClick={() =>
                            abrirModal(
                                'https://ik.imagekit.io/nhu6ngxhk/imagenes_estadistica/evolucion%20de%20enfermedades%20renales.jpeg',
                                ''
                            )
                        }
                    />
                </section>

                <section className="contenedor-grafica">
                    <h2>Distribución de enfermedades crónicas por genero</h2>
                    <img
                        className="imagen-grafica"
                        src="https://ik.imagekit.io/nhu6ngxhk/imagenes_estadistica/distribucion%20por%20genero%20enfermedades%20cronicas.jpeg"
                        alt="Comparación hombres vs mujeres"
                        onClick={() =>
                            abrirModal(
                                'https://ik.imagekit.io/nhu6ngxhk/imagenes_estadistica/distribucion%20por%20genero%20enfermedades%20cronicas.jpeg',
                                ''
                            )
                        }
                    />
                </section>

                <section className="contenedor-grafica">
                    <h2>5 Principales causas de atención</h2>
                    <img
                        className="imagen-grafica"
                        src="https://ik.imagekit.io/nhu6ngxhk/imagenes_estadistica/5%20principales%20causas%20de%20atencion.jpeg"
                        alt="Comparación hombres vs mujeres"
                        onClick={() =>
                            abrirModal(
                                'https://ik.imagekit.io/nhu6ngxhk/imagenes_estadistica/5%20principales%20causas%20de%20atencion.jpeg',
                                ''
                            )
                        }
                    />
                </section>
            </main>

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

            {/* === Sección de análisis estadístico === */}
            <section className="analisis-estadistico">
                <h2>📊 Análisis Estadístico Completo</h2>

                <div className="analisis-card">
                    <h3>1️⃣ Medidas Generales - Todas las Atenciones</h3>
                    <ul>
                        <li><strong>Total de observaciones:</strong> 33</li>
                        <li><strong>Suma total:</strong> 700,042</li>
                        <li><strong>Media:</strong> 21,213.39</li>
                        <li><strong>Desviación estándar:</strong> 62,156.71</li>
                        <li><strong>Rango:</strong> 348,291</li>
                        <li><strong>Asimetría:</strong> 4.97</li>
                        <li><strong>Curtosis:</strong> 26.31</li>
                    </ul>
                </div>

                <div className="analisis-card">
                    <h3>2️⃣ Medidas por Grupo de Edad</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Edad</th>
                                <th>Media</th>
                                <th>Mediana</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td>0 - 4 años</td><td>29,827</td><td>29,827</td></tr>
                            <tr><td>25 - 29 años</td><td>25,231</td><td>25,231</td></tr>
                            <tr><td>60 - 64 años</td><td>28,093</td><td>28,093</td></tr>
                            <tr><td>80 y más</td><td>12,646</td><td>12,646</td></tr>
                        </tbody>
                    </table>
                </div>

                <div className="analisis-card">
                    <h3>3️⃣ Comparación Hombres vs Mujeres</h3>
                    <p><strong>Hombres:</strong> 187,044 (54%)</p>
                    <p><strong>Mujeres:</strong> 159,461 (46%)</p>
                    <p><strong>Diferencia:</strong> 27,583</p>
                </div>

                <div className="analisis-card">
                    <h3>4️⃣ Distribución y Curtosis</h3>
                    <p>Coeficiente de asimetría: <strong>5.29</strong> → Distribución asimétrica positiva</p>
                    <p>Coeficiente de curtosis: <strong>41.26</strong> → Distribución leptocúrtica</p>
                </div>

                <div className="analisis-card resumen-final">
                    <h3>5️⃣ Resumen General</h3>
                    <p><strong>Media Global:</strong> 21,213</p>
                    <p><strong>Mediana:</strong> 5,038</p>
                    <p><strong>Desviación Estándar:</strong> 62,157</p>
                </div>
            </section>

        </div>
    );
}

export default CausaHospitalizacion;
