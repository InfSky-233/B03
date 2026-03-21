import { ButtonHTMLAttributes, ReactNode } from 'react';
import './Button.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'md',
  className = '',
  ...props 
}: ButtonProps) {
  return (
    <button 
      className={`button button--${variant} button--${size} ${className}`}
      {...props}
    >
      <span className="button__content">{children}</span>
      <span className="button__ripple"></span>
    </button>
  );
}
