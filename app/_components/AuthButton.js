export default function AuthButton({ children, disabled }) {
  return (
    <button
      disabled={disabled}
      className={` h-12 border-2 border-gray-950 bg-yellow-600 text-lg ${
        !disabled && "hover:bg-yellow-500"
      } transition-colors duration-300 outline-none focus: outline-3 focus: outline-offset-1 focus:outline-yellow-500`}
    >
      {children}
    </button>
  );
}
