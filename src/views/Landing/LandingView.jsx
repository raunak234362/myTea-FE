import React from "react";
import { AboutSection, HeroSection, Navbar, ServiceSection } from "../../components";

const LandingView = () => {
  return (
    <div>
      <Navbar />
      <HeroSection/>
      <AboutSection/>
      <ServiceSection/>
    </div>
  );
};

export default LandingView;
