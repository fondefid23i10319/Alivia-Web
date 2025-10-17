interface MoodFaceProps {
  value: number;
  color: string;
}

function MoodFace({ value, color = "white" }: MoodFaceProps) {
  const baseProps = {
    className: `w-8 h-8 aspect-square`,
    viewBox: "0 0 24 24",
    fill: "none",
    preserveAspectRatio: "xMidYMid meet",
  };
  switch (value) {
    case 0:
      return (
        <svg {...baseProps}>
          {/* Cara base ajustada al tamaño */}
          <circle cx="12" cy="12" r="10" fill={color} />
          {/* Ojos en X */}
          <path d="M8 8l2 2m0-2l-2 2M14 8l2 2m0-2l-2 2" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          {/* Boca muy triste */}
          <path d="M8 16c1-2 3-2 4-2s3 0 4 2" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );

    case 1:
      return (
        <svg {...baseProps}>
          {/* Cara base ajustada al tamaño */}
          <circle cx="12" cy="12" r="10" fill={color} />
          {/* Ojos simples */}
          <rect x="8" y="8.5" width="1.5" height="2" rx="0.75" fill="white" />
          <rect x="14.5" y="8.5" width="1.5" height="2" rx="0.75" fill="white" />
          {/* Boca triste */}
          <path d="M8.5 16.5c1-1 3-1 3.5-1s2.5 0 3.5 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );

    case 2:
      return (
        <svg {...baseProps}>
          {/* Cara base ajustada al tamaño */}
          <circle cx="12" cy="12" r="10" fill={color} />
          {/* Ojos simples */}
          <rect x="8" y="9" width="1.5" height="2" rx="0.75" fill="white" />
          <rect x="14.5" y="9" width="1.5" height="2" rx="0.75" fill="white" />
          {/* Boca neutra */}
          <path d="M8.5 15h7" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );

    case 3:
      return (
        <svg {...baseProps}>
          {/* Cara base ajustada al tamaño */}
          <circle cx="12" cy="12" r="10" fill={color} />
          {/* Ojos simples */}
          <rect x="8" y="9" width="1.5" height="2" rx="0.75" fill="white" />
          <rect x="14.5" y="9" width="1.5" height="2" rx="0.75" fill="white" />
          {/* Sonrisa */}
          <path
            d="M8.5 14c1 1.5 3 1.5 3.5 1.5s2.5 0 3.5-1.5"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      );

    case 4:
      return (
        <svg {...baseProps}>
          {/* Cara base ajustada al tamaño */}
          <circle cx="12" cy="12" r="10" fill={color} />
          {/* Ojos felices curvos */}
          <path
            d="M7 9c0.5-0.5 1.5-0.5 2 0M15 9c0.5-0.5 1.5-0.5 2 0"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          {/* Sonrisa grande */}
          <path
            d="M7.5 13.5c1.5 2.5 4 2.5 4.5 2.5s3 0 4.5-2.5"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      );

    default:
      return null;
  }
}

export default MoodFace;
