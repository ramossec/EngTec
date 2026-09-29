/** ENGTECN wordmark recreated as vector: "ENG" graphite/white, "TECN" red. */
export function Logo({ variant = 'dark', className }: { variant?: 'dark' | 'light'; className?: string }) {
  const eng = variant === 'dark' ? '#23272B' : '#FFFFFF'
  return (
    <svg
      viewBox="0 0 220 44"
      className={className}
      role="img"
      aria-label="ENGTECN Soluções"
      xmlns="http://www.w3.org/2000/svg"
    >
      <text
        x="0"
        y="36"
        fontFamily="'Arial Black', 'Helvetica Neue', Arial, sans-serif"
        fontWeight="900"
        fontSize="42"
        letterSpacing="-2.5"
      >
        <tspan fill={eng}>ENG</tspan>
        <tspan fill="#ED1C24">TECN</tspan>
      </text>
    </svg>
  )
}
