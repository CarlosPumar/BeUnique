import {
  ImgHTMLAttributes,
  RefObject,
  useEffect,
  useRef,
  useState,
} from 'react';
import { ImageStyled } from './styles';
import useMouse from '../../../../hooks/useMouse';
import useImageSize from '../../../../hooks/useImageSize';

interface Props extends ImgHTMLAttributes<HTMLImageElement> {
  divRef: RefObject<HTMLDivElement>;
  alt: string;
  src: string;
  size: number;
}

type Position = {
  x: number;
  y: number;
};

const DraggableImage = ({ divRef, src, alt, size, ...props }: Props) => {
  const { mousePosition } = useMouse();
  const imageRef = useRef<HTMLImageElement>(null);
  const { imageSize } = useImageSize({ src });
  const [position, setPosition] = useState<Position>({
    x: 0,
    y: 0,
  });
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    const onMouseUp = () => setIsClicked(false);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('touchend', onMouseUp);
    return () => {
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchend', onMouseUp);
    };
  }, []);

  const getPosition = () => {
    if (!divRef?.current || !imageRef?.current) return;

    const parent = divRef.current;
    const follower = imageRef.current;
    const followerWidth = follower.offsetWidth;
    const followerHeight = follower.offsetHeight;
    const parentWidth = parent.offsetWidth;
    const parentHeight = parent.offsetHeight;
    const parentRect = parent.getBoundingClientRect();

    const leftPercentage =
      ((mousePosition.x - parentRect.left) / parentWidth) * 100;
    const topPercentage =
      ((mousePosition.y - parentRect.top) / parentHeight) * 100;

    const newPosition: Position = {
      x: leftPercentage - (followerWidth / parentWidth) * 50,
      y: topPercentage - (followerHeight / parentHeight) * 50,
    };

    // Check if the follower would be outside the parent on the left or right
    if (leftPercentage < (followerWidth / parentWidth) * 50) newPosition.x = 0;
    if (leftPercentage > 100 - (followerWidth / parentWidth) * 50)
      newPosition.x = 100 - (followerWidth / parentWidth) * 100;

    // Check if the follower would be outside the parent on the top or bottom
    if (topPercentage < (followerHeight / parentHeight) * 50) newPosition.y = 0;
    if (topPercentage > 100 - (followerHeight / parentHeight) * 50)
      newPosition.y = 100 - (followerHeight / parentHeight) * 100;

    // eslint-disable-next-line consistent-return
    return newPosition;
  };

  const getPositionResize = () => {
    if (!divRef?.current || !imageRef?.current) return;

    const parent = divRef.current;
    const follower = imageRef.current;
    const followerWidth = follower.offsetWidth;
    const followerHeight = follower.offsetHeight;
    const followerReact = follower.getBoundingClientRect();

    const parentWidth = parent.offsetWidth;
    const parentHeight = parent.offsetHeight;
    const parentRect = parent.getBoundingClientRect();

    let { x, y } = position;
    if (followerWidth + followerReact.left > parentWidth + parentRect.left) {
      x =
        position.x -
        (followerWidth + followerReact.left - (parentWidth + parentRect.left));
    }

    if (followerHeight + followerReact.top > parentHeight + parentRect.top) {
      y =
        position.y -
        (followerHeight + followerReact.top - (parentHeight + parentRect.top));
    }

    const newPosition: Position = { x, y };

    // eslint-disable-next-line consistent-return
    return newPosition;
  };

  useEffect(() => {
    if (!isClicked) return;

    const newPosition = getPosition();
    if (!newPosition) return;

    setPosition(newPosition);
  }, [mousePosition]);

  useEffect(() => {
    const newPosition = getPositionResize();
    if (!newPosition) return;

    setPosition(newPosition);
  }, [size]);

  const onDragStart = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsClicked(true);
  };

  const onTouchStart = () => setIsClicked(true);

  let sizeWidth = '';
  let sizeHeight = '';

  if (imageSize.width >= imageSize.height) sizeWidth = `${size}%`;
  if (imageSize.height >= imageSize.width) sizeHeight = `${size}%`;

  return (
    <ImageStyled
      onDragStart={onDragStart}
      onTouchStart={onTouchStart}
      ref={imageRef}
      src={src}
      alt={alt}
      {...props}
      style={{
        position: 'absolute',
        top: `${position.y > 0 ? position.y : 0}%`,
        left: `${position.x > 0 ? position.x : 0}%`,
        width: sizeWidth,
        height: sizeHeight,
      }}
    />
  );
};

export default DraggableImage;
