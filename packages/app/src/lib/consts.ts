import { ContactAttributeCategory, ContactAttributeDefinition, ContactAttributeInputType } from "app/types/contacts";

export const CustomContactAttributeId = "custom";
export const CustomContactAttributeIcon = "📝";
export const MeetingDefaultTime = "10:00";

export enum Paths {
  HOME = "/",
  USER_LOGIN = "/login",
  CONTACTS = "/contacts",
  CONTACTS_ADD = "/contacts/add",
  CONTACTS_VIEW = "/contacts/:contactId",
  EVENTS = "/events",
  EVENTS_ADD = "/events/add",
  EVENTS_VIEW = "/events/:eventId",
  MEETINGS = "/meetings",
  MEETINGS_ADD = "/meetings/add",
  MEETINGS_VIEW = "/meetings/:meetingId"
}

export const CONTACT_ATTRIBUTES: Record<string, ContactAttributeDefinition> = {
  email: {
    id: "email",
    name: "Email",
    icon: "📧",
    category: ContactAttributeCategory.Contact,
    inputType: ContactAttributeInputType.Email
  },
  phone: {
    id: "phone",
    name: "Phone",
    icon: "📱",
    category: ContactAttributeCategory.Contact,
    inputType: ContactAttributeInputType.Tel
  },
  website: {
    id: "website",
    name: "Website",
    icon: "🌐",
    category: ContactAttributeCategory.Contact,
    inputType: ContactAttributeInputType.Text
  },
  linkedin: {
    id: "linkedin",
    name: "LinkedIn",
    icon: "💼",
    category: ContactAttributeCategory.Contact,
    inputType: ContactAttributeInputType.Text
  },
  company: {
    id: "company",
    name: "Company",
    icon: "🏢",
    category: ContactAttributeCategory.Work,
    inputType: ContactAttributeInputType.Text
  },
  jobTitle: {
    id: "jobTitle",
    name: "Job Title",
    icon: "💼",
    category: ContactAttributeCategory.Work,
    inputType: ContactAttributeInputType.Text
  },
  address: {
    id: "address",
    name: "Address",
    icon: "📍",
    category: ContactAttributeCategory.Personal,
    inputType: ContactAttributeInputType.Text
  },
  birthday: {
    id: "birthday",
    name: "Birthday",
    icon: "🎂",
    category: ContactAttributeCategory.Personal,
    inputType: ContactAttributeInputType.Date
  },
  family: {
    id: "family",
    name: "Family",
    icon: "👪",
    category: ContactAttributeCategory.Personal,
    inputType: ContactAttributeInputType.Text
  },
  custom: {
    id: CustomContactAttributeId,
    name: "Custom",
    icon: CustomContactAttributeIcon,
    category: ContactAttributeCategory.Custom,
    inputType: ContactAttributeInputType.Text
  }
};
