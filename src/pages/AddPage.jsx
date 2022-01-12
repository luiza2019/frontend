import React, { useContext, useEffect, useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { merchContext } from "../contexts/MerchContext";
import $axios from "../axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Pagination from "../components/Pagination";
import { useNavigate } from "react-router";

const AddPage = () => {
  const { getMerch, addMerch, merch, deleteOneMerch } =
    useContext(merchContext);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [inputs, setInputs] = useState({
    name: "",
    price: "",
    brand: "",
    type: "",
    img: "",
  });
  let object = new URLSearchParams(window.location.search);

  const handleSearch = async (e) => {
    const value = e.target.value;
    setSearch(value);
    const { data } = await $axios.get("/product?limit=20&q=" + value);
    console.log(data);
    setData(data.rows);
  };
  useEffect(() => {
    getMerch();
  }, []);
  const getProducts = async () => {
    try {
      const { data } = await $axios.get("/product");
      console.log(data);
      setData(data.rows);
    } catch (error) {
      console.log(error);
      console.log("error ");
    }
  };
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleClick = async () => {
    addMerch(inputs);
  };

  const handleDelete = async (id) => {
    deleteOneMerch(id);
  };

  useEffect(() => {
    getMerch();
  }, []);
  return (
    <>
      <div>
        <h3>Add products</h3>
      </div>
      <div>
        <Form
          style={{ width: "60%", margin: "0 auto" }}
          className="bg-light p-4"
          // onSubmit={handleSubmit}
        >
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Введите название</Form.Label>

            <Form.Control
              type="text"
              name="name"
              onChange={handleChange}
              value={inputs.name}
              placeholder="Введите название"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Цена товара</Form.Label>
            <Form.Control
              type="number"
              name="price"
              onChange={handleChange}
              value={inputs.price}
              placeholder="Введите цену товара"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Фото товара</Form.Label>
            <Form.Control
              type="text"
              name="img"
              onChange={handleChange}
              value={inputs.img}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Бренд товара</Form.Label>
            <Form.Select
              type="text"
              name="brand"
              onChange={handleChange}
              value={inputs.brand}
              placeholder="Выберите бренд"
            >
              <option>Выберите бренд</option>
              <option value="Dior">Dior</option>
              <option value="Gucci">Gucci</option>
              <option value="L&V">L&V</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Тип товара</Form.Label>
            <Form.Select
              type="text"
              name="type"
              onChange={handleChange}
              value={inputs.type}
              placeholder="Выберите тип"
            >
              <option>Выберите тип</option>
              <option value="Formal">Formal</option>
              <option value="Casual">Casual</option>
              <option value="Suit">Suit</option>
            </Form.Select>
          </Form.Group>
        </Form>
      </div>
      <center>
        <button onClick={handleClick}>Create</button>
      </center>

      <div className="main-cards">
        {merch ? (
          merch.map((p) => (
            <div key={p.id} className="main-cardss">
              <Card style={{ width: "18rem" }}>
                <Card.Img variant="top" src={p.img} />
                <Card.Body>
                  <Card.Title>{p.name}</Card.Title>
                  <Card.Text>{p.price}</Card.Text>
                  <Card.Title>{p.brand}</Card.Title>
                  <Card.Title>{p.type}</Card.Title>

                  <Button
                    variant="primary"
                    onClick={() => {
                      navigate(`/detail/${p.id}`);
                    }}
                  >
                    Update
                  </Button>

                  <Button onClick={() => handleDelete(p.id)} variant="primary">
                    Delete
                  </Button>
                </Card.Body>
              </Card>
            </div>
          ))
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default AddPage;
