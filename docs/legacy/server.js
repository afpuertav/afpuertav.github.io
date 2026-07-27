const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const csv = require('csv-parser');

const app = express();
app.use(cors());
app.use(express.json());

// Archivo CSV donde se guardan los datos
const CSV_FILE = 'iot_data.csv';

// Crear archivo CSV si no existe
if (!fs.existsSync(CSV_FILE)) {
    fs.writeFileSync(CSV_FILE, 'timestamp,temperature,humidity\n');
}

// 1. Endpoint para obtener TODOS los datos históricos
app.get('/api/data', (req, res) => {
    const results = [];
    fs.createReadStream(CSV_FILE)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
            // Convertir strings a números y agregar formato de hora
            const formattedData = results.map(row => ({
                timestamp: row.timestamp,
                time: new Date(row.timestamp).toLocaleTimeString(),
                date: new Date(row.timestamp).toLocaleDateString(),
                temperature: parseFloat(row.temperature),
                humidity: parseFloat(row.humidity)
            }));
            res.json(formattedData);
        })
        .on('error', (err) => {
            res.status(500).json({ error: 'Error reading CSV file' });
        });
});

// 2. Endpoint para obtener la ÚLTIMA lectura
app.get('/api/latest', (req, res) => {
    const results = [];
    fs.createReadStream(CSV_FILE)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
            if (results.length === 0) {
                return res.json({ 
                    timestamp: null, 
                    temperature: null, 
                    humidity: null 
                });
            }
            const last = results[results.length - 1];
            res.json({
                timestamp: last.timestamp,
                time: new Date(last.timestamp).toLocaleTimeString(),
                date: new Date(last.timestamp).toLocaleDateString(),
                temperature: parseFloat(last.temperature),
                humidity: parseFloat(last.humidity)
            });
        });
});

// 3. Endpoint para recibir datos del ESP32 y guardar en CSV
app.post('/api/data', (req, res) => {
    const { temperature, humidity } = req.body;
    const timestamp = new Date().toISOString();
    
    const csvLine = `${timestamp},${temperature},${humidity}\n`;
    
    fs.appendFile(CSV_FILE, csvLine, (err) => {
        if (err) {
            console.error('Error writing to CSV:', err);
            return res.status(500).json({ error: 'Error saving data' });
        }
        res.json({ success: true, timestamp });
    });
});

// 4. Endpoint para descargar el CSV completo
app.get('/api/download', (req, res) => {
    res.download(CSV_FILE);
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});