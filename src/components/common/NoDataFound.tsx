import Image from "next/image";
import { FaFilter } from "react-icons/fa";

const NoDataFound = ({
  type,
  debounce,
  handleEdit,
  handleReset,
  operationsAllowed,
}: {
  type: string;
  debounce: any;
  handleEdit: any;
  handleReset: any;
  operationsAllowed: any;
}) => {
  return (
    <div className="flex gap-5 justify-between font-semibold">
      <div className="w-full flex justify-center items-center">
        <Image
          src={"/assets/error/no_data_found.avif"}
          alt="No Data Found"
          priority
          width={100}
          height={100}
          unoptimized
          className="w-1/2 h-full object-contain"
        />
      </div>
      <div className="flex space-x-2">
        <button
          type="button"
          onClick={debounce(handleReset, 1000)}
          className="bg-white text-primary border h-fit flex gap-2 justify-center items-center border-primary outline-none px-2 py-1.5 rounded-md hover:bg-primary hover:text-white"
        >
          Clear&nbsp;filters <FaFilter />
        </button>
        {operationsAllowed?.create && (
          <button
            type="button"
            onClick={() => handleEdit("")}
            className="bg-primary text-white px-4 h-fit py-2 rounded-md"
          >
            Add&nbsp;{type}
            <sup>+</sup>
          </button>
        )}
      </div>
    </div>
  );
};

export default NoDataFound;
