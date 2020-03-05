import React, { Component } from 'react';
import Images from '../Images';
import Buttons from './UploadButton';
import '../../css/UploadImage.css';
import Loader from 'react-loader-spinner';
import { ErrorMessage } from 'formik';

export default class Upload extends Component {
  
  state = {
    uploading: false,
    images: this.props.value ? this.props.value : []
  }

  onChange = e => {
    const files = Array.from(e.target.files);
    this.setState({ uploading: true });

    const formData = new FormData();

    files.forEach((file, i) => {
      formData.append(i, file)
    });

    fetch(`/api/upload/single-image`, {
      method: 'POST',
      body: formData
    })
    .then(res => res.json())
    .then(images => {
      this.setState({ 
        uploading: false,
        images
      });
      if(this.props.onChange) {
            this.props.onChange(this.state.images);
      }
    });
  }

  removeImage = id => {
    this.setState({
      images: this.state.images.filter(image => image.public_id !== id)
    });

    if(this.props.onDelete) {
          this.props.onDelete();
    }
  }
  
  render() {
    const { uploading, images } = this.state

    const content = () => {
      switch(true) {
        case uploading:
          return <Loader
          type="Hearts"
          color="#00BFFF"
          height={168}
          width={100}
 
       />
        case images.length > 0:
          return <Images images={images} removeImage={this.removeImage} />
        default:
          return <Buttons onChange={this.onChange}  className="uploadImage"/>
      }
    }

    return (
      <div>
        <div className='buttons'>
          <ErrorMessage name="photo" component="div" className="invalid-feedback" />
          {content()}
          {this.props.error && this.props.error.photo}
        </div>
      </div>
    )
  }
}