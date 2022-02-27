import Footer from "./footer";
import Navbar from "./navbar";

const index = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default index;
