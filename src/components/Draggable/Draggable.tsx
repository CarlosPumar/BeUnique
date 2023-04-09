import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../services/redux/store';
import DraggableContainer from './components/DraggableContainer/DraggableContainer';
import DraggableImage from './components/DraggableImage.tsx/DraggableImage';
import DraggableSpace from './components/DraggableSpace/DraggableSpace';
import { OuterContainer } from './styles';

interface Props {
  containerImage: string;
  containerImageOption?: {
    position: string;
    height: string;
  };
}

const Draggable = ({ containerImage, containerImageOption }: Props) => {
  const images = useSelector((state: RootState) => state.aiImages.images);
  const divRef = useRef<HTMLDivElement>(null);

  return (
    <OuterContainer>
      <DraggableContainer src={containerImage} alt="T-shirt">
        <DraggableSpace
          divRef={divRef}
          id="space"
          imageOption={containerImageOption}
        >
          {images.map((image) => (
            <DraggableImage
              key={image.id}
              divRef={divRef}
              src={image.src}
              alt="draggable image"
              size={image.options.size}
            />
          ))}
        </DraggableSpace>
      </DraggableContainer>
    </OuterContainer>
  );
};

export default Draggable;
