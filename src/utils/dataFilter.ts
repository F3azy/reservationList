import type { Reservations } from "../types/reservation";

// Helper: compare if two dates are the same day
function isSameDay(date1: Date, date2: Date) {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

// Let-out reservations: take first car
export function getLetOutId(data: Reservations[]): string[] {
  const today = new Date();

  return data
    .map((r) => {
      const dateObj = new Date(r.startPlannedDate);
      const hour = dateObj.toTimeString().slice(0, 5); // HH:MM
      return { ...r, dateObj, hour };
    })
    .filter((r) => isSameDay(r.dateObj, today))
    .map((r) => r.id);
}

// Return reservations: take last car
export function getReturnId(data: Reservations[]): string[] {
  const today = new Date();

  return data
    .map((r) => {
      const dateObj = new Date(r.returnPlannedDate);
      const hour = dateObj.toTimeString().slice(0, 5); // HH:MM
      return { ...r, dateObj, hour };
    })
    .filter((r) => isSameDay(r.dateObj, today))
    .map((r) => r.id);
}