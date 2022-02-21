import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useState, Fragment } from "react";

import { Line } from "react-chartjs-2";
import {
  Heading,
  FormControl,
  Input,
  FormLabel,
  Center,
  Box,
  VStack,
} from "@chakra-ui/react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineGraph = ({ setAuth }) => {
  // graphs to show
  const [graphs, setGraphs] = useState([]);

  // state for the inputs to the form
  const [inputs, setInputs] = useState({
    xLabel: "",
    yLabel: "",
    title: "",
    dataset1: "",
    dataset2: "",
  });

  // parse information
  var { xLabel, yLabel, dataset1, dataset2, title, xTitle } = inputs;

  // add to our state
  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  // parse labels seperated by commas
  const parseLabels = () => {
    xLabel = xLabel.split(",");
    yLabel = yLabel.split(",");
  };

  // parse labels seperated by commas
  const parseDataset = () => {
    dataset1 = dataset1.split(",");
    dataset2 = dataset2.split(",");
    console.log("dataset1 " + typeof dataset1);
    console.log("dataset2 " + typeof dataset2);
  };

  // add graphs on click
  const addGraphOnClick = (e) => {
    e.preventDefault();
    // parse user information
    parseDataset();
    parseLabels();

    // data json
    const data = {
      labels: xLabel,
      datasets: [
        {
          label: "Company A",
          data: dataset1,
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
        {
          label: "Company b",
          data: dataset2,
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.5)",
        },
      ],
    };

    const options = {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: title,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: yLabel,
          },
        },
        x: {
          beginAtZero: true,
          title: {
            display: true,
            text: xTitle,
          },
        },
      },
    };

    setGraphs([...graphs, <Line data={data} options={options} />]);
  };

  return (
    <Fragment>
      <Center>
        <Heading mt="5%">Create your Line Graph</Heading>
      </Center>
      <form onSubmit={addGraphOnClick}>
        <FormControl>
          <VStack alignItems="left">
            <FormLabel>Title</FormLabel>
            <Input
              onChange={(e) => onChange(e)}
              name="title"
              type="text"
              placeholder="Give your data a story"
            />
            <FormLabel>Labels for x-axis</FormLabel>
            <Input
              onChange={(e) => onChange(e)}
              name="xLabel"
              type="text"
              placeholder="label separated by commas"
            />
            <FormLabel>Y-axis Title</FormLabel>
            <Input
              onChange={(e) => onChange(e)}
              name="yLabel"
              type="text"
              placeholder="label separated by commas"
            />
            <FormLabel>X-axis Title</FormLabel>
            <Input
              onChange={(e) => onChange(e)}
              name="xTitle"
              type="text"
              placeholder="Title for your x-axis"
            />
            <FormLabel>Dataset 1</FormLabel>
            <Input
              onChange={(e) => onChange(e)}
              name="dataset1"
              type="text"
              placeholder="data separated by commas"
            />
            <FormLabel>Dataset 2</FormLabel>
            <Input
              onChange={(e) => onChange(e)}
              name="dataset2"
              type="text"
              placeholder="data separated by commas"
            />
          </VStack>
        </FormControl>
        <Box
          as="button"
          borderRadius="md"
          bg="tomato"
          color="white"
          px={4}
          h={8}
          mt="2%"
        >
          <button>Create a graph</button>
        </Box>
      </form>

      {graphs.map((item, i) => (
        <div>{item}</div>
      ))}
    </Fragment>
  );
};

export default LineGraph;
