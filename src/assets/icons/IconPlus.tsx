import Svg, { SvgProps, Path } from "react-native-svg";

const IconPlus = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    viewBox="0 0 24 24"
    {...props}
  >
    <Path stroke="none" d="M0 0h24v24H0z" />
    <Path d="M12 5v14M5 12h14" />
  </Svg>
);
export default IconPlus;
