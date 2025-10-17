import React from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {

    const navigation = useNavigate();

    const goTOInterna = () => {
        navigation(`consulta/interna`);
    };

    const goToCausaInterna = () => {
        navigation(`causa/interna`);
    };

    const goToDias = () => {
        navigation(`promedio/dias`);
    };

    const goToAtencion = () => {
        navigation(`atencion/tratamiento`);
    };

    const goToHospitales = () => {
        navigation(`hospitales`);
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
                            <h1>UMG Salamá - Estadística 1</h1>
                            <p>Salud | Ingeniería en Sistemas 2.º  B</p>
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
                            <div class="indicator-description">Número de consultas externas por departamento</div>
                        </div>
                    </div>

                    <div class="card" on onClick={goToCausaInterna}>
                        <div class="card-header">
                            <h3>Causas de atencion interna</h3>
                            <div class="card-icon">🛌</div>
                        </div>
                        <div class="card-body">
                            <div class="indicator-description">Por causa, rango de edades y genero (servicios internos)</div>
                        </div>
                    </div>

                    <div class="card" onClick={goToDias}>
                        <div class="card-header">
                            <h3>Días de Hospitalización</h3>
                            <div class="card-icon">📅</div>
                        </div>
                        <div class="card-body">
                            <div class="indicator-description">Promedio de días de hospitalización</div>
                        </div>
                    </div>

                    <div class="card" onClick={goToAtencion}>
                        <div class="card-header">
                            <h3>Atención Médica</h3>
                            <div class="card-icon">👨‍⚕️</div>
                        </div>
                        <div class="card-body">
                            <div class="indicator-description">Tipo de atención médica</div>
                        </div>
                    </div>

                    <div class="card" onClick={goToHospitales}>
                        <div class="card-header">
                            <h3>Hospitales Nacionales</h3>
                            <div class="card-icon">🏛️</div>
                        </div>
                        <div class="card-body">
                            <div class="indicator-value">48</div>
                            <div class="indicator-description">Número estimado de hospitales</div>
                        </div>
                    </div>

                    {/* <!-- Demografía --> */}
                    <div class="card">
                        <div class="card-header">
                            <h3>Población Total</h3>
                            <div class="card-icon">👥</div>
                        </div>
                        <div class="card-body">
                            <div class="indicator-value">Alrededor de 18,687,900 habitantes. </div>
                            <div class="indicator-description">Población total por departamento</div>
                            <div class="indicator-trend trend-up">
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
                        </div>
                    </div>

                    {/* <!-- Infraestructura --> */}


                    {/* <!-- Economía --> */}
                    <div class="card">
                        <div class="card-header">
                            <h3>Tasa de Pobreza</h3>
                            <div class="card-icon">💰</div>
                        </div>
                        <div class="card-body">
                            <div class="indicator-description">Porcentaje de pobreza por departamento</div>
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
                        </div>
                    </div>

                    {/* <!-- Economía/Social --> */}
                    <div class="card">
                        <div class="card-header">
                            <h3>Acceso a Agua Potable</h3>
                            <div class="card-icon">🚰</div>
                        </div>
                        <div class="card-body">
                            <div class="indicator-description">% de hogares con acceso a agua potable</div>

                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}

export default Home