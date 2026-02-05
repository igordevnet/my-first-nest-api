import { Test, TestingModule } from "@nestjs/testing";
import { UserService } from "./user.service";
import { FileService } from "../../shared/file/file.service";
import { SecurityService } from "../../shared/security/security.service";
import { UserRepositoreyMock } from "../../testing/user.repository.mock.test";
import { SecurityServiceMock } from "../../testing/security.service.test";
import { FileServiceMock } from "../../testing/file.service.test";

describe('UserService', () => {

    let userService: UserService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [UserService, 
                UserRepositoreyMock,
                SecurityServiceMock,
                FileServiceMock
            ],
        }).compile();

        userService = module.get<UserService>(UserService);
    });

    test('Check the definition of UserService', () => {
        expect(userService).toBeDefined();
    });
})