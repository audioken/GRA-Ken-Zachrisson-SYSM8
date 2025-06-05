import "./Footer.css";
import footerBackground from "../../../assets/images/footer.svg";

function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <p className="footer-text">
          <span>@2025</span>
          {"|"}
          <strong className="footer-company-name">Drone Delights</strong>
          {"|"}
          <span>All Rights Reserved</span>
        </p>
      </div>
      <img
        src={footerBackground}
        alt=""
        aria-hidden="true"
        className="footer-background"
      />
    </footer>
  );
}

export default Footer;
