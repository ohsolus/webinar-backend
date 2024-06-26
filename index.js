import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mysql from "mysql2";

//chatbot

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

//chatbot -- soporte

app.post("/chat", (req, res) => {
  const { message } = req.body;
  let response = "";

  const keywords = {
    saludo: [
      "hola",
      "buenos días",
      "buenas tardes",
      "saludos",
      "puedes ayudarme",
    ],
    horario: ["horarios", "horario", "abiertos", "atención"],
    estado: ["estado", "pedido", "envío", "entrega", "solicitud", "registro"],
    seminario: ["participantes", "ponentes", "expositores", "conferencistas"],
    fecha: ["fecha", "día", "hora", "momento", "mes", "año"],
    tema: ["contenido", "tema", "directrices", "apartados"],
    documentacion: [
      "docs",
      "como está hecha esta web",
      "documentación",
      "documentos",
      "chatbot",
    ],
    despedida: [
      "adiós",
      "gracias",
      "bien",
      "grandioso",
      "ten un buen día",
      "cool",
      "genial",
      "entiendo",
    ],
  };

  const lowerCaseMessage = message.toLowerCase();

  if (keywords.saludo.some((keyword) => lowerCaseMessage.includes(keyword))) {
    response = "¡Hola! ¿Cómo puedo ayudarte hoy?";
  } else if (
    keywords.horario.some((keyword) => lowerCaseMessage.includes(keyword))
  ) {
    response =
      "El horario de atención es de 24h. Sientete libre de preguntar cualquier información sobre el webinar.";
  } else if (
    keywords.estado.some((keyword) => lowerCaseMessage.includes(keyword))
  ) {
    response =
      "Para consultar el estado de tu registro, revisa tu correo electrónico, nos aseguramos de enviarte notificaciones para recordarte. En caso de no tener nuestras notificaciones, puedes contactar con soprte técnico por medio del siguiente correo: yesianlarenas@gmail.com";
  } else if (
    keywords.seminario.some((keyword) => lowerCaseMessage.includes(keyword))
  ) {
    response =
      "La información sobre los ponentes del webinar puedes encontrarla en el apartado 'content'. ¡Cualquier actualización o cambio seguro te mantendremos informado!";
  } else if (
    keywords.fecha.some((keyword) => lowerCaseMessage.includes(keyword))
  ) {
    response =
      "La fecha del Webinar aún está por confirmarse, ¡cualquier actualización o cambio seguro te mantendremos informado!";
  } else if (
    keywords.tema.some((keyword) => lowerCaseMessage.includes(keyword))
  ) {
    response =
      "El tema de nuestro webinar es super interesante. Explicaremos y haremos la demostración de una web de reclutamiento llamada Tech Talent Hub, ¡no te lo puedes perder!";
  } else if (
    keywords.despedida.some((keyword) => lowerCaseMessage.includes(keyword))
  ) {
    response = "Espero mi respuesta haya sido útil.";
  } else if (
    keywords.documentacion.some((keyword) => lowerCaseMessage.includes(keyword))
  ) {
    response = "Puedes encontrar todo lo referente en el apartado 'Docs'.";
  } else {
    response = "Lo siento, no entendí tu consulta. ¿Podrías reformularla?";
  }

  res.json({ response });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

//base de datos para registro
// Cargar variables de entorno desde el archivo .env
dotenv.config();

const db = mysql.createConnection({
  host: "viaduct.proxy.rlwy.net",
  user: "root",
  password: "RJQctlthhhvjqNUYFvUjrrlormUleQhV",
  database: "railway",
  port: 34690,
});

//app.get("/", (req, res) => {
//  res.json("hello");
//});

app.get("/test", (req, res) => {
  const q = "SELECT * FROM registroasistencia";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/test", (req, res) => {
  const q =
    "INSERT INTO registroasistencia (nombre, empresa, cargo, email, sector, comoSeEntero) VALUES (?)";
  const values = [
    req.body.nombre,
    req.body.empresa,
    req.body.cargo,
    req.body.email,
    req.body.sector,
    req.body.comoSeEntero,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.listen(8800, () => {
  console.log("connected to backend!");
});
