interface FormFieldProps {
  field: {
    label: string;
    type:
      | "text"
      | "number"
      | "password"
      | "textarea"
      | "date"
      | "file"
      | "email";
    value: string;
  };
  index: number;
  onUpdate: (
    index: number,
    updatedField: {
      label: string;
      type:
        | "text"
        | "number"
        | "password"
        | "textarea"
        | "date"
        | "file"
        | "email";
      value: string;
    }
  ) => void;
  onRemove: (index: number) => void;
}

const FormField: React.FC<FormFieldProps> = ({
  field,
  onUpdate,
  onRemove,
  index,
}) => {
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    onUpdate(index, { ...field, value: e.target.value });
  };

  if (field.type === "textarea") {
    return (
      <div className="mb-4 p-4 border border-gray-300 rounded-lg shadow-md">
        <label className="flex gap-2 flex-col justify-start mb-4 text-lg font-medium text-gray-700">
          <span>{field.label}</span>
          <textarea
            className="px-4 py-2 border-1 border-blue-300 focus:outline-none focus:ring-2 rounded-lg focus:ring-blue-500 transition duration-200"
            value={field.value}
            onChange={handleChange}
          />
        </label>

        <button
          className="px-3 py-1 bg-red-500 text-white font-semibold shadow-sm rounded-lg hover:bg-red-600 transition duration-200 cursor-pointer"
          onClick={() => onRemove(index)}
        >
          Remove
        </button>
      </div>
    );
  }

  if (field.type === "file") {
    return (
      <div className="mb-4 p-4 border border-gray-300 rounded-lg shadow-md">
        <label className="flex gap-2 flex-col justify-start mb-4 text-lg font-medium text-gray-700 cursor-pointer">
          <div>
            <span>{field.label} </span>
          </div>
          <input
            className="px-2 py-2 border-1 border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            type="file"
            onChange={(e) =>
              onUpdate(index, {
                ...field,
                value: e.target.files
                  ? Array.from(e.target.files)
                      .map((file) => file.name)
                      .join(", ")
                  : "",
              })
            }
          />
        </label>

        <button
          className="px-3 py-1 bg-red-500 text-white font-semibold shadow-sm rounded-lg hover:bg-red-600 transition duration-200 cursor-pointer"
          onClick={() => onRemove(index)}
        >
          Remove
        </button>
      </div>
    );
  }

  return (
    <div className="mb-4 p-4 border border-gray-300 rounded-lg shadow-md">
      <label className="flex gap-2 flex-col justify-start mb-4 text-lg font-medium text-gray-700">
        <span>{field.label}</span>
        <input
          type={field.type}
          value={field.value}
          className="px-4 py-2 border-1 border-blue-300 focus:outline-none rounded-lg focus:ring-2 focus:ring-blue-500 transition duration-200"
          onChange={handleChange}
        />
      </label>

      <button
        className="px-3 py-1 bg-red-500 text-white font-semibold shadow-sm rounded-lg hover:bg-red-600 transition duration-200 cursor-pointer"
        onClick={() => onRemove(index)}
      >
        Remove
      </button>
    </div>
  );
};

export default FormField;
