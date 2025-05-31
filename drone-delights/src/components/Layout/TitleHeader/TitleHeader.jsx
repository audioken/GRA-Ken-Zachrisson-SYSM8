import "./TitleHeader.css";
import "../../../styles/TypographyStyles.css"
import waveyBackground from "../../../assets/images/wavey-background-pages.svg";

function TitleHeader({ pageTitleBlue, pageTitleRed }) {
  return (
    <div className="title-header-container">
      <div className="title-header-content">
        <h1 className="title-header-text">
          <span className="title-header-blue">{pageTitleBlue}</span>
          <span className="title-header-red">{pageTitleRed}</span>
        </h1>
      </div>
      <img
        src={waveyBackground}
        alt="Wavey Background"
        className="title-header-background"
      />
    </div>
  );
}

export default TitleHeader;
