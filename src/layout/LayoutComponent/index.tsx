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
      <div className="min-h-screen w-full flex flex-col p-0 m-0">
        <Header />
        <main className="bg-white flex-grow flex flex-col items-center bg-blend-lighten ">
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
}

export default LayoutComponent;
