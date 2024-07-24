export const BASE_API_ENDPOINT =
  "https://vocab-builder-backend.p.goit.global/api";
export const USERS_API_ENDPOINT = BASE_API_ENDPOINT + "/users";
export const WORDS_API_ENDPOINT = BASE_API_ENDPOINT + "/words";

export const USERS_ENDPOINTS = {
  signup: "/signup",
  signin: "/signin",
  signout: "/signout",
  current: "/current",
};

export const WORDS_ENDPOINTS = {
  categories: "/categories",
  create: "/create",
  add: "/add",
  edit: "/edit",
  all: "/all",
  own: "/own",
  delete: "/delete",
  statistics: "/statistics",
  tasks: "/tasks",
  answers: "/answers",
};
