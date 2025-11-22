import { Button } from "@components/ui";
import { CreateEventOptions } from "@ebarooni/capacitor-calendar";
import { Loader } from "app/components/loader/loader";
import { capacitorAddEventToCalendar, capacitorOpenCalendar } from "app/lib/capacitor";
import { MeetingDefaultTime } from "app/lib/consts";
import { Meeting } from "app/types/meetings";
import { useState } from "react";
import { apiMockMeetings } from "../api-mock";

interface Props {
  meeting: Meeting;
  setError: (error: string) => void;
  onMeetingUpdate: () => void;
}

export function CalendarControls(props: Props) {
  const [isLoading, setIsLoading] = useState(false);

  const setExportCalendarDate = async (newDate?: string) => {
    try {
      props.meeting.exportCalendarDate = newDate;
      await apiMockMeetings.updateMeeting(props.meeting.id, props.meeting);
      props.onMeetingUpdate();
    } catch (error) {
      props.setError("Error updating meeting");
    }
  };

  const openCalendar = async (withDelete: boolean) => {
    try {
      setIsLoading(true);
      let startDate = new Date(props.meeting.date);
      await capacitorOpenCalendar(startDate);
      if (withDelete) {
        // if intention is to delete the meeting in the calendar then reset the calendar export date in CRM
        await setExportCalendarDate();
      }
    } catch (error) {
      props.setError("Error opening calendar");
    } finally {
      // Calendar opening takes time
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  };

  const addAsEventPrompt = async () => {
    // Combine date and time for startDate
    let startDate = new Date(props.meeting.date);
    const [hours, minutes] = (props.meeting.time || MeetingDefaultTime).split(":").map(Number);
    startDate.setHours(hours, minutes);

    const eventDetails = {
      title: props.meeting.title,
      location: props.meeting.location?.location, // TODO get location or event name, refactor events
      startDate: startDate.getTime(),
      duration: "1 hour",
      description: props.meeting.notes
    } as CreateEventOptions;

    try {
      setIsLoading(true);
      await capacitorAddEventToCalendar(eventDetails);
      // set calendar date to the meeting date at the time it was exported to the calendar
      // in case meeting changes in the CRM the calendar will open on the original date
      // in case meeting changes in the calendar, nothing can be done
      await setExportCalendarDate(props.meeting.date);
    } catch (e) {
      props.setError("Error creating calendar event");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : props.meeting.exportCalendarDate ? (
        <div className="flex justify-between">
          <Button type="button" variant="outline" onClick={() => openCalendar(true)}>
            Remove from calendar
          </Button>
          <Button type="button" onClick={() => openCalendar(false)}>
            View in calendar
          </Button>
        </div>
      ) : (
        <Button type="button" onClick={addAsEventPrompt}>
          Add to calendar
        </Button>
      )}
    </div>
  );
}
