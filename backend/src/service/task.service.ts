import {
    Injectable
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Task, TaskDocument } from "../model/task.schema";
import { EventsGateway } from '../events/event.gateway';



@Injectable()
export class taskService {

    constructor(@InjectModel(Task.name) 
    private taskModel: Model<TaskDocument>,
    private EventsGatewayinfo: EventsGateway) { }

    async createTask(task: Object): Promise<Task> {
        const newTask = new this.taskModel(task);
        this.EventsGatewayinfo.newTasks(newTask)
        return newTask.save();
    }
    async readtask(id,createdBy): Promise<any> {
        if (id.id) {
            return this.taskModel.findOne({ _id: id.id }).populate("createdBy").exec();
        }
        if (createdBy) {
            return this.taskModel.find({ createdBy: createdBy}).populate("createdBy").exec();
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