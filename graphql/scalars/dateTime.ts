import { GraphQLDate } from "graphql-iso-date";
import { asNexusMethod } from "nexus";

export default asNexusMethod(GraphQLDate, "dateTime");
