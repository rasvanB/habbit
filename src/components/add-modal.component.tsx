const AddModal = ({ isHidden }: { isHidden: boolean }) => {
  return (
    <div
      className={`${
        isHidden ? "hidden" : "flex"
      } fixed h-screen w-screen justify-center items-center bg-black bg-opacity-60`}
    >
      <div className="bg-slate-200 flex flex-col">
        <div>Add a new Habit</div>
      </div>
    </div>
  );
};
export default AddModal;
