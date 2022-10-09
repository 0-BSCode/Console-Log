import user from "./findOne";
import users from "./findMany";
import logIn from "./logIn";
import logOut from "./logOut";
import getCurrent from "./getCurrent";

const queries = [user, users, logIn, logOut, getCurrent];

export default queries;
