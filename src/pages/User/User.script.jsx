import axios from "axios";
import { useState, useEffect } from "react";
import { useUserContext } from "../../context/UserContext.jsx";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton.jsx";

export const RenderInfos = () => {
  const { user, setUser, userToken } = useUserContext(); // Agora também usando userToken
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    // Restaurar currentUser do sessionStorage ao carregar a página
    const storedUser = sessionStorage.getItem("currentUser");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []); // Executa apenas uma vez ao montar o componente

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
            const updatedUser = { ...userData, categoria: categoryName };
            setUser(updatedUser); // Salva o nome da categoria no contexto

            // Salva as informações no sessionStorage
            sessionStorage.setItem("currentUser", JSON.stringify(updatedUser));
            setCurrentUser(updatedUser);
          } catch (error) {
            console.error("Erro ao buscar categorias:", error);
            const fallbackUser = { ...userData, categoria: "Desconhecida" };
            setUser(fallbackUser);
            sessionStorage.setItem("currentUser", JSON.stringify(fallbackUser));
            setCurrentUser(fallbackUser);
          }
        }
      })
      .catch((error) => {
        console.log("Erro ao buscar usuário:", error);
      });
  }, [userToken]); // Dispara quando o token for setado

  return user || currentUser ? (
    <>
      <section className="mt-12 flex w-full justify-between">
        <div className="flex flex-col">
          <h1 className="text-[42px]">
            <b>Cliente: </b> {(user || currentUser).nome}
          </h1>
          <span className="text-[18px]">Altere as informações</span>
          <ul className="flex flex-col mt-6 gap-2">
            <li>
              <b>Categoria: </b> {(user || currentUser).categoria}
            </li>
            <li>
              <b>Email: </b> {(user || currentUser).email}
            </li>
            <li>
              <b>CPF: </b> {(user || currentUser).cpf}
            </li>
            <li>
              <b>Telefone: </b> {(user || currentUser).telefone}
            </li>
            <li>
              <b>Último Atendimento: </b> data
            </li>
          </ul>
        </div>
        <PrimaryButton text="Editar Usuário" />
      </section>
      <section></section>
    </>
  ) : (
    <div>Carregando...</div>
  );
};
