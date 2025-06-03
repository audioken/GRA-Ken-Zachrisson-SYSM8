import "./NotFound.css";
import "../../../styles/TypographyStyles.css";

function NotFound() {
  const smiley = ":(";

  return (
    <div className="not-found-container">
      <p className="text-row">
        <span className="title-header-blue xl">Oh no!</span>
        <span className="smiley xxl">{smiley}</span>
      </p>
      <p className="text-row">
        <span className="title-header-red xxl">404</span>
      </p>
      <p className="text-row">
        <span className="title-header-blue xl">Page Not Found!</span>
      </p>
    </div>
  );
}

export default NotFound;
