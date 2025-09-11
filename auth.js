function verificarAutorizacao(req, res, next) {
    console.log('Middleware de autenticação executado');
    
    // Verifica se o campo tipoUsuario existe no body
    if (!req.body.tipoUsuario) {
        console.log('ERRO: Campo tipoUsuario não encontrado');
        return res.status(401).json({ 
            mensagem: "Funcao nao permitida para esse usuario" 
        });
    }
    
    // Verifica se o usuário é administrador
    if (req.body.tipoUsuario === "ADM") {
        console.log('SUCESSO: Usuário ADM autorizado');
        next(); // Permite acesso à rota
    } else {
        console.log('ERRO: Usuário não é ADM');
        res.status(401).json({ 
            mensagem: "Funcao nao permitida para esse usuario" 
        });
    }
}

module.exports = verificarAutorizacao;