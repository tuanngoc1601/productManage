import React from 'react';
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Row, Col, Container, Stack } from 'react-bootstrap';
import Loading from '../components/Loading';
import Styles from '../css/singleProduct.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../index.css";

const SingleProduct = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [product, setProduct] = useState();
    const [image, setImage] = useState();
    const [colorProduct, setColorProduct] = useState('');
    const [sizeProduct, setSizeProduct] = useState('');
    const [count, setCount] = useState(1);

    const handleChangeColor = (event) => {
        setColorProduct(event.target.value);
    }
    const handleChangeSize = (event) => {
        setSizeProduct(event.target.value);
    }
    useEffect(() => {
        setLoading(true);
        const getProduct = async () => {
            try {
                const response = await fetch(`https://6382e0fd1ada9475c8f43f7b.mockapi.io/api/products/${id}`);
                const data = await response.json();
                const { 
                    product_name: name,
                    product_description: info,
                    color: color,
                    size: size,
                    category_id: category_id,
                    img_urls: img_urls
                } = data;
                const newProduct = { name, info, color, size, category_id, img_urls };
                setProduct(newProduct);
                setImage(img_urls[0]);
                setLoading(false);
            } catch(error) {
                console.log(error);
                setLoading(false);
            }
        }
        getProduct();
    }, [id]);

    if(loading) {
        return (
            <Loading /> 
        )
    }

    if(!product) {
        return (
            <h2 className="section-title">no cocktail to display</h2>
        )
    }
    const { name, info, color, size, img_urls } = product;
    return (
        <section className={`${Styles.section} ${Styles.product_section}`}>
            <Link to='/' className="btn btn-primary">
                back home
            </Link>
            <Container className="mt-5">
                <Row>
                    <Col lg={7}>
                        <Row>
                            <img src={image} alt={name} />
                        </Row>
                        <br/>
                        <Row>
                            <Stack direction="horizontal" gap={3}>
                                {img_urls.map((img, index) => {
                                    return (
                                        <div key={index} className={Styles.thumnail} onClick={() => setImage(img)}>
                                            <img src={img} className={Styles.img_thumnail} alt={name} />
                                        </div>
                                    )
                                })}
                            </Stack>
                        </Row>
                    </Col>
                    <Col>
                        <Row>
                            <p className={Styles.product_name}>{name}</p>
                        </Row>
                        <Row className={Styles.border_top}>
                            <p className={Styles.price}>399.000$</p>
                        </Row>
                        <Row className={`${Styles.border_top} ${Styles.border_bottom}`}>
                            <Stack direction="horizontal" gap={3}>
                                {color.map((item, index) => {
                                    return (
                                        <div key={index} className={colorProduct === item ? `${Styles.color_wrapper} ${Styles.active_color}`:`${Styles.color_wrapper}`}>
                                            <div className={Styles.pick_color} style={{ backgroundColor: `${item}`}}>
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
                                    )
                                })}
                            </Stack>
                        </Row>
                        <Row className={`${Styles.border_top} ${Styles.border_bottom}`}>
                            <Stack direction="horizontal" gap={3}>
                                {size.map((item, index) => {
                                    return (
                                        <div key={index} className={sizeProduct === item ? `${Styles.size} ${Styles.active_size}` : `${Styles.size}`}>
                                            <input 
                                                type="radio" 
                                                className={Styles.input_radio_size}
                                                value={item}
                                                id={item}
                                                checked={sizeProduct === item}
                                                name="pick_size"
                                                onChange={handleChangeSize}
                                            />
                                            <label style={{ width: '100%', height: '100%', textAlign: 'center', lineHeight: '45px' }} htmlFor={item}>{item}</label>
                                        </div>
                                    )
                                })}
                            </Stack>
                        </Row>
                        <Row className={`${Styles.border_top} ${Styles.border_bottom}`}>
                            <Stack direction="horizontal">
                                <input type="button" className={Styles.button_quantity} value="-" name="sub" onClick={() => setCount((count - 1) > 0 ? (count - 1) : 1)} />
                                <input type="text" className={Styles.input_text_quantity} value={count} id="quantity" name="quantity" />
                                <input type="button" className={Styles.button_quantity} value="+" name="add" onClick={() => setCount(count + 1)}/>
                            </Stack>
                        </Row>
                        <Row className={`${Styles.border_top} ${Styles.border_bottom}`}>
                            <button type="button" className={Styles.button_add_to_cart}>Add to cart</button>
                        </Row>
                        <Row>
                            <p><strong>Infomation: </strong>{info}</p>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default SingleProduct