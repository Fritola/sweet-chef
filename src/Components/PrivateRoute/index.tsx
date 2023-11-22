import { Route, useNavigate } from "react-router-dom";

const PrivateRoute = ({
  element,
  path,
}: {
  element: React.ReactNode;
  path: string;
}) => {
  const navigate = useNavigate();

  // Verifica se há um token no localStorage
  const isAuthenticated = localStorage.getItem("token");

  // Se o usuário não estiver autenticado, redirecione para a página de login
  if (!isAuthenticated) {
    navigate("/login");
    return null;
  }

  // Se o usuário estiver autenticado, renderize o elemento normalmente
  return <Route path={path} element={element} />;
};

export default PrivateRoute;
