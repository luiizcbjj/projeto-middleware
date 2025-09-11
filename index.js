const express = require('express');
const verificarAutorizacao = require('./auth');

const app = express();
const PORT = 3000;

// Middleware global para parsing de JSON
app.use(express.json());

// Middleware global para registrar todas as chamadas
app.use((req, res, next) => {
    console.log('Chamando API');
    next();
});

// Dados de exemplo para usuários
const usuarios = [
    { id: 1, nome: 'João Silva', tipo: 'COMUM' },
    { id: 2, nome: 'Maria Santos', tipo: 'ADM' },
    { id: 3, nome: 'Pedro Costa', tipo: 'COMUM' }
];

// Rota GET /usuarios (PÚBLICA)
app.get('/usuarios', (req, res) => {
    res.json(usuarios);
});

// Rota POST /usuarios (PRIVADA - COM autenticação)
app.post('/usuarios', verificarAutorizacao, (req, res) => {
    const novoUsuario = {
        id: usuarios.length + 1,
        nome: req.body.nome || 'Novo Usuário',
        tipo: req.body.tipo || 'COMUM',
        email: req.body.email || 'email@exemplo.com'
    };
    
    usuarios.push(novoUsuario);
    
    res.status(201).json({ 
        mensagem: "Rota permitida",
        usuario: novoUsuario
    });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});