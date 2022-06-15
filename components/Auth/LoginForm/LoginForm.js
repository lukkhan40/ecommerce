import { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { loginAPI, resetPasswordAPI } from "../../../api/user";
import useAuth from "../../../hooks/useAuth";

export default function LoginForm(props) {
  const { handleShowRegisterForm, handleCloseModal } = props;
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const formik = useFormik({
    initialValues: {
      identifier: "",
      password: "",
    },
    validationSchema: Yup.object({
      identifier: Yup.string().email(true).required(true),
      password: Yup.string().required(true),
    }),
    onSubmit: async (formData) => {
      setLoading(true);

      const response = await loginAPI(formData);

      if (response?.jwt) {
        login(response.jwt);
        handleCloseModal();
      } else toast.error("El email o contraseña son incorrectos");

      setLoading(false);
    },
  });

  const handleResetPassword = async () => {
    formik.setErrors({});
    const validateEmail = Yup.string().email().required();

    if (!validateEmail.isValidSync(formik.values.identifier)) {
      formik.setErrors({ identifier: true });
    } else {
      const resResetPassword = await resetPasswordAPI(formik.values.identifier);
    }
  };

  return (
    <Form className="login-form" onSubmit={formik.handleSubmit}>
      <Form.Input
        name="identifier"
        type="text"
        placeholder="Correo Electronico"
        onChange={formik.handleChange}
        error={formik.errors.identifier}
      />
      <Form.Input
        name="password"
        type="password"
        placeholder="Contraseña"
        onChange={formik.handleChange}
        error={formik.errors.password}
      />
      <div className="actions">
        <Button
          type="button"
          basic
          onClick={handleShowRegisterForm}
          loading={loading}
        >
          o Registrate
        </Button>
        <div>
          <Button className="submit" type="submit">
            Entrar
          </Button>
          <Button type="button" onClick={handleResetPassword}>
            ¿Has olvidado la contraseña?
          </Button>
        </div>
      </div>
    </Form>
  );
}
