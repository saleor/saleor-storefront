import gql from "graphql-tag";

import { TypedQuery } from "../../../core/queries";
import { Category, CategoryVariables } from "../../Category/types/Category";

export const getCategoryQuery = gql`
   query Category{
    categories(first: 20){
      edges{
        node{
          id
          name
          slug           
        }
      }   
    }
  }
`;

export const TypedCategoryQuery = TypedQuery<Category,CategoryVariables>(getCategoryQuery)