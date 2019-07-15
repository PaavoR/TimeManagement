import { getFromStorage } from "../functions/storage";
import axios from "axios";

export default class TaskService {
  constructor() {}

  async getTaskTypes() {
    try {
      const token = getFromStorage("token");
      const config = {
        headers: {
          "x-auth-token": token
        }
      };
      const res = await axios.get("/api/tasktypes", config);
      return res;
    } catch (err) {
      if (err.response) {
        const errors = await err.response.data;
        console.log(errors);
        throw errors;
      } else {
        throw err;
      }
    }
  }
  async getUserTasks() {
    try {
      const token = getFromStorage("token");
      const config = {
        headers: {
          "x-auth-token": token
        }
      };
      const res = await axios.get("/api/tasks", config);
      const { data } = res;
      return data;
    } catch (err) {
      if (err.response) {
        const errors = await err.response.data;
        console.log(errors);
        throw errors;
      } else {
        throw err;
      }
    }
  }

  async addNewTask(taskData) {
    try {
      const token = getFromStorage("token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token
        }
      };
      const body = JSON.stringify(taskData);
      console.log(body);
      const res = await axios.post("/api/tasks", body, config);
      return res;
    } catch (err) {
      if (err.response) {
        const errors = await err.response.data;
        console.log(errors);
        throw errors;
      } else {
        throw err;
      }
    }
  }

  async editTask(taskData, id) {
    try {
      const token = getFromStorage("token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token
        }
      };
      const body = JSON.stringify(taskData);
      console.log(body);
      const res = await axios.put("/api/tasks/" + id, body, config);
      return res;
    } catch (err) {
      if (err.response) {
        const errors = await err.response.data;
        console.log(errors);
        throw errors;
      } else {
        throw err;
      }
    }
  }
}
