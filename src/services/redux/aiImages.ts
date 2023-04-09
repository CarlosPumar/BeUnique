/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { INITIAL_IMAGE_SIZE } from '../../constants/main';
import { AIImageOptionsTypeOptional, AIImageType } from '../../types/image';

const initialState: { images: AIImageType[] } = {
  images: [
    {
      id: '1',
      src: '/images/test.jpeg',
      options: {
        size: INITIAL_IMAGE_SIZE,
        zIndex: 0,
      },
    },
    {
      id: '2',
      src: '/images/tshirt-oversize-mock-front.png',
      options: {
        size: INITIAL_IMAGE_SIZE,
        zIndex: 1,
      },
    },
    {
      id: '3',
      src: '/images/tshirt-oversize-mock-front.png',
      options: {
        size: INITIAL_IMAGE_SIZE,
        zIndex: 2,
      },
    },
  ],
};

const aiImagesSlice = createSlice({
  name: 'aiImages',
  initialState,
  reducers: {
    addImage(state, action) {
      const { image }: { image: AIImageType } = action.payload;

      const newImages = state.images.concat(image);
      state.images = newImages;
    },
    deleteImage(state, action) {
      const { id }: { id: string } = action.payload;

      const newImages = state.images.filter((image) => image.id !== id);
      state.images = newImages;
    },
    modifySize(state, action) {
      const { id, size }: { id: string; size: number } = action.payload;
    },
    modifyImage(state, action) {
      const {
        id,
        options,
      }: { id: string; options: AIImageOptionsTypeOptional } = action.payload;

      const newImages = state.images.map((image) => {
        if (image.id !== id) return image;

        const newImage = { ...image };

        newImage.options = {
          ...image.options,
          ...options,
        };
        return newImage;
      });

      state.images = newImages;
    },
  },
});

export const { addImage, deleteImage, modifyImage } = aiImagesSlice.actions;
export default aiImagesSlice.reducer;
