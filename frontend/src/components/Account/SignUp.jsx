import { Button, Input, VStack, useToast } from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";

const SignUp = () => {
  const [form, setForm] = useState({
    name: "",
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const toast = useToast();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignUp = () => {
    setLoading(true);
    axios
      .post(`${import.meta.env.VITE_BASE_URL}/users/register`, form)
      .then(() => {
        setLoading(false);
        toast({
          title: "Account Created.",
          position: "top",
          status: "success",
          isClosable: true,
        });
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
        placeholder="Name*"
        name="name"
        value={form.name}
        onChange={handleChange}
      />
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
        loadingText="SIGN UP"
        onClick={handleSignUp}
      >
        SIGN UP
      </Button>
    </VStack>
  );
};

export default SignUp;
