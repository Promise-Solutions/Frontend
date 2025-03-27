import axios from "axios";
import CardUser from "../../components/CardUser/CardUser.jsx";
import React, { useEffect } from "react";
import { useUserContext } from "../../context/UserContext.jsx";

export const Teste = () => {
  const { user, setUser, userToken } = useUserContext(); // Agora também usando userToken

  useEffect(() => {
    if (!userToken) return; // Se não tiver token no contexto, não faz a requisição

    axios
      .get(`http://localhost:5000/usuarios?token=${userToken}`)
      .then(async (response) => {
        const userData = response.data[0];
        if (userData) {
          try {
            const categoriesResponse = await axios.get(
              "http://localhost:5000/categories"
            );
            const categories = categoriesResponse.data;
            const categoryName =
              categories.find((cat) => cat.id === parseInt(userData.categoria))
                ?.name || "Desconhecida";
            setUser({ ...userData, categoria: categoryName }); // Salva o nome da categoria no contexto
          } catch (error) {
            console.error("Erro ao buscar categorias:", error);
            setUser({ ...userData, categoria: "Desconhecida" }); // Define como "Desconhecida" em caso de erro
          }
        }
      })
      .catch((error) => {
        console.log("Erro ao buscar usuário:", error);
      });
  }, [userToken]); // Dispara quando o token for setado

  return user ? (
    (console.log(user),
    (
      <CardUser
        key={user.token}
        id={user.id}
        name={user.nome}
        category={user.categoria} // Exibe o nome da categoria
        telefone={user.telefone}
        email={user.email}
      />
    ))
  ) : (
    <div>Carregando...</div>
  );
};
