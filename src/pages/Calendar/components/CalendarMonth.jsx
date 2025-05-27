import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const CalendarMonth = ({
  calendarData,
  selectedDate,
  onDayClick,
  month,
  year,
  setMonth,
  setYear,
  resetSelection,
}) => {
  dayjs.locale("pt-br");
  const today = dayjs(`${year}-${String(month + 1).padStart(2, "0")}-01`);
  const startOfMonth = today.startOf("month");
  const endOfMonth = today.endOf("month");
  const daysInMonth = endOfMonth.date();
  const firstDayOfWeek = startOfMonth.day(); // 0 (domingo) ... 6 (sábado)

  // Cria matriz de semanas para o calendário
  const weeks = [];
  let week = [];
  for (let i = 0; i < firstDayOfWeek; i++) week.push(null);
  for (let day = 1; day <= daysInMonth; day++) {
    week.push(day);
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  }
  if (week.length) {
    while (week.length < 7) week.push(null);
    weeks.push(week);
  }

  // Função para saber se o dia tem subjob que usa sala e não está fechado
  const hasRoomSubJob = (dateStr) => {
    return calendarData.some(
      (d) =>
        d.date === dateStr &&
        Array.isArray(d.subjobs) &&
        d.subjobs.some((sj) => sj.needsRoom && sj.status !== "CLOSED")
    );
  };

  // Navegação de mês minimalista
  const handlePrevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear((y) => y - 1);
    } else {
      setMonth((m) => m - 1);
    }
    resetSelection && resetSelection();
  };

  const handleNextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear((y) => y + 1);
    } else {
      setMonth((m) => m + 1);
    }
    resetSelection && resetSelection();
  };

  return (
    <div className="bg-white/5 border-1 border-pink-zero rounded-lg p-6 shadow-md">
      <div className="flex items-center justify-between mb-2">
        <button
          className="px-2 py-1 rounded bg-pink-zero text-white font-bold hover:bg-pink-700 flex items-center justify-center"
          onClick={handlePrevMonth}
          aria-label="Mês anterior"
        >
          <FiChevronLeft size={20} />
        </button>
        <span className="text-lg font-semibold select-none">
          {today.format("MMMM [de] YYYY")}
        </span>
        <button
          className="px-2 py-1 rounded bg-pink-zero text-white font-bold hover:bg-pink-700 flex items-center justify-center"
          onClick={handleNextMonth}
          aria-label="Próximo mês"
        >
          <FiChevronRight size={20} />
        </button>
      </div>
      <table className="w-full text-center">
        <thead>
          <tr>
            <th className="p-1">Dom</th>
            <th className="p-1">Seg</th>
            <th className="p-1">Ter</th>
            <th className="p-1">Qua</th>
            <th className="p-1">Qui</th>
            <th className="p-1">Sex</th>
            <th className="p-1">Sáb</th>
          </tr>
        </thead>
        <tbody>
          {weeks.map((week, i) => (
            <tr key={i}>
              {week.map((day, j) => {
                const dateStr = day
                  ? today.date(day).format("YYYY-MM-DD")
                  : null;
                const isRoomDay = hasRoomSubJob(dateStr);
                return (
                  <td key={j} className="p-1">
                    {day ? (
                      <button
                        className={`w-10 h-10 rounded-full transition-all duration-100 relative bg-transparent text-gray-300
                          ${
                            selectedDate === dateStr
                              ? "ring-2 ring-yellow-zero"
                              : ""
                          }
                          ${isRoomDay ? "border-2 border-pink-zero" : ""}
                          cursor-pointer
                        `}
                        onClick={() => onDayClick(dateStr)}
                      >
                        {/* Bolinha cyan-zero acima do número do dia */}
                        {isRoomDay && (
                          <span
                            className="absolute left-1/2 -top-1.5 -translate-x-1/2"
                            style={{
                              width: 10,
                              height: 10,
                              borderRadius: "50%",
                              background: "var(--color-cyan-zero)",
                              display: "block",
                            }}
                          ></span>
                        )}
                        <span className="relative z-10">{day}</span>
                      </button>
                    ) : (
                      <span>&nbsp;</span>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CalendarMonth;
