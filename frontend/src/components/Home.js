import {
  Container,
  Heading,
  Stack,
  Text,
  Button,
  Image,
  Link,
} from "@chakra-ui/react";
import hero from "../media/hero.svg";
import { Link as ReachLink } from "react-router-dom";
import { Fragment } from "react";
import Footer from "./Footer";
const Home = () => {
  return (
    <Fragment>
      <Container maxW={"lg"}>
        <Stack
          textAlign={"center"}
          align={"center"}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 20, md: 28 }}
        >
          <Heading
            fontWeight={600}
            fontSize={{ base: "3xl", sm: "4xl", md: "6xl" }}
            lineHeight={"110%"}
          >
            Data visualizing{" "}
            <Text as={"span"} color={"orange.400"}>
              made easy
            </Text>
          </Heading>
          <Text color={"gray.500"} maxW={"3xl"}>
            Easy to use 😎. Visualization with one click of a button 👁️. Share
            your awesome pretty graphs 📊.
          </Text>
          <Stack spacing={6} direction={"row"}>
            <Link as={ReachLink} to="/login">
              <Button
                rounded={"full"}
                px={6}
                colorScheme={"orange"}
                bg={"orange.400"}
                _hover={{ bg: "orange.500" }}
              >
                Sign In
              </Button>
            </Link>
            <Link as={ReachLink} to="/register">
              <Button rounded={"full"} px={6}>
                Sign Up
              </Button>
            </Link>
          </Stack>

          <Image boxSize="23rem" src={hero}></Image>
        </Stack>
      </Container>
      <Footer></Footer>
    </Fragment>
  );
};

export default Home;
