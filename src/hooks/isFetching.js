let isFetching = false;

export const startFetching = () => {
  if (isFetching) return false; // Retorna false se já estiver buscando
  isFetching = true; // Marca como buscando
  return true; // Retorna true para indicar que pode prosseguir
};

export const stopFetching = () => {
  isFetching = false; // Libera a flag
};
