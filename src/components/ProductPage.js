import React from 'react'
import { Row, Col } from "react-bootstrap";
import ProductList from './ProductList'
import Sidebar from './Sidebar'

const ProductPage = () => {
    return (
        <>  
            <h2 style={{fontSize: '32px', lineHeight: '38px', textAlign: 'center', margin: '4rem 0 4rem', fontWeight: '700' }}>PRODUCTS LIST</h2>
            <Row>
                <Col lg={3}>
                    <Sidebar />
                </Col>
                <Col lg={9}>
                    <ProductList />
                </Col>
            </Row>
            <Row>
                <div style={{ padding: '40px', background: '#f4f4f4', fontSize: '15px', lineHeight: '1.27', marginBottom: '80px'}}>
                    <p style={{ textAlign: 'justify', fontFamily: 'arial, helvetica, sans-serif', fontSize: '12pt', marginBottom: '15px'}}>Routine là thương hiệu thời trang nam cao cấp, chất lượng và đa dạng từ mẫu mã, màu sắc đến thiết kế. Routine luôn hướng đến thói quen hàng ngày của nam giới, chính vì vậy sản phẩm tạo dấu ấn với thiết kế độc quyền, đường nét sắc sảo, chất liệu thân thiện môi trường và hòa cùng phong cách thời trang trên thế giới.</p>
                    <p style={{ textAlign: 'justify', fontFamily: 'arial, helvetica, sans-serif', fontSize: '12pt', marginBottom: '15px'}}>Giờ đây, bạn có thể khám phá những items mới, phong cách độc đáo tại hệ thống cửa hàng thời trang nam trên toàn quốc từ Bắc vào Nam tại những thành phố lớn như Hà Nội, Đà Nẵng, Bình Thuận, Nha Trang, Hồ Chí Minh, Cà Mau,...</p>
                    <p style={{ textAlign: 'justify', fontFamily: 'arial, helvetica, sans-serif', fontSize: '12pt', marginBottom: '15px'}}>Mua sắm online tại Routine sẽ được freeship cho đơn hàng từ 499k cùng những ưu đãi dành riêng cho thành viên và nhiều chương trình khuyến mãi, sale off và đồng giá hấp dẫn.</p>
                </div>
            </Row>
        </>
    )
}

export default ProductPage