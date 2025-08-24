interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  // Add any custom props here if needed
}

const FormField: React.FC<InputFieldProps> = (props) => {
  return (
    <input
      className="bg-dark-base rounded-sm  border-b-2 py-2 px-1 lg:p-1
      text-white-base
      border-brand-primary 
      outline-none 
      placeholder:text-white-darker
      placeholder:px-1
      w-full lg:w-auto"
      {...props}
    />
  );
};

export default FormField;
