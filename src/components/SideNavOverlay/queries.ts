// import gql from "graphql-tag";

// import { TypedQuery } from "../../core/queries";
// import { Categories, CategoriesVariables } from "./types/Categories";

// // export const categoryDetail = gql`
// //   query Category o
// // `;

// export const subCategoryDetails = gql`
//   fragment SubCategoryFragment on Category {
//     id
//     name
//     children {
//       totalCount
//     }
//   }
// `;
// export const categoryList = gql`
//   ${subCategoryDetails}
//   query Categories($level: Int, $after: String, $first: Int = 20) {
//     categories(level: $level, first: $first, after: $after) {
//       edges {
//         node {
//           ...SubCategoryFragment
//         }
//       }
//       pageInfo {
//         hasNextPage
//         endCursor
//       }
//     }
//   }
// `;

// export const TypedCategoryListQuery = TypedQuery<
//   Categories,
//   CategoriesVariables
// >(categoryList);
