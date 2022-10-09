import typeDefs from "./typeDefs";
import queries from "./queries";
import mutations from "./mutations";

const noteSchema = [typeDefs, ...queries, ...mutations];

export default noteSchema;
