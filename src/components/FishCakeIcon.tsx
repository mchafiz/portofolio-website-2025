const FishCakeIcon = ({ className = "" }: { className?: string }) => {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Fish shape */}
      <ellipse
        cx="12"
        cy="12"
        rx="8"
        ry="5"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      {/* Fish tail */}
      <path
        d="M4 12L2 10L2 14L4 12Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="0.5"
      />
      {/* Fish eye */}
      <circle cx="16" cy="10" r="1.5" fill="white" />
      <circle cx="16.2" cy="9.8" r="0.8" fill="black" />
      {/* Fish pattern (stripes) */}
      <path
        d="M7 9C8 10 9 10 10 9M11 12C12 13 13 13 14 12M7 15C8 16 9 16 10 15"
        stroke="white"
        strokeWidth="0.8"
        strokeLinecap="round"
        opacity="0.6"
      />
    </svg>
  );
};

export default FishCakeIcon;