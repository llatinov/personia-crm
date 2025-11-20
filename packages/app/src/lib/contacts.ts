import { Contact, ContactAttribute, ContactAttributeCategory } from "app/types/contacts";
import { CONTACT_ATTRIBUTES } from "./consts";
import { generateInputDateString } from "./date";

export const newContactAttribute = (fieldType: string, value?: string): ContactAttribute => {
  return {
    id: crypto.randomUUID(),
    fieldType,
    fieldCategory: CONTACT_ATTRIBUTES[fieldType]?.category || ContactAttributeCategory.Custom,
    value: value || ""
  } as ContactAttribute;
};

export const createContactFromQrCode = (qrCode: string): Contact => {
  const contact = {
    name: qrCode,
    meetDate: generateInputDateString(),
    notes: `Scanned from QR code payload: ${qrCode}`,
    attributes: [] as ContactAttribute[]
  } as Contact;

  if (qrCode.startsWith("http")) {
    contact.name = "Link";
    const attr = newContactAttribute(qrCode.includes("linkedin") ? "linkedin" : "website", qrCode);
    contact.attributes.push(attr);
  } else if (qrCode.includes("@") && qrCode.includes(".")) {
    contact.name = "Email";
    const attr = newContactAttribute("email", qrCode);
    contact.attributes.push(attr);
  }

  return contact;
};
