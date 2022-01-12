import styled from "styled-components";
import { userContext } from "../contexts/UserContext";
import { mobile } from "../responsive";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Toastify from "toastify-js";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
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
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { signUpUser, logSuccess, errorMSG } = useContext(userContext);
  useEffect(() => {
    if (logSuccess) navigate("/");
  }, [logSuccess]);
  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form
          onSubmit={async (e) => {
            e.preventDefault();

            if (!email || !password) {
            }
            setIsSubmitting(true);
            signUpUser(email, password)
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
          {/* <Input placeholder="username" /> */}
          <Input
            placeholder="email"
            name="email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="password"
            name="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {logSuccess ? <></> : <p style={{ color: "red" }}>{errorMSG}</p>}

          {/* <Input placeholder="confirm password" type="password" /> */}
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button type="submit">CREATE</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
