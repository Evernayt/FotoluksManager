import { $authHost } from "..";
import { ITaskMessage, ITaskMessageData } from "../../models/api/ITaskMessage";
import { CreateTaskMessageDto } from "./dto/create-task-message.dto";
import { GetTaskMessagesDto } from "./dto/get-task-messages.dto";
import { UpdateTaskMessageDto } from "./dto/update-task-message.dto";

export default class TaskMessageAPI {
  static async create(
    createTaskMessageDto?: CreateTaskMessageDto
  ): Promise<ITaskMessage> {
    const { data } = await $authHost.post(
      "task-messages",
      createTaskMessageDto
    );
    return data;
  }

  static async getAll(
    getTaskMessagesDto?: GetTaskMessagesDto,
    signal?: AbortSignal
  ): Promise<ITaskMessageData> {
    const { data } = await $authHost.get("task-messages", {
      params: getTaskMessagesDto,
      signal,
    });
    return data;
  }

  static async update(
    updateTaskMessageDto?: UpdateTaskMessageDto
  ): Promise<ITaskMessage> {
    const { data } = await $authHost.put("task-messages", updateTaskMessageDto);
    return data;
  }
}
