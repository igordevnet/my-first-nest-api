import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { PrismaService } from "src/shared/prisma/prisma.service";
import { UpdateUserDTO } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";
import { SecurityService } from "src/shared/security/security.service";
import { FileService } from "src/shared/file/file.service";
import { join } from "path";
import { mkdir } from "fs/promises";


@Injectable()
export class UserService {

    constructor(private readonly prisma: PrismaService,
        private readonly securityService: SecurityService,
        private readonly fileService: FileService
    ) { }

    async create({ email, name, password, role }: CreateUserDTO) {
        password = await this.securityService.hashPassword(password);

        return this.prisma.user.create({
            data: {
                name_user: name,
                email,
                password,
                role
            },
        });
    }

    async findByEmail(email: string): Promise<User> {
        const user = await this.prisma.user.findUnique({
            where: {
                email
            }
        });

        if (!user) {
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
            },
            select: {
                id_user: true,
                name_user: true,
                email: true,
                role: true,
                created_at: true,
                updated_at: true
            },
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
        }))) {
            throw new NotFoundException(`User ${id} does not exit.`)
        }
    }

    async uploadPhoto(userId: number, file: Express.Multer.File) {
        const uploadDir = join(process.cwd(), 'storage', 'photos');

        await mkdir(uploadDir, { recursive: true });

        const filePath = join(uploadDir, `photo-${userId}.jpg`);

        try{
            return this.fileService.uploadPhoto(file, filePath)
        }
        catch (e){
            throw new BadRequestException(e)
        }

    }
}