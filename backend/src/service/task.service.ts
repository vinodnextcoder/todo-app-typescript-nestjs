import {
    Injectable
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Task, TaskDocument } from "../model/task.schema";


@Injectable()
export class taskService {

    constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) { }

    async createTask(task: Object): Promise<Task> {
        const newTask = new this.taskModel(task);
        return newTask.save();
    }
    async readtask(id): Promise<any> {
        if (id.id) {
            return this.taskModel.findOne({ _id: id.id }).populate("createdBy").exec();
        }
        return this.taskModel.find().populate("createdBy").exec();
    }

    async update(id, task): Promise<any> {
        return await this.taskModel.findOneAndUpdate({ _id: id }, task)
    }

    async delete(id): Promise<any> {
        return await this.taskModel.findByIdAndRemove(id);
    }
}