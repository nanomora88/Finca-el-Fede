import React, { useState } from 'react';

/* 
  1) Calculadora de costos
*/
function CalculatorTab() {
  const sociosIniciales = [
    'Diego N', 'Diego T', 'Fede', 'Gabito', 'Gena',
    'Jhonny', 'Juampi', 'Marco', 'Nano', 'Sher'
  ];

  const [socios, setSocios] = useState(
    sociosIniciales.map((nombre) => ({ nombre, presente: false }))
  );
  const [invitados, setInvitados] = useState(0);
  const [resultado, setResultado] = useState(null);

  const calcularCostos = () => {
    const costoPorVisita = 333.33;
    const asistentesSocios = socios.filter((s) => s.presente).length;
    const totalAsistentes = asistentesSocios + invitados;

    if (totalAsistentes === 0) {
      setResultado('Debe haber al menos un asistente.');
      return;
    }

    const costoPorPersona = costoPorVisita / totalAsistentes;
    const aportesInvitados = costoPorPersona * invitados;

    // Calcular compensaciones a ausentes (máx. 33.33 €)
    const sociosAusentes = socios.filter((s) => !s.presente);
    let compensaciones = [];
    let sobrante = aportesInvitados;

    if (sociosAusentes.length > 0) {
      for (let i = 0; i < sociosAusentes.length; i++) {
        const maxPorAusente = 33.33;
        const compensacionPosible = sobrante / (sociosAusentes.length - i);
        const compensacion = Math.min(maxPorAusente, compensacionPosible);

        compensaciones.push({
          nombre: sociosAusentes[i].nombre,
          monto: compensacion.toFixed(2),
        });

        sobrante -= compensacion;
      }
    }

    // Repartir el sobrante entre socios presentes
    const sociosPresentes = socios.filter((s) => s.presente);
    let sobrantePorPresente = 0;
    if (sociosPresentes.length > 0) {
      sobrantePorPresente = sobrante / sociosPresentes.length;
    }

    setResultado({
      costoPorPersona: costoPorPersona.toFixed(2),
      compensaciones,
      sobrantePorPresente: sobrantePorPresente.toFixed(2),
    });
  };

  const togglePresente = (i) => {
    const nuevos = [...socios];
    nuevos[i].presente = !nuevos[i].presente;
    setSocios(nuevos);
  };

  return (
    <div>
      <h2 className="mb-4">Calculadora</h2>
      <div className="row">
        {/* SOCIOS */}
        <div className="col-md-6 mb-4">
          <div className="card">
            <div className="card-header">Socios</div>
            <div className="card-body">
              {socios.map((s, i) => (
                <div className="form-check mb-2" key={s.nombre}>
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id={`socio-${i}`}
                    checked={s.presente}
                    onChange={() => togglePresente(i)}
                  />
                  <label className="form-check-label" htmlFor={`socio-${i}`}>
                    {s.nombre}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* INVITADOS */}
        <div className="col-md-6 mb-4">
          <div className="card">
            <div className="card-header">Invitados</div>
            <div className="card-body">
              <label className="form-label">Número de invitados:</label>
              <input
                type="number"
                className="form-control mb-3"
                min="0"
                value={invitados}
                onChange={(e) => setInvitados(Number(e.target.value))}
              />
              <button className="btn btn-primary" onClick={calcularCostos}>
                Calcular
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* RESULTADO */}
      {resultado && (
        <div className="card mt-4">
          <div className="card-header">Resultado</div>
          <div className="card-body">
            {typeof resultado === 'string' ? (
              <div className="alert alert-danger">{resultado}</div>
            ) : (
              <>
                <p>
                  <strong>Costo por persona:</strong> €{resultado.costoPorPersona}
                </p>
                <h5>Compensaciones a socios ausentes (máx. €33.33):</h5>
                {resultado.compensaciones.length > 0 ? (
                  <ul className="list-group mb-3">
                    {resultado.compensaciones.map((c) => (
                      <li
                        key={c.nombre}
                        className="list-group-item d-flex justify-content-between"
                      >
                        <span>{c.nombre}</span>
                        <span>€{c.monto}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted">Ningún socio ausente</p>
                )}

                <h5>Sobrante repartido entre socios presentes</h5>
                <p>€{resultado.sobrantePorPresente} por socio presente</p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/*
  2) Información de la finca
*/
function InfoTab() {
  return (
    <div>
      <h2>Información de la Finca</h2>
      <div className="card my-4">
        <div className="card-header">Ubicación y Horarios</div>
        <div className="card-body">
          <p>
            <strong>Dirección:</strong>{' '}
            <a
              href="https://maps.app.goo.gl/uqrEtoXgjGuuL4KV9"
              target="_blank"
              rel="noopener noreferrer"
            >
              Ver en Google Maps
            </a>
          </p>
          <p>
            <strong>Horario de Entrada:</strong> Viernes 11:00 AM
          </p>
          <p>
            <strong>Horario de Salida:</strong> Sábado 12:00 PM
          </p>
        </div>
      </div>
    </div>
  );
}

/*
  Componente principal con dos pestañas (Calculadora, Información)
*/
function App() {
  // Manejo de la pestaña activa
  const [activeTab, setActiveTab] = useState('calculadora');

  return (
    <div className="container my-5">
      {/* Logo (opcional, si tenés logo.png en /public) */}
      <div className="text-center mb-4">
        <img
          src="/logo.png"
          alt="Logo Finca el Fede"
          style={{ maxWidth: '200px' }}
        />
      </div>

      {/* Navegación por pestañas */}
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'calculadora' ? 'active' : ''}`}
            onClick={() => setActiveTab('calculadora')}
          >
            Calculadora
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'info' ? 'active' : ''}`}
            onClick={() => setActiveTab('info')}
          >
            Información
          </button>
        </li>
      </ul>

      {/* Renderizado condicional según la pestaña */}
      {activeTab === 'calculadora' && <CalculatorTab />}
      {activeTab === 'info' && <InfoTab />}
    </div>
  );
}

export default App;
