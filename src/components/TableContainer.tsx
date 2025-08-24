import useFetchLetOut from "../hooks/useFetchLetOut";
import useFetchReturn from "../hooks/useFetchReturn";

const TableContainer = () => {
  const {
    letOuts,
    loading: letOutLoading,
    error: letOutError,
  } = useFetchLetOut();
  const {
    returns,
    loading: returnsLoading,
    error: returnsError,
  } = useFetchReturn();

  if (letOutLoading || returnsLoading) return <p>Loading reservations...</p>;
  if (letOutError) return <p>Error: {letOutError}</p>;
  if (returnsError) return <p>Error: {returnsError}</p>;

  return (
    <main className="w-full px-40 py-4">
      <div className="w-full overflow-x-auto">
        <table className="min-w-[700px] border-collapse border border-gray-200 w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left">Let-Out Hour</th>
              <th className="py-3 px-4 text-left">Return Hour</th>
              <th className="py-3 px-4 text-left">Car Model</th>
              <th className="py-3 px-4 text-left">Registration</th>
              <th className="py-3 px-4 text-left">Appointed</th>
              <th className="py-3 px-4 text-left">Confirmed</th>
            </tr>
          </thead>
          <tbody>
            {/* Render Let-Outs */}
            {letOuts?.map((r, idx) => (
              <tr key={`letout-${idx}`} className="border-b border-gray-200">
                <td className="py-3 px-4">{r.hourOfLetOut}</td>
                <td className="py-3 px-4">-</td>
                <td className="py-3 px-4">{r.carModel}</td>
                <td className="py-3 px-4">{r.registration}</td>
                <td className="py-3 px-4">{r.appointedByAssistance}</td>
                <td className="py-3 px-4">{r.confirmedWithClient}</td>
              </tr>
            ))}

            {/* Empty rows */}
            {Array.from({ length: 2 }).map((_, idx) => (
              <tr key={`empty-${idx}`} className="border-b border-gray-200">
                <td colSpan={6} className="py-4 px-4">
                  &nbsp;
                </td>
              </tr>
            ))}

            {/* Render Returns */}
            {returns?.map((r, idx) => (
              <tr key={`return-${idx}`} className="border-b border-gray-200">
                <td className="py-3 px-4">-</td>
                <td className="py-3 px-4">{r.hourOfLetOut}</td>
                <td className="py-3 px-4">{r.carModel}</td>
                <td className="py-3 px-4">{r.registration}</td>
                <td className="py-3 px-4">{r.appointedByAssistance}</td>
                <td className="py-3 px-4">{r.confirmedWithClient}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default TableContainer;
