import { Injectable } from "@nestjs/common";
import { writeFile } from "fs/promises";
import { join } from "path";


@Injectable()
export class FileService {
    async uploadPhoto(file: Express.Multer.File, path: string) {
        await writeFile(path, file.buffer);

        return {
            success: true,
            path: path,
        };
    }

    async uploadDocuments(docs: Express.Multer.File[], path: string) {
        for (let i = 0; i < docs.length; i++) {
            const filePath = join(path, docs[i].originalname);
            await writeFile(filePath, docs[i].buffer);
        }

        return {
            success: true,
            path: path,
        };
    }
}