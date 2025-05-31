import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import { FiChevronLeft, FiChevronRight, FiRefreshCw } from "react-icons/fi";
import { useRef, useEffect } from "react";

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
  const now = dayjs();
  const startOfMonth = today.startOf("month");
  const endOfMonth = today.endOf("month");
  const daysInMonth = endOfMonth.date();
  const firstDayOfWeek = startOfMonth.day(); // 0 (domingo) ... 6 (sábado)

  // Ref para animação
  const calendarRef = useRef();

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

  // Função para saber se o mês tem subjob que usa sala e não está fechado
  const hasRoomSubJobInMonth = (monthToCheck, yearToCheck) => {
    const monthStr = String(monthToCheck + 1).padStart(2, "0");
    const yearMonth = `${yearToCheck}-${monthStr}`;
    return calendarData.some(
      (d) =>
        d.date &&
        d.date.startsWith(yearMonth) &&
        Array.isArray(d.subjobs) &&
        d.subjobs.some((sj) => sj.needsRoom && sj.status !== "CLOSED")
    );
  };

  // Animação ao carregar novos dados
  useEffect(() => {
    if (!calendarRef.current) return;
    calendarRef.current.classList.remove(
      "animate-slide-in-left",
      "animate-slide-in-right",
      "animate-fade-in"
    );
    // Força reflow para reiniciar animação
    // eslint-disable-next-line
    void calendarRef.current.offsetWidth;
    calendarRef.current.classList.add("animate-fade-in");
  }, [calendarData, month, year]);

  return (
    <div className="bg-white/5 border-1 border-pink-zero rounded-lg p-6 shadow-md">
      <div className="flex items-center justify-between mb-2 gap-2">
        <button
          className="px-2 py-1 rounded border font-bold flex items-center justify-center bg-transparent border-pink-zero text-pink-zero hover:bg-pink-zero/10 transition cursor-pointer relative"
          onClick={() => {
            if (calendarRef.current) {
              calendarRef.current.classList.remove(
                "animate-slide-in-left",
                "animate-slide-in-right",
                "animate-fade-in"
              );
              // eslint-disable-next-line
              void calendarRef.current.offsetWidth;
              calendarRef.current.classList.add("animate-slide-in-right");
            }
            if (month === 0) {
              setMonth(11);
              setYear((y) => y - 1);
            } else {
              setMonth((m) => m - 1);
            }
            resetSelection && resetSelection();
          }}
          aria-label="Mês anterior"
        >
          <FiChevronLeft size={20} />
        </button>
        <span className="text-lg font-semibold select-none">
          {today.format("MMMM [de] YYYY")}
        </span>
        <button
          className="px-2 py-1 rounded border font-bold flex items-center justify-center bg-transparent border-pink-zero text-pink-zero hover:bg-pink-zero/10 transition cursor-pointer relative"
          onClick={() => {
            if (calendarRef.current) {
              calendarRef.current.classList.remove(
                "animate-slide-in-left",
                "animate-slide-in-right",
                "animate-fade-in"
              );
              // eslint-disable-next-line
              void calendarRef.current.offsetWidth;
              calendarRef.current.classList.add("animate-slide-in-left");
            }
            if (month === 11) {
              setMonth(0);
              setYear((y) => y + 1);
            } else {
              setMonth((m) => m + 1);
            }
            resetSelection && resetSelection();
          }}
          aria-label="Próximo mês"
        >
          <FiChevronRight size={20} />
        </button>
        <button
          className="ml-2 px-2 py-1 rounded border font-bold flex items-center justify-center bg-transparent border-pink-zero text-pink-zero hover:bg-pink-zero/10 transition cursor-pointer"
          onClick={() => {
            if (calendarRef.current) {
              calendarRef.current.classList.remove(
                "animate-slide-in-left",
                "animate-slide-in-right",
                "animate-fade-in"
              );
              // eslint-disable-next-line
              void calendarRef.current.offsetWidth;
              calendarRef.current.classList.add("animate-fade-in");
            }
            setMonth(now.month());
            setYear(now.year());
            resetSelection && resetSelection();
          }}
          aria-label="Ir para hoje"
          title="Ir para hoje"
        >
          <FiRefreshCw size={18} className="mr-1" />
          Hoje
        </button>
      </div>
      <div ref={calendarRef} className="transition-all">
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
                  const isToday =
                    day &&
                    now.date() === day &&
                    now.month() === month &&
                    now.year() === year;
                  return (
                    <td key={j} className="p-1">
                      {day ? (
                        <button
                          className={`w-10 h-10 rounded-full transition-all duration-100 relative
                            ${
                              isToday
                                ? "bg-gray-400/30 text-white"
                                : "bg-transparent text-gray-300"
                            }
                            ${
                              selectedDate === dateStr
                                ? "ring-2 ring-yellow-zero"
                                : ""
                            }
                            ${isRoomDay ? "border-2 border-pink-zero" : ""}
                            cursor-pointer hover:bg-pink-zero/10 hover:text-pink-zero
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
      <style>
        {`
        .animate-slide-in-left {
          animation: slide-in-left-calendar 0.3s cubic-bezier(0.4,0,0.2,1);
        }
        .animate-slide-in-right {
          animation: slide-in-right-calendar 0.3s cubic-bezier(0.4,0,0.2,1);
        }
        .animate-fade-in {
          animation: fade-in-calendar 0.3s cubic-bezier(0.4,0,0.2,1);
        }
        @keyframes slide-in-left-calendar {
          from { opacity: 0; transform: translateX(40px);}
          to { opacity: 1; transform: translateX(0);}
        }
        @keyframes slide-in-right-calendar {
          from { opacity: 0; transform: translateX(-40px);}
          to { opacity: 1; transform: translateX(0);}
        }
        @keyframes fade-in-calendar {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        `}
      </style>
    </div>
  );
};

export default CalendarMonth;
