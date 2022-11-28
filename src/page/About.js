import React from 'react';
import Styles from '../css/about.module.css';

const About = () => {
    return (
        <section className={`${Styles.section} ${Styles.about_section}`}>
            <h1 className={Styles.section_title}>about us</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae repudiandae architecto qui adipisci in officiis, aperiam sequi atque perferendis eos, autem maiores nisi saepe quisquam hic odio consectetur nobis veritatis quasi explicabo obcaecati doloremque? Placeat ratione hic aspernatur error blanditiis?</p>
        </section>
    )
}

export default About
