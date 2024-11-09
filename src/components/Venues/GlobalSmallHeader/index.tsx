import "../../../styles/index.css";

function GlobalSmallHeader() {
  return (
    <>
      <section className="bg-secondary h-21 w-full">
        <div className="flex justify-center">
          <span className="text-white text-center text-sm p-4">
            Hurry up! This autumn up til 20% rabat!
          </span>
          <span className="text-accent text-center text-sm font-semibold leading-6 p-4 underline cursor-pointer">
            Check for more offers &#8594;
          </span>
        </div>
      </section>
    </>
  );
}
export default GlobalSmallHeader;
