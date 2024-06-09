import React from 'react';
import Section from './Section';
import NewsLetter from './NewsLetter';
import Logo from '../logo/Logo';

const CUSTOMER_SERVICE_LINKS = [
    { id: 0, text: "Return Policy", link: "/return-policy" },
    { id: 1, text: "Shipping", link: "/shipping" },
    { id: 2, text: "Sell With Us", link: "/sell-with-us" }
];

const GET_TO_KNOW_US_LINKS = [
    { id: 0, text: "About Us", link: "/about-us" },
    { id: 1, text: "Contact Us", link: "/contact-us" },
    { id: 2, text: "Careers", link: "/careers" }
];

const Footer = () => {
    return (
        <footer className='bg-body-secondary relative-bottom w-100' >
            <div className='d-flex flex-sm-row flex-column p-2 gap-2 gap-sm-0 my-2'>
                <Section
                    title={"CUSTOMER SERVICE"}
                    links={CUSTOMER_SERVICE_LINKS}
                />
                <Section
                    title={"GET TO KNOW US"}
                    links={GET_TO_KNOW_US_LINKS}
                />
                <NewsLetter />
            </div>
            <div className='d-flex justify-content-center align-items-center p-4 w-100'>
                <div className="col-lg-4 col-md-6 col-10">
                    <img src="https://ecommerce-sk.vercel.app/pay.png" alt="payment-methods" width={"100%"} />
                </div>
            </div>
            <div className='d-flex flex-column gap-2 flex-sm-row gap-sm-0 justify-content-between align-items-center p-4 bg-dark-subtle text-dark'>
                <Logo />
                <p className='fw-bold m-0 fs-6'>© {new Date().getFullYear()} E-COM | PREMIUM E-COMMERCE SOLUTIONS.</p>
                <div className='d-flex justify-content-center gap-2'>
                    <img src="https://img.icons8.com/?size=25&id=uLWV5A9vXIPu&format=png&color=000000" alt="fb" />
                    <img src="https://img.icons8.com/?size=25&id=Xy10Jcu1L2Su&format=png&color=000000" alt="insta" />
                    <img src="https://img.icons8.com/?size=25&id=5MQ0gPAYYx7a&format=png&color=000000" alt="insta" />
                    <img src='https://img.icons8.com/?size=25&id=xuvGCOXi8Wyg&format=png&color=000000' alt='linkedin' />
                </div>
            </div>
        </footer>
    );
};

export default Footer;
