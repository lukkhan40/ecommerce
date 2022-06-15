import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export default function Auth(props) {
  const { handleCloseModal, setTitleModal } = props;
  const [showLogin, setShowLogin] = useState(true);

  const handleShowLoginForm = () => {
    setTitleModal("Inicia sesión");
    setShowLogin(true);
  };
  const handleShowRegisterForm = () => {
    setTitleModal("Crear nuevo usuario");
    setShowLogin(false);
  };

  return showLogin ? (
    <LoginForm
      handleShowRegisterForm={handleShowRegisterForm}
      handleCloseModal={handleCloseModal}
    />
  ) : (
    <RegisterForm handleShowLoginForm={handleShowLoginForm} />
  );
}
