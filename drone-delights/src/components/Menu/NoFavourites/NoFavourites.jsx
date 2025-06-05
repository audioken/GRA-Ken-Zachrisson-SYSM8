import "./NoFavourites.css";
import "../../../styles/TypographyStyles.css";

function NoFavourites() {
  const smiley = ":(";

  return (
    <div className="no-fav-container">
      <p className="no-fav-text-row">
        <span className="title-header-blue">No favourites here</span>{" "}
        <span className="title-header-red">Yet!</span>
        <span className="smiley xxl">{smiley}</span>
      </p>
    </div>
  );
}

export default NoFavourites;
