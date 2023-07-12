const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static('public')); // Directorio para archivos estáticos
app.set('views', 'views'); // Directorio para vistas
app.set('view engine', 'ejs'); // Motor de plantillas a utilizar (ejemplo: EJS)

app.get('/', (req, res) => {
    res.render('index'); // Renderiza la vista principal (ejemplo: index.ejs)
});

// Resto de rutas y configuración del servidor Express
// ...

io.on('connection', (socket) => {
    console.log('Cliente conectado');

    // Maneja mensajes entrantes
    socket.on('message', (message) => {
        console.log(`Mensaje recibido: ${message}`);

        // Puedes emitir mensajes a todos los clientes conectados
        io.emit('message', message);
    });

    // Maneja eventos de cierre de conexión
    socket.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
});

const PORT = 3000; // Puerto en el que se ejecutará el servidor

http.listen(PORT, () => {
    console.log(`Servidor en funcionamiento en el puerto ${PORT}`);
});
