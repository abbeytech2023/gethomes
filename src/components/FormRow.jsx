// import Input from "@/app/_components/Input";

function FormRow({ children, label, error }) {
  return (
    <div className="flex flex-col gap-4 mb-4 text-[0.7rem]">
      {label && <Label htmlFor={children.props?.id}>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </div>
  );
}

export default FormRow;

function Label({ children }) {
  return <div className="text-[1.2rem] font-[500]">{children}</div>;
}

function Error({ children }) {
  return (
    <span className="font-semibold text-lg w-[70%] mx-auto text-center text-red-700">
      {children}
    </span>
  );
}
