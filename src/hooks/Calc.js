// Função para calcular o valor com desconto
// Recebe o valor original e a porcentagem de desconto, retornando o valor final
export function calcDiscount(valor, desconto) {
  return valor - valor * desconto;
}

// Função para calcular a diferença entre valores de entrada e saída
// Recebe os valores de entrada e saída e retorna a diferença
export function calcInputOutput(valorEntrada, valorSaida) {
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

// Function to calculate the total value of a product (quantity * unit price)
export function calcProductTotal(qtdProduto, valorUnitario) {
  return parseFloat((qtdProduto * valorUnitario).toFixed(2));
}

// Function to calculate the total value of a list of products
export function calcProductsTotal(products) {
  return products.reduce(
    (sum, product) => sum + calcProductTotal(product.qtdProduto, product.valorUnitario),
    0
  );
}
