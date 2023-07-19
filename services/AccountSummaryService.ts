import BaseService from "@services/BaseService";
import { InternalPages } from "@services/index";

class AccountSummaryService extends BaseService {
  constructor() {
    super("accountsummary", InternalPages.AccountSummaryPage.path);
  }
}

export default AccountSummaryService;
