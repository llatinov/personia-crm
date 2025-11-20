export interface Event {
  id: string;
  name: string;
  date: string;
  location?: string;
  information?: string;
  createdAt: Date;
}
