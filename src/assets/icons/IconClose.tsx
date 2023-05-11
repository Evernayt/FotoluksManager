import Svg, { SvgProps, Path } from "react-native-svg";

const IconClose = (props: SvgProps) => (
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
    <Path d="M18 6 6 18M6 6l12 12" />
  </Svg>
);
export default IconClose;
