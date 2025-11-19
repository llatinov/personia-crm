import { Button } from "@components/ui";
import { Paths } from "app/lib/consts";
import { Link } from "react-router-dom";
import { ContactList } from "./contact-list";

export default function ContactsPage() {
  return (
    <div className="space-y-2 sm:space-y-6">
      <div className="flex gap-2 sm:flex-row sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Contacts</h1>
          <p className="text-muted-foreground mt-1">Manage and search your contacts</p>
        </div>
        <div className="flex mt-1 sm:mt-0">
          <Link to={Paths.ADD_CONTACT}>
            <Button>Add Contact</Button>
          </Link>
        </div>
      </div>
      <ContactList />
    </div>
  );
}
