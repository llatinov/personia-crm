import { Location } from "./location";

export interface Meeting {
  id: string;
  contactId: string;
  location?: Location;
  date: string;
  notes?: string;
  createdAt: Date;
}
