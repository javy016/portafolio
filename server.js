const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

// Servir archivos estáticos de las carpetas
app.use('/documentos', express.static(path.join(__dirname, 'documentos')));
app.use('/imagenes', express.static(path.join(__dirname, 'imagenes')));
app.use('/webs', express.static(path.join(__dirname, 'webs')));

// Rutas principales
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Rutas para las subpáginas
app.get('/aplicaciones', (req, res) => {
    res.sendFile(path.join(__dirname, 'webs', 'aplicaciones.html'));
});

app.get('/desarrollo_web', (req, res) => {
    res.sendFile(path.join(__dirname, 'webs', 'desarrollo_web.html'));
});

app.get('/videojuegos', (req, res) => {
    res.sendFile(path.join(__dirname, 'webs', 'videojuegos.html'));
});

app.get('/proyectos_futuros', (req, res) => {
    res.sendFile(path.join(__dirname, 'webs', 'proyectos_futuros.html'));
});

// API health check
app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        message: 'Servidor funcionando correctamente',
        timestamp: new Date().toISOString(),
        port: PORT
    });
});

// Ruta para información del portfolio (puedes expandir esto)
app.get('/api/info', (req, res) => {
    res.json({
        name: 'Javier Collado Vinagre',
        title: 'Desarrollador Full Stack',
        email: 'dev.javier.collado@gmail.com',
        version: '1.0.0'
    });
});

// Manejo de errores 404 para API
app.use('/api/*', (req, res) => {
    res.status(404).json({
        error: 'Endpoint no encontrado',
        message: `La ruta ${req.originalUrl} no existe`,
        timestamp: new Date().toISOString()
    });
});

// MANEJO DE ERROR 404 PARA TODAS LAS RUTAS NO DEFINIDAS
app.use((req, res) => {
    // Si es una petición de API, responder con JSON
    if (req.originalUrl.startsWith('/api/')) {
        return res.status(404).json({
            error: 'Endpoint no encontrado',
            message: `La ruta API ${req.originalUrl} no existe`,
            timestamp: new Date().toISOString()
        });
    }

    // Para rutas de páginas web, servir el archivo 404.html
    res.status(404).sendFile(path.join(__dirname, '404.html'));
});

// Manejo de errores global
app.use((err, req, res, next) => {
    console.error('Error del servidor:', err);

    // Si es una petición API, responder con JSON
    if (req.originalUrl.startsWith('/api/')) {
        res.status(500).json({
            error: 'Error interno del servidor',
            message: process.env.NODE_ENV === 'production' ? 'Algo salió mal' : err.message,
            timestamp: new Date().toISOString()
        });
    } else {
        // Para errores en rutas web, servir la página de error 500
        res.status(500).sendFile(path.join(__dirname, '500.html'));
    }
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log('🚀 Servidor iniciado correctamente');
    console.log(`📍 URL: http://localhost:${PORT}`);
    console.log(`⏰ Iniciado: ${new Date().toLocaleString('es-ES')}`);
    console.log('📧 EmailJS configurado con:');
    console.log('   Service ID: service_l2jyi3a');
    console.log('   Template ID: template_z4e8lmo');
    console.log('   Public Key: tKP1jG8HDLZFLp4u7');
    console.log('🔧 Error 404 configurado para todas las rutas no definidas');
    console.log('🔧 Error 500 personalizado para errores del servidor');
    console.log('────────────────────────────────────');
});

// Manejo graceful de cierre
process.on('SIGINT', () => {
    console.log('\n👋 Cerrando servidor...');
    process.exit(0);
});

process.on('SIGTERM', () => {
    console.log('\n🔻 Servidor terminado');
    process.exit(0);
});

module.exports = app;