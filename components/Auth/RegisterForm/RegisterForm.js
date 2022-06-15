import { useState } from "react";
import { registerAPI } from "../../../api/user";
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

export default function RegisterForm(props) {
  const { handleShowLoginForm } = props;
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      lastname: "",
      username: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required(true),
      lastname: Yup.string().required(true),
      username: Yup.string().required(true),
      email: Yup.string().email(true).required(true),
      password: Yup.string().required(true),
    }),
    onSubmit: async (formData) => {
      setLoading(true);

      const resRegister = await registerAPI(formData);

      if (resRegister?.jwt) handleShowLoginForm();
      else toast.error("ERROR en el registro, intentelo mas tarde");

      setLoading(false);
    },
  });

  return (
    <Form className="login-form" onSubmit={formik.handleSubmit}>
      <Form.Input
        name="name"
        type="text"
        placeholder="Nombre"
        onChange={formik.handleChange}
        error={formik.errors.name}
      />
      <Form.Input
        name="lastname"
        type="text"
        placeholder="Apellidos"
        onChange={formik.handleChange}
        error={formik.errors.lastname}
      />
      <Form.Input
        name="username"
        type="text"
        placeholder="Nombre de Usuario"
        onChange={formik.handleChange}
        error={formik.errors.username}
      />
      <Form.Input
        name="email"
        type="text"
        placeholder="Correo electronico"
        onChange={formik.handleChange}
        error={formik.errors.email}
      />
      <Form.Input
        name="password"
        type="password"
        placeholder="Contraseña"
        onChange={formik.handleChange}
        error={formik.errors.password}
      />
      <div className="actions">
        <Button type="button" onClick={handleShowLoginForm}>
          Iniciar Sesión
        </Button>
        <Button type="submit" className="submit" loading={loading}>
          Registrar
        </Button>
      </div>
    </Form>
  );
}
