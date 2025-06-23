import styles from "./styles.module.css";

function Card({ children, className = "" }) {
  return (
    <article className={`${styles.Card} ${className}`}>{children}</article>
  );
}

function Thumbnail({ zoomOnHover = false, children }) {
  return (
    <div
      className={`${styles.thumbnailContainer} ${
        zoomOnHover ? styles.zoomOnHover : ""
      }`}
    >
      {children}
    </div>
  );
}

function Description({ className = "", children }) {
  return <div className={className}>{children}</div>;
}

Card.Thumbnail = Thumbnail;
Card.Description = Description;

export default Card;
