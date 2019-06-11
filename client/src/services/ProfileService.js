import { getFromStorage } from "../functions/storage";
import axios from "axios";

export default class ProfileService {
  constructor() {}
  async getUserData() {
    const token = getFromStorage("token");
    if (!token) {
      throw { errors: [{ msg: "Tokenia ei löytynyt!" }] };
    }
    try {
      const config = {
        headers: {
          "x-auth-token": token
        }
      };
      const res = await axios.get("/api/user/", config);
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
}
