import { Body, Controller,Post, Res } from "@nestjs/common";
import { User } from "../model/user.schema";
import { UserService } from "../service/user.service";
import { JwtService } from '@nestjs/jwt';
import { Handler } from "../utils/handler";

@Controller('/api/v1/user')
export class UserController {
    constructor(private readonly userServerice: UserService,
        private jwtService: JwtService,
        private readonly sucesHandle: Handler
    ) { }

    @Post('/signup')
    async Signup(@Res() response, @Body() user: User) {  
        try {
        const newUSer = await this.userServerice.signup(user);
        let result = this.sucesHandle.success(response, newUSer);
        return result
        }
        catch(error){
            return this.sucesHandle.errorException(response,error);
        }
    }

    @Post('/signin')
    async SignIn(@Res() response, @Body() user: User) {
        try{
            const result = await this.userServerice.signin(user, this.jwtService);
            if(result && result.status && result.status.code === 1000){
                return response.status(200).json(result);
            }
            return response.status(401).json(result);
        }
        catch(error){
            return this.sucesHandle.errorException(response,error);
        }

    }
}