export const typesList = ["facebook", "google", "twitter"] as const;
export type IconTypes = typeof typesList[number];

type IconProps = {
  type: IconTypes;
};

const getIcon = (type: IconTypes) => {
  switch (type) {
    case "facebook":
      return "bg-facebook-icon";
    case "google":
      return "bg-google-icon";
    case "twitter":
      return "bg-twitter-icon";
  }
};

const ProviderIcon = ({ type }: IconProps) => {
  return (
    <div
      className={`icon h-9 ${getIcon(
        type
      )} bg-cover bg-center bg-no-repeat w-9`}
    ></div>
  );
};

export default ProviderIcon;
