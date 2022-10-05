import typeDefs from "./typeDefs";
import queries from "./queries";
import mutations from "./mutations";

const userSessionSchema = [typeDefs, ...queries, ...mutations];

export default userSessionSchema;
