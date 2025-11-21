export interface Event {
  id: string;
  name: string;
  date: string;
  address?: string;
  notes?: string;
  createdAt: Date;
}
