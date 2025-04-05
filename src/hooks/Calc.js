// Função para calcular o valor com desconto
// Recebe o valor original e a porcentagem de desconto, retornando o valor final
function calcDiscount(valor, desconto) {
  return valor - valor * desconto;
}

// Função para calcular a diferença entre valores de entrada e saída
// Recebe os valores de entrada e saída e retorna a diferença
function calcInputOutput(valorEntrada, valorSaida) {
  return valorEntrada - valorSaida;
}

// Function to calculate total value after applying a discount
export function calcTotalWithDiscount(total, discount) {
  return calcDiscount(total, discount / 100); // Reutiliza a lógica de calcDiscount
}

// Function to calculate the difference between two values
function calcDifference(value1, value2) {
  return parseFloat((value1 - value2).toFixed(2));
}

// Exportando as funções para uso em outras partes da aplicação
// Permite que outras partes do código importem e utilizem essas funções
export { calcDiscount, calcInputOutput, calcDifference };
