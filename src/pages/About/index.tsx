import React from "react";
import { Box, Container, Typography } from "@mui/material";
import styled from "@emotion/styled";

const Mission = styled(Box)`
  margin-bottom: 2.5rem;
`;

const MissionTitle = styled(Typography)`
  font-size: 1.5rem;
  color: #333;
`;

const MissionText = styled(Typography)`
  color: #666;
`;

const Services = styled(Box)`
  margin-bottom: 2.5rem;
`;

const ServicesTitle = styled(Typography)`
  font-size: 1.5em;
  color: #333;
`;

const ServicesText = styled(Typography)`
  color: #666;
  margin-bottom: 10px;
`;

const OurTeam = styled(Box)`
  margin-bottom: 2.5rem;
`;

const OurTeamTitle = styled(Typography)`
  font-size: 1.5rem;
  color: #333;
`;

const OurTeamText = styled(Typography)`
  color: #666;
`;

const JoinUs = styled(Box)`
  text-align: left;
`;

const JoinUsTitle = styled(Typography)`
  font-size: 1.5em;
  color: #333;
`;

const JoinUsText = styled(Typography)`
  color: #666;
`;

const About = () => {
  return (
    <Box>
      <Box
        sx={{
          backgroundImage: "url('banner.jpeg')", // URL to your background image
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "600px", // Adjust height as needed
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      ></Box>

      <Container>
        <Typography variant="h4" component="h4" sx={{ paddingBottom: "2.5rem", paddingTop: "2.5rem", textAlign: "center" }}>
          About
        </Typography>
        <Mission>
          <MissionTitle variant="h2" sx={{ textAlign: "center" }}>
            Our Mission
          </MissionTitle>
          <MissionText variant="body1">
            Our mission is to provide affordable, reliable, and innovative IT solutions to small businesses. We believe
            that every business, regardless of its size, deserves access to top-notch IT support and cloud services.
          </MissionText>
        </Mission>
        <Services>
          <ServicesTitle variant="h2" sx={{ textAlign: "center" }}>
            Our Services
          </ServicesTitle>
          <ul>
            <li>
              <ServicesText variant="body1">
                <b>Microsoft 365 Services </b>: Discover seamless assistance with Microsoft 365 from our remote
                services. Whether it&apos;s setting up email accounts, resolving delivery issues, enhancing security, or
                optimizing applications, we&apos;ve got you covered. With our remote and dual options, you can efficiently
                harness the power of Microsoft 365 starting from $39.99.
              </ServicesText>
            </li>
            <li>
              <ServicesText variant="body1">
                <b>WiFi Services </b>: Experience uninterrupted connectivity with our onsite WiFi services. From
                boosting signal strength and connecting devices to stopping dropouts and securing networks, we provide
                comprehensive solutions to ensure your WiFi works seamlessly. Prices start at $29.99 for onsite
                assistance.
              </ServicesText>
            </li>
            <li>
              <ServicesText variant="body1">
                <b>Email Services</b>: Streamline your inbox and communication processes with our remote email services.
                Whether it&apos;s decluttering your inbox, fixing delivery delays, enhancing security, or optimizing speed,
                our expert assistance is just a click away. Prices begin at $29.99 for remote support.
              </ServicesText>
            </li>
            <li>
              <ServicesText variant="body1">
                <b>Website Services</b>: Elevate your online presence with our remote website services. From designing
                captivating banners and fixing broken links to securing your website and optimizing speed, we offer
                tailored solutions to enhance user experience and engagement. Prices start at $29.99 for remote
                assistance.
              </ServicesText>
            </li>
            <li>
              <ServicesText variant="body1">
                <b>Cloud Services</b>: Unlock the potential of cloud technology with our comprehensive remote cloud
                services. Whether you&apos;re migrating your business, fortifying security, optimizing costs, or setting up
                backup solutions, our expert guidance ensures a smooth transition to the cloud. Prices begin at $299.99
                for remote support.
              </ServicesText>
            </li>
            <li>
              <ServicesText variant="body1">
                <b>IT Security Services</b>: Protect your digital assets with our extensive IT security services. From
                fortifying networks and testing defenses to crafting policies, planning responses, and training teams,
                we offer holistic solutions to safeguard your organization against cyber threats. Prices start at
                $199.99 for comprehensive training sessions.
              </ServicesText>
            </li>
          </ul>
        </Services>
        <OurTeam>
          <OurTeamTitle variant="h2" sx={{ textAlign: "center" }}>
            Our Team
          </OurTeamTitle>
          <OurTeamText variant="body1">
            Our team is our greatest asset. We are a group of passionate, skilled, and experienced professionals,
            dedicated to providing you with the best possible service.
          </OurTeamText>
        </OurTeam>
        <JoinUs>
          <JoinUsTitle variant="h2" sx={{ textAlign: "center" }}>
            Join Us
          </JoinUsTitle>
          <JoinUsText variant="body1" sx={{ paddingBottom: "2.5rem" }}>
            We are always on the lookout for talented individuals to join our team. If you are passionate about IT and
            cloud solutions, we would love to hear from you.
          </JoinUsText>
        </JoinUs>
      </Container>
    </Box>
  );
};

export default About;
