import React, { Component } from "react";
import PropTypes, { any } from "prop-types";
import MetaTags from "react-meta-tags";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { Card, CardBody, CardTitle, Col, Container, Form, Input, Label, Row } from "reactstrap";
import { isEmpty, size } from "lodash";


//Import Star Ratings

// RangeSlider
import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";

//Import Product Images
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
      products: [],
      filters: {
        price: { min: 0, max: 10000 },
        categories: [],
        cities: [],
        search: ""
      },
    };
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

  onSelectCategory = (e, type) => {
    let { value, checked } = e.target;
    value = +value;
    const {
      filters,
      filters: { categories }
    } = this.state;
    const data = filters[type];

    const dt = {
      ...filters,
      [type]: data.find(item => item === value)
        ? data.filter(item => item !== value)
        : [...data, value]
    };
    this.setState(
      { filters: dt },
      () => this.onFilter(dt)
    );
  };

  onFilter = (filters = this.state.filters) => {
    const data = this.props.products.filter(i => {
      if (filters.categories.length !== 0 && !filters.categories.find(v => i.category_id === v)) return false;
      if (filters.cities.length !== 0 && !filters.cities.find(v => i.city_id === v)) return false;
      if (i.price < filters.price.min || i.price > filters.price.max) return false;
      if (i.title.toLowerCase().indexOf(filters.search.toLowerCase()) === -1) return false;
      return true;
    });

    this.setState({products: data})
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
    const dt = {
      ...this.state.filters,
      price: { min: value[0], max: value[1] }
    };

    this.setState(
      { filters: dt },
      () => this.onFilter(dt)
    );

  };

  onChangeSearch = e => {
    const dt = {
      ...this.state.filters,
      search: e.target.value
    };
    this.setState(
      { filters: dt },
      () => this.onFilter(dt)
    );
  };

  handlePageClick = page => {
    this.setState({ page });
  };

  render() {
    const { history, filters } = this.props;
    const { products, page, totalPage } = this.state;

    const prices = (this.props.products?.length > 0 && this.props.products?.map(i => i.price)) || [0, 1]
    const min = Math.min(...prices)
    const max = Math.max(...prices)

    return (
      <React.Fragment>
        <div className="page-content">
          <MetaTags>
            <title>Event list</title>
          </MetaTags>
          <Container fluid>
            <Breadcrumbs title="" breadcrumbItem="Події" />
            <Row>
              <Col lg="3">
                <Card>
                  <CardBody>
                    <CardTitle className="mb-4">Фільтр</CardTitle>
                    <div className="mt-4 pt-3">
                      <h5 className="font-size-14 mb-3">Категорії</h5>
                      {filters.categories?.map(i => (
                        <div
                          className="form-check mt-2"
                          key={i.id + "_category"}
                        >
                          <Input
                            type="checkbox"
                            value={i.id}
                            className="form-check-input"
                            id={i.id + "id_category"}
                            onChange={e => this.onSelectCategory(e, "categories")}
                          />{" "}
                          <Label className="form-check-label" htmlFor={i.id + "id_category"}>
                            {i.name}
                          </Label>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 pt-3">
                      <h5 className="font-size-14 mb-3">Міста</h5>
                      {filters.cities?.map(i => (
                        <div
                          className="form-check mt-2"
                          key={i.id + "_cities"}
                        >
                          <Input
                            type="checkbox"
                            value={i.id}
                            className="form-check-input"
                            id={i.id + "id_cities"}
                            onChange={e => this.onSelectCategory(e, "cities")}
                          />{" "}
                          <Label className="form-check-label" htmlFor={i.id + "id_cities"}>
                            {i.name}
                          </Label>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 pt-3">
                      <h5 className="font-size-14 mb-4">Ціна</h5>
                      <br />

                      <Nouislider
                        range={{ min, max }}
                        step={1}
                        tooltips={true}
                        start={[min, max]}
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
                      <h5>Події</h5>
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
                            onChange={this.onChangeSearch}
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
                          `/event/${product.id}`
                        )
                      }>
                        <CardBodyStyled className="pt-0 ps-0 pe-0">
                          <Link to="#">
                            <div className="product-img position-relative">
                              <img
                                src={product.image}
                                alt=""
                                className="img-fluid w-100 d-block"
                              />
                            </div>
                          </Link>

                          <div className="mt-3 text-start ps-3 pe-3">
                            <Link to="#" className="text-primary">
                              {product.category}
                            </Link>
                            <h5 className="mb-3 text-truncate">
                              {product.city}, {product.address}
                            </h5>
                            <h6 className="mb-5 text-truncate">
                              {product.date}
                            </h6>
                            <h3 className="mb-3 text-truncate event-title">
                              <Link
                                to={"/event/" + product.id}
                                className="text-dark font-weight-semibold"
                              >
                                {product.title}{" "}
                              </Link>
                            </h3>
                            <h5 className="my-0">
                              <>{product.price} грн</>
                            </h5>
                          </div>

                        </CardBodyStyled>
                      </Card>
                    </Col>
                  ))}
                </Row>

                {/*<Row>*/}
                {/*  <Col lg="12">*/}
                {/*    <Pagination className="pagination pagination-rounded justify-content-end mb-2">*/}
                {/*      <PaginationItem disabled={page === 1}>*/}
                {/*        <PaginationLink*/}
                {/*          previous*/}
                {/*          href="#"*/}
                {/*          onClick={() => this.handlePageClick(page - 1)}*/}
                {/*        />*/}
                {/*      </PaginationItem>*/}
                {/*      {map(Array(totalPage), (item, i) => (*/}
                {/*        <PaginationItem active={i + 1 === page} key={i}>*/}
                {/*          <PaginationLink*/}
                {/*            onClick={() => this.handlePageClick(i + 1)}*/}
                {/*            href="#"*/}
                {/*          >*/}
                {/*            {i + 1}*/}
                {/*          </PaginationLink>*/}
                {/*        </PaginationItem>*/}
                {/*      ))}*/}
                {/*      <PaginationItem disabled={page === totalPage}>*/}
                {/*        <PaginationLink*/}
                {/*          next*/}
                {/*          href="#"*/}
                {/*          onClick={() => this.handlePageClick(page + 1)}*/}
                {/*        />*/}
                {/*      </PaginationItem>*/}
                {/*    </Pagination>*/}
                {/*  </Col>*/}
                {/*</Row>*/}
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
`;

EcommerceProducts.propTypes = {
  products: PropTypes.array,
  history: any,
  onGetProducts: PropTypes.func,
  filters: PropTypes.any
};

const mapStateToProps = state => ({
  products: state.ecommerce.products,
  filters: state.ecommerce.filters
});

const mapDispatchToProps = dispatch => ({
  onGetProducts: () => dispatch(getProducts())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(EcommerceProducts));
