import { getRepositoryToken } from "@nestjs/typeorm";
import { User } from "../core/user/entities/user.entity";

export const UserRepositoreyMock = {
    provide: getRepositoryToken(User),
    useValue: {
        create: jest.fn(),
        save: jest.fn(),
        findOne: jest.fn(),
        find: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
        exists: jest.fn(),
    }
}