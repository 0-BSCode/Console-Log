import { User_Session } from "@prisma/client";
import { objectType } from "nexus";
import User from "../users/typeDefs";

export default objectType({
  name: "user_session",
  definition(t) {
    t.string("id");
    t.string("accessToken");
    t.string("refreshToken");
    t.field("user", {
      type: User,
      async resolve(session: User_Session, _, ctx) {
        console.log("SESSION");
        console.log(session);
        try {
          return await prisma.user.findFirst({
            where: {
              id: session.userId,
            },
          });
        } catch (e) {
          throw new Error(`Error on user session: ${e}`);
        }
      },
    });
  },
});
