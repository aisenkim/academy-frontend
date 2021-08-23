import React from 'react'
import { Button } from '../../globalStyles'
import {
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaTwitter,
  FaLinkedin,
} from 'react-icons/fa'
import {
  FooterContainer,
  FooterSubscription,
  FooterSubHeading,
  FooterSubText,
  Form,
  FormInput,
  FooterLinkContainer,
  FooterLinkWrapper,
  FooterLink,
  FooterLinkItems,
  FooterLinkTitle,
  SocialMedia,
  SocialMediaWrap,
  SocialLogo,
  SocialIcon,
  WebsiteRights,
  SocialIcons,
  SocialIconLink,
} from './Footer.elements'

const Footer = () => {
  return (
    <FooterContainer>
      {/*<FooterSubscription>*/}
      {/*  <FooterSubHeading>*/}
      {/*    Join our exclusive membership to receive the latest news and trends*/}
      {/*  </FooterSubHeading>*/}
      {/*  <FooterSubText>You can unsubscribe at any time</FooterSubText>*/}
      {/*  <Form>*/}
      {/*    <FormInput name="email" type="email" placeholder="Your Email" />*/}
      {/*    <Button fontBig>Subscribe</Button>*/}
      {/*  </Form>*/}
      {/*</FooterSubscription>*/}
      <FooterLinkContainer>
        <FooterLinkWrapper>
          <FooterLinkItems>
            <FooterLinkTitle>About Us</FooterLinkTitle>
            <FooterLink to="#">Who we are</FooterLink>
            <FooterLink to="#">Coming Soon!</FooterLink>
            <FooterLink to="#">Coming Soon!</FooterLink>
            <FooterLink to="#">Coming Soon!</FooterLink>
            <FooterLink to="#">Coming Soon!</FooterLink>
          </FooterLinkItems>
          <FooterLinkItems>
            <FooterLinkTitle>Contact Us</FooterLinkTitle>
            <FooterLink to="#">Contacts</FooterLink>
            <FooterLink to="#">Coming Soon!</FooterLink>
            <FooterLink to="#">Coming Soon!</FooterLink>
            <FooterLink to="#">Coming Soon!</FooterLink>
            <FooterLink to="#">Coming Soon!</FooterLink>
          </FooterLinkItems>
        </FooterLinkWrapper>
        {/*<FooterLinkWrapper>*/}
        {/*  <FooterLinkItems>*/}
        {/*    <FooterLinkTitle>Videos</FooterLinkTitle>*/}
        {/*    <FooterLink to="/sign-up">How it works</FooterLink>*/}
        {/*    <FooterLink to="/sign-up">Testimonial</FooterLink>*/}
        {/*    <FooterLink to="/sign-up">Careers</FooterLink>*/}
        {/*    <FooterLink to="/sign-up">Investors</FooterLink>*/}
        {/*    <FooterLink to="/sign-up">Terms of Service </FooterLink>*/}
        {/*  </FooterLinkItems>*/}
        {/*  <FooterLinkItems>*/}
        {/*    <FooterLinkTitle>Social Media</FooterLinkTitle>*/}
        {/*    <FooterLink to="/sign-up">How it works</FooterLink>*/}
        {/*    <FooterLink to="/sign-up">Testimonial</FooterLink>*/}
        {/*    <FooterLink to="/sign-up">Careers</FooterLink>*/}
        {/*    <FooterLink to="/sign-up">Investors</FooterLink>*/}
        {/*    <FooterLink to="/sign-up">Terms of Service </FooterLink>*/}
        {/*  </FooterLinkItems>*/}
        {/*</FooterLinkWrapper>*/}
      </FooterLinkContainer>
      <SocialMedia>
        <SocialMediaWrap>
          <SocialLogo to="/">
            <SocialIcon />
           EiE
          </SocialLogo>
          <WebsiteRights>EiE SUSUNG @2021</WebsiteRights>
          <SocialIcons>
            <SocialIconLink href="/" target="_blank" aria-label="Facebook">
              <FaFacebook />
            </SocialIconLink>
            <SocialIconLink href="https://www.instagram.com/eiemanchon/" target="_blank" aria-label="Instagram">
              <FaInstagram />
            </SocialIconLink>
            <SocialIconLink
              href="https://www.youtube.com/channel/UC1V2XMY0z9a9XNIWkn84EpA/videos"
              target="_blank"
              aria-label="Youtube"
              rel="noopener noreferrer"
            >
              <FaYoutube />
            </SocialIconLink>
            <SocialIconLink href="#" target="_blank" aria-label="Twitter">
              <FaTwitter />
            </SocialIconLink>
            <SocialIconLink href="#" target="_blank" aria-label="Linkedin">
              <FaLinkedin />
            </SocialIconLink>
          </SocialIcons>
        </SocialMediaWrap>
      </SocialMedia>
    </FooterContainer>
  )
}

export default Footer
