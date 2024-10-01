import {
  Container,
  Nav,
  Navbar,
  NavDropdown,
  Offcanvas,
  Button,
} from "react-bootstrap";
import Logo from "../logo/Logo";
import CartButton from "../cart-btn/CartButton";
import { useNavigate, useLocation } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import ScrollIntoView from "react-scroll-into-view";

function Header() {
  const navigate = useNavigate();
  let location = useLocation();
  const { items } = useContext(CartContext);
  const { isAuthenticated, logout, user } = useContext(AuthContext);

  const numberOfCartItems = items?.reduce(
    (total, curr) => (total += Number(curr.quantity)),
    0
  );

  const logInNavHandler = () => {
    if (location.pathname !== "/auth") {
      navigate("/auth");
    }
  };

  return (
    <Navbar
      expand={"sm"}
      style={{
        height: "70px",
        position: "fixed",
        top: "0px",
        left: "0px",
        zIndex: "10",
        width: "100%",
      }}
      className="bg-body-tertiary shadow"
    >
      <Container fluid>
        <Navbar.Brand onClick={() => navigate("/")}>
          <Logo size="45" fontSize="25px" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-sm`} />
        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand-sm`}
          aria-labelledby={`offcanvasNavbarLabel-expand-sm`}
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-sm`}>
              <Logo size="45" fontSize="25px" />
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="d-flex gap-3 flex-sm-row flex-column-reverse align-items-center justify-content-sm-end justify-content-center flex-grow-1 pe-3">
              <NavDropdown
                title="Categories"
                id={`offcanvasNavbarDropdown-expand-sm`}
                className="mx-3"
              >
                <ScrollIntoView selector="#etx">
                  <NavDropdown.Item>Electronics</NavDropdown.Item>
                </ScrollIntoView>
                <ScrollIntoView selector="#mf">
                  <NavDropdown.Item>Men's Fashion</NavDropdown.Item>
                </ScrollIntoView>
                <ScrollIntoView selector="#hf">
                  <NavDropdown.Item>Home & Furniture</NavDropdown.Item>
                </ScrollIntoView>
              </NavDropdown>
              <CartButton
                cartItems={numberOfCartItems}
                clickHandler={() => navigate("/cart")}
              />

              {isAuthenticated ? (
                <Button variant="primary" size="lg" onClick={logout}>
                  Log Out
                </Button>
              ) : (
                <Button variant="primary" size="lg" onClick={logInNavHandler}>
                  Log In
                </Button>
              )}
              {isAuthenticated && (
                <div
                  title={user.name}
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    backgroundColor: "#FFFFF7 ",
                    display: "grid",
                    placeContent: "center",
                    border: "3px solid dodgerblue",
                    color: "dodgerblue",
                  }}
                >
                  {user.name.charAt(0)}
                </div>
              )}
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

export default Header;
