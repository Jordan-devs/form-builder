import { ChangeEvent, useEffect, useState } from "react";
import useFormStore from "../Store";
import FormField from "./FormField";
import FormData from "./FormData";

interface NewField {
  label: string;
  type: "text" | "number" | "password" | "email" | "textarea" | "date" | "file";
  value: string;
}

const FormBuilder = () => {
  const { addField, formFields, removeField, resetForm, updateField } =
    useFormStore();

  const [newField, setNewField] = useState<NewField>({
    label: "",
    type: "text",
    value: "",
  });

  const handleAddField = () => {
    if (newField.label === "") return;

    addField(newField);
    setNewField({ label: "", type: "text", value: "" });
  };

  const handleFieldChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewField((prev) => ({ ...prev, [name]: value }));
  };

  const handleFieldUpdate = (index: number, updatedField: NewField) =>
    updateField(index, updatedField);

  const handleFieldRemove = (index: number) => removeField(index);

  useEffect(() => {
    const storedData = localStorage.getItem("fields");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      parsedData.forEach((field: any) => {
        addField(field);
      });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("fields", JSON.stringify(formFields));
  }, [formFields]);

  return (
    <div className="w-full min-h-screen flex flex-col">
      <div className="sm:min-w-lg max-sm:w-full max-sm:mx-4 mx-auto p-6 bg-white shadow-md rounded-lg sm:my-6 ring-2 ring-gray-600 ">
        <h1 className="text-3xl font-bold mb-4 text-center text-shadow-sm text-shadow-blue-300">
          Form Builder
        </h1>

        <div className="flex flex-col mb-6 space-y-4">
          <input
            type="text"
            name="label"
            placeholder="Field Label"
            value={newField.label}
            onChange={handleFieldChange}
            className="px-4 py-2 border-1  border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          />

          <select
            name="type"
            value={newField.type}
            onChange={handleFieldChange}
            className="px-4 py-2 border-1 border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer transition duration-200"
          >
            <option value="text">Text</option>
            <option value="number">Number</option>
            <option value="password">Password</option>
            <option value="email">Email</option>
            <option value="textarea">Textarea</option>
            <option value="file">File</option>
            <option value="date">Date</option>
          </select>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={handleAddField}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-sm hover:bg-blue-600 transition duration-200 font-semibold cursor-pointer"
            >
              Add Field
            </button>

            <button
              type="button"
              onClick={resetForm}
              className="bg-red-500 text-white font-semibold py-2 px-4 rounded-lg shadow-sm hover:bg-red-700 transition duration-200 cursor-pointer"
            >
              Reset Form
            </button>
          </div>
        </div>

        <form>
          {formFields.map((field, index) => (
            <FormField
              key={index}
              field={field}
              onUpdate={handleFieldUpdate}
              onRemove={handleFieldRemove}
              index={index}
            />
          ))}
        </form>
      </div>
      <div className="sm:min-w-lg max-sm:w-full max-sm:mx-4 mx-auto p-6 bg-gray-400 shadow-md rounded-lg sm:my-6 ring-2 ring-gray-600">
        <h1 className="text-3xl font-bold mb-4 text-center text-shadow-sm text-shadow-blue-300">
          Form Data
        </h1>
        {formFields.map((field, index) => (
          <FormData key={index} field={field} />
        ))}
      </div>
    </div>
  );
};

export default FormBuilder;
