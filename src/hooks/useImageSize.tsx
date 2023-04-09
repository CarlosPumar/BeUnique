import { useEffect, useState } from 'react';

type Props = {
  src: string;
};

const useImageSize = ({ src }: Props) => {
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setImageSize({ width: img.width, height: img.height });
    };
  }, [src]);

  return {
    imageSize,
  };
};

export default useImageSize;
