import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "../store/slices/userSlice";
import { CiEdit } from "react-icons/ci";
import EditCoverImage from "../components/EditCoverImage";

const Channel = () => {
  const [editCoverImage, setEditCoverImage] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  const { data, error, loading } = useSelector((state) => state.user);

  if (loading) {
    return <div className="text-main-text">Loading</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  const handleCoverImageEidtClick = () => {
    setEditCoverImage(!editCoverImage);
  };

  const onUpdate = async () => {
    await dispatch(getCurrentUser());
  };

  console.log(data);

  return (
    <div className="w-full bg-background-primary h-screen items-center justify-center p-4 overflow-y-scroll">
      <div className="w-full h-full flex items-center justify-center">
        <div className="relative w-full sm:w-3/4 mt-10 px-4 sm:px-0 group">
          <img
            src={data?.coverImage}
            alt="YouTube Channel Banner"
            className="w-full h-[30vw] sm:h-[15vw] object-cover rounded-xl"
          />
          <div className="bg-background-secondary p-2 rounded-full cursor-pointer absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <CiEdit
              onClick={() => handleCoverImageEidtClick()}
              className="  text-main-text text-3xl font-light rounded-full "
            />
          </div>
        </div>
      </div>

      {editCoverImage && (
        <EditCoverImage
          isOpen={editCoverImage}
          onClose={handleCoverImageEidtClick}
          onUpdate={onUpdate}
        />
      )}
    </div>
  );
};

export default Channel;
