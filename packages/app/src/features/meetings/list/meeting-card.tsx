import { Calendar, Card, CardContent, CardHeader, CardTitle, MapPin } from "@components/ui";
import { Paths } from "app/lib/consts";
import { formatDate } from "app/lib/date";
import { Event } from "app/types/events";
import { LocationType } from "app/types/location";
import { Meeting } from "app/types/meetings";
import { useNavigate } from "react-router-dom";

interface Props {
  meeting: Meeting;
  event?: Event;
  showContact?: boolean;
  contactName?: string;
}

export function MeetingCard(props: Props) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(Paths.MEETINGS_VIEW.replace(":meetingId", props.meeting.id));
  };

  const getLocationDisplay = () => {
    if (props.meeting.location?.type === LocationType.EVENT && props.event) {
      return props.event.name;
    }
    return props.meeting.location?.location || "No location";
  };

  const isUpcoming = new Date(props.meeting.date) > new Date();

  return (
    <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={handleCardClick}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {formatDate(props.meeting.date)}
            </CardTitle>
            {isUpcoming && <span className="text-xs text-blue-600 font-medium">Upcoming</span>}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-2 text-sm">
        <div className="flex items-center gap-2 text-muted-foreground">
          <MapPin className="h-4 w-4 shrink-0" />
          <span className="truncate">{getLocationDisplay()}</span>
        </div>
        {props.showContact && props.contactName && (
          <div className="text-muted-foreground">
            <span className="font-medium">Contact:</span> {props.contactName}
          </div>
        )}
        {props.meeting.notes && <p className="text-muted-foreground line-clamp-2">{props.meeting.notes}</p>}
      </CardContent>
    </Card>
  );
}
