import PrimaryButton from "../../components/buttons/primaryButton/PrimaryButton";

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
      <div className="text-center space-y-4 mb-10">
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

      {/* Campos de data e botão */}
      <div className="flex flex-wrap justify-center gap-4 mb-10">
        <input
          type="text"
          placeholder="Período de: 00/00/0000"
          className="bg-black border border-pink-zero text-white px-4 py-2 rounded-md w-[200px] focus:outline-none"
        />
        <input
          type="text"
          placeholder="Período até: 00/00/0000"
          className="bg-black border border-pink-zero text-white px-4 py-2 rounded-md w-[200px] focus:outline-none"
        />
      </div>

      {/* Lista de relatórios */}
      <div className="max-h-[400px] overflow-y-auto pr-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {reports.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between border border-white/20 px-4 py-3 rounded-md bg-white/5"
            >
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-pink-zero"
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
                <span>{item}</span>
              </div>
              <button className="text-white hover:text-pink-zero transition">
                ...
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Rodapé com ano */}
      <div className="text-right mt-4 text-sm text-white/60">
        <span>2025</span>
      </div>
    </div>
  );
};

export default Reports;
