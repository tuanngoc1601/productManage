import React from "react";
import { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { BiUser } from "react-icons/bi";
import { BsCart2 } from "react-icons/bs";
import Styles from "../css/productList.module.css";
import Loading from "../components/Loading";
import Product from "./Product";
import { useGlobalContext } from "../context";

const ProductList = () => {
    const { loading, searchText, setSearchText, productList, categoryList, colorList, changeFilter, valueFilter, setValueFilter } = useGlobalContext();
    const [products, setProducts] = useState([]);

    const handleSearchTextChange = (e) => {
        setSearchText(e.target.value);
    }
    const getCategoryNameById = (id, categories) => {
        let newCategory = categories.find((category => {
            return category.id === id;
        }))
        return newCategory.name;
    }
    const getColorNameById = (id, colors) => {
        let newColor = colors.find((color) => {
            return color.id === id;
        })
        return newColor.name;
    }
    const getSubProductsById = (id, products) => {
        let newProduct = products.map((product) => {
            return product.id === id;
        })
        return newProduct.sub_products;
    }
    const getAllColorById = (id, products) => {
        let arrayColorId = [];
        arrayColorId = getSubProductsById(id, products).forEach((subProduct) => {
            if(!arrayColorId.includes(subProduct.color_id)) {
                arrayColorId.push(subProduct.color_id);
            }
        })
        return arrayColorId;
    }
    useEffect(() => {
        let newProducts = productList;
        if (searchText !== '') {
            let text = searchText;
            let newListProducts = newProducts.filter((product) => {
                return (product.name.toUpperCase().indexOf(text.toUpperCase()) !== -1);
            })
            setProducts(newListProducts);
        } else {
            setProducts(newProducts);
        }
    }, [searchText, productList]);

    useEffect(() =>{
        let newValueFilter = valueFilter;
        let productFilter = productList;
        if(newValueFilter.category.length > 0) {
            let categoryFilterProducts = productFilter.map(product => {
                return newValueFilter.category.includes(getCategoryNameById(product.category_id, categoryList));
            }) 
            setProducts(categoryFilterProducts);
        }
        if(newValueFilter.color.length > 0) {
            let colorFilterProducts = [];
            productFilter.forEach(product => {
                let productIdsColor = getAllColorById(product.id, products);
                for(let i = 0; i < productIdsColor.length; i++) {
                    if(!newValueFilter.color.includes(getColorNameById(productIdsColor[i]))) {
                        colorFilterProducts.push(product);
                        break;
                    }
                }
            })
            setProducts(colorFilterProducts);
        }
    }, [changeFilter])

    if (loading) {
        return <Loading />;
    }
    return (
        <section className={Styles.section}>
            <div className={Styles.search}>
                <p className={Styles.product_count}><span className="fw-bold">28&nbsp;</span>Products</p>
                <div className="d-flex flex-row align-items-center">
                    <div className={Styles.input_search}>
                        <FiSearch className={Styles.icon_font_size} />
                        <input
                            className={Styles.input}
                            type="text"
                            name="search"
                            placeholder="Search product"
                            onChange={handleSearchTextChange}
                        />
                    </div>
                    <BiUser style={{ fontSize: '22px', margin: '0 20px' }} />
                    <BsCart2 style={{ fontSize: '22px', marginRight: '20px' }} />
                </div>
            </div>
            {products.length > 0 ?
                <div className={Styles.products_center}>
                    {products.map((product) => {
                        return <Product keys={product.id} {...product} />;
                    })}
                </div> :
                <h2 className={Styles.section_title}>
                    no products matched your search criteria
                </h2>}
        </section>
    );
};

export default ProductList;
