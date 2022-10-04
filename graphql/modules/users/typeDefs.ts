import { objectType } from "nexus";

export default objectType({
  name: "users",
  definition(t) {
    t.string("id");
    t.string("username");
    t.string("email");
    t.string("password");
    t.string("image");
  },
});
