// Funções utilitárias para máscara de CPF e contato

export function maskCpf(value) {
  value = value.replace(/\D/g, "").slice(0, 11);
  if (value.length > 3) value = value.slice(0, 3) + "." + value.slice(3);
  if (value.length > 7) value = value.slice(0, 7) + "." + value.slice(7);
  if (value.length > 11) value = value.slice(0, 11) + "-" + value.slice(11);
  return value;
}

export function maskContato(value) {
  value = value.replace(/\D/g, "").slice(0, 11);
  if (value.length > 0) value = "(" + value;
  if (value.length > 3) value = value.slice(0, 3) + ") " + value.slice(3);
  if (value.length > 10) value = value.slice(0, 10) + "-" + value.slice(10);
  return value;
}

// Não exporte mais setupRegisterEvents, pois a lógica agora é controlada por React/useRef/useState.
