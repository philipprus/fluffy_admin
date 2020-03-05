import React from 'react'
import upload from "../../images/upload_fluffy.png";
export default props => 
  <div className='buttons fadein '>
    <div className='button'>
      <label htmlFor='single' className="uploadImage">
        <img src={upload} alt="Upload" />
        {/* <FontAwesomeIcon icon={faImage} color='#3B5998' size='10x' /> */}
      </label>
      <input type='file' id='single' onChange={props.onChange} style={{display: 'none'}} /> 
    </div>
  </div>