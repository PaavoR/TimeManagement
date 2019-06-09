import { setToStorage } from "../functions/storage";
import axios from "axios";

export default class AuthService {
  constructor() {
    this.register = this.register.bind(this);
  }
  async register(credentials) {
    const { name, email, password, password2 } = credentials;
    if (password !== password2)
      throw { errors: [{ msg: "Salasanat eivät täsmää!" }] };
    try {
      const newUser = {
        name,
        email,
        password
      };
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      };
      const body = JSON.stringify(newUser);
      const res = await axios.post("/api/user/register", body, config);
      const { data } = await res;
      if (data.token) {
        console.log(data);
        setToStorage("token", data.token);
        return true;
      }
      return false;
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
