const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

// ===========================
// CONFIGURACIÓN
// ===========================
const PORT = 3001;
const DOWNLOAD_DELAY = 3_000; // Simular tiempo de descarga (ms)
const HEADERS_CORS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-usuario, x-canal',
    'Access-Control-Max-Age': '86400'
};

// ===========================
// FUNCIONES UTILITARIAS
// ===========================

/**
 * Establece headers CORS en la respuesta
 */
const setCorsHeaders = (res) => {
    Object.entries(HEADERS_CORS).forEach(([key, value]) => {
        res.setHeader(key, value);
    });
};

/**
 * Valida que el nombre de archivo no contenga caracteres peligrosos
 */
const isValidFileName = (fileName) => {
    return !fileName.includes('..') && !fileName.includes('/');
};

/**
 * Responde con error en formato JSON
 */
const sendError = (res, statusCode, message, details = null) => {
    const response = { error: message };
    if (details) response.details = details;
    
    res.writeHead(statusCode, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(response));
};

/**
 * Sirve un archivo local (carpeta /files)
 */
const serveLocalFile = (fileName, res) => {
    if (!isValidFileName(fileName)) {
        sendError(res, 400, 'Nombre de archivo inválido');
        return;
    }

    const filePath = path.join(__dirname, 'files', fileName);
    
    console.log(`📥 Leyendo archivo local: ${fileName}`);

    fs.readFile(filePath, (err, data) => {
        if (err) {
            console.error(`❌ Archivo no encontrado: ${filePath}`);
            sendError(res, 404, 'Archivo no encontrado', err.message);
            return;
        }

        // Simular delay de descarga
        console.log(`⏱️  Simulando descarga (${DOWNLOAD_DELAY}ms)...`);
        setTimeout(() => {
            res.writeHead(200, {
                'Content-Type': 'application/octet-stream',
                'Content-Disposition': `attachment; filename="${fileName}"`
            });
            res.end(data);
            console.log(`✅ Archivo enviado: ${fileName}`);
        }, DOWNLOAD_DELAY);
    });
};

/**
 * Descarga un archivo desde URL remota
 */
const downloadFromRemote = (fileUrl, res) => {
    const fileName = path.basename(new URL(fileUrl).pathname) || 'download';
    const filePath = path.join(__dirname, 'downloads', fileName);
    const dir = path.dirname(filePath);

    console.log(`📡 Descargando desde remoto: ${fileUrl}`);

    // Crear carpeta si no existe
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    const protocol = fileUrl.startsWith('https') ? https : http;

    protocol.get(fileUrl, (response) => {
        if (response.statusCode !== 200) {
            console.error(`❌ Error remoto: ${response.statusCode}`);
            res.writeHead(response.statusCode);
            res.end();
            return;
        }

        const file = fs.createWriteStream(filePath);
        response.pipe(file);

        file.on('finish', () => {
            file.close();
            console.log(`✅ Descarga completada: ${fileName}`);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Descargado correctamente', path: filePath }));
        });

        file.on('error', (err) => {
            fs.unlink(filePath, () => {});
            console.error(`❌ Error al guardar: ${err.message}`);
            sendError(res, 500, 'Error al guardar archivo', err.message);
        });
    }).on('error', (err) => {
        console.error(`❌ Error de conexión: ${err.message}`);
        sendError(res, 400, 'Error al descargar', err.message);
    });
};

/**
 * Maneja la solicitud de descarga
 */
const handleDownload = (fileUrl, res) => {
    if (!fileUrl) {
        sendError(res, 400, 'URL requerida');
        return;
    }

    console.log(`📦 Solicitud de descarga: ${fileUrl}`);

    // Detectar si es URL remota o archivo local
    if (fileUrl.startsWith('http://') || fileUrl.startsWith('https://')) {
        downloadFromRemote(fileUrl, res);
    } else {
        serveLocalFile(fileUrl, res);
    }
};

// ===========================
// SERVIDOR HTTP
// ===========================

const server = http.createServer((req, res) => {
    // Establecer headers CORS
    setCorsHeaders(res);

    console.log(`\n📍 ${req.method} ${req.url}`);

    // Responder a preflight (OPTIONS)
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    // Ruta GET: /download?url=<archivo>
    if (req.method === 'GET' && req.url.startsWith('/download')) {
        const fileUrl = new URLSearchParams(req.url.split('?')[1]).get('url');
        handleDownload(fileUrl, res);
        return;
    }

    // Ruta POST: /download con body JSON {"url": "<archivo>"}
    if (req.method === 'POST' && req.url.startsWith('/download')) {
        let body = '';

        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', () => {
            try {
                const { url: fileUrl } = JSON.parse(body);
                handleDownload(fileUrl, res);
            } catch (err) {
                console.error(`❌ JSON inválido: ${err.message}`);
                sendError(res, 400, 'JSON inválido', err.message);
            }
        });
        return;
    }

    // Ruta no encontrada
    res.writeHead(404);
    res.end('404 - Ruta no encontrada');
});

// ===========================
// INICIO DEL SERVIDOR
// ===========================

server.listen(PORT, () => {
    console.log('\n✨ ================================================');
    console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
    console.log('=====================================================');
    console.log('\n📌 Usos:');
    console.log(`   GET:  http://localhost:${PORT}/download?url=archivo.pdf`);
    console.log(`   POST: http://localhost:${PORT}/download`);
    console.log('   Body: {"url":"archivo.pdf"}');
    console.log('\n📁 Carpetas:');
    console.log(`   Locales:  ${path.join(__dirname, 'files')}`);
    console.log(`   Descargadas: ${path.join(__dirname, 'downloads')}`);
    console.log('\n');
});
