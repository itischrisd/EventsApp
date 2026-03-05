import { Outlet } from "react-router-dom";
import NavBar from "./NavBar.jsx";
import NavMenu from "./NavMenu.jsx";

function Layout() {
  return (
    <div id="wrapper">
      <NavMenu />
      <div id="content-wrapper">
        <div id="content">
          <NavBar />
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;
