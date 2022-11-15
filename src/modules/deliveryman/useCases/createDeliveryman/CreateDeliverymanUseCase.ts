import { prisma } from "../../../../database/PrismaClient";

import { hash } from 'bcrypt'



interface IcreateDeliveryman {
    username: string;
    password: string;

}

export class CreateDeliverymanUsecase {
    async execute({ username, password }: IcreateDeliveryman) {

        const deliverymanExist = await prisma.deliveryman.findFirst({
            where: {
                username: {
                    equals: username,


                }
            }
        })

        if (deliverymanExist) {
            throw new Error("Deliveryman already exists")
        }

        const hadhPassword = await hash(password, 10)

        const client = await prisma.deliveryman.create({
            data: {
                username,
                password: hadhPassword
            }
        })

        return client;

    }
}