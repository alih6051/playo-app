import { Button, Input, VStack, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../redux/authSlice";

const Login = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const toast = useToast();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = () => {
    setLoading(true);
    axios
      .post(`${import.meta.env.VITE_BASE_URL}/users/login`, form)
      .then((res) => {
        setLoading(false);
        dispatch(loginUser(res.data));
        sessionStorage.setItem("jwt_playo", JSON.stringify(res.data));
        toast({
          title: "Login Successful.",
          position: "top",
          status: "success",
          isClosable: true,
        });
        navigate(-1);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        toast({
          title: err.response.data.msg,
          position: "top",
          status: "error",
          isClosable: true,
        });
      });
  };

  return (
    <VStack spacing={3}>
      <Input
        placeholder="Username*"
        name="username"
        value={form.username}
        onChange={handleChange}
      />
      <Input
        placeholder="Password*"
        type="password"
        name="password"
        value={form.password}
        onChange={handleChange}
      />
      <Button
        w="100%"
        colorScheme="green"
        isLoading={loading}
        loadingText="LOGIN"
        onClick={handleLogin}
      >
        LOGIN
      </Button>
    </VStack>
  );
};

export default Login;
