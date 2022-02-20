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
import { toast } from "react-toastify";
import { Line } from "react-chartjs-2";
import {
  Heading,
  FormControl,
  Input,
  FormLabel,
  Center,
  Box,
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

const LineGraph = (props) => {
  // graphs to show
  const [graphs, setGraphs] = useState([]);

  // state for the inputs to the form
  const [inputs, setInputs] = useState({
    labels: "",
    dataset1: "",
    dataset2: "",
  });

  // parse information
  var { labels, dataset } = inputs;

  // add to our state
  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  // parse labels seperated by commas
  const parseLabels = () => {
    labels = labels.split(",");
  };

  // parse labels seperated by commas
  const parseDataset = () => {
    dataset = dataset.split(",");
  };

  // add graphs on click
  const addGraphOnClick = (e) => {
    e.preventDefault();
    // cant create a graph if no input
    if (labels == null || dataset == null) {
      toast.error("Empty input!!😡", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      // parse user information
      parseDataset();
      parseLabels();

      // data json
      const data = {
        labels: labels,
        datasets: [
          {
            label: "First dataset",
            data: dataset,
            fill: true,
            backgroundColor: "rgba(75,192,192,0.2)",
            borderColor: "rgba(75,192,192,1)",
          },
          {
            label: "Second dataset",
            data: dataset,
            fill: false,
            borderColor: "#742774",
          },
        ],
      };

      setGraphs([...graphs, <Line data={data} />]);
    }
  };

  return (
    <Fragment>
      <Center>
        <Heading mt="5%">Create your Line Graph</Heading>
      </Center>
      <form onSubmit={addGraphOnClick}>
        <FormControl>
          <FormLabel>Labels for x-axis</FormLabel>
          <Input
            onChange={(e) => onChange(e)}
            name="labels"
            type="text"
            placeholder="label separated by commas"
          />
          <FormLabel>Dataset</FormLabel>
          <Input
            onChange={(e) => onChange(e)}
            name="dataset"
            type="text"
            placeholder="data separated by commas"
          />
        </FormControl>
        <Box
          as="button"
          borderRadius="md"
          bg="tomato"
          color="white"
          px={4}
          h={8}
          mt="5%"
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
