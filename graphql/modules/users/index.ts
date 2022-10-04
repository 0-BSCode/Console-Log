import typeDefs from "./typeDefs";
import queries from "./queries";

const userSchema = [typeDefs, ...queries];

export default userSchema;
