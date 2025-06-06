import { TagPropsType } from "@/app/interface";

const Tag = ({ width, height, isActive = false }: TagPropsType) => {
  const fill = isActive ? "#335CFF" : "#717784";

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.51318 4.97208C2.51562 3.79561 3.40507 2.74076 4.55965 2.54211C4.7964 2.50076 7.5734 2.50643 8.72233 2.50724C9.85909 2.50806 10.828 2.9167 11.6307 3.71777C13.335 5.41883 15.0377 7.12152 16.7379 8.82585C17.7441 9.83369 17.7579 11.3807 16.7558 12.3918C15.3101 13.8512 13.8571 15.3034 12.3985 16.749C11.3883 17.7504 9.84125 17.7374 8.83259 16.7312C7.11287 15.0163 5.39315 13.3014 3.68074 11.5793C3.01831 10.9129 2.62751 10.1077 2.54075 9.16636C2.47102 8.41394 2.51156 5.61667 2.51318 4.97208Z"
        stroke={fill}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.25593 6.9294C8.25268 7.65426 7.64702 8.2502 6.91487 8.24858C6.18757 8.24696 5.5819 7.64048 5.58596 6.91805C5.59082 6.164 6.18757 5.57618 6.94648 5.57942C7.66647 5.58185 8.25917 6.19239 8.25593 6.9294Z"
        stroke={fill}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Tag;
