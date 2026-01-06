import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { UpdateUserDTO } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";
import { SecurityService } from "src/security/security.service";

@Injectable()
export class UserService {

    constructor(private readonly prisma: PrismaService, private readonly securityService: SecurityService) { }

    async create({ email, name, password }: CreateUserDTO) {
        password = await this.securityService.hashPassword(password);
        
        return this.prisma.user.create({
            data: {
                name_user: name,
                email,
                password
            },
        });
    }

    async findByEmail(email: string): Promise<User> {
        const user = await this.prisma.user.findUnique({
            where: {
                email
            }
        });

        if (!user){
            throw new BadRequestException(`This email does not exist.`);
        }

        return user;
    }

    async list() {
        return this.prisma.user.findMany();
    }

    async getUser(id: number) {
        await this.exists(id);

        return this.prisma.user.findUnique({
            where: {
                id_user: id
            }
        })
    }

    async update(id: number, { email, name, password }: UpdateUserDTO) {
         await this.exists(id);
        
        return this.prisma.user.update({
            data: {
                name_user: name,
                email,
                password
            },
            where: {
                id_user: id
            }
        })
    }

    async delete(id: number) {
         await this.exists(id);

        return this.prisma.user.delete({
            where: {
                id_user: id
            }
        })
    }

    async exists(id: number) {
        if (!(await this.prisma.user.count({
            where: {
                id_user: id
            }
        }))){
            throw new NotFoundException(`User ${id} does not exit.`)
        }
    }
}