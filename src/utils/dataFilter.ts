import type { Reservation, SlimReservation } from "../types/reservation";

// Helper: pick first or last from comma-separated string
function pickFromList(value: string, take: "first" | "last") {
  const parts = value.split(",").map((s) => s.trim());
  if (parts.length === 0) return "";
  return take === "first" ? parts[0] : parts[parts.length - 1];
}

// Helper: compare if two dates are the same day
function isSameDay(date1: Date, date2: Date) {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

// Let-out reservations: take first car
export function filterTodayLetOuts(data: Reservation[]): SlimReservation[] {
  const today = new Date();

  return data
    .map((r) => {
      const dateObj = new Date(r.startPlannedDate);
      const hour = dateObj.toTimeString().slice(0, 5); // HH:MM
      return { ...r, dateObj, hour };
    })
    .filter((r) => isSameDay(r.dateObj, today))
    .map((r) => ({
      hourOfLetOut: r.hour,
      carModel: pickFromList(r.carModels, "first"),
      registration: pickFromList(r.carRegistrationNumber, "first"),
      confirmedWithClient: r.isReturnConfirmed ? "Yes" : "No",
      appointedByAssistance: r.isReturnAppointed ? "Yes" : "No",
    }));
}

// Return reservations: take last car
export function filterTodayReturns(data: Reservation[]): SlimReservation[] {
  const today = new Date();

  return data
    .map((r) => {
      const dateObj = new Date(r.returnPlannedDate);
      const hour = dateObj.toTimeString().slice(0, 5); // HH:MM
      return { ...r, dateObj, hour };
    })
    .filter((r) => isSameDay(r.dateObj, today))
    .map((r) => ({
      hourOfLetOut: r.hour,
      carModel: pickFromList(r.carModels, "last"),
      registration: pickFromList(r.carRegistrationNumber, "last"),
      confirmedWithClient: r.isReturnConfirmed ? "Yes" : "No",
      appointedByAssistance: r.isReturnAppointed ? "Yes" : "No",
    }));
}




// ---------------- LET OUTS ----------------
export function filterTomorrowLetOuts(data: Reservation[]): SlimReservation[] {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toLocaleDateString("en-CA"); // yyyy-mm-dd

  return data
    .map((r) => {
      const dateObj = new Date(r.startPlannedDate);
      const date = dateObj.toLocaleDateString("en-CA");
      const hour = dateObj.toTimeString().slice(0, 5); // HH:MM
      return { ...r, date, hour };
    })
    .filter((r) => r.date === tomorrowStr)
    .map((r) => ({
      hourOfLetOut: r.hour,
      carModel: pickFromList(r.carModels, "first"),
      registration: pickFromList(r.carRegistrationNumber, "first"),
      confirmedWithClient: r.isReturnConfirmed ? "Yes" : "No",
      appointedByAssistance: r.isReturnAppointed ? "Yes" : "No",
    }));
}

// ---------------- RETURNS ----------------
export function filterTomorrowReturns(data: Reservation[]): SlimReservation[] {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toLocaleDateString("en-CA"); // yyyy-mm-dd

  return data
    .map((r) => {
      const dateObj = new Date(r.returnPlannedDate);
      const date = dateObj.toLocaleDateString("en-CA");
      const hour = dateObj.toTimeString().slice(0, 5);
      return { ...r, date, hour };
    })
    .filter((r) => r.date === tomorrowStr)
    .map((r) => ({
      hourOfLetOut: r.hour,
      carModel: pickFromList(r.carModels, "last"),
      registration: pickFromList(r.carRegistrationNumber, "last"),
      confirmedWithClient: r.isReturnConfirmed ? "Yes" : "No",
      appointedByAssistance: r.isReturnAppointed ? "Yes" : "No",
    }));
}