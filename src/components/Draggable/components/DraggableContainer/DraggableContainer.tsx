import { ImgHTMLAttributes, ReactNode } from 'react';
import { Container, Image } from './styles';

// type Props = ImgHTMLAttributes<HTMLImageElement>;
interface Props extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  children: ReactNode;
}

const DraggableContainer = ({ children, src, alt, ...props }: Props) => (
  <Container id="container">
    <Image {...props} alt={alt} src={src} />
    {children}
  </Container>
);

export default DraggableContainer;
