import { IUser } from "../../interfaces";

export const MOCK_USER: IUser = {
  name: "Anonymous",
  email: "anonymous@gmail.com",
};

export const MOCK_INVALID_USER: IUser = {
  name: "AnonymousAnonymousAnonymousAnonymousAnonymousAnonymous",
  email: "anonymousanonymousanonymousanonymousanonymous@gmail.com",
};
