function calcDiscount(valor,  desconto) {
  return valor - (valor * desconto);
}

function calcInputOutput(valorEntrada, valorSaida) {
  return valorEntrada - valorSaida;
}


export { calcDiscount, calcInputOutput };