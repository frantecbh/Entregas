import { prisma } from "../../../../database/PrismaClient";

import { hash } from 'bcrypt'



interface IcreateClient {
    username: string;
    password: string;

}

export class CreateClientUseCase {
    async execute({ username, password }: IcreateClient) {

        const clientExist = await prisma.clients.findFirst({
            where: {
                username: {
                    equals: username,


                }
            }
        })

        if (clientExist) {
            throw new Error("Client already exists")
        }

        const hadhPassword = await hash(password, 10)

        const client = await prisma.clients.create({
            data: {
                username,
                password: hadhPassword
            }
        })

        return client;

    }
}