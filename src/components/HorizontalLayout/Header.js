import React, { Component } from "react";
import PropTypes from "prop-types";
import "react-drawer/lib/react-drawer.css";

import { connect } from "react-redux";

import { Link } from "react-router-dom";

// reactstrap
import { DropdownToggle } from "reactstrap";

// Import menuDropdown
import ProfileMenu from "../CommonForBoth/TopbarDropdown/ProfileMenu";
import logo from "../../assets/images/logo.svg";
import logoLight from "../../assets/images/logo-light.png";
import logoLightSvg from "../../assets/images/logo-light.svg";
import logoDark from "../../assets/images/logo-dark.png";

// import images
// Redux Store
import { getUserInfo, toggleRightSidebar } from "../../store/actions";

//i18n
import { withTranslation } from "react-i18next";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSearch: false,
      open: false,
      position: "right"
    };
    this.toggleMenu = this.toggleMenu.bind(this);
    this.toggleFullscreen = this.toggleFullscreen.bind(this);
    this.toggleSearch = this.toggleSearch.bind(this);
    this.toggleRightDrawer = this.toggleRightDrawer.bind(this);
    this.closeDrawer = this.closeDrawer.bind(this);
    this.onDrawerClose = this.onDrawerClose.bind(this);
  }

  toggleSearch = () => {
    this.setState({ isSearch: !this.state.isSearch });
  };

  /**
   * Toggle sidebar
   */
  toggleMenu() {
    this.props.openLeftMenuCallBack();
  }

  /**
   * Toggles the sidebar
   */
  toggleRightDrawer() {
    this.setState({ position: "right" });
    this.setState({ open: !this.state.open });
  }

  closeDrawer() {
    this.setState({ open: false });
  }

  onDrawerClose() {
    this.setState({ open: false });
  }

  toggleFullscreen() {
    if (
      !document.fullscreenElement &&
      /* alternative standard method */ !document.mozFullScreenElement &&
      !document.webkitFullscreenElement
    ) {
      // current working methods
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen(
          Element.ALLOW_KEYBOARD_INPUT
        );
      }
    } else {
      if (document.cancelFullScreen) {
        document.cancelFullScreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
    }
  }

  componentDidMount() {
    console.log("render header");
    if (this.props.user.cart_count === null) {
      this.props.getUserInfo();
    }
  }

  render() {
    return (
      <React.Fragment>
        <header id="page-topbar">
          <div className="navbar-header">
            <div className="d-flex">
              <div className="navbar-brand-box">
                <Link to="/" className="logo logo-dark">
                  <span className="logo-sm">
                    <img src={logo} alt="" height="22" />
                  </span>
                  <span className="logo-lg">
                    <img src={logoDark} alt="" height="17" />
                  </span>
                </Link>

                <Link to="/" className="logo logo-light">
                  <span className="logo-sm">
                    <img src={logoLightSvg} alt="" height="22" />
                  </span>
                  <span className="logo-lg">
                    <img src={logoLight} alt="" height="19" />
                  </span>
                </Link>
              </div>
              <Link to={"/"}>

                <button
                  type="button"
                  className="btn px-3 font-size-16 header-item"
                >
                  Всі події
                </button>
              </Link>


            </div>

            <div className="d-flex">
              <DropdownToggle
                className="btn header-item noti-icon"
                tag="button"
                id="page-header-notifications-dropdown"
              >
                <Link to={"/ecommerce-cart"}>
                  <i className="bx bx-cart" />
                  {this.props.user.cart_count !== null &&
                  <span className="badge bg-danger rounded-pill">{this.props.user.cart_count}</span>}
                </Link>
              </DropdownToggle>
              <ProfileMenu />
            </div>
          </div>
        </header>
      </React.Fragment>
    );
  }
}

Header.propTypes = {
  openLeftMenuCallBack: PropTypes.func,
  t: PropTypes.any,
  toggleRightSidebar: PropTypes.func,
  getUserInfo: PropTypes.func,
  user: PropTypes.any
};

const mapStatetoProps = state => {
  const { layoutType, user } = state.Layout;
  return { layoutType, user };
};

export default connect(mapStatetoProps, { toggleRightSidebar, getUserInfo })(
  withTranslation()(Header)
);
