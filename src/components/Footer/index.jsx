import "./style.css";

let icons = [{ icon: "bi bi-facebook" }, { icon: "bi bi-instagram" }, { icon: "bi bi-twitter" }, { icon: "bi bi-envelope" }];
const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-4 col-sm-12">
            <p>Jalan Suroyo No. 161 Mayangan Kota Probolonggo 672000</p>
            <p>binarcarrental@gmail.com</p>
            <p>081-233-334-808</p>
          </div>
          <div className="col-lg-2 col-md-2 col-sm-12">
            <ul className="gap-lg-3 gap-md-3 gap-sm-0 p-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#our-services">
                  Our Services
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#why-us">
                  Why Us
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#testimonial">
                  Testimonial
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#faq">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
          <div className="col-lg-4 col-md-3 col-sm-12">
            <p>Connect with us</p>
            <div className="d-flex flex-wrap gap-3 pb-4">
              {icons.map((icons, id) => (
                <a href="/" key={id}>
                  <i className={icons.icon}></i>
                </a>
              ))}
            </div>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-12 pb-5">
            <p>Copyright Binar 2023</p>
            <a className="navbar-brand fw-bold" href="#">
              Binar Car
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
