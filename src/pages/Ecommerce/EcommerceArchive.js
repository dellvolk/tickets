import React, { Component } from "react";
import { connect } from "react-redux";
import { isEmpty, map, size } from "lodash";
import PropTypes from "prop-types";
import { Button, Card, CardBody, Col, Input, InputGroup, InputGroupAddon, Row } from "reactstrap";
import { Link, withRouter } from "react-router-dom";

//Import Breadcrumb
//Import Product Images
import { getArchiveData, getArchiveDataSuccess } from "../../store/actions";

class EcommerceArchive extends Component {
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

  countUP = (id, prev_data_attr) => {
    let val = prev_data_attr + 1;
    val = val > 4 ? 4 : val;
    this.setState({
      productList: this.state.productList.map(p =>
        p.id === id ? { ...p, data_attr: val, total: val * +p.price } : p
      )
    });
  };

  countDown = (id, prev_data_attr) => {
    let val = prev_data_attr - 1;
    val = val < 1 ? 1 : val;
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
                      <Col sm={3}>{product.count}</Col>
                      <Col sm={1}>{product.price * product.count} грн</Col>
                      <Col sm={1}>

                      </Col>
                    </Row>
                  ))}
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </React.Fragment>
    );
  }
}

EcommerceArchive.propTypes = {
  cartData: PropTypes.any,
  onGetCartData: PropTypes.func,
  initCartData: PropTypes.func
};

const mapStateToProps = state => ({
  cartData: state.ecommerce.archiveData
});

const mapDispatchToProps = dispatch => ({
  onGetCartData: () => dispatch(getArchiveData()),
  initCartData: () => dispatch(getArchiveDataSuccess([]))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(EcommerceArchive));
