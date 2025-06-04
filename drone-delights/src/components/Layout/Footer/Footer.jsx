import "./Footer.css";
import footerBackground from "../../../assets/images/footer.svg";

function Footer() {
  return (
    <div className="footer-container">
      <div className="footer-content">
        <p className="footer-text">
          <span>@2025</span>
          {"|"}
          <span className="footer-company-name">Drone</span>
          <span className="footer-company-name">Delights</span>
          {"|"}
          <span>All Rights Reserved</span>
        </p>
      </div>
      <img
        src={footerBackground}
        alt="Footer Background"
        className="footer-background"
      />
    </div>
  );
}

export default Footer;
