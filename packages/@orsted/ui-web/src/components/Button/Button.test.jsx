import React from 'react';
import { render, screen } from '@testing-library/react';
import Button from './Button';
import '@testing-library/jest-dom';

test('renders with primary variant', () => {
    render(<Button variant="primary">Click Me</Button>);
    const buttonElement = screen.getByRole('button', { name: /click me/i });
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass('button--primary');
});

 test('renders with secondary variant', () => {
    render(<Button variant="secondary">Click Me</Button>);
    const buttonElement = screen.getByRole('button', { name: /click me/i });
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass('button--secondary');
});

test('renders as disabled', () => {
    render(<Button disabled>Click Me</Button>);
    const buttonElement = screen.getByRole('button', { name: /click me/i });
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toBeDisabled();
});