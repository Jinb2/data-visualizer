import { Box, SimpleGrid, Icon, Text, Stack, Flex } from "@chakra-ui/react";
import { FcLibrary, FcDonate } from "react-icons/fc";
import { GiConsoleController } from "react-icons/gi";

const Feature = ({ title, text, icon }) => {
  return (
    <Stack>
      <Flex
        w={16}
        h={16}
        align={"center"}
        justify={"center"}
        color={"white"}
        rounded={"full"}
        bg={"gray.100"}
        mb={1}
      >
        {icon}
      </Flex>
      <Text fontWeight={600}>{title}</Text>
      <Text color={"gray.600"}>{text}</Text>
    </Stack>
  );
};

const ThreeColumn = () => {
  return (
    <Box mt="10%" mb="10%" p={4}>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
        <Feature
          icon={<Icon as={FcLibrary} w={10} h={10} />}
          title={"Data Democracy"}
          text={
            "Data should be accesible to everyone, which is why we allow for all users to share their data with each other!"
          }
        />
        <Feature
          icon={<Icon as={FcDonate} w={10} h={10} />}
          title={"Data Discpline"}
          text={
            "We want you to focus on analyzing the data and so we have options for data analysis."
          }
        />
        <Feature
          icon={<Icon as={GiConsoleController} w={10} h={10} />}
          title={"Data playground"}
          text={"Play around with data and do cool things! Coming soon...."}
        />
      </SimpleGrid>
    </Box>
  );
};

export default ThreeColumn;
