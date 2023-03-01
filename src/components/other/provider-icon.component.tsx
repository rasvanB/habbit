export const typesList = ["facebook", "google", "twitter"] as const;
export type IconTypes = typeof typesList[number];

type IconProps = {
  type: IconTypes;
};

const icons: Record<IconTypes, string> = {
  facebook: "bg-facebook-icon",
  google: "bg-google-icon",
  twitter: "bg-twitter-icon",
} as const;

const ProviderIcon = ({ type }: IconProps) => {
  return (
    <div
      className={`icon h-9 ${icons[type]} bg-cover bg-center bg-no-repeat w-9`}
    ></div>
  );
};

export default ProviderIcon;
