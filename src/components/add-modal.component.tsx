import InputBox from "./form-input.component";
const AddModal = ({ isHidden }: { isHidden?: boolean }) => {
  return (
    <div
      className={`${
        isHidden ? "hidden" : "flex"
      } fixed h-screen w-screen justify-center items-center bg-black bg-opacity-60`}
    >
      <div className="bg-slate-200 dark:bg-zinc-700 flex flex-col p-10">
        <div className="dark:text-white">Add a new Habit</div>
        <InputBox
          label="Name"
          placeholder="Enter the name of your habit"
        ></InputBox>
      </div>
    </div>
  );
};
export default AddModal;
