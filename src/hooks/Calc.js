// Função para calcular o valor com desconto
function calcDiscount(valor, desconto) {
  return valor - (valor * desconto);
}

// Função para calcular a diferença entre valores de entrada e saída
function calcInputOutput(valorEntrada, valorSaida) {
  return valorEntrada - valorSaida;
}

// Exportando as funções para uso em outras partes da aplicação
export { calcDiscount, calcInputOutput };
