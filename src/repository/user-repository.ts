import { AppError } from "errors/app-error";
import prisma from "lib/prisma";

const UserRepository = {
    existingUser: async(email: string, username: string) => {
        const user = await prisma.user.findFirst({
            where: {
                OR: [{email}, {username}]
            },
        });

        if(user) {
            throw new AppError("Já existe um usuário com este username ou email");
        }

        return null;
    }
};

export default UserRepository;