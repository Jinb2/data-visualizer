import { Fragment, useState } from "react";
import { Link as ReachLink } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Box,
  FormLabel,
  Flex,
  Stack,
  FormControl,
  Input,
  Button,
  Heading,
  Text,
  Link,
} from "@chakra-ui/react";
const Register = ({ setAuth }) => {
  // state for the inputs to the form
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    name: "",
  });

  // parse information
  const { email, password, name } = inputs;

  // add to our state
  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  // when user submits
  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      // form data to be submitted
      const body = { email, password, name };

      const response = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      // jwt token for user
      const jwtToken = await response.json();

      if (jwtToken.token) {
        setAuth(true);

        // stores this jwt token
        localStorage.setItem("token", jwtToken.token);
        toast.success("🦄 Registered!", {
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
        toast.error("This is an existing account! 👀", {
          position: "top-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      // send user to login page after getting jwt token
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <Flex minH={"100vh"} align={"center"} justify={"center"}>
        <Stack
          border="2px"
          borderColor="gray.200"
          spacing={8}
          mx={"auto"}
          maxW={"lg"}
          py={12}
          px={6}
          rounded={"lg"}
        >
          <Stack align={"center"}>
            <Heading fontSize={"4xl"} textAlign={"center"}>
              Sign up
            </Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
              to enjoy all of our cool features ✌️
            </Text>
            <form onSubmit={onSubmitForm}>
              <Box mt="10%">
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
                    <FormLabel>Name</FormLabel>
                    <Input
                      type="name"
                      name="name"
                      value={name}
                      onChange={(e) => onChange(e)}
                    />
                  </FormControl>
                </Box>
              </Box>
              <Box>
                <Box>
                  <FormControl>
                    <FormLabel>Password</FormLabel>
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
                  loadingText="Submitting"
                  size="lg"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  <button>Sign Up</button>
                </Button>
              </Stack>
            </form>

            <Text>Already a user?</Text>
            <Link as={ReachLink} to="/login" color={"blue.400"}>
              Sign In
            </Link>
          </Stack>
        </Stack>
      </Flex>
    </Fragment>
  );
};

export default Register;
