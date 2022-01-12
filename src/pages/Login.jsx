import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { userContext } from "../contexts/UserContext";
import { mobile } from "../responsive";
import Toastify from "toastify-js";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
`;

const Link = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // eslint-disable-line
  const { loginUser, errorMSG, logSuccess } = useContext(userContext);
  console.log(logSuccess);
  useEffect(() => {
    if (logSuccess) navigate(-1);
  }, [logSuccess]);
  let message;
  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form
          onSubmit={async (e) => {
            e.preventDefault();

            if (!email || !password) {
            }
            setIsSubmitting(true);
            loginUser(email, password)
              .then((response) => {})
              .catch((error) => {
                console.log(error.message);
                Toastify({
                  text: error.message,
                  className: "error",
                  style: {
                    background:
                      "linear-gradient(to right, rgb(71, 22, 22), red)",
                  },
                }).showToast();
              })
              .finally(() => setIsSubmitting(false));
          }}
        >
          <Input
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            type="email"
            placeholder="your email"
          />
          <Input
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            type="password"
            autoComplete="password"
            placeholder="password"
          />
          {logSuccess ? <></> : <p style={{ color: "red" }}>{errorMSG}</p>}

          <Button type="submit">LOGIN</Button>
          <Link>DO NOT YOU REMEMBER THE PASSWORD?</Link>
          <Link to="/register">CREATE A NEW ACCOUNT</Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
