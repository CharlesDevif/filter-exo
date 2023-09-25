import React, { Component } from "react";

interface Product {
  category: string;
  price: string;
  stocked: boolean;
  name: string;
}

interface ProductListProps {
  products: Product[];
}

interface ProductListState {
  searchTerm: string;
  hideItem: boolean;
}

class ProductList extends Component<ProductListProps, ProductListState> {
  constructor(props: ProductListProps) {
    super(props);
    this.state = {
      searchTerm: "",
      hideItem: false,
    };
  }

  handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: event.target.value });
  };

  handleCheckBox = () => {
    this.setState((prevState) => ({ hideItem: !prevState.hideItem }));
  };

  render() {
    const { products } = this.props;
    const { searchTerm, hideItem } = this.state;

    // Filtrer et trier les produits par nom
    const filteredProducts = products
      .filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => a.name.localeCompare(b.name));

    // Regrouper les produits par catégorie
    const groupedProducts: { [key: string]: Product[] } = {};
    filteredProducts.forEach((product) => {
      if (!groupedProducts[product.category]) {
        groupedProducts[product.category] = [];
      }
      groupedProducts[product.category].push(product);
    });

    return (
      <div>
        <div>
          <input
            id="input-search"
            type="text"
            placeholder="Rechercher par nom"
            value={searchTerm}
            onChange={this.handleSearchChange}
          />
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              name="hide-product"
              checked={hideItem}
              onChange={this.handleCheckBox}
            />
            Cacher les produits non stockés
          </label>
        </div>
        <div className="container-table">
          {Object.keys(groupedProducts).map((category, index) => (
            <div className="table-content" key={index}>
              <h2>{category}</h2>

              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {groupedProducts[category].map((product, productIndex) => (
                    <tr
                      key={productIndex}
                      className={product.stocked ? "" : (hideItem ? "hidden" : "red-text")}
                    >
                      <td>{product.name}</td>
                      <td>{product.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default ProductList;
