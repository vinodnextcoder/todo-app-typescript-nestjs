import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "../model/user.schema";
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Handler } from "../utils/handler";


@Injectable()
export class UserService {

    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly sucesHandle: Handler
    ) { }

    async signup(user: User): Promise<User> {
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(user.password, salt);
        const reqBody = {
            fullname: user.fullname,
            email: user.email,
            password: hash,
            mobileNo: user.mobileNo
        }
        const newUser = new this.userModel(reqBody);
        let responseData = await newUser.save();
        return responseData
    }

    async signin(user: User, jwt: JwtService): Promise<any> {
        try {
            const foundUser = await this.userModel.findOne({ mobileNo: user.mobileNo }).exec();
            if (foundUser) {
                const { password } = foundUser;
                let checkPassword = await bcrypt.compare(user.password, password);
                if (checkPassword) {
                    const payload = { mobileNo: user.mobileNo };
                    let token = jwt.sign(payload);
                    return this.sucesHandle.successResponse({ token })

                }
                return this.sucesHandle.erroresponse(HttpStatus.UNAUTHORIZED, 'Incorrect username or password');
            }
            return this.sucesHandle.erroresponse(HttpStatus.UNAUTHORIZED, 'Incorrect username or password');

        } catch (error) {
            return this.sucesHandle.erroresponse(HttpStatus.UNAUTHORIZED, 'something went wrong please try again later');
        }
    }

    async getOne(mobileNo): Promise<User> {
        return await this.userModel.findOne({ mobileNo }).exec();
    }
}