import { Card, CardContent, CardHeader, CardTitle } from "@components/ui";
import { Paths } from "app/lib/consts";
import { formatDate } from "app/lib/date";
import { Event } from "app/types/events";
import { Calendar, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Props {
  event: Event;
  onEventDelete: () => void;
}

export function EventCard(props: Props) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(Paths.EVENTS_VIEW.replace(":eventId", props.event.id));
  };

  return (
    <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={handleCardClick}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg">{props.event.name}</CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-2 text-sm">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Calendar className="h-4 w-4 shrink-0" />
          <span>{formatDate(props.event.date)}</span>
        </div>
        {props.event.location && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4 shrink-0" />
            <span className="truncate">{props.event.location.location}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
