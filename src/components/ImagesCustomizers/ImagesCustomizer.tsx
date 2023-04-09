import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import useSelect from '../../hooks/useSelect';
import { RootState } from '../../services/redux/store';
import AIImageList from './components/AIImageList/AIImageList';
import SizeSlider from './components/SizeSlider/SizeSlider';
import ZIndex from './components/ZIndex/Zindex';
import { Container } from './styles';

const ImagesCustomizer = () => {
  const images = useSelector((state: RootState) => state.aiImages.images);

  const imagesMemo = useMemo(
    () =>
      images.map((image) => ({
        id: image.id,
        element: image.src,
      })),
    [images]
  );

  const { list, select, selectedElement } = useSelect({
    list: imagesMemo,
  });

  if (list.length === 0 || !selectedElement) return null;

  return (
    <Container>
      <AIImageList list={list} select={select} />
      <SizeSlider imageId={selectedElement.id} />
      <ZIndex imageId={selectedElement.id} />
    </Container>
  );
};

export default ImagesCustomizer;
