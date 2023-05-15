import Svg, { SvgProps, Path } from "react-native-svg";

const IconDeviceFloppy = (props: SvgProps) => (
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
    <Path d="M6 4h10l4 4v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2" />
    <Path d="M10 14a2 2 0 1 0 4 0 2 2 0 1 0-4 0M14 4v4H8V4" />
  </Svg>
);
export default IconDeviceFloppy;
