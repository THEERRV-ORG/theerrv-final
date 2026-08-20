import useReveal from "../../hooks/useReveal";

/**
 * Generic scroll-reveal wrapper. `as` lets it render the correct semantic tag
 * so it never forces a <div> where a heading or list item belongs.
 */
export default function Reveal({ as: Tag = "div", delay = 0, className = "", children, ...rest }) {
  const ref = useReveal();
  const style = delay ? { transitionDelay: `${delay}ms` } : undefined;

  return (
    <Tag ref={ref} className={`reveal ${className}`.trim()} style={style} {...rest}>
      {children}
    </Tag>
  );
}
