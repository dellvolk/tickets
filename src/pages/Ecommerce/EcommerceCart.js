import React, { Component } from "react";
import { connect } from "react-redux";
import MetaTags from "react-meta-tags";
import { isEmpty, map, size } from "lodash";
import PropTypes from "prop-types";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Input,
  InputGroup,
  InputGroupAddon,
  Row,
  Table
} from "reactstrap";
import { Link, withRouter } from "react-router-dom";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

//Import Product Images
import images from "../../assets/images";
import { getCartData } from "../../store/actions";

class EcommerceCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productList: []
    };
  }

  componentDidMount() {
    const {
      cartData,
      onGetCartData
    } = this.props;
    onGetCartData();
    this.setState({ productList: cartData });
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      cartData
    } = this.props;
    if (
      !isEmpty(cartData) &&
      size(cartData) !== size(prevProps.cartData)
    ) {
      // this.setState({ productList: cartData })
      this.setState({
        productList: cartData.map(i => ({
          ...i,
          data_attr: +i.data_attr || 1,
          total: +i.price * (i.data_attr || 1)
        }))
      });
    }

    if (prevState.productList !== this.state.productList) {

    }
  }

  removeCartItem = id => {
    let productList = this.state.productList;
    const filtered = productList.filter(function(item) {
      return item.id !== id;
    });

    this.setState({ productList: filtered });
  };

  countUP = (id, prev_data_attr) => {
    const val = prev_data_attr + 1;
    this.setState({
      productList: this.state.productList.map(p =>
        p.id === id ? { ...p, data_attr: val, total: val * +p.price } : p
      )
    });
  };

  countDown = (id, prev_data_attr) => {
    const val = prev_data_attr - 1;
    this.setState({
      productList: this.state.productList.map(p =>
        p.id === id ? { ...p, data_attr: val, total: val * +p.price } : p
      )
    });
  };

  render() {
    // const {
    //   cartData: { orderSummary },
    // } = this.props
    const orderSummary = {};
    const { productList } = this.state;

    return (
      <React.Fragment>
        <div className="page-content">
          <MetaTags>
            <title>Кошик</title>
          </MetaTags>
          <Container fluid>
            <Breadcrumbs title="Список квитків" breadcrumbItem="Кошик" />
            <Row>
              <Col lx="8">
                <Card>
                  <CardBody>
                    <div className="table-responsive">
                      <Table className="table align-middle mb-0 table-nowrap">
                        <thead className="thead-light">
                        <tr>
                          <th>Product</th>
                          <th>Product Desc</th>
                          <th>Price</th>
                          <th>Quantity</th>
                          <th colSpan="2">Total</th>
                        </tr>
                        </thead>
                        <tbody>
                        {map(productList, product => (
                          <tr key={product.id}>
                            <td>
                              <img
                                src={images[product.img]}
                                alt="product-img"
                                title="product-img"
                                className="avatar-md"
                              />
                            </td>
                            <td>
                              <h5 className="font-size-14 text-truncate">
                                <Link
                                  to={"/ecommerce-product-details/" + product.id}
                                  className="text-dark"
                                >
                                  {product.name}
                                </Link>
                              </h5>
                              <p className="mb-0">
                                Color :{" "}
                                <span className="fw-medium">
                                    {product.color}
                                  </span>
                              </p>
                            </td>
                            <td>$ {product.price}</td>
                            <td>
                              <div style={{ width: "120px" }}>
                                <InputGroup>
                                  <InputGroupAddon addonType="prepend">
                                    <Button
                                      color="primary"
                                      onClick={() => {
                                        this.countUP(
                                          product.id,
                                          product.data_attr
                                        );
                                      }}
                                    >
                                      +
                                    </Button>
                                  </InputGroupAddon>
                                  <Input
                                    type="text"
                                    value={product.data_attr}
                                    name="demo_vertical"
                                    readOnly
                                  />
                                  <InputGroupAddon addonType="append">
                                    <Button
                                      color="primary"
                                      onClick={() => {
                                        this.countDown(
                                          product.id,
                                          product.data_attr
                                        );
                                      }}
                                    >
                                      -
                                    </Button>
                                  </InputGroupAddon>
                                </InputGroup>
                              </div>
                            </td>
                            <td>$ {product.total}</td>
                            <td>
                              <Link
                                to="#"
                                onClick={() =>
                                  this.removeCartItem(product.id)
                                }
                                className="action-icon text-danger"
                              >
                                {" "}
                                <i className="mdi mdi-trash-can font-size-18" />
                              </Link>
                            </td>
                          </tr>
                        ))}
                        </tbody>
                      </Table>
                    </div>
                    <Row className="mt-4">
                      <Col sm="6">
                        <Link
                          to="/ecommerce-products"
                          className="btn btn-secondary"
                        >
                          <i className="mdi mdi-arrow-left me-1" /> Continue Shopping{" "}
                        </Link>
                      </Col>
                      <Col sm="6">
                        <div className="text-sm-end mt-2 mt-sm-0">
                          <Link
                            to="/ecommerce-checkout"
                            className="btn btn-success"
                          >
                            <i className="mdi mdi-cart-arrow-right me-1" />{" "}
                            Checkout{" "}
                          </Link>
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              <Col xl="4">
                <Card>
                  <CardBody>
                    <CardTitle className="mb-3 h4">Order Summary</CardTitle>
                    {orderSummary && (
                      <div className="table-responsive">
                        <Table className="table mb-0">
                          <tbody>
                          <tr>
                            <td>Grand Total :</td>
                            <td>{orderSummary.grandTotal}</td>
                          </tr>
                          <tr>
                            <td>Discount :</td>
                            <td>- {orderSummary.discount}</td>
                          </tr>
                          <tr>
                            <td>Shipping Charge :</td>
                            <td>{orderSummary.shippingCharge}</td>
                          </tr>
                          <tr>
                            <td>Estimated Tax :</td>
                            <td>{orderSummary.estimatedTax}</td>
                          </tr>
                          <tr>
                            <th>Total :</th>
                            <td>{orderSummary.total}</td>
                          </tr>
                          </tbody>
                        </Table>
                      </div>
                    )}
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

EcommerceCart.propTypes = {
  cartData: PropTypes.any,
  onGetCartData: PropTypes.func
};

const mapStateToProps = state => ({
  cartData: state.ecommerce.cartData
});

const mapDispatchToProps = dispatch => ({
  onGetCartData: () => dispatch(getCartData())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(EcommerceCart));
