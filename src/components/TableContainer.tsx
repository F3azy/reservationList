


const TableContainer = () => {

  // if (letOutLoading || returnsLoading) return <p>Loading reservations...</p>;
  // if (letOutError) return <p>Error: {letOutError}</p>;
  // if (returnsError) return <p>Error: {returnsError}</p>;

  return (
    <main className="w-full px-2 lg:px-40 py-4">
      {/* <div className="w-full overflow-x-auto">
        <table className="min-w-[700px] border-collapse border border-brand-primary w-full">
          <thead className="bg-brand-primary">
            <tr>
              <th className="py-3 px-4 text-left">Let-Out Hour</th>
              <th className="py-3 px-4 text-left">Return Hour</th>
              <th className="py-3 px-4 text-left">Car Model</th>
              <th className="py-3 px-4 text-left">Registration</th>
              <th className="py-3 px-4 text-left">Appointed</th>
              <th className="py-3 px-4 text-left">Confirmed</th>
            </tr>
          </thead>
          <tbody className="text-white-base"> */}
            {/* Render Let-Outs */}
            {/* {letOuts?.map((r, idx) => (
              <tr key={`letout-${idx}`} className="border-b border-brand-primary">
                <td className="py-3 px-4">{r.hourOfLetOut}</td>
                <td className="py-3 px-4">-</td>
                <td className="py-3 px-4">{r.carModel}</td>
                <td className="py-3 px-4">{r.registration}</td>
                <td className="py-3 px-4">{r.appointedByAssistance}</td>
                <td className="py-3 px-4">{r.confirmedWithClient}</td>
              </tr>
            ))} */}

            {/* Empty rows */}
            {/* {Array.from({ length: 2 }).map((_, idx) => (
              <tr key={`empty-${idx}`} className="border-b border-brand-primary">
                <td colSpan={6} className="py-4 px-4">
                  &nbsp;
                </td>
              </tr>
            ))} */}

            {/* Render Returns */}
            {/* {returns?.map((r, idx) => (
              <tr key={`return-${idx}`} className="border-b border-brand-primary">
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
      </div> */}
    </main>
  );
};

export default TableContainer;
