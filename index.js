const express = require("express");
const jogosRoutes = require("./routes/jogos");

const app = express();

app.use(express.json());

// Mostra as requisições no console
app.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
});

// Rotas dos jogos
app.use("/jogos", jogosRoutes);

// Rota não encontrada
app.use((req, res) => {
    res.status(404).json({
        mensagem: "Rota não encontrada"
    });
});

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});