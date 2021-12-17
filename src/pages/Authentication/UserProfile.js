import PropTypes from 'prop-types';
import React, { Component } from "react";
import {
  Alert,
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Row,
} from "reactstrap";

// availity-reactstrap-validation
import { AvField, AvForm } from "availity-reactstrap-validation";

// Redux
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

//Import Breadcrumb
import Breadcrumb from "../../components/Common/Breadcrumb";

import avatar from "../../assets/images/users/avatar-1.jpg";
// actions
import { editProfile, resetProfileFlag } from "../../store/actions";
import EcommerceArchive from "../Ecommerce/EcommerceArchive";

class UserProfile extends Component {
  constructor(props) {
    super(props)
    this.state = { email: "", name: "", idx: 1 }

    // handleValidSubmit
    this.handleValidSubmit = this.handleValidSubmit.bind(this)
  }

  // handleValidSubmit
  handleValidSubmit(event, values) {
    this.props.editProfile(values)
  }

  componentDidMount() {
    if (localStorage.getItem("authUser")) {
      const obj = JSON.parse(localStorage.getItem("authUser"))
      if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
        this.setState({
          name: obj.displayName,
          email: obj.email,
          idx: obj.uid,
        })
      } else if (
        process.env.REACT_APP_DEFAULTAUTH === "fake" ||
        process.env.REACT_APP_DEFAULTAUTH === "jwt"
      ) {
        this.setState({ name: obj.username, email: obj.email, idx: obj.uid })
      }
    }
  }

  // eslint-disable-next-line no-unused-vars
  componentDidUpdate(prevProps, prevState, ss) {
    if (this.props !== prevProps) {
      const obj = JSON.parse(localStorage.getItem("authUser"))
      this.setState({ name: obj.username, email: obj.email, idx: obj.uid })

      setTimeout(() => {
        this.props.resetProfileFlag();
      }, 3000);
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="page-content">
          <Container fluid>
            {/* Render Breadcrumb */}
            <Breadcrumb title="" breadcrumbItem="Профіль" />

            <Row>
              <Col lg="12">
                {this.props.error && this.props.error ? (
                  <Alert color="danger">{this.props.error}</Alert>
                ) : null}
                {this.props.success && this.props.success ? (
                  <Alert color="success">{this.props.success}</Alert>
                ) : null}

                <Card>
                  <CardBody>
                    <div className="d-flex">
                      <div className="me-3">
                        <img
                          src={avatar}
                          alt=""
                          className="avatar-md rounded-circle img-thumbnail"
                        />
                      </div>
                      <div className="align-self-center flex-1">
                        <div className="text-muted">
                          <h5>{this.state.name}</h5>
                          <p className="mb-1">{this.state.email}</p>
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>

            {/*<h4 className="card-title mb-4">Зміна пароля</h4>*/}
            {/*<Card>*/}
            {/*  <CardBody>*/}
            {/*    <AvForm*/}
            {/*      className="form-horizontal"*/}
            {/*      onValidSubmit={(e, v) => {*/}
            {/*        this.handleValidSubmit(e, v)*/}
            {/*      }}*/}
            {/*    >*/}
            {/*      <Row className="form-group">*/}
            {/*        <Col>*/}
            {/*            <AvField*/}
            {/*              name="password"*/}
            {/*              label="Password"*/}
            {/*              className="form-control"*/}
            {/*              type="password"*/}
            {/*              required*/}
            {/*              placeholder="Enter Password"*/}
            {/*            />*/}
            {/*        </Col>*/}
            {/*        <Col>*/}
            {/*            <AvField*/}
            {/*              name="confirm"*/}
            {/*              label="Confirm password"*/}
            {/*              className="form-control"*/}
            {/*              type="password"*/}
            {/*              required*/}
            {/*              validate={{match:{value:'password'}}}*/}
            {/*              placeholder="Confirm password"*/}
            {/*            />*/}
            {/*        </Col>*/}
            {/*      </Row>*/}
            {/*      <div className="text-center mt-4">*/}
            {/*        <Button type="submit" color="danger">*/}
            {/*          Зберегти*/}
            {/*        </Button>*/}
            {/*      </div>*/}
            {/*    </AvForm>*/}
            {/*  </CardBody>*/}
            {/*</Card>*/}

            <h4 className="card-title mb-4 mt-3">Архів</h4>
            <EcommerceArchive/>
          </Container>
        </div>
      </React.Fragment>
    )
  }
}

UserProfile.propTypes = {
  editProfile: PropTypes.func,
  error: PropTypes.any,
  success: PropTypes.any,
  resetProfileFlag: PropTypes.func
}

const mapStateToProps = state => {
  const { error, success } = state.Profile
  return { error, success }
}

export default withRouter(
  connect(mapStateToProps, { editProfile, resetProfileFlag })(UserProfile)
)
