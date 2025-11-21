import { Button } from "@components/ui";
import { Paths } from "app/lib/consts";
import { Link } from "react-router-dom";
import { MeetingList } from "./meeting-list";

export function MeetingsPage() {
  return (
    <div className="space-y-2 sm:space-y-6">
      <div className="flex gap-2 justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Meetings</h1>
          <p className="text-muted-foreground mt-1">View and manage your meetings</p>
        </div>
        <div className="flex mt-1 sm:mt-0">
          <Link to={Paths.MEETINGS_ADD}>
            <Button>Add Meeting</Button>
          </Link>
        </div>
      </div>
      <MeetingList />
    </div>
  );
}
