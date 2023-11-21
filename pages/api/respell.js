// pages/api/respell.js
import axios from 'axios';

export default async function handler(req, res) {
  // Obtener la pregunta del cuerpo de la solicitud
  const { pregunta } = req.body;

  // Validar que la solicitud sea de tipo POST y que tenga una pregunta
  if (req.method !== 'POST' || !pregunta) {
    res.status(400).json({ error: 'Método no válido o pregunta vacía' });
    return;
  }

  try {
    // Llamar a la API de Respell con la pregunta
    const response = await axios.post(
      'https://api.respell.ai/v1/run',
      {
        spellId: 'k0GhQkJOn7IKEY-BdghY6',
        // Este campo se puede omitir para ejecutar la última versión publicada
        spellVersionId: 'D2BW8wURiAqwSaBnoK4p3',
        // Rellenar un valor para el bloque de entrada dinámico
        inputs: {
          pregunta,
        },
      },
      {
        headers: {
          // Esta es tu clave de API
          authorization: 'Bearer 260cee54-6d54-48ba-92e8-bf641b5f4805',
          accept: 'application/json',
          'content-type': 'application/json',
        },
      }
    );

    // Obtener la respuesta de la API de Respell
    const { respuesta } = response.data.outputs;

    // Enviar la respuesta al cliente
    res.status(200).json({ respuesta });
  } catch (error) {
    // Manejar el error y enviar un mensaje al cliente
    res.status(500).json({ error: 'Error al llamar a la API de Respell' });
  }
}