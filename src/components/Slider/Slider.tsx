import { ChangeEvent } from 'react';

type Props = {
  value: number;
  setValue: (value: number) => void;
};

const Slider = ({ value, setValue }: Props) => {
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setValue(Number(e.target.value));
  }

  return (
    <input
      type="range"
      min={5}
      max={100}
      value={value}
      onChange={handleChange}
    />
  );
};

export default Slider;
