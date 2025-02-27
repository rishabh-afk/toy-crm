import { toast } from "react-toastify";
import { useState, useRef } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";

const DynamicStringInput = ({
  formData,
  setFormData,
}: {
  formData: any;
  setFormData: any;
}) => {
  const [newInput, setNewInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputs, setInputs] = useState<string[]>(
    formData && formData?.quotationTerms ? formData.quotationTerms : []
  );
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const handleAddOrUpdate = () => {
    if (newInput.trim() === "")
      return toast.warn("Input cannot be empty!", { position: "top-right" });

    if (editIndex !== null) {
      const updatedInputs = [...inputs];
      updatedInputs[editIndex] = newInput;
      setInputs(updatedInputs);
      setEditIndex(null);
      setFormData((prev: any) => ({ ...prev, quotationTerms: updatedInputs }));
    } else {
      setInputs([...inputs, newInput]);
      setFormData((prev: any) => ({
        ...prev,
        quotationTerms: [...inputs, newInput],
      }));
    }

    setNewInput("");
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const handleEdit = (index: number) => {
    setNewInput(inputs[index]);
    setEditIndex(index);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const handleDelete = (index: number) => {
    const updatedInputs = inputs.filter((_, i) => i !== index);
    setInputs(updatedInputs);
    setFormData((prev: any) => ({ ...prev, quotationTerms: updatedInputs }));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-700">
          Terms And Conditions
        </h2>
        <button
          type="button"
          onClick={() => setInputs([])}
          className={`px-3 py-1 min-h-full whitespace-nowrap rounded text-sm text-white bg-red-500 hover:bg-red-600`}
        >
          Clear All
        </button>
      </div>

      <div className="flex gap-2">
        <input
          ref={inputRef}
          type="text"
          value={newInput}
          placeholder="Enter text..."
          onChange={(e) => setNewInput(e.target.value)}
          className="border border-gray-400 p-2 focus:border-gray-600 outline-none rounded-lg w-full text-sm"
        />
        <button
          type="button"
          onClick={handleAddOrUpdate}
          className={`px-3 min-h-full whitespace-nowrap rounded-lg text-sm text-white ${
            editIndex !== null
              ? "bg-yellow-500 hover:bg-yellow-600"
              : "bg-primary hover:bg-secondary"
          }`}
        >
          {editIndex !== null ? "Update" : "Add More..."}
        </button>
      </div>

      <ul className="mt-4 space-y-2 text-sm">
        {inputs.map((input, index) => (
          <li
            key={index}
            className="flex justify-between items-center p-2 rounded-lg bg-gray-200"
          >
            <span>
              {index + 1}. {input}
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => handleEdit(index)}
                className="text-yellow-600 hover:text-yellow-700"
              >
                <FiEdit size={18} />
              </button>
              <button
                type="button"
                onClick={() => handleDelete(index)}
                className="text-red-500 hover:text-red-600"
              >
                <FiTrash2 size={18} />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DynamicStringInput;
