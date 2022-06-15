import { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { updateEmailAPI } from "../../../api/user";

export default function ChangeEmailForm(props) {
  const { user, logout, setReloadUser } = props;
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      repeatEmail: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email(true)
        .required(true)
        .oneOf([Yup.ref("repeatEmail")], true),
      repeatEmail: Yup.string()
        .email(true)
        .required(true)
        .oneOf([Yup.ref("email")], true),
    }),
    onSubmit: async (formData) => {
      setLoading(true);

      const resUpdateEmailAPI = await updateEmailAPI(
        user.id,
        formData.email,
        logout
      );

      if (!resUpdateEmailAPI) toast.error("Error al actualizar el email");
      else if (resUpdateEmailAPI?.error?.status === 400)
        toast.error(resUpdateEmailAPI?.error?.message);
      else {
        setReloadUser(true);
        toast.success("Email actualizado");
        formik.handleReset();
      }

      setLoading(false);
    },
  });

  return (
    <div className="change-email-form">
      <h4>
        Cambia tu e-mail <span>(email actual: {user.email})</span>
      </h4>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group widths="equal">
          <Form.Input
            name="email"
            placeholder="Tu nuevo email"
            onChange={formik.handleChange}
            value={formik.values.email}
            error={formik.errors.email}
          />
          <Form.Input
            name="repeatEmail"
            placeholder="Confirma tu nuevo email"
            onChange={formik.handleChange}
            value={formik.values.repeatEmail}
            error={formik.errors.repeatEmail}
          />
        </Form.Group>
        <Button className="submit" loading={loading} type="submit">
          Actualizar
        </Button>
      </Form>
    </div>
  );
}
