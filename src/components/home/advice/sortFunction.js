// import { useHistory } from "react-router";

// export const sortAdvices = (data, sortBy) => {
//   const history = useHistory();
//   console.log(data);
//   if (data) {
//     if (!sortBy || sortBy === "recent") {
//       // default
//       return data.sort((a, b) => {
//         return b.__createdtime__ - a.__createdtime__;
//       });
//     }
//     if (sortBy === "oldest") {
//       return data.sort((a, b) => {
//         return a.__createdtime__ - b.__createdtime__;
//       });
//     }
//     if (sortBy === "upvoted") {
//       return data.sort((a, b) => {
//         return Number(b.upvotes.length - a.upvotes.length);
//       });
//     }
//     if (sortBy === "general") {
//       return data.filter((d) => d.category === "general");
//     }
//     if (sortBy === "web-development") {
//       return data.filter((d) => d.category === "web-development");
//     }
//     if (sortBy === "product-management") {
//       return data.filter((d) => d.category === "product management");
//     }
//     if (sortBy === "ui-ux") {
//       return data.filter((d) => d.category === "ui-ux");
//     }
//     if (sortBy === "soft-skills") {
//       return data.filter((d) => d.category === "soft-skills");
//     }
//   } else {
//     // Redirect to recent if the url id is invalud
//     // history.push("/recent");
//     return data.sort((a, b) => {
//       return b.__createdtime__ - a.__createdtime__;
//     });
//   }
// };
