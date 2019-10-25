import {gql} from 'apollo-boost';

export const ALL_ROOMS = gql`
  query QUERY_ROOMS {
    rooms {
      name
      title
      avatar
      description
      active
      createdAt
      updatedAt
    }
  }
`;
