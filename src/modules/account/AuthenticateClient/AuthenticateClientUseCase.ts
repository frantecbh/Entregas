import { prisma } from "../../../database/PrismaClient";
import { compare } from 'bcrypt'

import { sign } from 'jsonwebtoken'

interface IAuthenticateClient {
    username: string;
    password: string;
}


export class AuthenticateClientUseCase {
    async execute({ username, password }: IAuthenticateClient) {

        //Receber usuário


        //verificar se username cadastrdo
        const client = await prisma.clients.findFirst({
            where: {
                username
            }
        })

        if (!client) {
            throw new Error("Usuário o senha incorreta")
        }

        //verificar se senha corresponde ao tocken
        const passwordMatch = await compare(password, client.password)

        if (!passwordMatch) {
            throw new Error("Usuário o senha incorreta")
        }

        //gerar o token

        const token = sign({ username }, process.env.ACCESS_TOKEN!, {
            subject: client.id,
            expiresIn: "1d"
        })

        return token


    }
}