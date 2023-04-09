import Card, { Props as CardProps } from '../Card/Card';
import { Container, DeleteButton } from './styles';

type OwnProps = {
  onClickRemove: () => void;
};

type Props = OwnProps & CardProps;

const CardRemove = ({ onClickRemove, ...props }: Props) => (
  <Container>
    <DeleteButton onClick={onClickRemove}>x</DeleteButton>
    <Card {...props} />
  </Container>
);

export default CardRemove;
