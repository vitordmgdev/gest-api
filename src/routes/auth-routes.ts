import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import AuthController from "controllers/auth-controller";
import { verifyCredentialsSchema } from "schemas/auth-schemas";

async function authRoutes(app: FastifyInstance) {
    app.post("/verify", 
        { 
            preValidation: async(request: FastifyRequest, reply: FastifyReply) => {
                const parse = await verifyCredentialsSchema.safeParseAsync(request.body);

                if(!parse.success) {
                    return reply.code(400).send({
                        message: "Dados inválidos",
                        errors: parse.error.flatten().fieldErrors
                    })
                }
            }
        }, 
        AuthController.verifyCredentials
    );
};

export default authRoutes;