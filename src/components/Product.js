import React from "react";
import { Link } from "react-router-dom";
import Styles from "../css/product.module.css";

const Product = ({ id, name, status, category_id, sale_off, sale_price, sub_products }) => {
    const getColors = () => {
        let arrayColors = [];
        sub_products.forEach(product => {
            while (!arrayColors.includes(product.color)) {
                arrayColors.push(product.color);
            }
        })
        return arrayColors;
    }
    const getImageByColor = (color) => {
        let arrayImages = [];
        sub_products.forEach(product => {
            if (color === product.color) {
                while (!arrayImages.includes(product.image_url)) {
                    arrayImages.push(product.image_url);
                }
            }
        })
        return arrayImages;
    }
    return (
        <article className={Styles.product}>
            <Link to={`/products/${id}`}>
                <div>
                    <img src={`${getImageByColor(getColors()[0])[0]}`} alt={name} />
                </div>
                <div className={Styles.product_footer}>
                    <p className={Styles.product_name}>{name}</p>
                    <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                        {sale_off ? <span className={Styles.price}>{sale_price - sale_price * sale_off / 100}&nbsp;₫</span> : <span className={Styles.price}>{sale_price}&nbsp;₫</span>}
                        {sale_off && <span style={{ fontSize: '16px', color: '#939393', fontWeight: '400' }} className="text-decoration-line-through">{sale_price}&nbsp;₫</span>}
                        {sale_off && <span className={Styles.sale_off}>{sale_off}%</span>}
                    </div>
                    {sub_products.length !== 0 &&
                        <div className={Styles.variants}>
                            {getColors().map((color, index) => {
                                return (
                                    <div key={index} className={Styles.sub_variant}
                                        style={{ backgroundImage: `url(${getImageByColor(color)[0]})`, backgroundPosition: 'center' }}>
                                    </div>
                                )
                            })}
                        </div>
                    }
                </div>
            </Link>
        </article>
    );
};

export default Product;
