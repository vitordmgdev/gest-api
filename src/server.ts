import Fastify from "fastify";
import cors from "@fastify/cors";
import authRoutes from "./routes/auth-routes";
import dotenv from "dotenv";
dotenv.config();

const rawPort = process.env.PORT;

if(!rawPort) {
    throw new Error("Porta não definida em .env (PORT)");
}

const port = Number(process.env.PORT);
if(Number.isNaN(port)) {
    throw new Error(`❌ Porta inválida: ${rawPort}`)
}

const app = Fastify();

app.register(cors, {
    origin: true
});

app.register(authRoutes, {
    prefix: "/auth/"
});


app.listen({ port })
.then(() => {
    console.log(`Server running on http://localhost:${port}`)
})
.catch((err) => {
    console.log(`🔥 Erro ao iniciar o servidor:`, err);
    process.exit(1);
});