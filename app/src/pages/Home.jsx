import React from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {

    const navigation = useNavigate();

    const goTOInterna = () => {
        navigation(`consulta/interna`);
    };

    return (
        <>
            <header>
                <div class="header-container">
                    <div class="logo-section">
                        <div class="logo">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Escudo_de_la_universidad_Mariano_G%C3%A1lvez_Guatemala.svg/1200px-Escudo_de_la_universidad_Mariano_G%C3%A1lvez_Guatemala.svg.png" alt="UMG LOGO" />
                        </div>
                        <div class="title-section">
                            <h1>Estadística I UMG</h1>
                            <p>Salud y Economía | Ingeniería en Sistemas 2.º  B</p>
                        </div>
                    </div>
                </div>
            </header>

            <main>
                <section class="dashboard-grid">
                    {/* <!-- Salud --> */}
                    <div class="card" onClick={goTOInterna}>
                        <div class="card-header">
                            <h3>Consultas Externas / Internas</h3>
                            <div class="card-icon">🏥</div>
                        </div>
                        <div class="card-body">
                            {/* <div class="indicator-value">24,580</div> */}
                            <div class="indicator-description">Número de consultas externas por departamento</div>
                            {/* <div class="indicator-trend trend-up">
                                <span>↑ 5.2%</span>
                                <span>vs año anterior</span>
                            </div> */}
                        </div>
                    </div>

                    <div class="card">
                        <div class="card-header">
                            <h3>Hospitalizaciones</h3>
                            <div class="card-icon">🛌</div>
                        </div>
                        <div class="card-body">
                            <div class="indicator-value">8,742</div>
                            <div class="indicator-description">Número de hospitalizaciones (servicios internos)</div>
                            <div class="indicator-trend trend-down">
                                <span>↓ 2.1%</span>
                                <span>vs año anterior</span>
                            </div>
                        </div>
                    </div>

                    <div class="card">
                        <div class="card-header">
                            <h3>Tasa de Atención Médica</h3>
                            <div class="card-icon">👨‍⚕️</div>
                        </div>
                        <div class="card-body">
                            <div class="indicator-value">3.8</div>
                            <div class="indicator-description">Tasa de atención médica por cada 1,000 habitantes</div>
                            <div class="indicator-trend trend-up">
                                <span>↑ 0.3</span>
                                <span>vs año anterior</span>
                            </div>
                        </div>
                    </div>

                    <div class="card">
                        <div class="card-header">
                            <h3>Días de Hospitalización</h3>
                            <div class="card-icon">📅</div>
                        </div>
                        <div class="card-body">
                            <div class="indicator-value">4.2</div>
                            <div class="indicator-description">Promedio de días de hospitalización</div>
                            <div class="indicator-trend trend-neutral">
                                <span>→ Sin cambio</span>
                                <span>vs año anterior</span>
                            </div>
                        </div>
                    </div>

                    {/* <!-- Demografía --> */}
                    <div class="card">
                        <div class="card-header">
                            <h3>Población Total</h3>
                            <div class="card-icon">👥</div>
                        </div>
                        <div class="card-body">
                            <div class="indicator-value">17.2M</div>
                            <div class="indicator-description">Población total por departamento</div>
                            <div class="indicator-trend trend-up">
                                <span>↑ 1.8%</span>
                                <span>vs año anterior</span>
                            </div>
                        </div>
                    </div>

                    <div class="card">
                        <div class="card-header">
                            <h3>Densidad Poblacional</h3>
                            <div class="card-icon">🗺️</div>
                        </div>
                        <div class="card-body">
                            <div class="indicator-value">158</div>
                            <div class="indicator-description">Habitantes por km²</div>
                            <div class="indicator-trend trend-up">
                                <span>↑ 2.7%</span>
                                <span>vs año anterior</span>
                            </div>
                        </div>
                    </div>

                    {/* <!-- Infraestructura --> */}
                    <div class="card">
                        <div class="card-header">
                            <h3>Centros de Salud</h3>
                            <div class="card-icon">🏛️</div>
                        </div>
                        <div class="card-body">
                            <div class="indicator-value">342</div>
                            <div class="indicator-description">Número de hospitales y centros de salud</div>
                            <div class="indicator-trend trend-up">
                                <span>↑ 12</span>
                                <span>nuevos centros</span>
                            </div>
                        </div>
                    </div>

                    {/* <!-- Economía --> */}
                    <div class="card">
                        <div class="card-header">
                            <h3>Tasa de Pobreza</h3>
                            <div class="card-icon">💰</div>
                        </div>
                        <div class="card-body">
                            <div class="indicator-value">59.3%</div>
                            <div class="indicator-description">Porcentaje de pobreza por departamento</div>
                            <div class="indicator-trend trend-down">
                                <span>↓ 1.2%</span>
                                <span>vs año anterior</span>
                            </div>
                        </div>
                    </div>

                    {/* <!-- Salud adicional --> */}
                    <div class="card">
                        <div class="card-header">
                            <h3>Cobertura de Vacunación</h3>
                            <div class="card-icon">💉</div>
                        </div>
                        <div class="card-body">
                            <div class="indicator-value">78%</div>
                            <div class="indicator-description">% de niños con esquema completo</div>
                            <div class="indicator-trend trend-up">
                                <span>↑ 4.5%</span>
                                <span>vs año anterior</span>
                            </div>
                        </div>
                    </div>

                    {/* <!-- Economía/Social --> */}
                    <div class="card">
                        <div class="card-header">
                            <h3>Acceso a Agua Potable</h3>
                            <div class="card-icon">🚰</div>
                        </div>
                        <div class="card-body">
                            <div class="indicator-value">87%</div>
                            <div class="indicator-description">% de hogares con acceso a agua potable</div>
                            <div class="indicator-trend trend-up">
                                <span>↑ 2.3%</span>
                                <span>vs año anterior</span>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}

export default Home