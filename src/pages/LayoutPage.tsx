import { Outlet } from "react-router-dom";
import { Header } from "../components/core/Header/Header";
import { SideBar } from "../components/core/SideBar/SideBar";

export const LayoutPage = () => {
  return (
    <div>
      <div>
        <Header />
      </div>
      <div className="container-body">
        <aside>
          <SideBar />
        </aside>
        <main className="container-main">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
