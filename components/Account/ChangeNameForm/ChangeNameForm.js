import { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { updateNameAPI } from "../../../api/user";

export default function ChangeNameForm(props) {
  const { user, logout, setReloadUser } = props;
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: user.name || "",
      lastname: user.lastname || "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required(true),
      lastname: Yup.string().required(true),
    }),
    onSubmit: async (formData) => {
      setLoading(true);

      const resUpdateNameAPI = await updateNameAPI(user.id, formData, logout);
      if (!resUpdateNameAPI) {
        toast.error("Error al actualizar el nombre y apellido");
      } else {
        setReloadUser(true);
        toast.success("Nombre y apellidos actualizados");
      }
      setLoading(false);
    },
  });

  return (
    <div className="change-name-form">
      <h4>Cambia tu nombre u apellidos</h4>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group widths="equal">
          <Form.Input
            name="name"
            placeholder="Tu nuevo nombre"
            onChange={formik.handleChange}
            value={formik.values.name}
            error={formik.errors.name}
          />
          <Form.Input
            name="lastname"
            placeholder="Tus nuevos apellidos"
            onChange={formik.handleChange}
            value={formik.values.lastname}
            error={formik.errors.lastname}
          />
        </Form.Group>
        <Button className="submit" type="submit" loading={loading}>
          Actualizar
        </Button>
      </Form>
    </div>
  );
}
