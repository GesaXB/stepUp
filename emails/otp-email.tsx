import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Section,
  Text,
  Hr,
  Link,
  Preview,
} from "@react-email/components";
import * as React from "react";

interface OTPEmailProps {
  otp: string;
}

export const OTPEmail = ({ otp }: OTPEmailProps) => (
  <Html>
    <Head />
    <Preview>Your StepUP Access Code: {otp}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <Heading style={logo}>STEPUP</Heading>
          <Text style={tagline}>ARCHIVE & COLLECTIVE</Text>
        </Section>
        
        <Hr style={divider} />
        
        <Section style={content}>
          <Heading style={title}>Account Verification</Heading>
          <Text style={description}>
            Enter the following security code to authorize your session. 
            This protocol will expire in 10 minutes.
          </Text>
          
          <div style={codeWrapper}>
            <Text style={codeText}>{otp}</Text>
          </div>

          <Text style={instruction}>
            Verification ID: <span style={bold}>{Math.random().toString(36).substring(7).toUpperCase()}</span>
          </Text>
        </Section>

        <Hr style={divider} />

        <Section style={footer}>
          <Text style={footerText}>
            If you did not request this verification, please secure your account immediately or ignore this message.
          </Text>
          <Text style={copyright}>
            &copy; {new Date().getFullYear()} STEPUP EDITORIAL. ALL RIGHTS RESERVED.
          </Text>
          <div style={socialLinks}>
            <Link href="#" style={link}>INSTAGRAM</Link>
            <span style={dot}>&bull;</span>
            <Link href="#" style={link}>SUPPORT</Link>
          </div>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default OTPEmail;

const main = {
  backgroundColor: "#f9f9f9",
  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  padding: "40px 0",
};

const container = {
  backgroundColor: "#ffffff",
  border: "1px solid #eeeeee",
  margin: "0 auto",
  padding: "48px",
  width: "480px",
};

const header = {
  textAlign: "center" as const,
  marginBottom: "32px",
};

const logo = {
  fontSize: "28px",
  fontWeight: "900",
  letterSpacing: "0.2em",
  margin: "0",
  color: "#000000",
};

const tagline = {
  fontSize: "10px",
  fontWeight: "500",
  letterSpacing: "0.4em",
  margin: "4px 0 0",
  color: "#a0a0a0",
  textTransform: "uppercase" as const,
};

const divider = {
  borderColor: "#f0f0f0",
  margin: "32px 0",
};

const content = {
  textAlign: "center" as const,
};

const title = {
  fontSize: "18px",
  fontWeight: "700",
  margin: "0 0 16px",
  color: "#1a1a1a",
  textTransform: "uppercase" as const,
  letterSpacing: "0.05em",
};

const description = {
  fontSize: "14px",
  lineHeight: "24px",
  color: "#666666",
  margin: "0 0 32px",
};

const codeWrapper = {
  backgroundColor: "#000000",
  borderRadius: "4px",
  padding: "32px",
  margin: "0 auto 32px",
  width: "fit-content",
  minWidth: "200px",
};

const codeText = {
  fontSize: "42px",
  fontWeight: "800",
  letterSpacing: "12px",
  color: "#ffffff",
  margin: "0",
  lineHeight: "1",
};

const instruction = {
  fontSize: "12px",
  color: "#a0a0a0",
  margin: "0",
};

const bold = {
  color: "#000000",
  fontWeight: "600",
};

const footer = {
  textAlign: "center" as const,
};

const footerText = {
  fontSize: "12px",
  lineHeight: "20px",
  color: "#999999",
  margin: "0 0 24px",
};

const copyright = {
  fontSize: "10px",
  fontWeight: "600",
  color: "#cccccc",
  letterSpacing: "0.1em",
  margin: "0 0 16px",
};

const socialLinks = {
  marginTop: "16px",
};

const link = {
  color: "#000000",
  fontSize: "11px",
  fontWeight: "700",
  textDecoration: "none",
  letterSpacing: "0.1em",
};

const dot = {
  margin: "0 12px",
  color: "#dddddd",
};
