// Tiny helper to render amber→orange gradient text consistently.
export default function GradientText({ children, className = '' }) {
  return <span className={`text-gradient ${className}`}>{children}</span>
}
