import PrimaryButton from "../../components/buttons/primaryButton/PrimaryButton";
import CardReport from "../../components/cards/cardReport/CardReport";

const Reports = () => {
  const reports = new Array(12).fill("Relatório - 00/00/0000");

  return (
    <div className="mx-16 my-6 text-white">
      <div className="flex justify-end">
        <PrimaryButton
          id="generate_report_button_id"
          text="Gerar Relatório"
          onClick={() => {}}
        />
      </div>
      {/* Título e instruções */}
      <div className="text-center space-y-2 mb-10">
        <div className="flex justify-center">
          <div className="bg-white/10 p-4 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12h6m2 8H7a2 2 0 01-2-2V6a2 2 0 012-2h5l5 5v11a2 2 0 01-2 2z"
              />
            </svg>
          </div>
        </div>
        <h1 className="text-3xl font-bold">Gerar Relatório</h1>
        <p className="text-zinc-400 text-sm">
          Você pode gerar um relatório agora ou visualizar os relatórios já
          existentes.
        </p>
      </div>
      <div className="flex flex-wrap justify-start gap-4 mb-10">
        <input
          type="text"
          placeholder="Período de: 00/00/0000"
          className="bg-black border border-pink-zero text-white px-4 py-2 w-[250px] focus:outline-none"
        />
        <input
          type="text"
          placeholder="Período até: 00/00/0000"
          className="bg-black border border-pink-zero text-white px-4 py-2 w-[250px] focus:outline-none"
        />
        <PrimaryButton
          id="filter_report_button_id"
          text="Filtrar"
          onClick={() => {}}
        />
      </div>
      <div className="max-h-[400px] overflow-y-auto pr-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {reports.map((item, index) => (
            <CardReport
              key={index}
              id={index}
              title={`Relatório - ${"00/00/0000"}`}
              item={item}
              onClick={() => {}}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reports;
