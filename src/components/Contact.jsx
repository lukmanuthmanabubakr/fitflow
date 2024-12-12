import React from "react";
import styled, { ThemeProvider } from "styled-components";
import { lightTheme } from "../utils/Themes";


const ContactPage = () => {
  return (
    <ThemeProvider theme={lightTheme}>
      <PageContainer>
        <ContactContainer>
          <Title>Contact Us</Title>
          <Form>
            <InputField>
              <Label htmlFor="name">Name</Label>
              <Input type="text" id="name" placeholder="Enter your name" />
            </InputField>
            <InputField>
              <Label htmlFor="email">Email</Label>
              <Input type="email" id="email" placeholder="Enter your email" />
            </InputField>
            <InputField>
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" placeholder="Enter your message" />
            </InputField>
            <SubmitButton type="submit">Send Message</SubmitButton>
          </Form>
        </ContactContainer>
      </PageContainer>
    </ThemeProvider>
  );
};

export default ContactPage;

// Styled components
const PageContainer = styled.div`
  background-color: ${(props) => props.theme.bg};
  color: ${(props) => props.theme.text_primary};
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
`;

const ContactContainer = styled.div`
  background-color: ${(props) => props.theme.card};
  box-shadow: 0 4px 8px ${(props) => props.theme.shadow};
  border-radius: 8px;
  padding: 30px;
  width: 100%;
  max-width: 500px;
`;

const Title = styled.h1`
  color: ${(props) => props.theme.primary};
  font-size: 1.8rem;
  text-align: center;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const InputField = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 1rem;
  color: ${(props) => props.theme.text_secondary};
  margin-bottom: 5px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid ${(props) => props.theme.arrow};
  border-radius: 4px;
  font-size: 1rem;
  background-color: ${(props) => props.theme.bgLight};
  color: ${(props) => props.theme.text_primary};
  outline: none;
  &:focus {
    border-color: ${(props) => props.theme.primary};
  }
`;

const Textarea = styled.textarea`
  padding: 10px;
  border: 1px solid ${(props) => props.theme.arrow};
  border-radius: 4px;
  font-size: 1rem;
  background-color: ${(props) => props.theme.bgLight};
  color: ${(props) => props.theme.text_primary};
  outline: none;
  resize: none;
  height: 100px;
  &:focus {
    border-color: ${(props) => props.theme.primary};
  }
`;

const SubmitButton = styled.button`
  background-color: ${(props) => props.theme.primary};
  color: ${(props) => props.theme.white};
  border: none;
  padding: 10px 15px;
  font-size: 1rem;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.secondary};
  }
`;
