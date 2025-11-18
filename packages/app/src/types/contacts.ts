export enum ContactAttributeCategory {
  Contact = "Contact",
  Work = "Work",
  Personal = "Personal",
  Custom = "Custom"
}

export interface Contact {
  id: string;
  name: string;
  description?: string;
  createdAt: Date;
  attributes: ContactAttribute[];
}

export interface ContactAttributeDefinition {
  id: string;
  name: string;
  icon: string;
  category: ContactAttributeCategory;
}

export interface ContactAttribute {
  id: string;
  fieldType: string;
  fieldCategory: ContactAttributeCategory;
  value: string;
  note?: string;
}
