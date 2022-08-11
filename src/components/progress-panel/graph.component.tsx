import { ResponsiveBar } from "@nivo/bar";

const Graph = () => {
  return (
    <div className="w-[600px] h-[350px] dark:bg-zinc-800 rounded-md pt-10 px-2 mt-3">
      <ResponsiveBar
        data={[
          { month: "JAN", value: 100 },
          { month: "FEB", value: 120 },
          { month: "MAR", value: 200 },
        ]}
        indexBy="month"
        margin={{
          top: 10,
          right: 10,
          bottom: 36,
          left: 36,
        }}
        colors={["#3B82F6"]}
        padding={0.6}
        borderRadius={5}
        theme={{
          axis: {
            ticks: {
              line: {
                stroke: "#A3A3A3",
              },
              text: {
                fill: "#A3A3A3",
              },
            },
          },
          grid: {
            line: {
              stroke: "#383838",
              strokeWidth: 2,
            },
          },
        }}
      ></ResponsiveBar>
    </div>
  );
};

export default Graph;
