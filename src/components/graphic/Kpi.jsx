const Kpi = ({ title, value, width, height }) => {
  let description = "";
  if (title === "Frequência Total") {
    description =
      "Este indicador mostra o número total de vezes que o cliente utilizou os serviços do espaço, seja para ensaios, gravações, eventos ou outras atividades. Uma frequência alta pode indicar um cliente engajado e satisfeito com os serviços oferecidos, enquanto uma frequência baixa pode sugerir oportunidades para ações de retenção ou engajamento.";
  } else if (title === "Total Gasto em Bar") {
    description =
      "Este indicador representa o valor acumulado gasto pelo cliente exclusivamente no bar do estabelecimento. Inclui todas as compras de bebidas, comidas e outros itens consumidos durante a permanência do cliente. Monitorar este valor ajuda a entender o perfil de consumo e pode embasar estratégias para promoções ou melhorias no serviço do bar.";
  } else if (title === "Total Gasto em Serviços") {
    description =
      "Este indicador mostra o valor total investido pelo cliente em serviços oferecidos pelo espaço, como locação de estúdios, gravação de podcasts, ensaios musicais, sessões fotográficas, entre outros. É útil para avaliar o potencial de receita gerado por cada cliente e identificar quais serviços são mais atrativos.";
  } else if (title === "Ticket Médio") {
    description =
      "Este indicador mostra o qual a média de gasto total do cliente baseado no total gasto nos serviços e no total gasto com os produtos consumidos no bar. Com isso, é possível ter um direcionador de quanto esse cliente fornece de retorno financeiro.";
  }
  return (
    <div
      className={`w-[${width}] h-75 bg-white/5 border-1 border-pink-zero shadow-md p-6 text-white w-full max-w-sm transition-all duration-100 hover:scale-[1.02] hover:border-cyan-zero`}
    >
      <h3 className="text-lg font-semibold text-pink-zero mb-1">{title}</h3>
      <p className="text-3xl font-bold">{value}</p>
      {description && (
        <p className="text-[14px] text-gray-400 mt-2">{description}</p>
      )}
    </div>
  );
};

export default Kpi;
