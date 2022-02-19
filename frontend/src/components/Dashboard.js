import { Fragment, useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
  Button,
  Divider,
  Image,
  VStack,
} from "@chakra-ui/react";
import InsideDiv from "./dashboard/InsideDiv";
import Graph from "./dashboard/Graph";

const Dashboard = ({ setAuth }) => {
  // graphs to show
  const [graphs, setGraphs] = useState([]);

  // add graphs on click
  const addGraphOnClick = (e) => {
    setGraphs([...graphs, <Graph />]);
    console.log(graphs);
  };

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
              <Button onClick={addGraphOnClick}>Add graph</Button>
              <Button>Share graph</Button>
              <Button onClick={(e) => logout(e)}>Logout</Button>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <Divider mt="1%" orientation="horizontal" />
      {graphs.map((item, i) => (
        <div>{item}</div>
      ))}
    </Fragment>
  );
};

export default Dashboard;
