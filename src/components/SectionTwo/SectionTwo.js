import React from "react";
import "./SectionTwo.css";
import { MdArrowOutward } from "react-icons/md";
import compute from "../../Assets/computers.svg";
import internet from "../../Assets/universe.svg";
import lastSec from "../../Assets/last-image-scetion.svg";
import { NavLink } from "react-router-dom";

const SectionTwo = () => {
  return (
    <div className="sectionTwo">
      <h1>Explore GreenWood</h1>
      <div className="sectionTwoContainer">
        <div
          className="secInboxOne"
          data-aos="fade-right"
          data-aos-offset="300"
          data-aos-easing="ease-in-sine"
        >
          <div className="interIcon">
            <span>
              <img src={compute} alt="internet network" />
            </span>
            <span className="icons">
              <NavLink>
                <MdArrowOutward />
              </NavLink>
            </span>
          </div>
          <p className="explores">Explore the ecosystem</p>
          <p className="discover">
            Discover the GreenWood ecosystem, featuring modular infrastructure
            and rollup technology
          </p>
        </div>
        <div className="secInboxOne-ad" data-aos="fade-up"
     data-aos-duration="1000">
          <div className="interIcon">
            <span>
              <img src={lastSec} alt="internet network" />
            </span>
            <span className="icons">
              <NavLink>
                <MdArrowOutward />
              </NavLink>
            </span>
          </div>
          <p className="explores">Seize Your Investment Opportunities</p>
          <p className="discover">
            Explore diverse investment options that match your goals, whether
            you're a beginner or seasoned investor.
          </p>
        </div>
        <div
          className="secInboxTwo"
          data-aos="fade-left"
          data-aos-offset="300"
          data-aos-easing="ease-in-sine"
        >
          <div className="interIcon">
            <span>
              <img src={internet} alt="internet network" />
            </span>
            <span className="icons">
              <NavLink>
                <MdArrowOutward />
              </NavLink>
            </span>
          </div>
          <p className="explores">Use This Information</p>
          <p className="discover">
            Leverage key insights for better decision-making and streamlined
            processes
          </p>
        </div>
      </div>
      <div
        className="sectionTwoBox"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        <img src={lastSec} alt="global connection" />
        <div className="space">
          <p className="sieze">Seize Your Investment Opportunities</p>
          <p className="diverse">
            Explore diverse investment options that match your goals, whether
            you're a beginner or seasoned investor.
          </p>
        </div>
        <span className="icons">
          <NavLink>
            <MdArrowOutward />
          </NavLink>
        </span>
      </div>
    </div>
  );
};

export default SectionTwo;
