import type { ErrorHandler } from "elysia"

export class UnAuthorized extends Error {
    status = 401
    constructor(message: string) {
        super(message)
    }
}


export const errors = { UnAuthorized }
type Errors = {readonly UnAuthorized: UnAuthorized} 


export const globalErrorHandler:ErrorHandler<Errors>=({code, status, error, path})=>{

    switch(code){
        case "UnAuthorized":
          return status(error.status, {code, path, error: error.message})
    }

    return status(500,{
        code,
        path,
        error: (error as any)?.message || error
    })
}