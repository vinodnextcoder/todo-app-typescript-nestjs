import { HttpStatus, Injectable } from "@nestjs/common"

@Injectable()
export class Handler {
    constructor() { }
 
   async success(response,responseData) {
    
        return response.status(HttpStatus.CREATED).json({
            status:{
                code:1000,
                header:"success",
                description:"sucess"
            },
            data:responseData
        });
    }
    errorException(response,error) {

        let message = 'something went wrong please try again later';
        if(error && error.code ==11000){
            message ="Duplicate value"
        }
        if (typeof error === "string") {
            message =error
        }
        return response.status(400).json({
            status:{
                code:(error && error.code) || 1999,
                header:"Invalid request",
                description:message

            },
            data:null
        });
    }

    async successResponse(responseData) {
        return {
            status:{
                code:1000,
                header:"success",
                description:"sucess"
            },
            data:responseData
        }
    }
    async erroresponse(code,responseData) {
        return {
            status:{
                code:code|| 1999,
                header:"Invalid request",
                description:responseData
            },
            data:null
        }
    }
}