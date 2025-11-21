import { Dialog } from "@capacitor/dialog";
import { Button, Input, Label, Textarea } from "@components/ui";
import { DateInput } from "app/components/date-input/date-input";
import { Paths } from "app/lib/consts";
import { Event } from "app/types/events";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiMockEvents } from "../api-mock";

export function EventForm() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      await Dialog.alert({
        title: "Required fields missing",
        message: "Please enter a name for the event"
      });
      return;
    }

    if (!date) {
      await Dialog.alert({
        title: "Required fields missing",
        message: "Please enter a date for the event"
      });
      return;
    }

    const event = {
      name: name.trim(),
      date: date,
      address: address.trim() || undefined,
      notes: notes.trim() || undefined
    } as Event;

    try {
      setIsLoading(true);
      const eventId = await apiMockEvents.createEvent(event);
      navigate(Paths.EVENTS_VIEW.replace(":eventId", eventId));
    } catch {
      navigate(Paths.EVENTS);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-6">
        <div className="space-y-3">
          <Label htmlFor="name">
            Event name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Conference, Meeting, Birthday..."
            required
          />
        </div>

        <DateInput label="Date" name="date" value={date} onChange={setDate} required />

        <div className="space-y-2">
          <Label htmlFor="address">Address</Label>
          <Input
            id="address"
            name="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="e.g., Conference Center, Office, Online"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="notes">Notes</Label>
          <Textarea
            id="notes"
            name="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add details about this event..."
          />
        </div>

        <div className="flex gap-4 pt-4">
          <Button type="button" variant="outline" onClick={() => navigate(-1)} className="flex-1" disabled={isLoading}>
            Cancel
          </Button>
          <Button type="submit" className="flex-1" disabled={isLoading}>
            {isLoading ? "Adding Event..." : "Add Event"}
          </Button>
        </div>
      </form>
    </div>
  );
}
