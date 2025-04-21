import { FastifyReply, FastifyRequest } from "fastify";
import UserRepository from "repository/user-repository";
import { verifyCredentialsSchema } from "schemas/auth-schemas";

const AuthController = {
    verifyCredentials: async(
        request: FastifyRequest, 
        reply: FastifyReply
    ) => {
        const {username, email} = verifyCredentialsSchema.parse(request.body);
        const existsUser = await UserRepository.existingUser(username, email);

        if(!existsUser) {
            return reply.send({ message: "Email e username disponíveis" }).code(200);
        }
    }
};

export default AuthController;