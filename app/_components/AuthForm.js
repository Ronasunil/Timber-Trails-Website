export default function AuthForm({ children, onSubmit }) {
  return (
    <form
      onSubmit={onSubmit}
      className="border border-gray-950 flex flex-col bg-gray-800 gap-8 w-[40%] py-12 px-14"
    >
      {children}
    </form>
  );
}
