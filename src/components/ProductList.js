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
    const unique = (arr) => {
        var newArr = []
        for (var i = 0; i < arr.length; i++) {
            if (newArr.indexOf(arr[i]) === -1) newArr.push(arr[i]);
        }
        return newArr;
    }
    const getAllColorId = (product) => {
        let colorIds = product.sub_products.map(subProduct => {
            return subProduct.color_id;
        });
        colorIds = unique(colorIds);
        return colorIds;
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
        // let newValueFilter = valueFilter;
        let newListProductFilter = [];
        for(let i = 0; i < productList.length; i++) {
            let filterCategory = false;
            let filterColor = false;
            let filterPrice = false;
            if(valueFilter.category.length > 0) {
                for(let j = 0; j < valueFilter.category.length; j++) {
                    if(valueFilter.category[j] == productList[i].category_id) {
                        filterCategory = true;
                        break;
                    }
                }
            } else filterCategory = true;
            if(valueFilter.color.length > 0) {
                let listColor = getAllColorId(productList[i]);
                for(let j = 0; j < listColor.length; j++) {
                    if(valueFilter.color.indexOf(listColor[j].toString()) !== -1) {
                        filterColor = true;
                        break;
                    }
                }
            } else filterColor = true;
            if(valueFilter.price.length > 0) {
                for(let j = 0; j < valueFilter.price.length; j++) {
                    if(valueFilter.price[j] === "1" && productList[i].sale_price < 100000) {
                        filterPrice = true;
                        break;
                    }
                    if(valueFilter.price[j] === "2" && productList[i].sale_price >= 100000 && productList[i].sale_price < 200000) {
                        filterPrice = true;
                        break;
                    }
                    if(valueFilter.price[j] === "3" && productList[i].sale_price >= 200000 && productList[i].sale_price < 300000) {
                        filterPrice = true;
                        break;
                    }
                    if(valueFilter.price[j] === "4" && productList[i].sale_price >= 300000) {
                        filterPrice = true;
                        break;
                    }
                }
            } else filterPrice = true;
            if(filterCategory && filterColor && filterPrice) newListProductFilter.push(productList[i]);
        }
        setProducts(newListProductFilter);
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
