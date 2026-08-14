"use client";

import Slider from "react-slick";
import type { CSSProperties, MouseEventHandler } from "react";
import Image from "next/image";

const galleryPhotos = [
  "/assets/images/team_01.jpg",
  "/assets/images/team_02.jpg",
  "/assets/images/team_03.jpg",
];

type ArrowProps = {
  className?: string;
  style?: CSSProperties;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  ariaLabel: string;
  arrow: string;
};

function Arrow({ className = "", style, onClick, ariaLabel, arrow }: ArrowProps) {
  return (
    <button
      type="button"
      className={`team-gallery-nav ${className}`}
      style={style}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {arrow}
    </button>
  );
}

export default function TeamGallery() {
  const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: false,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 4500,
    pauseOnHover: true,
    prevArrow: <Arrow ariaLabel="Previous gallery image" arrow="‹" />,
    nextArrow: <Arrow ariaLabel="Next gallery image" arrow="›" />,
    swipe: true,
    swipeToSlide: true,
    draggable: true,
    responsive: [
      {
        breakpoint: 660,
        settings: {
          arrows: true,
        },
      },
    ],
  };

  return (
    <section className="about-gallery">
      <div className="container">
        <div className="section-heading">
          <h2>Team <em>Gallery</em></h2>
          <p>See our people in action through a curated carousel of team moments and collaboration highlights.</p>
        </div>

        <div className="team-gallery-shell">
          <Slider {...settings} className="team-gallery-slider">
            {galleryPhotos.map((photo, photoIndex) => (
              <div key={photoIndex}>
                <div className="team-gallery-card">
                  <div className="team-gallery-image-wrapper">
                    <Image
                      src={photo}
                      alt={`Trijotech team photo ${photoIndex + 1}`}
                      fill
                      className="team-gallery-image"
                      sizes="(max-width: 768px) 100vw, 760px"
                    />
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
}
