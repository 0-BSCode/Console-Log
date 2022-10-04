import typeDefs from "./typeDefs";
import queries from "./queries";
import mutations from "./mutations";

const userSchema = [typeDefs, ...queries, ...mutations];

export default userSchema;
