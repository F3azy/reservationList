import useFetchTableData from "../hooks/useFetchTableData";

const TableContainer = () => {
  const { data, loading, error } = useFetchTableData();

  return (
    <main className="w-full flex items-center justify-between px-40 py-4"></main>
  );
};

export default TableContainer;
