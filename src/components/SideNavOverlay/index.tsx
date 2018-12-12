// import * as React from "react";
// import { Query } from "react-apollo";
// import { Link } from "react-router-dom";
// import ReactSVG from "react-svg";

// import { generateCategoryUrl } from "../../core/utils";
// import Loader from "../Loader";
// import { Overlay } from "../Overlay";
// import { OverlayContext, OverlayType } from "../Overlay/context";
// import { TypedCategoryListQuery, categoryList } from "./queries";

// import "./scss/index.scss";
// import { Categories_categories, Categories } from "./types/Categories";
// import { Deloader } from "../../core/queries";
// import SideNav from "../SideNav";
// import SideNavItem from "../SideNavItem/NavItem";

// const SideNavOverlay: React.SFC = () => (
//   <OverlayContext.Consumer>
//     {overlayContext => {
//       return (
//         <SideNav>
//           {({ rootCategories, loading }) => {
//             if (overlayContext.type === OverlayType.sideNav) {
//               const isHomePage = window.location.pathname === "/";
//               return (
//                 <Overlay context={overlayContext}>
//                   <div className="side-nav" onClick={e => e.stopPropagation()}>
//                     <ul>
//                       <li className="side-nav__menu-item side-nav__menu-item--parent">
//                         {isHomePage ? (
//                           <span />
//                         ) : (
//                           <Link to="/">
//                             <span className="side-nav__menu-item-label">
//                               <ReactSVG
//                                 className="side-nav__menu-item-back"
//                                 path={require("../../images/arrow-back.svg")}
//                               />{" "}
//                               Home
//                             </span>
//                           </Link>
//                         )}
//                         <span
//                           className="side-nav__menu-item-close side-nav__menu-item-close"
//                           onClick={overlayContext.hide}
//                         >
//                           <span />
//                         </span>
//                       </li>
//                     </ul>
//                   </div>
//                   <ul>
//                     {rootCategories.map(category => (
//                       <SideNavItem
//                         key={category.id}
//                         category={category}
//                         hideOverlay={overlayContext.hide}
//                       />
//                     ))}
//                   </ul>
//                   {loading && <Loader />}
//                 </Overlay>
//               );
//             }

//             return null;
//           }}
//         </SideNav>
//       );
//     }}
//   </OverlayContext.Consumer>
// );

// export default SideNavOverlay;
