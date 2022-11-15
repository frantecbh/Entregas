import { Request, Response } from "express";

import { CreateDeliverymanUsecase } from "./CreateDeliverymanUseCase";



export class CreateDeliverymanController {

    async handle(request: Request, response: Response) {

        const { username, password } = request.body

        const createDeliverymanUsecase = new CreateDeliverymanUsecase()

        const result = await createDeliverymanUsecase.execute({
            username,
            password

        })

        return response.status(201).json(result)

    }

}