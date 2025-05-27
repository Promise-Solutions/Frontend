import dayjs from "dayjs";

const CalendarMonth = ({ calendarData, selectedDate, onDayClick }) => {
  const today = dayjs();
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

  return (
    <div className="bg-white/5 border-1 border-pink-zero rounded-lg p-6 shadow-md">
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
