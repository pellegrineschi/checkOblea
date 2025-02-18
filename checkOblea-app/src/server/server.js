const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // En producción, restringe esto al dominio de tu frontend.
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// Servir archivos estáticos del build de Angular
app.use(express.static(path.join(__dirname, 'dist', 'check-oblea-app')));

// Array para almacenar temporalmente los registros
let registros = [];

// Manejo de conexiones con Socket.IO
io.on('connection', (socket) => {
  console.log('Nuevo cliente conectado');

  // Enviar los registros actuales al cliente que se conecta
  socket.emit('cargar-datos', registros);

  // Escuchar cuando se envía un nuevo registro desde el formulario Angular
  socket.on('nuevo-registro', (data) => {
    registros.push(data);
    // Enviar la lista actualizada a todos los clientes conectados
    io.emit('actualizar-tabla', registros);
  });

  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
});

// Redirigir cualquier otra ruta al index.html del build Angular
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'check-oblea-app', 'index.html'));
});

// Configurar el puerto: en Glitch se usa process.env.PORT, en local 3000
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
