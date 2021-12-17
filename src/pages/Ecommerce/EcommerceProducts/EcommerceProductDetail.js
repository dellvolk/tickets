import React, { Component } from "react";
import PropTypes from "prop-types";
import MetaTags from "react-meta-tags";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  Table,
  TabPane
} from "reactstrap";
import classnames from "classnames";
import { isEmpty } from "lodash";

//Import Star Ratings
import StarRatings from "react-star-ratings";

//Import Product Images
import { productImages } from "../../../assets/images/product/";

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb";

//Import actions
import { addProductToCart, getProductDetail } from "../../../store/e-commerce/actions";
import Reviews from "./Reviews";

class EcommerceProductDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeTab: "1",
      product: {},
    }
    this.toggleTab = this.toggleTab.bind(this)
    this.imageShow = this.imageShow.bind(this)
  }

  componentDidMount() {
    const {
      match: { params },
      onGetProductDetail,
    } = this.props
    if (params && params.id) {
      onGetProductDetail(params.id)
    }
  }

  toggleTab(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      })
    }
  }

  imageShow(img, id) {
    const expandImg = document.getElementById("expandedImg" + id)
    expandImg.src = img
  }

  onClickBuy = product => {
    this.props.addProductToCart(product.id, this.props.history)
  }

  render() {
    const { product } = this.props

    return (
      <React.Fragment>
        <div className="page-content">
          <MetaTags>
            <title>Products Details | Skote - React Admin & Dashboard Template</title>
          </MetaTags>
          <Container fluid>
            <Breadcrumbs title="Список квитків" breadcrumbItem={product.title} />
            {!isEmpty(product) && (
              <Row>
                <Col>
                  <Card>
                    <CardBody>
                      <Row>
                        <Col>
                          <div className="product-detai-imgs">
                            <Row>
                              <Col md={{ size: 6 }}>
                                <div>
                                  <img
                                    src={productImages[product.image] || product.image}
                                    alt=""
                                    id="expandedImg1"
                                    className="img-fluid mx-auto d-block w-100"
                                  />
                                </div>
                              </Col>
                              <Col md={{ size: 5 }}>
                                <div className="mt-4 mt-xl-3">
                                  <Link to="#" className="text-primary">
                                    {product.category}
                                  </Link>
                                  <h4 className="mt-1 mb-3">{product.name || product.title}</h4>
                                  <h5 className="mb-3 text-truncate">
                                    {product.city}, {product.address}
                                  </h5>
                                  <h6 className="mb-5 text-truncate">
                                    {product.date}
                                  </h6>
                                  <h5 className="mb-4">
                                    Ціна :{" "}
                                    <b>{product.price} грн</b>
                                  </h5>
                                  <p className="text-muted mb-4">{product.description}</p>
                                </div>
                                <div className="text-start">
                                  <Button
                                    type="button"
                                    color="primary"
                                    className="btn mt-2 me-1"
                                    onClick={() => this.props.addProductToCart(product.id)}
                                  >
                                    <i className="bx bx-cart me-2" /> В корзину
                                  </Button>
                                  <Button
                                    type="button"
                                    color="success"
                                    className="ml-1 btn  mt-2"
                                    onClick={() => this.onClickBuy(product)}
                                  >
                                    <i className="bx bx-shopping-bag me-2" />
                                    Купити
                                  </Button>
                                </div>
                              </Col>
                            </Row>
                          </div>
                        </Col>


                      </Row>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            )}
            {/*<RecentProducts recentProducts={product.recentProducts} />*/}
          </Container>
        </div>
      </React.Fragment>
    )
  }
}

EcommerceProductDetail.propTypes = {
  product: PropTypes.object,
  match: PropTypes.object,
  onGetProductDetail: PropTypes.func,
  addProductToCart: PropTypes.func,
  history: PropTypes.any,
}

const mapStateToProps = ({ ecommerce }) => ({
  product: ecommerce.product,
})

const mapDispatchToProps = dispatch => ({
  onGetProductDetail: id => dispatch(getProductDetail(id)),
  addProductToCart: (id, history) => dispatch(addProductToCart(id, history)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EcommerceProductDetail)
