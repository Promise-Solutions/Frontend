const getQueryParams = (queryString) => {
  const params = new URLSearchParams(queryString);
  const result = {};
  for (const [key, value] of params.entries()) {
    result[key] = value;
  }
  return result;
};

export const getDynamicParams = () => {
  const pathSegments = window.location.pathname.split("/").filter(Boolean); // Divide o caminho e remove segmentos vazios
  return { user: pathSegments[1] }; // Assume que o token está no segundo segmento
};

export const getParams = () => {
  return getQueryParams(window.location.search); // Retorna parâmetros de chave
};
