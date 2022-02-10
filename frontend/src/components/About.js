import Footer from "./Footer";
import { Fragment } from "react";
import TwoColumn from "./about/TwoColumn";
import ThreeColumn from "./about/ThreeColumn";
import Navbar from "./Navbar";

const About = () => {
  return (
    <Fragment>
      <Navbar />
      <TwoColumn />
      <ThreeColumn />
      <Footer></Footer>
    </Fragment>
  );
};

export default About;
