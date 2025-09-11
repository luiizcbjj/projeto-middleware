const express = require('express');
const verificarAutorizacao = require('./auth');

const app = express();
const PORT = 3000;

app.use(express.json());

app.use((req, res, next) => {
    console.log('Chamando API');
    next();
});

const usuarios = [
    { id: 1, nome: 'João Silva', tipo: 'COMUM' },
    { id: 2, nome: 'Maria Santos', tipo: 'ADM' },
    { id: 3, nome: 'Pedro Costa', tipo: 'COMUM' }
];

app.get('/usuarios', (req, res) => {
    res.json(usuarios);
});

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

app.post('/', (req, res) => {
    const { tipoUsuario } = req.body;
    if (!tipoUsuario) {
        return res.status(400).json({ mensagem: 'tipoUsuario é obrigatório' });
    }
    res.status(201).json({ mensagem: `Usuário do tipo ${tipoUsuario} recebido com sucesso!` });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});