function verificarAutorizacao(req, res, next) {
    console.log('Middleware de autenticação executado');
    
    if (!req.body.tipoUsuario) {
        console.log('ERRO: Campo tipoUsuario não encontrado');
        return res.status(401).json({ 
            mensagem: "Funcao nao permitida para esse usuario" 
        });
    }

    if (req.body.tipoUsuario === "ADM") {
        console.log('SUCESSO: Usuário ADM autorizado');
        next();
    } else {
        console.log('ERRO: Usuário não é ADM');
        res.status(401).json({ 
            mensagem: "Funcao nao permitida para esse usuario" 
        });
    }
}

module.exports = verificarAutorizacao;