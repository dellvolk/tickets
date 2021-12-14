import React, { Component } from "react";
import PropTypes, { any } from "prop-types";
import MetaTags from "react-meta-tags";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import {
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Form,
  Input,
  Label,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row
} from "reactstrap";
import { isEmpty, map, size } from "lodash";

//Import Star Ratings

// RangeSlider
import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";

//Import Product Images
import { productImages } from "assets/images/product";

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb";

//Import data
import { discountData } from "common/data";

//Import actions
import { getProducts } from "store/e-commerce/actions";
import styled from "styled-components";

class EcommerceProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      FilterClothes: [
        { id: 1, name: "T-shirts", link: "#" },
        { id: 2, name: "Shirts", link: "#" },
        { id: 3, name: "Jeans", link: "#" },
        { id: 4, name: "Jackets", link: "#" }
      ],
      ratingvalues: [],
      products: [],
      activeTab: "1",
      discountData: [],
      filters: {
        discount: [],
        price: { min: 0, max: 500 }
      },
      page: 1,
      totalPage: 5 //replace this with total pages of data
    };
    this.toggleTab = this.toggleTab.bind(this);
    this.onSelectRating = this.onSelectRating.bind(this);
  }

  componentDidMount() {
    const { products, onGetProducts } = this.props;
    this.setState({ products });
    onGetProducts();
    this.setState({ discountData });
  }

  // eslint-disable-next-line no-unused-vars
  componentDidUpdate(prevProps, prevState, snapshot) {
    const { products } = this.props;
    if (
      isEmpty(prevProps.products) &&
      !isEmpty(products) &&
      size(products) !== size(prevProps.products)
    ) {
      this.setState({ products });
    }
  }

  toggleTab(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  onSelectDiscount = e => {
    const { value, checked } = e.target;
    const {
      filters,
      filters: { discount }
    } = this.state;
    this.setState(
      {
        filters: {
          ...filters,
          discount: discount.find(item => item === value)
            ? discount.filter(item => item !== value)
            : [...discount, value]
        }
      },
      () => {
        this.onFilterProducts(value, checked);
      }
    );
  };

  onFilterProducts = (value, checked) => {
    const {
      filters: { discount }
    } = this.state;
    let filteredProducts = this.props.products;
    if (!!checked && parseInt(value) === 0) {
      filteredProducts = this.props.products.filter(product => product.offer < 10);
    } else if (discount.length > 0) {
      filteredProducts = this.props.products.filter(
        product => product.offer >= Math.min(...discount)
      );
    }
    this.setState({ products: filteredProducts });
  };

  onUpdate = (render, handle, value) => {
    this.setState({
      products: this.props.products.filter(
        product => product.newPrice >= value[0] && product.newPrice <= value[1]
      )
    });
  };

  /*
  on change rating checkbox method
  */
  onChangeRating = value => {
    this.setState({
      products: this.props.products.filter(product => product.rating >= value)
    });

    var modifiedRating = [...this.state.ratingvalues];
    modifiedRating.push(value);
    this.setState({ ratingvalues: modifiedRating });
  };

  onSelectRating = value => {
    this.setState({
      products: this.props.products.filter(product => product.rating === value)
    });
  };

  onUncheckMark = (value) => {
    var modifiedRating = [...this.state.ratingvalues];
    const modifiedData = (modifiedRating || []).filter((x) => x !== value);
    /*
    find min values
    */
    var filteredProducts = this.props.products;
    if (modifiedData && modifiedData.length && value !== 1) {
      var minValue = Math.min(...modifiedData);
      if (minValue && minValue !== Infinity) {

        filteredProducts = this.props.products.filter(product => product.rating >= minValue);

        this.setState({ ratingvalues: modifiedData });
      }
    } else {
      filteredProducts = this.props.products;
    }
    this.setState({ products: filteredProducts });

  };

  handlePageClick = page => {
    this.setState({ page });
  };

  render() {
    const { history } = this.props;
    const { discountData, products, page, totalPage } = this.state;

    return (
      <React.Fragment>
        <div className="page-content">
          <MetaTags>
            <title>Products | Skote - React Admin & Dashboard Template</title>
          </MetaTags>
          <Container fluid>
            <Breadcrumbs title="Ecommerce" breadcrumbItem="Products" />
            <Row>
              <Col lg="3">
                <Card>
                  <CardBody>
                    <CardTitle className="mb-4">Filter</CardTitle>
                    <div className="mt-4 pt-3">
                      <h5 className="font-size-14 mb-3">Discount</h5>
                      {discountData.map((discount, i) => (
                        <div
                          className="form-check mt-2"
                          key={i}
                        >
                          <Input
                            type="checkbox"
                            value={discount.value}
                            className="form-check-input"
                            id={i}
                            onChange={this.onSelectDiscount}
                          />{" "}
                          <Label className="form-check-label" htmlFor={i}>
                            {discount.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 pt-3">
                      <h5 className="font-size-14 mb-4">Price</h5>
                      <br />

                      <Nouislider
                        range={{ min: 0, max: 600 }}
                        tooltips={true}
                        start={[100, 500]}
                        connect
                        onSlide={this.onUpdate}
                      />

                    </div>
                  </CardBody>
                </Card>
              </Col>

              <Col lg="9">
                <Row className="mb-3">
                  <Col xl="4" sm="6">
                    <div className="mt-2">
                      <h5>Events</h5>
                    </div>
                  </Col>
                  <Col lg="8" sm="6">
                    <Form className="mt-4 mt-sm-0 float-sm-end d-flex align-items-center">
                      <div className="search-box me-2">
                        <div className="position-relative">
                          <Input
                            type="text"
                            className="form-control border-0"
                            placeholder="Search..."
                          />
                          <i className="bx bx-search-alt search-icon" />
                        </div>
                      </div>
                    </Form>
                  </Col>
                </Row>
                <Row>
                  {!isEmpty(products) &&
                  products.map((product, key) => (
                    <Col xl="4" sm="6" key={"_col_" + key}>
                      <Card onClick={() =>
                        history.push(
                          `/ecommerce-product-details/${product.id}`
                        )
                      }>
                        <CardBodyStyled className="pt-0 ps-0 pe-0">
                          <Link to="#">
                            <div className="product-img position-relative">
                              <img
                                src={productImages[product.image] || product.image}
                                alt=""
                                className="img-fluid w-100 d-block"
                              />
                            </div>
                          </Link>

                          <div className="mt-4 text-start ps-3 pe-3">
                            <h5 className="mb-3 text-truncate">
                              {product.address}
                            </h5>
                            <h6 className="mb-5 text-truncate">
                              {product.date}
                            </h6>
                            <h3 className="mb-3 text-truncate event-title">
                              <Link
                                to={"/ecommerce-product-details/" + product.id}
                                className="text-dark font-weight-semibold"
                              >
                                {product.name || product.title}{" "}
                              </Link>
                            </h3>
                            <h5 className="my-0">
                              <>{product.newPrice || product.price} грн</>
                            </h5>
                          </div>

                        </CardBodyStyled>
                      </Card>
                    </Col>
                  ))}
                </Row>

                <Row>
                  <Col lg="12">
                    <Pagination className="pagination pagination-rounded justify-content-end mb-2">
                      <PaginationItem disabled={page === 1}>
                        <PaginationLink
                          previous
                          href="#"
                          onClick={() => this.handlePageClick(page - 1)}
                        />
                      </PaginationItem>
                      {map(Array(totalPage), (item, i) => (
                        <PaginationItem active={i + 1 === page} key={i}>
                          <PaginationLink
                            onClick={() => this.handlePageClick(i + 1)}
                            href="#"
                          >
                            {i + 1}
                          </PaginationLink>
                        </PaginationItem>
                      ))}
                      <PaginationItem disabled={page === totalPage}>
                        <PaginationLink
                          next
                          href="#"
                          onClick={() => this.handlePageClick(page + 1)}
                        />
                      </PaginationItem>
                    </Pagination>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

const CardBodyStyled = styled(CardBody)`
  .event-title {
    
  }
`

EcommerceProducts.propTypes = {
  products: PropTypes.array,
  history: any,
  onGetProducts: PropTypes.func
};

const mapStateToProps = state => ({
  products: state.ecommerce.products
});

const mapDispatchToProps = dispatch => ({
  onGetProducts: () => dispatch(getProducts())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(EcommerceProducts));
