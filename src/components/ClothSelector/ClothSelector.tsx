import { ElementSelectorType } from '../../hooks/useSelect';
import Card from '../Card/Card';
import { Container } from './styles';

type Props = {
  list: ElementSelectorType[];
  select: (id: string) => void;
};

const ClothSelector = ({ list, select }: Props) => {
  const onClick = (id: string) => () => select(id);

  return (
    <Container>
      {list.map((image) => (
        <Card
          key={image.id}
          src={image.element}
          alt={image.id}
          isSelected={image.isSelected}
          onClick={onClick(image.id)}
        />
      ))}
    </Container>
  );
};

export default ClothSelector;
