import { Header } from "app/components/header/header";
import { Outlet } from "react-router-dom";

export function MainLayout() {
  return (
    <div>
      <Header />
      <div className="container mx-auto px-2 py-1 sm:px-6 sm:py-6 sm:max-w-3xl">
        <Outlet />
      </div>
    </div>
  );
}
