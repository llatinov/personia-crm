import { useSearchParams } from "react-router-dom";
import { MeetingForm } from "./meeting-form";

export function AddMeetingPage() {
  const [searchParams] = useSearchParams();
  const contactId = searchParams.get("contactId") || undefined;

  return (
    <div className="space-y-2 sm:space-y-6 w-full">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Add Meeting</h1>
        <p className="text-muted-foreground mt-1">Schedule a new meeting with a contact</p>
      </div>
      <MeetingForm contactId={contactId} />
    </div>
  );
}
