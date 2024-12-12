import React from "react";
import styled, { keyframes } from "styled-components";

const slideDown = keyframes`
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const NotificationContainer = styled.div`
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  background-color: ${({ type, theme }) =>
    type === "success" ? theme.green : theme.red};
  color: ${({ theme }) => theme.white};
  padding: 16px 24px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  z-index: 1000;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  animation: ${slideDown} 0.5s ease forwards;
`;

const Notification = ({ message, type, onClose }) => {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // Dismiss notification after 3 seconds

    return () => clearTimeout(timer);
  }, [onClose]);

  return <NotificationContainer type={type}>{message}</NotificationContainer>;
};

export default Notification;
