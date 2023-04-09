import { HTMLAttributes } from 'react';
import { Element, Image } from './styles';

export interface Props extends HTMLAttributes<HTMLDivElement> {
  src: string;
  alt: string;
  isSelected: boolean;
}

const Card = ({ src, alt, isSelected, ...props }: Props) => (
  <Element {...props} isSelected={isSelected}>
    <Image src={src} alt={alt} />
  </Element>
);

export default Card;
