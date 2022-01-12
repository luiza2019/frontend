import React, { useContext, useEffect } from "react";
import * as yup from "yup";
import { Formik } from "formik";
import { Form, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router";
import { merchContext } from "../contexts/MerchContext";

const EditPage = () => {
  const { saveEditedProducts, getProductsToEdit, merchToEdit } =
    useContext(merchContext);
  const params = useParams();
  useEffect(() => {
    getProductsToEdit(params.id);
  }, []);
  const schema = yup.object().shape({
    name: yup.string().min(2).max(30).required("Required"),
    price: yup.string().min(3).max(255).required("Required"),
    brand: yup.string().required("Required"),
    type: yup.string().required("Required"),
    img: yup.string().required("Required"),
  });
  const navigate = useNavigate();
  return (
    <div>
      <h2>Редактирование</h2>
      {merchToEdit ? (
        <Formik
          validationSchema={schema}
          onSubmit={(data, { resetForm }) => {
            console.log(data);
            saveEditedProducts(data);
            navigate(-1);
          }}
          initialValues={merchToEdit}
        >
          {({ handleSubmit, handleChange, values, touched, errors }) => (
            <Form
              style={{ width: "90%", margin: "0 auto" }}
              className="bg-light p-4"
              onSubmit={handleSubmit}
            >
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Название товара</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Введите название товара"
                  name="name"
                  onChange={handleChange}
                  isValid={!errors.name && touched.name}
                  isInvalid={!!errors.name}
                  value={values.name}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail2">
                <Form.Label>Цена товара</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Введите цену товара"
                  name="price"
                  onChange={handleChange}
                  isValid={!errors.price && touched.price}
                  isInvalid={!!errors.price}
                  value={values.price}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.price}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail1">
                <Form.Label>Брэнд товара</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  name="brand"
                  onChange={handleChange}
                  isValid={!errors.brand && touched.brand}
                  isInvalid={!!errors.brand}
                  value={values.brand}
                >
                  <option>Выберите брэнд</option>
                  <option value="Gucci">Gucci</option>
                  <option value="Dior">Dior</option>
                  <option value="L&V">L&V</option>
                </Form.Select>

                <Form.Control.Feedback type="invalid">
                  {errors.brand}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Тип товара</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  type="text"
                  name="type"
                  onChange={handleChange}
                  isValid={!errors.type && touched.description}
                  isInvalid={!!errors.type}
                  value={values.type}
                >
                  <option>Выберите тип</option>
                  <option value="Formal">Formal</option>
                  <option value="Casual">Casual</option>
                  <option value="Suit">Suit</option>
                </Form.Select>

                <Form.Control.Feedback type="invalid">
                  {errors.type}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Фото товара</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Введите фото"
                  name="image"
                  onChange={handleChange}
                  isValid={!errors.img && touched.img}
                  isInvalid={!!errors.img}
                  value={values.img}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.img}
                </Form.Control.Feedback>
              </Form.Group>

              <Button
                style={{
                  border: "none",
                  marginLeft: "0",
                  backgroundColor: "#1C374C",
                }}
                variant="primary"
                type="submit"
              >
                Отправить
              </Button>
            </Form>
          )}
        </Formik>
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  );
};

export default EditPage;
