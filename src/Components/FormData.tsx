interface field {
  field: {
    label: string;
    value: string;
    type: string;
  };
}

const FormData: React.FC<field> = ({ field }) => {
  if (field.type === "textarea") {
    return (
      <div className="flex justify-start mb-3">
        <span className="text-xl font-semibold">
          {field.label.slice(0, 1).toUpperCase() + field.label.slice(1)} :
        </span>
        <textarea
          readOnly
          value={field.value}
          className="pl-1 text-lg text-gray-900 font-medium border-none focus:outline-none focus:border-none w-4/5"
        />{" "}
      </div>
    );
  }

  if (field.type === "file") {
    return (
      <div className="flex justify-start items-center mb-3">
        <span className="text-xl font-semibold">
          {field.label.slice(0, 1).toUpperCase() + field.label.slice(1)} :
        </span>
        <span className="ml-2 text-lg text-gray-900 font-medium">
          {field.value || "No file selected"}
        </span>
      </div>
    );
  }

  return (
    <div className="flex justify-start items-center mb-3">
      <span className="text-xl font-semibold">
        {field.label.slice(0, 1).toUpperCase() + field.label.slice(1)} :
      </span>
      <input
        readOnly
        type={field.type}
        value={field.value}
        className="pl-1 text-lg text-gray-900 font-medium border-none focus:outline-none focus:border-none w-4/5"
      />{" "}
    </div>
  );
};

export default FormData;
