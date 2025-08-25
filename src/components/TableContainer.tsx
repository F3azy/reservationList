import { useTodayReservations } from "../hooks/useTodaysReservations";

const TableContainer = () => {
  const { letOutReservations, returnReservations, loading, error } =
    useTodayReservations();

  // Adjustable empty rows between Let-Outs and Returns
  const gapRows = 2;

  if (loading) return <p className="px-4">Loading reservations...</p>;
  if (error) return <p className="px-4 text-red-500">Error: {error}</p>;

  // Helper to pick the correct lease depending on type
  const getLease = (r: any, type: "letOut" | "return") =>
    type === "letOut" ? r.leases[0] : r.leases[r.leases.length - 1];

  const renderAppointed = (r: any, type: "letOut" | "return") =>
    type === "letOut" ? (r.isLetOutConfirmed ? "✓" : "*") : (r.isReturnAppointed ? "✓" : "*");

  const renderConfirmed = (r: any, type: "letOut" | "return") =>
    type === "letOut" ? (r.isLetOutConfirmed ? "✓" : "*") : (r.isReturnConfirmed ? "✓" : "*");

  return (
    <main className="w-full px-2 lg:px-40 py-4">
      <div className="w-full overflow-x-auto">
        <table className="min-w-[700px] border-collapse border border-brand-primary w-full">
          <thead className="bg-brand-primary text-white">
            <tr>
              <th className="py-3 px-4 text-left">Let-Out Hour</th>
              <th className="py-3 px-4 text-left">Return Hour</th>
              <th className="py-3 px-4 text-left">Car Model</th>
              <th className="py-3 px-4 text-left">Registration</th>
              <th className="py-3 px-4 text-left">Address</th>
              <th className="py-3 px-4 text-left">Appointed</th>
              <th className="py-3 px-4 text-left">Confirmed</th>
            </tr>
          </thead>
          <tbody className="text-white-base">
            {/* Let-Outs */}
            {letOutReservations.map((r, idx) => {
              const lease = getLease(r, "letOut");
              const hour = new Date(r.startData.plannedDate).toTimeString().slice(0, 5);
              return (
                <tr key={`letout-${idx}`} className="border-b border-brand-primary">
                  <td className="py-3 px-4">{hour}</td>
                  <td className="py-3 px-4">-</td>
                  <td className="py-3 px-4">{lease.car.modelName}</td>
                  <td className="py-3 px-4">{lease.car.registrationNumber}</td>
                  <td className="py-3 px-4">{lease.letOutData.address?.fullName || ""}</td>
                  <td className="py-3 px-4">{renderAppointed(r, "letOut")}</td>
                  <td className="py-3 px-4">{renderConfirmed(r, "letOut")}</td>
                </tr>
              );
            })}

            {/* Empty rows if no let-outs */}
            {letOutReservations.length === 0 && (
              <tr className="border-b border-brand-primary">
                <td colSpan={7} className="py-4 px-4 text-center text-gray-400">
                  No let-outs today
                </td>
              </tr>
            )}

            {/* Adjustable gap rows */}
            {Array.from({ length: gapRows }).map((_, idx) => (
              <tr key={`gap-${idx}`} className="border-b border-brand-primary">
                <td colSpan={7} className="py-3 px-4">&nbsp;</td>
              </tr>
            ))}

            {/* Returns */}
            {returnReservations.map((r, idx) => {
              const lease = getLease(r, "return");
              const hour = new Date(r.endData.plannedDate).toTimeString().slice(0, 5);
              return (
                <tr key={`return-${idx}`} className="border-b border-brand-primary">
                  <td className="py-3 px-4">-</td>
                  <td className="py-3 px-4">{hour}</td>
                  <td className="py-3 px-4">{lease.car.modelName}</td>
                  <td className="py-3 px-4">{lease.car.registrationNumber}</td>
                  <td className="py-3 px-4">{lease.returnData.address?.fullName || ""}</td>
                  <td className="py-3 px-4">{renderAppointed(r, "return")}</td>
                  <td className="py-3 px-4">{renderConfirmed(r, "return")}</td>
                </tr>
              );
            })}

            {/* Empty rows if no returns */}
            {returnReservations.length === 0 && (
              <tr className="border-b border-brand-primary">
                <td colSpan={7} className="py-4 px-4 text-center text-gray-400">
                  No returns today
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default TableContainer;
