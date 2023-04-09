import { ChangeEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import domtoimage from 'dom-to-image';
import { v4 as uuidv4 } from 'uuid';
import Draggable from '../../components/Draggable/Draggable';
import { getIAImage } from '../../services/api/ia';
import { download } from '../../utils/download';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import Header from '../../components/Header/Header';
import { BodyContainer, HeaderContainer, MainPageContainer } from './styles';
import ClothSelector from '../../components/ClothSelector/ClothSelector';
import useSelector from '../../hooks/useSelect';
import ImagesCustomizer from '../../components/ImagesCustomizers/ImagesCustomizer';
import { INITIAL_IMAGE_SIZE } from '../../constants/main';
import { addImage } from '../../services/redux/aiImages';

const selectImages = [
  {
    id: 'tshirtOversize',
    element: '/images/tshirt-oversize-mock-front.png',
  },
  {
    id: 'hoodie',
    element: '/images/hoodie-mock-front.png',
  },
  {
    id: 'tshirt',
    element: '/images/tshirt-mock-front.png',
  },
];

// percetage
const imageOptions = {
  tshirtOversize: {
    position: '30%',
    height: '58%',
  },
  hoodie: {
    position: '40%',
    height: '46%',
  },
  tshirt: {
    position: '30%',
    height: '51%',
  },
};

const MainPage = () => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const { list, select, selectedElement } = useSelector({ list: selectImages });
  const dispatch = useDispatch();

  const onChangePrompt = (e: ChangeEvent<HTMLInputElement>) =>
    setPrompt(e.target.value);

  const onClickButton = async () => {
    if (loading) return;

    setLoading(true);

    const data = await getIAImage({ prompt });
    // const data = '/images/tshirt-oversize-mock-front.png';
    if (!data) {
      setLoading(false);
      return;
    }

    const newImage = {
      id: uuidv4(),
      src: data,
      options: {
        size: INITIAL_IMAGE_SIZE,
        zIndex: 0,
      },
    };
    dispatch(addImage({ image: newImage }));

    setLoading(false);
  };

  const onCLickDownload = async () => {
    const containerNode = document.getElementById('container');
    const spaceNode = document.getElementById('space');

    if (!containerNode || !spaceNode) return;

    const oldBorderStyle = spaceNode.style.border;
    spaceNode.style.border = 'none';
    domtoimage
      .toSvg(containerNode, {
        quality: 1,
        filter: (node) => !!node,
        bgcolor: '',
        style: undefined,
        imagePlaceholder: '',
        cacheBust: false,
      })
      .then((dataUrl) => {
        download(dataUrl, 'my-image-name.svg');
        spaceNode.style.border = oldBorderStyle;
      });
  };

  return (
    <MainPageContainer>
      <HeaderContainer>
        <Header />
      </HeaderContainer>

      <ClothSelector list={list} select={select} />

      <BodyContainer>
        <Draggable
          containerImage={selectedElement.element}
          containerImageOption={
            imageOptions[selectedElement.id as keyof typeof imageOptions]
          }
        />
        <Input
          value={prompt}
          onChange={onChangePrompt}
          placeholder="Enter a description of your t-shirt"
        />
        <Button type="button" onClick={onClickButton}>
          {loading ? 'Loading...' : 'Click'}
        </Button>
        <Button type="button" onClick={onCLickDownload}>
          Download
        </Button>
        <ImagesCustomizer />
      </BodyContainer>
    </MainPageContainer>
  );
};

export default MainPage;
