const express = require("express");
const router = express.Router();

let jogos = [
    {
        id: 1,
        titulo: "GTA VI",
        plataforma: "PC",
        genero: "Ação",
        anoLancamento: 2026
    },
    {
        id: 2,
        titulo: "Minecraft",
        plataforma: "PC",
        genero: "Aventura",
        anoLancamento: 2011
    }
];

// Listar todos os jogos
router.get("/", (req, res) => {
    res.json(jogos);
});

// Consultar um jogo pelo ID
router.get("/:id", (req, res) => {
    const jogo = jogos.find(j => j.id === Number(req.params.id));

    if (!jogo) {
        return res.status(404).json({
            mensagem: "Jogo não encontrado"
        });
    }

    res.json(jogo);
});

// Cadastrar um jogo
router.post("/", (req, res) => {
    const { titulo, plataforma, genero, anoLancamento } = req.body;

    if (!titulo || !plataforma || !genero || !anoLancamento) {
        return res.status(400).json({
            mensagem: "Preencha todos os campos obrigatórios"
        });
    }

    const novoJogo = {
        id: jogos.length ? Math.max(...jogos.map(j => j.id)) + 1 : 1,
        titulo,
        plataforma,
        genero,
        anoLancamento
    };

    jogos.push(novoJogo);

    res.status(201).json(novoJogo);
});

// Atualizar um jogo
router.put("/:id", (req, res) => {
    const jogo = jogos.find(j => j.id === Number(req.params.id));

    if (!jogo) {
        return res.status(404).json({
            mensagem: "Jogo não encontrado"
        });
    }

    const { titulo, plataforma, genero, anoLancamento } = req.body;

    if (!titulo || !plataforma || !genero || !anoLancamento) {
        return res.status(400).json({
            mensagem: "Preencha todos os campos obrigatórios"
        });
    }

    jogo.titulo = titulo;
    jogo.plataforma = plataforma;
    jogo.genero = genero;
    jogo.anoLancamento = anoLancamento;

    res.json(jogo);
});

// Excluir um jogo
router.delete("/:id", (req, res) => {
    const id = Number(req.params.id);
    const jogo = jogos.find(j => j.id === id);

    if (!jogo) {
        return res.status(404).json({
            mensagem: "Jogo não encontrado"
        });
    }

    jogos = jogos.filter(j => j.id !== id);

    res.json({
        mensagem: "Jogo excluído com sucesso"
    });
});

module.exports = router;