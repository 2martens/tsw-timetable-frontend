import {User} from "../../../auth/model/user";

export interface SubscriptionIntent {
  user: User;
  lookupKey: string;
}
