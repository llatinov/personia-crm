import { Paths } from "app/lib/consts";
import { Users } from "lucide-react";
import { Link } from "react-router-dom";

export function Header() {
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
          <Link to={Paths.HOME} className="text-sm font-medium transition-colors hover:text-primary">
            Contacts
          </Link>
          <Link
            to={Paths.ADD_CONTACT}
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Add Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
