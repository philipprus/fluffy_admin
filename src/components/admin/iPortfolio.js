import PropTypes from 'prop-types';
import React from 'react';

import Gallery from 'react-grid-gallery';

const IMAGES = [
  {
    src: 'https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg',
    thumbnail: 'https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_n.jpg',
    thumbnailWidth: 320,
    thumbnailHeight: 174,
    isSelected: false,
    caption: 'After Rain (Jeshu John - designerspics.com)',
  },
  {
    src: 'https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg',
    thumbnail: 'https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_n.jpg',
    thumbnailWidth: 320,
    thumbnailHeight: 212,
    tags: [
      { value: 'Ocean', title: 'Ocean' },
      { value: 'People', title: 'People' },
    ],
    caption: 'Boats (Jeshu John - designerspics.com)',
  },

  {
    src: 'https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg',
    thumbnail: 'https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_n.jpg',
    thumbnailWidth: 320,
    thumbnailHeight: 212,
  },
];

const Demo3 = props => {
  const [images, setImages] = React.useState(IMAGES);
  const [currentImage, setCurrentImage] = React.useState(0);

  const deleteImage = () => {
    if (window.confirm(`Are you sure you want to delete image number ${currentImage}?`)) {
      // var imagesAr = images.slice();
      const imagesAr = images.splice(currentImage, 1);
      setImages(imagesAr);
    }
  };
  const onCurrentImageChange = index => {
    setCurrentImage(index);
  };
  const onSelectImage = (index, image) => {
    var imagesSlice = images.slice();
    var img = imagesSlice[index];
    if (img.hasOwnProperty('isSelected')) img.isSelected = !img.isSelected;
    else img.isSelected = true;

    setImages(imagesSlice);
  };
  return (
    <div
      style={{
        display: 'block',
        minHeight: '1px',
        width: '100%',
        overflow: 'auto',
      }}
    >
      <Gallery
        images={IMAGES}
        enableLightbox={true}
        onSelectImage={onSelectImage}
        currentImageWillChange={onCurrentImageChange}
        enableImageSelection={true}
        customControls={[
          <button key="deleteImage" onClick={deleteImage}>
            Delete Image
          </button>,
        ]}
      />
    </div>
  );
};

export default Demo3;
