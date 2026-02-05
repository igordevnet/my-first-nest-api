import { FileService } from "../shared/file/file.service";

export const FileServiceMock = {
    provide: FileService,
    useValue: {
        upload: jest.fn(),
        delete: jest.fn(),
    },
}