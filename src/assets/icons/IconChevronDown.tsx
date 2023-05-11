import Svg, { SvgProps, Path } from "react-native-svg";

const IconChevronDown = (props: SvgProps) => (
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
    <Path d="m6 9 6 6 6-6" />
  </Svg>
);
export default IconChevronDown;
