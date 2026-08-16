"use client";

import Slider from "react-slick";
import Link from "next/link";

export default function Banner() {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
    };

    return (
        <div className="main-banner" id="top">
            <Slider {...settings}>

                
                <div className="item">
                    <div className="container text-center py-5">
                        <h2>Navigating Your Business Success with SAP Solutions</h2>
                        <Link href="/contact" className="btn btn-primary mt-3">
                            Contact Us
                        </Link>
                    </div>
                </div>

                
                <div className="item">
                    <div className="container text-center py-5">
                        <h2>Empowering Business Excellence with SAP Expertise</h2>
                        <Link href="/services" className="btn btn-primary mt-3">
                            Explore Solutions
                        </Link>
                    </div>
                </div>

            </Slider>
        </div>
    );
}