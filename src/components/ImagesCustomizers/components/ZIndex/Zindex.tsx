import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { modifyImage } from '../../../../services/redux/aiImages';
import { RootState } from '../../../../services/redux/store';
import Button from '../../../Button/Button';

interface Props {
  imageId: string;
}

const ZIndex = ({ imageId }: Props) => {
  const image = useSelector((state: RootState) =>
    state.aiImages.images.find((imageToFind) => imageToFind.id === imageId)
  );
  const dispatch = useDispatch();

  const [counter, setCounter] = useState(0);

  const onClickLess = () => dispatch(modifyImage({id: image?.id, options: {
    zIndex: 
  }}));
  const onClickPlus = () => setCounter((prev) => prev + 1);

  return (
    <>
      {counter}
      <Button onClick={onClickLess}>-</Button>
      <Button onClick={onClickPlus}>+</Button>
    </>
  );
};

export default ZIndex;
