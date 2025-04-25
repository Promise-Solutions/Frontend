export function isTokenValid(token) {
  if (!token) return false;

  try {
    const payloadBase64 = token.split(".")[1];
    const decodedPayload = JSON.parse(atob(payloadBase64));
    const currentTime = Math.floor(Date.now() / 1000); // em segundos

    return decodedPayload.exp > currentTime;
  } catch (e) {
    console.error("Erro ao validar o token:", e);
    return false;
  }
}
