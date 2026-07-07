"use client";

import { ApolloProvider } from "@apollo/client";
import { Provider } from "react-redux";
import { apolloClient } from "@/lib/apollo-client";
import { store } from "@/store/store";

export default function AppProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ApolloProvider client={apolloClient}>
      <Provider store={store}>{children}</Provider>
    </ApolloProvider>
  );
}
