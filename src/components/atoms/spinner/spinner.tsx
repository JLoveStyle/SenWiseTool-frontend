interface Props {
  size?: "very-small" | "small" | "medium" | "large" | "very-large";
}

export const Spinner = ({ size = "medium" }: Props) => {
  let sizeStyle = 0;

  switch (size) {
    case "very-small":
      sizeStyle = 18;
      break;
    case "small":
      sizeStyle = 25;
      break;
    case "medium":
      sizeStyle = 33; // DEFAULT
      break;
    case "large":
      sizeStyle = 40;
      break;
    case "very-large":
      sizeStyle = 50;
      break;
  }

  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 38 38"
      xmlns="http://www.w3.org/2000/svg"
      stroke="#fff"
    >
      <g fill="none" fill-rule="evenodd">
        <g transform="translate(1 1)" stroke-width="2">
          <circle stroke-opacity=".5" cx="18" cy="18" r="18" />
          <path d="M36 18c0-9.94-8.06-18-18-18">
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 18 18"
              to="360 18 18"
              dur="1s"
              repeatCount="indefinite"
            />
          </path>
        </g>
      </g>
    </svg>
  );
};
