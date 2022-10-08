import { objectType } from "nexus";

const UserObjectType = objectType({
  name: "User",
  definition(t) {
    t.string("id");
    t.string("username");
    t.string("email");
    t.string("password");
    t.string("image");
    t.dateTime("createdAt");
    t.dateTime("updatedAt");
  },
});

export default UserObjectType;
