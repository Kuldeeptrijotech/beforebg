import Image from "next/image";
import Link from "next/link";
import trijotechLogo from "../assets/image/L0502.png";
import sapPartnerLogo from "../assets/image/SAP-partner-logo-1-scaled.png";
import isoCert from "../assets/image/L903.png";

const Icon = ({ name }) => {
  const paths = {
    "map-marker": (
      <>
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" />
      </>
    ),
    envelope: (
      <>
        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
      </>
    ),
    phone: (
      <>
        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
      </>
    ),
    linkedin: (
      <>
        <path d="M4.98 3.5A2.5 2.5 0 1 1 0 3.5a2.5 2.5 0 0 1 4.98 0zM.5 8h4V24h-4V8zm7.5 0h3.8v2.2h.05c.53-1 1.83-2.2 3.77-2.2 4.03 0 4.78 2.65 4.78 6.1V24h-4v-8.5c0-2.03-.04-4.64-2.83-4.64-2.83 0-3.27 2.21-3.27 4.5V24H8V8z" />
      </>
    ),
    "youtube-play": (
      <>
        <path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.5A3.02 3.02 0 0 0 .5 6.19C0 8.07 0 12 0 12s0 3.93.5 5.81a3.02 3.02 0 0 0 2.12 2.14c1.88.5 9.38.5 9.38.5s7.5 0 9.38-.5a3.02 3.02 0 0 0 2.12-2.14C24 15.93 24 12 24 12s0-3.93-.5-5.81zM9.55 15.57V8.43L15.82 12l-6.27 3.57z" />
      </>
    ),
    twitter: (
      <>
        <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.52 8.52 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21c7.88 0 12.21-6.54 12.21-12.21 0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
      </>
    ),
  };

  return (
    <svg
      className="footer-icon"
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="currentColor"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
};

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="row">

          <div className="col-md-3 footer-item">
            <h4>Useful Links</h4>
            <ul className="menu-list">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/services">Services</Link></li>
              <li><Link href="/industry">Industry</Link></li>
              <li><Link href="/privacy-policy">Privacy Policy</Link></li>
            </ul>
          </div>

          <div className="col-md-3 footer-item">
            <h4>Quick Links</h4>
            <ul className="menu-list">
              <li><Link href="/blogs">Blogs</Link></li>
              <li><Link href="/case-studies">Case Studies</Link></li>
              <li><Link href="/careers">Careers</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="col-md-3 footer-item">
            <h4>Corporate Address:</h4>
            <p className="icon-text">
              <Icon name="map-marker" />
              C-414, Tower-C 4th Floor Noida One, Plot No-8 Block-B Sector 62, Noida, Gautam Buddha Nagar, Uttar Pradesh, 201301
            </p>
            <p className="icon-text">
              <Icon name="envelope" />
              <a href="mailto:sales@trijotech.com">sales@trijotech.com</a>
            </p>
          </div>

          <div className="col-md-3 footer-item">
            <h4>Registered Address:</h4>
            <p className="icon-text">
              <Icon name="map-marker" />
              House No 74, 2nd Floor, Block B Pocket 6, Sector 7,<br />
              Rohini, North West, Delhi, 110085
            </p>
            <p className="icon-text">
              <Icon name="phone" />
              <a href="tel:+911203506433">+91 120-3506433</a>
            </p>
            <p className="icon-text">
              <Icon name="phone" />
              <a href="tel:+917982531976">+91 7982531976</a>
            </p>
          </div>

        </div>

        
        <div className="footer-bar">
          <div className="footer-logos">
            <Image src={trijotechLogo} alt="TRIJOTECH" className="footer-logo" width={120} height={38} />
            <Image src={sapPartnerLogo} alt="SAP Partner" className="footer-logo" width={120} height={38} />
          </div>
          <div className="footer-certifications">
            <span className="cert-heading">Certifications</span>
            <Image src={isoCert} alt="ISO 9001" className="footer-cert" width={90} height={44} />
          </div>
        </div>
      </div>

      <div className="sub-footer">
        <div className="container sub-footer-content">
          <span className="copyright">
            Copyright &copy; 2025 Trijotech Software Consulting Pvt. Ltd
          </span>
          <ul className="social-icons">
            <li>
              <a href="https://www.linkedin.com/company/trijotech/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Icon name="linkedin" />
              </a>
            </li>
            <li>
              <a href="https://www.youtube.com/@trijotech.?si=sHcVTbyQjNgHKJ0N" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <Icon name="youtube-play" />
              </a>
            </li>
            <li>
              <a href="#" aria-label="Twitter">
                <Icon name="twitter" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
