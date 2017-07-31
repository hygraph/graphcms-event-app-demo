import ApolloClient, { createNetworkInterface } from 'apollo-client';

export const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: 'https://api.graphcms.com/simple/v1/cj5q6t1kjl9fk0122afr3cwsi'
  })
});
