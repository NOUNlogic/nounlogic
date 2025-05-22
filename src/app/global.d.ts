// Additional styles and animations
interface CSSProperties {
  animationDelay?: string;
}

// For styled-jsx types
declare namespace JSX {
  interface IntrinsicElements {
    'style': React.DetailedHTMLProps<React.StyleHTMLAttributes<HTMLStyleElement>, HTMLStyleElement> & {
      jsx?: boolean;
      global?: boolean;
    };
  }
}