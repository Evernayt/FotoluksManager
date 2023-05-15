import Svg, { SvgProps, Path } from "react-native-svg";

const IconArrowLeft = (props: SvgProps) => (
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
    <Path d="M5 12h14M5 12l6 6M5 12l6-6" />
  </Svg>
);
export default IconArrowLeft;
