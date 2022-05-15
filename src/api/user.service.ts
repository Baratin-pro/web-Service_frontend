import { User } from './../models/user.model';
import { Authentification } from './../models/authentification.model';
import { httpRequestInstance } from "./httpRequest";

export class UserService {
  public login(email: string, password: string) {
    return httpRequestInstance.post(Authentification, 'user/login', { email, password });
  }
  public signup(email: string, password: string, username: string) {
    return httpRequestInstance.post(User, 'user/signup', { email, password, username });
  }
  public account() {
    return httpRequestInstance.get(User, 'user/account');
  }
}