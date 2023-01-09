import React from 'react';
import { useState, useContext, useEffect } from 'react';

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState('');
    const [productList, setProductList] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const [colorList, setColorList] = useState([]);
    const [changeFilter, setChangeFilter] = useState(false);
    const [valueFilter, setValueFilter] = useState({
        category: [],
        color: [],
        price: []
    })

    useEffect(() => {
        const fetchDatas = async () => {
            setLoading(true);
            const responseProducts = await fetch('https://p01-product-api-production.up.railway.app/api/products');
            const dataProducts = await responseProducts.json();
            const responseCategories = await fetch('https://p01-product-api-production.up.railway.app/api/categories');
            const dataCategories = await responseCategories.json();
            const responseColors = await fetch('https://p01-product-api-production.up.railway.app/api/colors');
            const dataColors = await responseColors.json();
            if (dataProducts.message === 'success') {
                const newDataProducts = dataProducts.data.map((product) => {
                    const {
                        id,
                        name,
                        description,
                        cost,
                        status,
                        category_id,
                        supplier_id,
                        sale_off,
                        sale_price,
                        quantity,
                        sub_products
                    } = product;
                    return {
                        id: id,
                        name: name,
                        description: description,
                        cost: cost,
                        status: status,
                        category_id: category_id,
                        supplier_id: supplier_id,
                        sale_off: sale_off,
                        sale_price: sale_price,
                        quantity: quantity,
                        sub_products: sub_products
                    };
                });
                setProductList(newDataProducts);
                setLoading(false);
            } else {
                setProductList([]);
            }
            if(dataCategories.message === 'success') {
                setCategoryList(dataCategories.data);
                setLoading(false);
            } else {
                setCategoryList([]);
            }
            if(dataColors.message === 'success') {
                setColorList(dataColors.data);
                setLoading(false);
            } else {
                setColorList([]);
            }
        };
        fetchDatas();
    }, []);
    return (
        <AppContext.Provider
            value={{
                loading,
                setLoading,
                searchText,
                setSearchText,
                productList,
                categoryList,
                colorList,
                changeFilter,
                setChangeFilter,
                valueFilter,
                setValueFilter
            }}>
            {children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(AppContext)
}

export { AppContext, AppProvider }