import { Fragment, useState } from "react";
import { Link as ReachLink } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Link,
  Button,
  Heading,
  Text,
} from "@chakra-ui/react";
const Login = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const { email, password } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();

    try {
      const body = { email, password };
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const jwtToken = await response.json();

      // if validate token then we authenticate the user
      if (jwtToken.token) {
        localStorage.setItem("token", jwtToken.token);
        setAuth(true);
        toast.success("🖐 You're in!", {
          position: "top-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        setAuth(false);
        console.log(jwtToken);
        toast.error("😔 " + jwtToken, {
          position: "top-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <Flex minH={"100vh"} align={"center"} justify={"center"}>
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"}>Sign in to your account</Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
              to enjoy all of our cool{" "}
              <Link as={ReachLink} to="/about" color={"blue.400"}>
                features
              </Link>{" "}
              ✌️
            </Text>
          </Stack>
          <Box
            border="2px"
            borderColor="gray.200"
            rounded={"lg"}
            boxShadow={"lg"}
            p={8}
          >
            <form onSubmit={onSubmitForm}>
              <Box mt="5%">
                <Box>
                  <FormControl>
                    <FormLabel>Email</FormLabel>
                    <Input
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e) => onChange(e)}
                    />
                  </FormControl>
                </Box>
              </Box>
              <Box>
                <Box>
                  <FormControl>
                    <FormLabel mt="5%">Password</FormLabel>
                    <Input
                      type="password"
                      name="password"
                      value={password}
                      onChange={(e) => onChange(e)}
                    />
                  </FormControl>
                </Box>
              </Box>

              <Stack spacing={10} pt={2}>
                <Button
                  size="lg"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  <button>Sign In</button>
                </Button>
              </Stack>
            </form>
            <Link as={ReachLink} to="/register">
              Don't have an account? Sign Up
            </Link>
          </Box>
        </Stack>
      </Flex>
    </Fragment>
  );
};

export default Login;
