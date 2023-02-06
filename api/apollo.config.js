import { ApolloClient, InMemoryCache } from "@apollo/client";

const development = false;
const LOCAL_API = "http://wtx-system.local:3000/graphql";
const API = "https://nameless-brook-360150.eu-central-1.aws.cloud.dgraph.io/graphql"

export const MOBILITYCARE_API = development ? LOCAL_API : API;

export const client = new ApolloClient({
  uri: MOBILITYCARE_API,
  cache: new InMemoryCache(),
});

export default client;
