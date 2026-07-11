import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';
const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer_links">
                <ul>

                <li><Link to="/privacy">Privacy Policy</Link></li>
                <li><Link to="/terms">Terms of Service</Link></li>
                <li><Link to="/contact">Contact Us</Link></li>
                </ul>
            </div>
            <p>&copy; 2026 MyApp. All rights reserved.</p>
        </footer>
    );
}

export default Footer;