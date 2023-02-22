import React from "react";
import { BiArrowBack } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import useBreadcrumbs from "use-react-router-breadcrumbs";
import { SearchNavbarValue } from "../recoil/SearchValues";
const NavItem = ({ to, name }) => {
  const location = useLocation();
  const css =
    "after:absolute after:w-full after:h-[2px] after:bg-black after:bottom-0 after:left-0 text-blue-700";
  return (
    <div
      className={`h-full mr-8 flex items-center relative ${
        location.pathname === to ||
        (to !== "/" && location.pathname.includes(to))
          ? css
          : ""
      }`}
    >
      <Link className="text-lg" to={to}>
        {name}
      </Link>
    </div>
  );
};

const Navbar = () => {
  const DynamicUserBreadcrumb = ({ match }) => <span></span>;
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useRecoilState(SearchNavbarValue);
  const routes = [
    { path: "/", breadcrumb: "Home" },
    { path: "/product", breadcrumb: "Products" },
    { path: "/product/create-product", breadcrumb: "Create-product" },
    {
      path: "/product/update-product/:producId",
      breadcrumb: DynamicUserBreadcrumb,
    },
  ];
  const breadcrumbs = useBreadcrumbs(routes);
  return (
    <nav className="h-48 relative">
      <div className="h-2/5 px-20 flex shadow-md">
        <NavItem to="/" name="Dashboard" />
        <NavItem to="/product" name="Products" />
      </div>
      <div className="w-full h-3/5 border-b-[1px]">
        <span
          className=" font-medium ml-16 cursor-pointer absolute -left-4 bottom-[50px]"
          onClick={() => navigate(-1)}
        >
          <BiArrowBack />
        </span>
        <div className="h-full px-20 flex items-center w-full">
          <div className="flex items-center w-full">
            <div className="w-1/3">
              {breadcrumbs.map(({ match, breadcrumb }, index) => (
                <NavLink
                  className="mr-1 hover:text-blue-900 underline"
                  key={match.pathname}
                  to={match.pathname}
                >
                  {breadcrumb}
                  {index === breadcrumbs.length - 1 ? "" : " \\"}
                </NavLink>
              ))}
            </div>
            <div className="flex flex-1 items-center">
              <div className="relative flex items-center ml-12">
                <input
                  className="w-96 h-12 px-4 rounded-md border-[1px] border-gray-300 outline-none focus:outline-none mr-2 focus:border-blue-700 text-xl pr-10"
                  type="text"
                  placeholder="Enter your search..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
                <BsSearch className="absolute right-6" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
