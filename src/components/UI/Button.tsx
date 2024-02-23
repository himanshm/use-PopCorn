import { type ReactNode, type ComponentPropsWithoutRef } from 'react';

type ButtonProps = ComponentPropsWithoutRef<'button'> & {
  children: ReactNode;
};

function Button({ children, ...props }: ButtonProps) {
  return <button {...props}>{children}</button>;
}

export default Button;
