import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { updateCoverImage } from '../store/slices/userSlice';
import { IoIosArrowBack } from 'react-icons/io';

const EditCoverImage = ({ isOpen, onClose, onUpdate }) => {
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleClick = () => {
    onClose();
  };

  const handleFileInputClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('coverImage', file);
    dispatch(updateCoverImage(formData))
      .then(() => onUpdate())
      .then(() => onClose());
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className='fixed inset-0 flex flex-col items-center justify-center '>
      <div className='w-1/3 h-[15rem] flex flex-col items-center justify-evenly  bg-white p-4 bg-background-secondary  rounded-md'>
        <div className='w-full'>
          <button
            className=' flex items-center justify-center  text-main-text hover:text-secondary-text cursor-pointer '
            onClick={handleClick}>
            <IoIosArrowBack />
            Go Back
          </button>
        </div>

        <div className='w-full flex flex-col items-center justify-center gap-5'>
          <h2 className='text-lg font-semibold mb-2 text-secondary-text'>
            Update Cover Image
          </h2>

          {/* Hidden file input */}
          <input
            type='file'
            accept='image/*'
            onChange={handleFileChange}
            ref={fileInputRef}
            style={{ display: 'none' }}
          />

          {/* Custom styled button */}
          <button
            type='button'
            onClick={handleFileInputClick}
            className=' bg-background-primary text-main-text hover:text-secondary-text border-background-primary hover:bg-background-secondary border  hover:border-main-text  py-2 px-4 rounded-md '>
            Choose File
          </button>

          {/* Submit button */}
          <button
            type='submit'
            className='  text-secondary-text p-2 rounded-md'
            onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditCoverImage;
