import React from 'react';
import styled from 'styled-components';
import useFluentTokens from '../theme/useFluentTokens';
import { tokens } from '@fluentui/react-components';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary',
  size = 'medium',
  children,
  disabled,
  ...props
}) => {
  const fluentTokens = useFluentTokens(variant);
  
  const StyledButton = styled.button`
    font-family: ${tokens.fontFamilyBase};
    font-weight: ${tokens.fontWeightSemibold};
    border-radius: ${tokens.borderRadiusMedium};
    transition: all 0.1s ease-in-out;
    cursor: ${disabled ? 'not-allowed' : 'pointer'};
    
    /* Size variants */
    padding: ${size === 'small' 
      ? '6px 12px'
      : size === 'medium'
      ? '8px 16px'
      : '10px 20px'};
      
    font-size: ${size === 'small' 
      ? tokens.fontSizeBase200
      : size === 'medium'
      ? tokens.fontSizeBase300
      : tokens.fontSizeBase400};
    
    /* Style variants */
    background-color: ${disabled ? fluentTokens.disabledBackgroundColor : fluentTokens.backgroundColor};
    color: ${disabled ? fluentTokens.disabledTextColor : fluentTokens.textColor};
    border: 1px solid ${disabled ? fluentTokens.disabledBorderColor : fluentTokens.borderColor};
    
    &:hover {
      ${!disabled && `
        background-color: ${fluentTokens.hoverBackgroundColor};
        color: ${fluentTokens.hoverTextColor};
        border-color: ${fluentTokens.hoverBorderColor};
      `}
    }
    
    &:focus-visible {
      outline: 2px solid ${fluentTokens.focusColor};
      outline-offset: 2px;
    }
  `;
  
  return (
    <StyledButton disabled={disabled} {...props}>
      {children}
    </StyledButton>
  );
};

export default Button;
