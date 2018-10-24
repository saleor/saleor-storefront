import * as React from "react";
import Media from "react-media";
import { Link } from "react-router-dom";

import {
  Button,
  Dropdown,
  Loader,
  PriceRangeFilter,
  ProductListItem,
  SelectField
} from "..";
import { PRODUCTS_PER_PAGE } from "../../core/config";
import {
  CategoryAttributesInterface,
  CategoryProductInterface
} from "../../core/types";
import { getDBIdFromGraphqlId, slugify } from "../../core/utils";
import { smallScreen } from "../App/scss/variables.scss";

import "./scss/index.scss";

interface AttributesType {
  [x: string]: string[];
}

interface FiltersType {
  attributes: AttributesType;
  pageSize: number;
  sortBy: string;
  priceLte: number;
  priceGte: number;
}

interface ProductsListProps {
  attributes: CategoryAttributesInterface[];
  filters: FiltersType;
  loading: boolean;
  products: CategoryProductInterface;
  searchQuery?: string;
  onFiltersChange(filters: FiltersType): void;
}

interface ProductsListState {
  attributes: AttributesType;
  priceLte: number;
  priceGte: number;
  pageSize: number;
  sortBy: string;
}

class ProductsList extends React.Component<
  ProductsListProps,
  ProductsListState
> {
  constructor(props) {
    super(props);
    this.state = this.props.filters;
  }

  componentDidUpdate(prevProps, prevState) {
    if (JSON.stringify(prevState) !== JSON.stringify(this.state)) {
      this.props.onFiltersChange(this.state);
    }
    if (prevProps.searchQuery !== this.props.searchQuery) {
      this.setState({
        attributes: {},
        pageSize: PRODUCTS_PER_PAGE,
        priceGte: null,
        priceLte: null,
        sortBy: ""
      });
    }
  }

  saveAttribute = (attribute, values) => {
    this.setState({
      attributes: {
        ...this.state.attributes,
        [attribute]: values.map(value => value.value)
      },
      pageSize: PRODUCTS_PER_PAGE
    });
  };

  savePriceFilter = (priceGte, priceLte) => {
    this.setState({ priceGte, priceLte });
  };

  setOrdering = (value: string) => {
    this.setState({
      sortBy: value
    });
  };

  loadMoreProducts = () => {
    this.setState({
      pageSize: this.state.pageSize + PRODUCTS_PER_PAGE
    });
  };

  render() {
    const filterOptions = [
      { value: "price", label: "Price Low-High" },
      { value: "-price", label: "Price High-Low" },
      { value: "name", label: "Name Increasing" },
      { value: "-name", label: "Name Decreasing" }
    ];

    return (
      <div className="products-list">
        <div className="products-list__filters">
          <div className="container">
            <div className="products-list__filters__grid">
              {this.props.attributes.map(item => (
                <div
                  key={item.id}
                  className="products-list__filters__grid__filter"
                >
                  <SelectField
                    value={
                      this.state.attributes[item.name]
                        ? this.state.attributes[item.name].map(attribute => ({
                            label: attribute,
                            value: attribute
                          }))
                        : []
                    }
                    placeholder={item.name}
                    options={item.values.map(value => ({
                      label: value.name,
                      value: value.name
                    }))}
                    isMulti
                    onChange={values => this.saveAttribute(item.name, values)}
                  />
                </div>
              ))}
              <div className="products-list__filters__grid__filter">
                <PriceRangeFilter changePriceFilter={this.savePriceFilter} />
              </div>
            </div>
          </div>
        </div>
        <div className="products-list__products container">
          {(this.state.priceGte && this.state.priceLte && this.props.loading) ||
          (Object.keys(this.state.attributes).length > 0 &&
            this.props.loading &&
            this.state.pageSize === PRODUCTS_PER_PAGE) ? (
            <Loader full />
          ) : (
            <>
              <div className="products-list__products__subheader">
                <span className="products-list__products__subheader__total">
                  {this.props.products.totalCount} Products
                </span>
                <span className="products-list__products__subheader__sort">
                  <span>Sort by:</span>{" "}
                  <Dropdown
                    options={filterOptions}
                    value={
                      filterOptions.find(
                        option => option.value === this.state.sortBy
                      ) || ""
                    }
                    onChange={e => this.setOrdering(e.value)}
                  />
                </span>
              </div>
              <div className="products-list__products__grid">
                {this.props.products.edges.map(({ node: product }) => (
                  <Link
                    to={`/product/${slugify(
                      product.name
                    )}/${getDBIdFromGraphqlId(product.id, "Product")}/`}
                    key={product.id}
                  >
                    <ProductListItem product={product} />
                  </Link>
                ))}
              </div>
              <div className="products-list__products__load-more">
                {this.props.loading &&
                this.state.pageSize > PRODUCTS_PER_PAGE ? (
                  <Loader />
                ) : this.state.pageSize >=
                this.props.products.totalCount ? null : (
                  <Media query={{ maxWidth: smallScreen }}>
                    {matches =>
                      matches ? (
                        <Button secondary onClick={this.loadMoreProducts}>
                          Load more products
                        </Button>
                      ) : (
                        <Button secondary onClick={this.loadMoreProducts}>
                          Load more products (
                          {`${
                            this.state.pageSize + PRODUCTS_PER_PAGE >
                            this.props.products.totalCount
                              ? this.props.products.totalCount
                              : this.state.pageSize + PRODUCTS_PER_PAGE
                          } of 
                              ${this.props.products.totalCount}`}
                          )
                        </Button>
                      )
                    }
                  </Media>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    );
  }
}

export default ProductsList;
