// pages/index.js
import React, { useState } from 'react';
import axios from 'axios';

export default function Home() {
  // Crear un estado para la pregunta y la respuesta
  const [pregunta, setPregunta] = useState('');
  const [respuesta, setRespuesta] = useState('');

  // Crear una función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    // Prevenir el comportamiento por defecto del formulario
    e.preventDefault();

    // Validar que la pregunta no esté vacía
    if (!pregunta) {
      alert('Por favor, escriba una pregunta o caso.');
      return;
    }

    try {
      // Llamar a la ruta de la API local con la pregunta
      const response = await axios.post('/api/respell', { pregunta });

      // Obtener la respuesta de la ruta de la API local
      const { respuesta } = response.data;

      // Actualizar el estado de la respuesta
      setRespuesta(respuesta);
    } catch (error) {
      // Manejar el error y mostrar un mensaje al usuario
      alert('Error al enviar la solicitud a la API');
    }
  };

  return (
    <div>
      <h1>Buscador</h1>
      <p>
        Esta aplicación responde preguntas sobre la legislación de Guatemala,
        buscando en la Web.
      </p>
      <p>Por Moris Polanco</p>
      <form onSubmit={handleSubmit}>
        <textarea
          value={pregunta}
          onChange={(e) => setPregunta(e.target.value)}
          placeholder="Pregunta o caso"
        ></textarea>
        <button type="submit">Obtener Respuesta</button>
      </form>
      {respuesta && (
        <div>
          <strong>Respuesta:</strong> {respuesta}
        </div>
      )}
    </div>
  );
}