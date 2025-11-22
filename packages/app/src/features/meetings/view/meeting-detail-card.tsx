import { Calendar, Card, CardContent, CardHeader, CardTitle, MapPin } from "@components/ui";
import { Paths } from "app/lib/consts";
import { formatDate } from "app/lib/date";
import { Contact } from "app/types/contacts";
import { Event } from "app/types/events";
import { LocationType } from "app/types/location";
import { Meeting } from "app/types/meetings";
import { Link } from "react-router-dom";

interface Props {
  meeting: Meeting;
  contact?: Contact;
  event?: Event;
}

export function MeetingDetailCard(props: Props) {
  const getLocationDisplay = () => {
    if (props.meeting.location?.type === LocationType.EVENT && props.event) {
      return props.event.name;
    }
    return props.meeting.location?.location || "No location specified";
  };

  const isUpcoming = new Date(props.meeting.date) > new Date();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{props.meeting.title}</CardTitle>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          {formatDate(props.meeting.date)}
          {props.meeting.time && ` at ${props.meeting.time}`}
          {isUpcoming && (
            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full ml-2">Upcoming</span>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <span className="font-medium text-muted-foreground">Contact: </span>
          {props.contact ? (
            <Link
              to={Paths.CONTACTS_VIEW.replace(":contactId", props.contact.id)}
              className="text-primary hover:underline"
            >
              {props.contact.name}
            </Link>
          ) : (
            <span>Unknown Contact</span>
          )}
        </div>

        <div className="flex items-start gap-2">
          <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground" />
          <div>
            <span className="font-medium text-muted-foreground">Location: </span>
            {props.meeting.location?.type === LocationType.EVENT && props.event ? (
              <Link to={Paths.EVENTS_VIEW.replace(":eventId", props.event.id)} className="text-primary hover:underline">
                {props.event.name}
              </Link>
            ) : (
              <span>{getLocationDisplay()}</span>
            )}
          </div>
        </div>

        {props.meeting.notes && (
          <div>
            <span className="font-medium text-muted-foreground">Notes: </span>
            <p className="whitespace-pre-wrap mt-1">{props.meeting.notes}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
