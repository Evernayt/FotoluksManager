import Svg, { SvgProps, Path } from "react-native-svg";

const IconMenu = (props: SvgProps) => (
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
    <Path d="M4 6h16M4 12h16M4 18h16" />
  </Svg>
);
export default IconMenu;
