import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseInterceptors } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdateUserDTO } from "./dto/update-user.dto";
import { UserService } from "./user.service";
import { ParamId } from "src/Decorators/param-id.decorator";

@Controller(`users`)
export class UserController {

    constructor(private readonly userService: UserService) {}

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
        console.log({id})

        return this.userService.getUser(id);
    }

    @Patch(':id')
    async update(@Param('id', ParseIntPipe) id, @Body() updateUserDTO: UpdateUserDTO) {
        return this.userService.update(id, updateUserDTO);
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id) {
        return this.userService.delete(id);
    }
}