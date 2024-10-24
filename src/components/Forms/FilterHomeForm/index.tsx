import "../../../styles/index.css";

function FilterHomeForm() {
  return (
    <form className="flex justify-around items-center gap-4 mx-auto w-full max-w-7xl p-6">
      <div className="w-full flex flex-col">
        <label className="text-white text-sm font-semibold leading-6">
          Where?
        </label>
        <input
          className="appearance-none w-full bg-white text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white hover:border-gray-500"
          type="text"
          placeholder="Chose place"
        />
      </div>
      <div className="w-full flex flex-col">
        <label className="text-sm font-semibold leading-6 text-white">
          When?
        </label>
        <input
          className="appearance-none w-full bg-white text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white hover:border-gray-500"
          type="text"
          placeholder="Where to?"
        />
      </div>
      <div className="w-full flex flex-col">
        <label className="text-sm font-semibold leading-6 text-white">
          How many people?
        </label>
        <input
          className="appearance-none w-full bg-white text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white hover:border-gray-500"
          type="text"
          placeholder="Where to?"
        />
      </div>
    </form>
  );
}
export default FilterHomeForm;
