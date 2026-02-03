interface RunnerPlaceholderProps {
  size?: number;
  className?: string;
}

let placeholderId = 0;

export const RunnerPlaceholder = ({ size = 150, className = "" }: RunnerPlaceholderProps) => {
  const clipId = `body-clip-${++placeholderId}`;
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <clipPath id={clipId}>
          <circle cx="100" cy="100" r="100" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clipId})`}>
        {/* Background */}
        <circle cx="100" cy="100" r="100" fill="#E8E0D8" />
        {/* Head */}
        <circle cx="100" cy="75" r="32" fill="#C4BAB0" />
        {/* Shoulders / body */}
        <ellipse cx="100" cy="172" rx="55" ry="50" fill="#C4BAB0" />
      </g>
    </svg>
  );
};
