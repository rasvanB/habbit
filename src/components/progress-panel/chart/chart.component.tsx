import { ResponsivePie } from "@nivo/pie";
const CompletionRate = () => {
  return (
    <div className="w-[200px] h-[230px] dark:bg-zinc-800 dark:text-gray-200 rounded-lg mt-3 font-poppins p-2 relative ml-2">
      <div className="text-center font-medium mt-2">Completion Rate</div>
      <div className="w-[180px] h-[180px] relative mt-1">
        <div className="absolute flex justify-center items-center text-xl text-gray-200 font-medium font-poppins text-center top-0 left-0 w-full h-full">
          80%
        </div>
        <ResponsivePie
          data={[
            {
              id: 0,
              value: 80,
              color: "#5480d9",
            },
            { id: 1, value: 20, color: "#363636" },
          ]}
          innerRadius={0.5}
          padAngle={0.7}
          cornerRadius={3}
          margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
          activeOuterRadiusOffset={5}
          colors={{ datum: "data.color" }}
          borderWidth={1}
          enableArcLabels={false}
          enableArcLinkLabels={false}
          tooltip={() => <></>}
        ></ResponsivePie>
      </div>
    </div>
  );
};

export default CompletionRate;
