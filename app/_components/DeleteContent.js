const { default: SpinnerMini } = require("@/components/SpinnerMini");
const { TrashIcon } = require("@heroicons/react/24/solid");

export default function DeleteContent({ isPending }) {
  return isPending ? (
    <div className="flex w-[100%] justify-center items-center">
      <SpinnerMini />
    </div>
  ) : (
    <>
      <TrashIcon className="h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors" />
      <span className="mt-1">Delete</span>
    </>
  );
}
