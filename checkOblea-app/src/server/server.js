const express = require('express');
const http = require('http');
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

// Iniciar el servidor en el puerto 3000
server.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
