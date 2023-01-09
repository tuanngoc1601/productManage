import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Row, Col, Container, Stack } from "react-bootstrap";
// import ProductService from "../services/ProductService";
import Loading from "../components/Loading";
import Styles from "../css/singleProduct.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import serviceImage from '../service.jpg';
import sizeImage from '../size.jpg';
import { FaHandPointRight } from "react-icons/fa";
import { AiFillStar } from "react-icons/ai"
import "../index.css";

const SingleProduct = ({ colors, sizes }) => {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [product, setProduct] = useState();
    const [image, setImage] = useState();
    const [colorProduct, setColorProduct] = useState("");
    const [sizeProduct, setSizeProduct] = useState("");
    const [count, setCount] = useState(1);

    const handleChangeColor = (event) => {
        setColorProduct(event.target.value);
    };
    const handleChangeSize = (event) => {
        setSizeProduct(event.target.value);
    };
    const getColors = (sub_products) => {
        let arrayColors = [];
        sub_products.forEach(product => {
            while (!arrayColors.includes(product.color)) {
                arrayColors.push(product.color);
            }
        })
        return arrayColors;
    }
    const getSizes = (sub_products) => {
        let arraySizes = [];
        sub_products.forEach(product => {
            while (!arraySizes.includes(product.size)) {
                arraySizes.push(product.size);
            }
        })
        return arraySizes;
    }
    useEffect(() => {
        setLoading(true);
        const getProduct = async () => {
            try {
                const response = await fetch(
                    `https://p01-product-api-production.up.railway.app/api/user/products/${id}`
                );
                const data = await response.json();
                const {
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
                } = data.data;
                const newProduct = { name, description, cost, status, category_id, supplier_id, sale_off, sale_price, quantity, sub_products };
                setProduct(newProduct);
                setImage(sub_products[0].image_url);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        };
        getProduct();
    }, [id]);

    if (loading) {
        return <Loading />;
    }

    if (!product) {
        return <h2 className="section-title">no cocktail to display</h2>;
    }
    const { name, description, cost, category_id, sale_off, sale_price, sub_products } = product;
    return (
        <section className={`${Styles.section} ${Styles.product_section}`}>
            <Container>
                <p className={Styles.path} style={{ textAlign: 'center' }}>{`Home/${name}`}</p>
                <Row className="mb-5">
                    <Col lg={6}>
                        <Row>
                            <img src={image} alt={name} />
                        </Row>
                        <br />
                        <Row>
                            <Stack direction="horizontal" gap={3}>
                                {sub_products.map((sub, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className={Styles.thumnail}
                                            onClick={() => setImage(sub.image_url)}
                                        >
                                            <img
                                                src={sub.image_url}
                                                className={Styles.img_thumnail}
                                                alt={name}
                                            />
                                        </div>
                                    );
                                })}
                            </Stack>
                        </Row>
                        <Row>
                            <img src={sizeImage} alt="" />
                        </Row>
                    </Col>
                    <Col>
                        <Row>
                            <p className={Styles.product_name}>{name}</p>
                        </Row>
                        <Row>
                            <div className={Styles.price_group}>
                                {sale_off ? <span className={Styles.price}>{sale_price - sale_price * sale_off / 100}&nbsp;₫</span> : <span className={Styles.price}>{sale_price}&nbsp;₫</span>}
                                {sale_off && <span style={{ fontSize: '18px', color: '#939393', fontWeight: '400', lineHeight: '28px' }} className="text-decoration-line-through">{sale_price}&nbsp;₫</span>}
                                {sale_off && <span className={Styles.sale_off}>{sale_off}%</span>}
                            </div>
                        </Row>
                        <Row>
                            <p className={Styles.variant}>Chọn màu sắc: <span className="fw-bold">{colorProduct}</span></p>
                            <Stack direction="horizontal" gap={3}>
                                {getColors(sub_products).map((item, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className={
                                                colorProduct === item
                                                    ? `${Styles.color_wrapper} ${Styles.active_color}`
                                                    : `${Styles.color_wrapper}`
                                            }
                                        >
                                            <div
                                                className={Styles.pick_color}
                                                style={{ backgroundColor: `${item}` }}
                                            >
                                                <input
                                                    type="radio"
                                                    className={Styles.input_radio}
                                                    value={item}
                                                    checked={colorProduct === item}
                                                    name="pick_color"
                                                    onChange={handleChangeColor}
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                            </Stack>
                        </Row>
                        <Row>
                            <p className={Styles.variant}>Chọn size: <span className="fw-bold">{sizeProduct}</span></p>
                            <Stack direction="horizontal" gap={3}>
                                {getSizes(sub_products).map((item, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className={
                                                sizeProduct === item
                                                    ? `${Styles.size} ${Styles.active_size}`
                                                    : `${Styles.size}`
                                            }
                                        >
                                            <input
                                                type="radio"
                                                className={Styles.input_radio_size}
                                                value={item}
                                                id={item}
                                                checked={sizeProduct === item}
                                                name="pick_size"
                                                onChange={handleChangeSize}
                                            />
                                            <label
                                                style={{
                                                    width: "100%",
                                                    height: "100%",
                                                    textAlign: "center",
                                                    lineHeight: "45px",
                                                }}
                                                htmlFor={item}
                                            >
                                                {item}
                                            </label>
                                        </div>
                                    );
                                })}
                            </Stack>
                        </Row>
                        <Row>
                            <p className={Styles.variant}>Chọn số lượng: <span className="fw-bold">{count}</span></p>
                            <Stack direction="horizontal">
                                <input
                                    type="button"
                                    className={Styles.button_quantity}
                                    value="-"
                                    name="sub"
                                    onClick={() => setCount(count - 1 > 0 ? count - 1 : 1)}
                                />
                                <input
                                    type="text"
                                    className={Styles.input_text_quantity}
                                    value={count}
                                    id="quantity"
                                    name="quantity"
                                />
                                <input
                                    type="button"
                                    className={Styles.button_quantity}
                                    value="+"
                                    name="add"
                                    onClick={() => setCount(count + 1)}
                                />
                            </Stack>
                        </Row>
                        <br />
                        <Row className="m-0">
                            <button type="button" className={Styles.button_add_to_cart}>
                                Add to cart
                            </button>
                        </Row>
                        <Row className="mt-5">
                            <img src={serviceImage} alt="" />
                        </Row>
                        <Row className="mt-5">
                            <p className="d-flex flex-row mb-0">
                                <span><FaHandPointRight /></span>
                                <p className="fw-bold">ĐẶC ĐIỂM NỔI BẬT</p>
                            </p>
                            <Col>
                                <Row>
                                    <Col>Form</Col>
                                    <Col>Fitted</Col>
                                </Row>
                                <Row>
                                    <Col>Họa tiết</Col>
                                    <Col>Trơn</Col>
                                </Row>
                                <Row>
                                    <Col>Kiểu túi</Col>
                                    <Col>Không túi</Col>
                                </Row>
                                <Row>
                                    <Col>Giới tính</Col>
                                    <Col>Nam</Col>
                                </Row>
                            </Col>
                            <Col>
                                <Row>
                                    <Col>Chất liệu</Col>
                                    <Col>Cvc</Col>
                                </Row>
                                <Row>
                                    <Col>Kiểu tay</Col>
                                    <Col>Tay ngắn</Col>
                                </Row>
                                <Row>
                                    <Col>Kiểu cổ</Col>
                                    <Col>Cổ tròn</Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row className="mt-3">
                            <p className="d-flex flex-row">
                                <span><FaHandPointRight /></span>
                                <span className="fw-bold">{name}</span>
                            </p>
                            <p style={{ textAlign: 'justify', textJustify: 'inter-word' }}>{description}</p>
                        </Row>
                        <Row className="mt-5">
                            <p className="fw-bold">ĐÁNH GIÁ SẢN PHẨM</p>
                            <Col lg={3}>
                                <p className="d-flex flex-row justify-content-center align-items-end"><span className="fw-bold h3 m-0">5</span> trên 5</p>
                                <div className="d-flex flex-row justify-content-center align-items-center">
                                    <span className="m-1 text-danger"><AiFillStar /></span>
                                    <span className="m-1 text-danger"><AiFillStar /></span>
                                    <span className="m-1 text-danger"><AiFillStar /></span>
                                    <span className="m-1 text-danger"><AiFillStar /></span>
                                    <span className="m-1 text-danger"><AiFillStar /></span>
                                </div>
                            </Col>
                            <Col>
                                <p className="fw-bold">GỬI PHẢN HỒI CỦA BẠN</p>
                                <textarea className="w-100 p-2 form-control bg-light" id="feedback" rows="10"></textarea>
                                <button type="button" class="btn btn-primary mt-3 text-end">GỬI PHẢN HỒI</button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default SingleProduct;
