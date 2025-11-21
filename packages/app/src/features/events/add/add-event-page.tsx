import { EventForm } from "./event-form";

export function AddEventPage() {
  return (
    <div className="space-y-2 sm:space-y-6 w-full">
      <div className="flex gap-2 justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Add Event</h1>
          <p className="text-muted-foreground mt-1">Create a new event in your CRM</p>
        </div>
      </div>
      <EventForm />
    </div>
  );
}
