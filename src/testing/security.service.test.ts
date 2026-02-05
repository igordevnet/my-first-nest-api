import { SecurityService } from "../shared/security/security.service";

export const SecurityServiceMock = {
    provide: SecurityService,
    useValue: {
        hashPassword: jest.fn(),
        comparePassword: jest.fn(),
    },
}