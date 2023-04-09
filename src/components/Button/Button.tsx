import { ButtonHTMLAttributes } from 'react';
import { ButtonStyled } from './styles';

type Props = ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ ...props }: Props) => <ButtonStyled {...props} />;

export default Button;
