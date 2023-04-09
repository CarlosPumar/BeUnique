import { useDispatch } from 'react-redux';
import { ElementSelectorType } from '../../../../hooks/useSelect';
import { deleteImage } from '../../../../services/redux/aiImages';
import CardRemove from '../../../CardRemove/CardRemove';
import { Container } from './styles';

type Props = {
  list: ElementSelectorType[];
  select: (id: string) => void;
};

const AIImageList = ({ list, select }: Props) => {
  const dispatch = useDispatch();

  const handleOnClick = (id: string) => () => select(id);
  const handleOnClickRemove = (id: string) => () =>
    dispatch(deleteImage({ id }));

  return (
    <Container>
      {list.map((image) => (
        <CardRemove
          key={image.id}
          src={image.element}
          alt="AI image to select"
          isSelected={image.isSelected}
          onClick={handleOnClick(image.id)}
          onClickRemove={handleOnClickRemove(image.id)}
        />
      ))}
    </Container>
  );
};

export default AIImageList;
