import { ContactAttributeCategory, ContactAttributeDefinition } from "app/types/contacts";

export enum Paths {
  HOME = "/",
  USER_LOGIN = "/login",
  ADD_CONTACT = "/add"
}
export const DEFAULT_ICON = "📝";

export const CONTACT_ATTRIBUTES: Record<string, ContactAttributeDefinition> = {
  email: {
    id: "email",
    name: "Email",
    icon: "📧",
    category: ContactAttributeCategory.Contact
  },
  phone: {
    id: "phone",
    name: "Phone",
    icon: "📱",
    category: ContactAttributeCategory.Contact
  },
  website: {
    id: "website",
    name: "Website",
    icon: "🌐",
    category: ContactAttributeCategory.Contact
  },
  linkedin: {
    id: "linkedin",
    name: "LinkedIn",
    icon: "💼",
    category: ContactAttributeCategory.Contact
  },
  company: {
    id: "company",
    name: "Company",
    icon: "🏢",
    category: ContactAttributeCategory.Work
  },
  jobTitle: {
    id: "jobTitle",
    name: "Job Title",
    icon: "💼",
    category: ContactAttributeCategory.Work
  },
  address: {
    id: "address",
    name: "Address",
    icon: "📍",
    category: ContactAttributeCategory.Personal
  },
  birthday: {
    id: "birthday",
    name: "Birthday",
    icon: "🎂",
    category: ContactAttributeCategory.Personal
  },
  family: {
    id: "family",
    name: "Family",
    icon: "👪",
    category: ContactAttributeCategory.Personal
  }
};
