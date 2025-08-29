export type Reservations = {
  id: string;
  startPlannedDate: string; // full ISO string
  returnPlannedDate: string; // full ISO string
};

export type ApiResponse = {
  count: number;
  data: Reservations[];
};

export type Reservation = {
  hourOfLetOut: string;
  hourOfReturn: string;
  carModel: string;
  registration: string;
  isReturnAppointed: boolean;
  isReturnConfirmed: boolean;
  typeCode: string;
  startData: { plannedDate: string };
  endData: { plannedDate: string };
  leases: [
    {
      state: 1;
      car: { registrationNumber: string | null; modelName: string | null };
      ascriptionPriority: 2;
      letOutData: { address: { fullName: string | null } };
      returnData: { address: { fullName: string | null } };
    }
  ];
};
