interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  // Add any custom props here if needed
}

const FormField: React.FC<InputFieldProps> = (props) => {
  return (
    <input
      className="bg-dark-base rounded-sm  border-b-2 p-1
      text-white-base
      border-brand-primary 
      outline-none 
      placeholder:text-white-darker
      placeholder:px-1"
      {...props}
    />
  );
};

export default FormField;
