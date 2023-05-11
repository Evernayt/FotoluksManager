import Svg, { SvgProps, Path } from "react-native-svg";

const IconAdjustments = (props: SvgProps) => (
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
    <Path d="M12 6a2 2 0 1 0 4 0 2 2 0 1 0-4 0M4 6h8M16 6h4M6 12a2 2 0 1 0 4 0 2 2 0 1 0-4 0M4 12h2M10 12h10M15 18a2 2 0 1 0 4 0 2 2 0 1 0-4 0M4 18h11M19 18h1" />
  </Svg>
);
export default IconAdjustments;
