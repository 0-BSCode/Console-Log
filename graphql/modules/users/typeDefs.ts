import { objectType } from "nexus";
import User_Session from "../user_sessions/typeDefs";

export default objectType({
  name: "user",
  definition(t) {
    t.string("id");
    t.string("username");
    t.string("email");
    t.string("password");
    t.string("image");
  },
});
