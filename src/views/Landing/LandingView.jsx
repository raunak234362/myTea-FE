import React from "react";
import { AboutSection, HeroSection, MarketingSection, Navbar, ServiceSection } from "../../components";

const LandingView = () => {
  return (
    <div>
      <Navbar />
      <HeroSection/>
      <AboutSection/>
      <ServiceSection/>
      <MarketingSection/>
    </div>
  );
};

export default LandingView;
