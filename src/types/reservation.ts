export type Reservation = {
  id: string;
  startPlannedDate: string; // full ISO string
  returnPlannedDate: string; // full ISO string
  carModels: string; // comma-separated list
  carRegistrationNumber: string; // comma-separated list
  isReturnConfirmed: boolean;
  isReturnAppointed: boolean;
};

export type SlimReservation = {
  hourOfLetOut: string;
  hourOfReturn: string;
  carModel: string;
  registration: string;
  confirmedWithClient: "Yes" | "No";
  appointedByAssistance: "Yes" | "No";
};

export type ApiResponse = {
  count: number;
  data: Reservation[];
};
