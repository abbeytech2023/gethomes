export default function Form({ children, handleSubmit, onSubmit }) {
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-2 bg-slate-50"
    >
      {children}
    </form>
  );
}
