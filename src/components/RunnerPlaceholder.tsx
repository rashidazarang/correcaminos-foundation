interface RunnerPlaceholderProps {
  size?: number;
  className?: string;
}

export const RunnerPlaceholder = ({ size = 150, className = "" }: RunnerPlaceholderProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 200 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Background */}
    <circle cx="100" cy="100" r="100" fill="#E8E0D8" />

    {/* Head */}
    <circle cx="100" cy="75" r="32" fill="#C4BAB0" />

    {/* Shoulders / body — clipped to circle */}
    <clipPath id="body-clip">
      <circle cx="100" cy="100" r="100" />
    </clipPath>
    <ellipse cx="100" cy="172" rx="55" ry="50" fill="#C4BAB0" clipPath="url(#body-clip)" />
  </svg>
);
