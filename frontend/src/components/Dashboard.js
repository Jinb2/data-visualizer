import { Fragment, useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  Container,
  Center,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  Heading,
  useDisclosure,
  Button,
  Divider,
  Image,
  VStack,
  SimpleGrid,
} from "@chakra-ui/react";

import { Link as ReachLink } from "react-router-dom";
import { Link } from "@chakra-ui/react";
const Dashboard = ({ setAuth }) => {
  const [name, setName] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const getName = async () => {
    try {
      const response = await fetch("http://localhost:5000/dashboard", {
        method: "GET",
        headers: { token: localStorage.token },
      });

      const user = await response.json();

      setName(user.user_name);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getName();
  }, []);

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setAuth(false);
    toast.success("✌️ Until again!", {
      position: "top-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <Fragment>
      <Button mt="2.5%" colorScheme="blue" onClick={onOpen}>
        Menu
      </Button>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">{name}</DrawerHeader>
          <DrawerBody>
            <VStack alignItems="left" mb="5%">
              <Image src="https://i.pravatar.cc"></Image>
              <Button onClick={(e) => logout(e)}>Logout</Button>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <Divider mt="1%" orientation="horizontal" />
      <Container>
        <Center mt="5%">
          <Heading>Pick which type of graph!</Heading>
        </Center>
        <SimpleGrid mt="5%" columns={2} spacingX="40px" spacingY="20px">
          <Link as={ReachLink} to="/linegraph">
            <Button>Line Graph</Button>
          </Link>
          <Button>Scatter Plot</Button>
          <Button>Doughnut Graph</Button>
          <Button>Bar Graph</Button>
        </SimpleGrid>
      </Container>
    </Fragment>
  );
};

export default Dashboard;
