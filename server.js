const express = require('express');
const multer  = require('multer');
const fs = require('fs');
const app = express();
const upload = multer({ dest: 'uploads/' });
const path = require('path');

// Middleware para lidar com o CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080'); // Permitir acesso apenas do domínio http://localhost:8080
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.post('/api/v1/saveFile', upload.single('file'), (req, res) => {
    const file = req.file;
    const filePath = `public/storage/${file.originalname}`;

    fs.rename(file.path, filePath, (err) => {
        if (err) {
            console.error('Erro ao salvar o arquivo:', err);
            return res.status(500).send('Erro ao salvar o arquivo');
        }

        console.log('Arquivo salvo com sucesso em:', filePath);
        res.send('Arquivo salvo com sucesso');
    });
});

app.listen(3001, () => {
    console.log('Servidor em execução na porta 3001');
});
