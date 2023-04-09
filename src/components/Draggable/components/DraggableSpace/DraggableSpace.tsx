import { HTMLAttributes, ReactNode, RefObject } from 'react';
import { Container } from './styles';

interface Props extends HTMLAttributes<HTMLDivElement> {
  divRef: RefObject<HTMLDivElement>;
  children: ReactNode;
  imageOption?: {
    position: string;
    height: string;
  };
}
const DraggableSpace = ({ divRef, children, imageOption, ...props }: Props) => (
  <Container
    ref={divRef}
    {...props}
    style={{ top: imageOption?.position, height: imageOption?.height }}
  >
    {children}
  </Container>
);

export default DraggableSpace;
