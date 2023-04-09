import { useDispatch, useSelector } from 'react-redux';
import { modifyImage } from '../../../../services/redux/aiImages';
import { RootState } from '../../../../services/redux/store';
import Slider from '../../../Slider/Slider';

type Props = {
  imageId: string;
};

const SizeSlider = ({ imageId }: Props) => {
  const images = useSelector((state: RootState) => state.aiImages.images);
  const dispatch = useDispatch();

  const value = images.find((elem) => elem.id === imageId);
  const setValue = (newValue: number) => {
    dispatch(modifyImage({ id: imageId, options: { size: newValue } }));
  };

  if (!value) return null;

  return <Slider value={value.options.size} setValue={setValue} />;
};

export default SizeSlider;
