import BaseService from "@services/BaseService";
import { InternalPages } from "@services/index";

class AuthService extends BaseService {
  constructor() {
    super("auth", InternalPages.AuthService.path);
  }
}

export default AuthService;
