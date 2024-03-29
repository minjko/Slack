import { Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt'
import { UsersService } from '../users/users.service';
import {InjectRepository} from "@nestjs/typeorm";
import { Users } from '../entities/Users';
import { Repository } from "typeorm";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Users) private usersRepository: Repository<Users>,
                ) {}

    async validateUser(email: string, password: string) {
        const user = await this.usersRepository.findOne({
            where: { email },
            select: ['id', 'email', 'password', 'nickname'],
            // Users.ts에서   @Column('varchar', { name: 'password', length: 100, select: false })
            //   password: string; select:false이면 password제외하고 가져오므로 여기에서 가져와줘야 한다.
        })
        console.log(email, password, user);
        if (!user) {
            return null;
        }
        const result = await bcrypt.compare( password, user.password);
        if (result) {
            const { password, ...userWithoutPassword } = user;  // password 제외하고 나머지 === delete user.password;
            return userWithoutPassword;
        }
        return null;
    }
}