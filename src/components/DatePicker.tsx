import { useDate } from "../context/useDateContext";

const DatePicker = () => {
  // Normalize today to midnight
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const { date, setDate } = useDate();

  const changeDate = (days: number) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);

    // Normalize newDate to midnight for safe comparison
    newDate.setHours(0, 0, 0, 0);

    // Prevent going below today
    if (newDate >= today) {
      setDate(newDate);
    }
  };

  const isToday = date.getTime() === today.getTime();

  return (
    <div className="flex justify-between items-center gap-x-5">
      <button
        onClick={() => changeDate(-1)}
        disabled={isToday}
        className={`${isToday ? "opacity-40 cursor-not-allowed text-2xl" : "hover:cursor-pointer text-2xl"}`}
      >
        ◀
      </button>

      <p className="text-white-base font-bold">
        {date.toLocaleDateString("sv-SE")}
      </p>

      <button
        onClick={() => changeDate(1)}
        className="hover:cursor-pointer text-2xl"
      >
        ▶
      </button>
    </div>
  );
};

export default DatePicker;
