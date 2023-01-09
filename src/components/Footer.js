import React from 'react';
import { FiInstagram, FiTwitter, FiFacebook } from "react-icons/fi";
import { TbBrandSnapchat } from "react-icons/tb";


const Footer = () => {
    return (
        <div class="footer-basic">
            <footer>
                <div class="social"><a href="#"><FiInstagram /></a><a href="#"><TbBrandSnapchat /></a><a href="#"><FiTwitter /></a><a href="#"><FiFacebook /></a></div>
                <ul class="list-inline">
                    <li class="list-inline-item"><a href="#">Home</a></li>
                    <li class="list-inline-item"><a href="#">Services</a></li>
                    <li class="list-inline-item"><a href="#">About</a></li>
                    <li class="list-inline-item"><a href="#">Terms</a></li>
                    <li class="list-inline-item"><a href="#">Privacy Policy</a></li>
                </ul>
                <p class="copyright">Company Name © 2018</p>
            </footer>
        </div>
    )
}

export default Footer