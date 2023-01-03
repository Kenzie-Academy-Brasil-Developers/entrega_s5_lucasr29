import * as express from 'express'
import { IPropertyRequest } from '../../interfaces/properties'

declare global {
    namespace Express {
        interface Request {
            user: {
                id: string,
                isAdm: boolean,
                email: string
            }

            userAttInfo: {
                id: string
            }

            validatedProperty: IPropertyRequest
        }
    }
}

export {}