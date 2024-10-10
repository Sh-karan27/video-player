import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser } from '../store/slices/userSlice';

const Channel = () => {
  const [editCoverImage, setEditCoverImage] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    getCurrentUser();
  }, [dispatch]);

  const { data, error, loading } = useSelector((state) => state.user);

  if (loading) {
    return <div>Loading</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }


 const handleCoverImageEidtClick = () => {
   setEditCoverImage(!editCoverImage);
 };

  console.log(data);

  return (
    <div className='w-full bg-background-primary h-screen items-center justify-center p-4 overflow-y-scroll'>
      <div className='w-full h-full flex items-center justify-center'>
        <div className='relative w-full sm:w-3/4 mt-10 px-4 sm:px-0 group'>
          <img
            src={data?.coverImage}
            alt='YouTube Channel Banner'
            className='w-full h-[30vw] sm:h-[15vw] object-cover rounded-xl'
          />
          <div className='absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
            <button
              className='p-2 bg-gray-500 text-white rounded-full'
              onClick={() => handleCoverImageEidtClick()}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={2}
                stroke='currentColor'
                className='w-6 h-6'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M15.232 5.232l3.536 3.536m-2.036-7.036a2.5 2.5 0 113.536 3.536L7.5 18.036H4v-3.536L16.732 3.232z'
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Channel;
