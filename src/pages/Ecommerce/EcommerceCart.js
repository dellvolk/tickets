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
import { deleteCartById, fetchBuyTickets, getCartData, getCartDataSuccess } from "../../store/actions";

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
    this.props.onDeleteProduct(id);
    // let productList = this.state.productList;
    // const filtered = productList.filter(function(item) {
    //   return item.id !== id;
    // });
    //
    // this.setState({ productList: filtered });
  };

  countUP = (id, prev_data_attr) => {
    let val = prev_data_attr + 1;
    val = val > 4 ? 4 : val
    this.setState({
      productList: this.state.productList.map(p =>
        p.id === id ? { ...p, data_attr: val, total: val * +p.price } : p
      )
    });
  };

  countDown = (id, prev_data_attr) => {
    let val = prev_data_attr - 1;
    val = val < 1 ? 1 : val
    this.setState({
      productList: this.state.productList.map(p =>
        p.id === id ? { ...p, data_attr: val, total: val * +p.price } : p
      )
    });
  };

  componentWillUnmount() {
    this.props.initCartData()
  }

  render() {
    // const {
    //   cartData: { orderSummary },
    // } = this.props
    const orderSummary = {};
    const { productList } = this.state;

    let total = 0;
    if (productList && productList.length > 0) {
      productList.forEach(i => {
        total += i.total;
      });
    }

    let count = 0;
    if (productList && productList.length > 0) {
      productList.forEach(i => {
        count += i.data_attr;
      });
    }

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
                      <div className="table align-middle mb-0 table-nowrap">
                        <div className="thead-light">
                          <Row className="w-100">
                            <Col sm={2} />
                            <Col sm={4}>Назва</Col>
                            <Col sm={1}>Ціна</Col>
                            <Col sm={3}>Кількість</Col>
                            <Col>Всього</Col>
                          </Row>
                        </div>
                        <div>
                          {map(productList, product => (
                            <Row key={product.id} className="w-100">
                              <Col sm={2}>
                                <img
                                  src={product.image}
                                  alt="product-img"
                                  title="product-img"
                                  className="avatar-md"
                                />
                              </Col>
                              <Col sm={4}>
                                <h5 className="font-size-14 text-truncate">
                                  <Link
                                    to={"/event/" + product.ticket}
                                    className="text-dark"
                                  >
                                    {product.name || product.title}
                                  </Link>
                                </h5>
                                <p className="mb-0">
                                <span className="fw-medium">
                                    {product.date}
                                  </span>
                                </p>
                                <p className="mb-0">
                                <span className="fw-medium">
                                    {`${product.city}, ${product.address}`}
                                  </span>
                                </p>
                              </Col>
                              <Col sm={1}>{product.price} грн</Col>
                              <Col sm={3}>
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
                              </Col>
                              <Col sm={1}>{product.total} грн</Col>
                              <Col sm={1}>
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
                              </Col>
                            </Row>
                          ))}
                        </div>
                      </div>
                    </div>
                    <Row className="mt-4">
                      <Col sm="6" />
                      <Col sm="6">
                        <div className="text-sm-end mt-2 mt-sm-0">
                          <button
                            className="btn btn-success"
                            onClick={() => this.props.fetchBuyTickets(this.state.productList, this.props.history)}
                          >
                            <i className="mdi mdi-cart-arrow-right me-1" />{" "}
                            Купити{" "}
                          </button>
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              <Col xl="4">
                <Card>
                  <CardBody>
                    <CardTitle className="mb-3 h4">Підсумок Замовлення</CardTitle>
                    <div className="table-responsive">
                      <Table className="table mb-0">
                        <tbody>
                        <tr>
                          <td>Кількість :</td>
                          <td>{count}</td>
                        </tr>
                        <tr className="font-weight-semibold">
                          <td>Всього :</td>
                          <td>{total}</td>
                        </tr>
                        </tbody>
                      </Table>
                    </div>
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
  history: PropTypes.any,
  onGetCartData: PropTypes.func,
  initCartData: PropTypes.func,
  onDeleteProduct: PropTypes.func,
  fetchBuyTickets: PropTypes.func,
};

const mapStateToProps = state => ({
  cartData: state.ecommerce.cartData
});

const mapDispatchToProps = dispatch => ({
  fetchBuyTickets: (data, history) => dispatch(fetchBuyTickets(data, history)),
  onGetCartData: () => dispatch(getCartData()),
  initCartData: () => dispatch(getCartDataSuccess([])),
  onDeleteProduct: id => dispatch(deleteCartById(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(EcommerceCart));
