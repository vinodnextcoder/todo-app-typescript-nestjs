import { Body, Controller, Get, HttpStatus, Param, Post, UseInterceptors, UploadedFiles, Put, Req, Res, Query, UploadedFile } from "@nestjs/common";
import { TaskDocument } from "../model/task.schema"
import { taskService } from "../service/task.service";
import { FileInterceptor} from "@nestjs/platform-express";
import { Handler } from "../utils/handler";


@Controller('/api/v1/task')
export class TaskController {
    constructor(private readonly taskService: taskService,
        private readonly sucesHandle: Handler) { }

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async createBook(@Res() response, @Req() request, @Body() task: TaskDocument, @UploadedFile() file: Express.Multer.File) {
        try {

            let requestBody: any = {}
            if (file) {
                requestBody = { createdBy: request.user._id, title: task.title,description: task.description,cat:task.cat, ...file }
            }
            else {
                requestBody = { createdBy: request.user._id, title: task.title,description: task.description,cat:task.cat }
            }
    
            const newTask = await this.taskService.createTask(requestBody);
            const result = await this.sucesHandle.success(response, newTask);
            return result;
        }
        catch (error) {
            return this.sucesHandle.errorException(response,error);
        }

    }

    @Get()
    async read( @Req() request,@Query() id): Promise<Object> {
        let createdBy=request.user._id;
        return await this.taskService.readtask(id,createdBy);
    }


    @Put('/:id')
    async update(@Res() response, @Param('id') id, @Body() task: TaskDocument) {
        const updatedTask = await this.taskService.update(id, task);
        return response.status(HttpStatus.OK).json({})
    }
}