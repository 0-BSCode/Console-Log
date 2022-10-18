import typeDefs from "./typeDefs";
import queries from "./queries";
import mutations from "./mutations";

const topicSchema = [typeDefs, ...queries, ...mutations];

export default topicSchema;
