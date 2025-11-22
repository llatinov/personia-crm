import { Location } from "./location";

export interface Meeting {
  id: string;
  contactId: string;
  title: string;
  location?: Location;
  date: string;
  time?: string;
  notes?: string;
  exportCalendarDate?: string;
  createdAt: Date;
}
