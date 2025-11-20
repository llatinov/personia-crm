import { Paths } from "app/lib/consts";
import { Users } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { ThemeSwitcher } from "../themes/theme-switcher";

export function Header() {
  const location = useLocation();

  const getClass = (path: string) => {
    const base = "text-sm font-medium transition-colors hover:text-primary";
    return location.pathname === path ? base : `${base} text-muted-foreground`;
  };
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center px-4 sm:px-6">
        <div className="mr-4 flex">
          <Link to={Paths.HOME} className="flex items-center space-x-2">
            <Users className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">Personia CRM</span>
          </Link>
        </div>
        <nav className="flex flex-1 items-center space-x-4 sm:space-x-6">
          <Link to={Paths.CONTACTS} className={getClass(Paths.CONTACTS)}>
            Contacts
          </Link>
          <Link to={Paths.EVENTS} className={getClass(Paths.EVENTS)}>
            Events
          </Link>
        </nav>
        <div className="flex items-center">
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
}
