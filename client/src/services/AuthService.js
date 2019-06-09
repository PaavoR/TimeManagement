import { setToStorage } from "../functions/storage";
export default class AuthService {
  constructor() {
    this.register = this.register.bind(this);
  }
  async register(credentials) {
    const { name, email, password, password2 } = credentials;
    if (password !== password2) throw [{ msg: "Salasanat eivät täsmää!" }];
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
      if (res.token) {
        setToStorage("token", res.token);
      }
      return res;
    } catch (err) {
      console.error(err.response.data);
      throw err;
    }
  }
}
