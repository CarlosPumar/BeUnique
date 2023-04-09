import { ChangeEvent, InputHTMLAttributes } from 'react';
import { MAX_INPUT_STRING_LENGHT } from '../../constants/main';
import { InputStyled } from './styles';

// interface Props extends InputHTMLAttributes<HTMLInputElement> {
//   onChangeValue: () => void;
// }
type Props = InputHTMLAttributes<HTMLInputElement>;

const Input = ({ ...props }: Props) => {
  const onChangeValueLimit = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.value.length > MAX_INPUT_STRING_LENGHT || !props?.onChange)
      return;
    props.onChange(e);
  };
  return <InputStyled onChange={onChangeValueLimit} {...props} />;
};

export default Input;
