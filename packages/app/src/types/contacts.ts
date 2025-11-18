export enum ContactAttributeCategory {
  Contact = "Contact",
  Work = "Work",
  Personal = "Personal",
  Custom = "Custom"
}

export enum ContactAttributeInputType {
  Text = "text",
  Email = "email",
  Tel = "tel",
  Date = "date"
}

export interface Contact {
  id: string;
  name: string;
  meetDate?: string;
  meetLocation?: string;
  notes?: string;
  createdAt: Date;
  attributes: ContactAttribute[];
}

export interface ContactAttributeDefinition {
  id: string;
  name: string;
  icon: string;
  category: ContactAttributeCategory;
  inputType: ContactAttributeInputType;
}

export interface ContactAttribute {
  id: string;
  fieldType: string;
  fieldCategory: ContactAttributeCategory;
  value: string;
  note?: string;
}
