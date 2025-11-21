export const generateInputDateString = (date?: Date): string => {
  date = date || new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const formatDate = (date?: string): string => {
  if (!date) {
    return "";
  }
  return new Date(date).toLocaleDateString();
};
