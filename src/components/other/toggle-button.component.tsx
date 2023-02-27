type ToggleButtonProps = {
  toggled: boolean;
  setToggled: (toggled: boolean) => void;
  label: string;
};

const ToggleButton = ({ toggled, setToggled, label }: ToggleButtonProps) => {
  return (
    <label
      htmlFor="toggleFour"
      className="flex cursor-pointer select-none items-center justify-center"
    >
      <span className="mx-2 text-sm leading-normal">{label}</span>
      <div className="relative">
        <input
          onClick={() => setToggled(!toggled)}
          type="checkbox"
          id="toggleFour"
          className="sr-only"
        />
        <div
          className="box bg-neutral-700 block h-5 w-10 rounded-full"
          style={toggled ? { backgroundColor: "rgb(59 130 246)" } : {}}
        ></div>
        <div
          className="dot absolute left-1 top-1 flex h-3 w-3 items-center justify-center rounded-full bg-white transition-all duration-100"
          style={toggled ? { transform: "translateX(170%)" } : {}}
        ></div>
      </div>
    </label>
  );
};

export default ToggleButton;
