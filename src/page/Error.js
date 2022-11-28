import React from 'react';
import { Link } from 'react-router-dom';
import '../index.css';
import Styles from '../css/error.module.css';

const Error = () => {
    return (
        <section className={`${Styles.error_page} ${Styles.section}`}>
            <div className={Styles.error_container}>
                <h1>oops! it's a deal end</h1>
                <Link to="/" className="btn btn-primary">
                    Back user page
                </Link>
                <Link to="/admin" className="btn btn-primary">
                    Back admin page
                </Link>
            </div>
        </section>
    )
}

export default Error
