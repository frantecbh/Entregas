import { Request, Response } from "express";
import { CreateClientUseCase } from "./CreateClientuseCase";



export class CreateClientController {

    async handle(request: Request, response: Response) {

        const { username, password } = request.body

        const createClientUsecase = new CreateClientUseCase()

        const result = await createClientUsecase.execute({
            username,
            password

        })

        return response.status(201).json(result)

    }

}