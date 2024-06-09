import React from 'react';
import { Button } from 'react-bootstrap';
import BannerImg from '../../assets/banner-img.png';


const Banner = () => {
    
  return (
    <div className="container-fluid py-4 position-relative m-0" style={{ background: "linear-gradient(to right, #600caa, #1e90ff)", height: "auto" }}>
      <div className="row h-100 d-flex justify-content-center align-items-center flex-column-reverse flex-md-row">
        <div className="col-md-6 d-flex justify-content-center align-items-center flex-column gap-3 text-white text-center text-md-left">
          <h1 className="fw-bolder" style={{ fontSize: "10vw", letterSpacing: "0.1rem" }}>SALE</h1>
          <p className="lead">
            Take total control with 7.1 Channel Surround Sound for superior audio immersion.
            Get pinpoint positional accuracy of players and make your game come alive.
          </p>
          <div className="d-flex gap-3 justify-content-center justify-content-md-start flex-wrap">
            <Button variant="outline-light" size="lg">Read More</Button>
            <Button variant="dark" size="lg">Shop Now</Button>
          </div>
        </div>
        <div className="col-md-6 d-flex justify-content-center align-items-center">
          <img className="position-relative z-1 w-75 w-md-100" src={BannerImg} alt="Sale Banner" />
        </div>
      </div>
    </div>
  );
};

export default Banner;


