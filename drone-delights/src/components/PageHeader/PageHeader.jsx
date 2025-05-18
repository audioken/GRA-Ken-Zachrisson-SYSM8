import "./PageHeader.css";
import waveyBackground from "../../assets/images/wavey-background-pages.svg";

function PageHeader({ pageTitleBlue, pageTitleRed }) {
  return (
    <div className="page-header-container">
      <div className="page-header-content">
        <h1 className="page-header-title">
          <span className="page-header-title-blue">{pageTitleBlue}</span>
          <span className="page-header-title-red">{pageTitleRed}</span>
        </h1>
      </div>
      <img
        src={waveyBackground}
        alt="Wavey Background"
        className="page-header-background"
      />
    </div>
  );
}

export default PageHeader;
