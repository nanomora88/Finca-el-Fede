import React, { useState } from 'react';

const sociosIniciales = [
  'Diego N', 'Diego T', 'Fede', 'Gabito', 'Gena',
  'Jhonny', 'Juampi', 'Marco', 'Nano', 'Sher'
];

function App() {
  const [socios, setSocios] = useState(sociosIniciales.map(nombre => ({ nombre, presente: false })));
  const [invitados, setInvitados] = useState(0);
  const [resultado, setResultado] = useState(null);

  const calcularCostos = () => {
    const costoPorVisita = 333.33;
    const asistentesSocios = socios.filter(s => s.presente).length;
    const totalAsistentes = asistentesSocios + invitados;

    if (totalAsistentes === 0) {
      setResultado('Debe haber al menos un asistente.');
      return;
    }

    const costoPorPersona = costoPorVisita / totalAsistentes;
    const aportesInvitados = costoPorPersona * invitados;

    // Calcular compensaciones a ausentes (máx. 33.33€)
    const sociosAusentes = socios.filter(s => !s.presente);
    let compensaciones = [];
    let sobrante = aportesInvitados;

    if (sociosAusentes.length > 0) {
      for (let i = 0; i < sociosAusentes.length; i++) {
        const maxPorAusente = 33.33;
        // Se intenta compensar a cada ausente dividiendo sobrante / nº ausentes
        const compensacionPosible = sobrante / (sociosAusentes.length - i);
        const compensacion = Math.min(maxPorAusente, compensacionPosible);

        compensaciones.push({
          nombre: sociosAusentes[i].nombre,
          monto: compensacion.toFixed(2)
        });

        // Restar la compensación del sobrante
        sobrante -= compensacion;
      }
    }

    // Repartir el sobrante entre socios presentes
    const sociosPresentes = socios.filter(s => s.presente);
    let sobrantePorPresente = 0;
    if (sociosPresentes.length > 0) {
      sobrantePorPresente = sobrante / sociosPresentes.length;
    }

    setResultado({
      costoPorPersona: costoPorPersona.toFixed(2),
      compensaciones,
      sobrantePorPresente: sobrantePorPresente.toFixed(2)
    });
  };

  const togglePresente = (i) => {
    const nuevos = [...socios];
    nuevos[i].presente = !nuevos[i].presente;
    setSocios(nuevos);
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: 20 }}>
      <h1>Finca el Fede</h1>
      <h2>Socios</h2>
      {socios.map((s, i) => (
        <label key={s.nombre} style={{ display: 'block', marginBottom: 4 }}>
          <input
            type='checkbox'
            checked={s.presente}
            onChange={() => togglePresente(i)}
          />
          {s.nombre}
        </label>
      ))}

      <h2>Invitados</h2>
      <input
        type='number'
        value={invitados}
        onChange={e => setInvitados(Number(e.target.value))}
        style={{ marginBottom: 10 }}
      />

      <br />
      <button onClick={calcularCostos}>Calcular</button>

      {resultado && (
        <div style={{ marginTop: 20 }}>
          <h3>Resultado</h3>
          <p>Costo por persona: €{resultado.costoPorPersona}</p>
          <h4>Compensaciones a socios ausentes (máx. €33.33):</h4>
          {resultado.compensaciones.length > 0 ? (
            <ul>
              {resultado.compensaciones.map((c) => (
                <li key={c.nombre}>
                  {c.nombre}: €{c.monto}
                </li>
              ))}
            </ul>
          ) : (
            <p>Ningún socio ausente</p>
          )}
          <h4>Sobrante repartido entre socios presentes</h4>
          <p>€{resultado.sobrantePorPresente} cada uno</p>
        </div>
      )}
    </div>
  );
}

export default App;
