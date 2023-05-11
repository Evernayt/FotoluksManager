import Svg, { SvgProps, Path } from "react-native-svg";

const IconClearAll = (props: SvgProps) => (
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
    <Path d="M8 6h12M6 12h12M4 18h12" />
  </Svg>
);
export default IconClearAll;
