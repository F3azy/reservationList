import useFetchLetOut from "../hooks/useFetchLetOut";

const TableContainer = () => {
  const { data, loading, error } = useFetchLetOut();

  return (
    <main className="w-full flex items-center justify-between px-40 py-4"></main>
  );
};

export default TableContainer;
