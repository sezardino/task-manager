import { ApolloProvider as Provider } from "@apollo/client";
import { PropsWithChildren } from "react";
import { apolloClient } from "./client";

export const ApolloProvider = ({ children }: PropsWithChildren) => (
  <Provider client={apolloClient}>{children}</Provider>
);
