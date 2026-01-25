import { BadRequestException, Body, Controller, Delete, FileTypeValidator, Get, MaxFileSizeValidator, Param, ParseFilePipe, ParseIntPipe, Patch, Post, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdateUserDTO } from "./dto/update-user.dto";
import { UserService } from "./user.service";
import { ParamId } from "src/shared/Decorators/param-id.decorator";
import { AuthGuard } from "src/shared/auth/guards/auth.guard";
import { FileFieldsInterceptor, FileInterceptor } from "@nestjs/platform-express";
import { User } from "src/shared/Decorators/user.decorator";

@Controller(`users`)
export class UserController {

    constructor(private readonly userService: UserService) { }

    @Post()
    async create(@Body() createUserDTO: CreateUserDTO) {
        return this.userService.create(createUserDTO);
    }

    @Get()
    async read() {
        return this.userService.list();
    }

    @Get(':id')
    async readOne(@ParamId() id: number) {
        console.log({ id })

        return this.userService.getUser(id);
    }

    @Patch(':id')
    async update(@Param('id', ParseIntPipe) id, @Body() updateUserDTO: UpdateUserDTO) {

        console.log('BODY:', updateUserDTO);
        return this.userService.update(id, updateUserDTO);
    }

    @Delete(':id')
    @UseGuards(AuthGuard)
    async delete(@Param('id', ParseIntPipe) id) {
        return this.userService.delete(id);
    }

    @Post('photo')
    @Post('photo')
    @UseGuards(AuthGuard)
    @UseInterceptors(FileInterceptor('file'))
    async uploadPhoto(
        @User() user,
        @UploadedFile(new ParseFilePipe({
            validators: [new MaxFileSizeValidator({maxSize: 1024 * 300})]
        })) file: Express.Multer.File,
    ) {
        if (!file) {
            throw new BadRequestException('File is required');
        }

        if (file.mimetype !== 'image/jpeg') {
            throw new BadRequestException('Only JPEG images are allowed');
        }

        return this.userService.uploadPhoto(user.id_user, file);
    }


    @Post('files-fields')
    @UseGuards(AuthGuard)
    @UseInterceptors(FileFieldsInterceptor([{
        name: 'documents',
        maxCount: 10,
    }]))
    async uploadFiles(@User() user, @UploadedFiles() files: { documents: Express.Multer.File[] }) {
        console.log(files)

        return this.userService.uploadFiles(user.id_user, files);
    }
}