import { Box, Heading, Text } from "@chakra-ui/react";
import { InfoIcon } from "@chakra-ui/icons";

const InsideDiv = () => {
  return (
    <Box mt="10%" textAlign="center" py={10} px={6}>
      <InfoIcon boxSize={"50px"} color={"blue.500"} />
      <Heading as="h2" size="xl" mt={6} mb={2}>
        Empty graphs..
      </Heading>
      <Text color={"gray.500"}>
        You don't have any datasets or graphs to choose from yet. Click the
        create graph to get started!
      </Text>
    </Box>
  );
};

export default InsideDiv;
