import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateAvatar } from '../store/slices/userSlice';
import { ImCross } from 'react-icons/im';
import { IoIosArrowBack } from 'react-icons/io';

const EditAvatar = ({ isOpen, onClose, onUpdate }) => {
  const [profile, setProfile] = useState();
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();

  const handleFileChange = (e) => {
    setProfile(e.target.files[0]);
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
    formData.append('avatar', profile);

    dispatch(updateAvatar(formData))
      .then(() => onUpdate())
      .then(() => onClose());
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className='fixed inset-0 flex flex-col items-center justify-center bg-opacity-70 bg-black p-4'>
      <div className='w-1/3 bg-background-secondary h-[15rem] flex flex-col items-center justify-evenly   p-4 rounded-md'>
        <div className='w-full'>
          <button
            className='text-main-text hover:text-secondary-text flex items-center justify-center'
            onClick={handleClick}>
            <IoIosArrowBack />
            Go Back
          </button>
        </div>

        <div className='w-full flex flex-col items-center justify-center gap-5'>
          <h2 className='text-lg font-semibold mb-2 text-secondary-text'>
            Update Profile Image
          </h2>
          {/* Hidden file input */}
          <input
            type='file'
            accept='image/*'
            onChange={handleFileChange}
            ref={fileInputRef}
            style={{ display: 'none' }}
          />
          {/* Custom styled button for file input */}
          <button
            type='button'
            onClick={handleFileInputClick}
            className=' bg-background-primary text-main-text hover:text-secondary-text border-background-primary hover:bg-background-secondary border  hover:border-main-text  py-2 px-4 rounded-md'>
            Choose File
          </button>
          {/* Submit button */}
          <button
            onClick={handleSubmit}
            type='submit'
            className='text-secondary-text py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500'>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditAvatar;
