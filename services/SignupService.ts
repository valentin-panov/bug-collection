import BaseService from "@services/BaseService";
import { InternalPages } from "@services/index";

class SignupService extends BaseService {
  constructor() {
    super("signup", InternalPages.SignupService.path);
  }
}

export default SignupService;
