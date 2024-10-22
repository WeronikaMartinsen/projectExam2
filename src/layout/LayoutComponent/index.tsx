import { ReactNode } from "react";
import "../../styles/index.css";
import Header from "../Header";
import Footer from "../Footer";

interface LayoutComponentProps {
  children: ReactNode;
}

function LayoutComponent({ children }: LayoutComponentProps) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}

export default LayoutComponent;
