import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../logo.svg'
import Styles from '../css/navbar.module.css';

const Navbar = () => {
    return (
        <nav className={Styles.navbar}>
            <div className={Styles.nav_center}>
                <Link to="/">
                    <img src={logo} className={Styles.logo} alt="cocktail db logo" />
                </Link>
                <ul className={Styles.nav_links}>
                    <li>
                        <Link to="/">
                            User
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin">
                            Admin
                        </Link>
                    </li>
                    <li>
                        <Link to="/about">
                            About
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar
