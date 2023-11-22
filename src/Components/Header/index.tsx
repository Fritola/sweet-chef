import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userInterface } from "../../Pages/HomePage";
import { HeaderContainer, HeaderLink, HeaderNome, LoginLink } from "./style";

export const Header = () => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem("userToken");

  const [userInfo, setUserInfo] = useState<userInterface>();

  const getUserInfo = async () => {
    const { data } = await axios.get("http://localhost:3000/users/me", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    });
    setUserInfo(data);
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <HeaderContainer>
      <div style={{ display: "flex", alignItems: "center" }}>
        <ul style={{ display: "flex", listStyle: "none", gap: 55 }}>
          <HeaderLink onClick={() => navigate("/")}>Home</HeaderLink>
          <HeaderLink>Quem somos</HeaderLink>
          <HeaderLink>Perguntas</HeaderLink>
          <HeaderLink>Fazer pedido</HeaderLink>
        </ul>
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <img src="src/assets/logo.png" alt="" width={100} height={90} />
      </div>

      <div style={{ display: "flex", alignItems: "center" }}>
        {userInfo && isAuthenticated ? (
          <ul style={{ listStyle: "none" }}>
            <HeaderNome>{userInfo.nome}</HeaderNome>
            {/* <HeaderLink>Meus pedidos</HeaderLink> */}
          </ul>
        ) : (
          <div>
            <LoginLink onClick={() => navigate("/login")}>Login</LoginLink>
          </div>
        )}
      </div>
    </HeaderContainer>
  );
};
