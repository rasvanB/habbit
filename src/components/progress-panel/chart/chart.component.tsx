import { ResponsivePie } from "@nivo/pie";
const CompletionRate = () => {
  return (
    <div className="w-[200px] h-[200px]">
      <div className="absolute w-[200px] h-[200px] flex justify-center items-center text-2xl text-gray-200 font-medium font-poppins">
        80%
      </div>
      <ResponsivePie
        data={[
          {
            id: 0,
            value: 80,
            color: "#5480d9",
          },
          { id: 1, value: 20, color: "#eeeeee" },
        ]}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
        activeOuterRadiusOffset={8}
        colors={{ datum: "data.color" }}
        borderWidth={1}
        enableArcLabels={false}
        enableArcLinkLabels={false}
        tooltip={() => <></>}
      ></ResponsivePie>
    </div>
  );
};

export default CompletionRate;
