import Svg, { SvgProps, Path } from "react-native-svg";

const IconBinaryTree = (props: SvgProps) => (
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
    <Path d="M14 6a2 2 0 1 0-4 0 2 2 0 0 0 4 0zM7 14a2 2 0 1 0-4 0 2 2 0 0 0 4 0zM21 14a2 2 0 1 0-4 0 2 2 0 0 0 4 0zM14 18a2 2 0 1 0-4 0 2 2 0 0 0 4 0zM12 8v8M6.316 12.496l4.368-4.992M17.684 12.496l-4.366-4.99" />
  </Svg>
);
export default IconBinaryTree;
