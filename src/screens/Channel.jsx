import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "../store/slices/userSlice";
import { CiEdit } from "react-icons/ci";
import EditCoverImage from "../components/EditCoverImage";
import EditAvatar from "../components/EditAvatar";
import { RiLockPasswordFill } from "react-icons/ri";
import {
  usersSubscribedTo,
  userSubscribers,
} from "../store/slices/subscriptionSlice";
import FollowerBox from "../components/FollowerBox";
import FollowingBox from "../components/FollowingBox";
import UserVideoSection from "../components/UserVideoSection";
import LikedVideoSection from "../components/LikedVideoSection";
import PlaylistSection from "../components/PlaylistSection";

const Channel = () => {
  const [editCoverImage, setEditCoverImage] = useState(false);
  const [editAvatar, setEditAvatar] = useState(false);
  const [showFollowerBox, setShowFollowerBox] = useState(false);
  const [showFollowingBox, setShowFollowingBox] = useState(false);
  const [selectUserProfileSection, setSelectUserProfileSection] =
    useState(false);

  const dispatch = useDispatch();
  const { data, error, loading } = useSelector((state) => state.user);
  const { subscriber, subscribedTo } = useSelector(
    (state) => state.subscription
  );

  useEffect(() => {
    const fetchData = async () => {
      dispatch(getCurrentUser());
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    if (data && data._id) {
      dispatch(userSubscribers({ id: data._id }));
      dispatch(usersSubscribedTo({ id: data._id }));
    }
  }, [dispatch, data]);

  if (loading) {
    return <div className="text-main-text">Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  // console.log(data);
  console.log(subscribedTo);
  console.log(subscriber);

  const handleCoverImageEditClick = () => {
    setEditCoverImage(!editCoverImage);
  };

  const handleAvatarEditClick = () => {
    setEditAvatar(!editAvatar);
  };

  const toggleFollowerBox = () => {
    setShowFollowerBox(!showFollowerBox);
  };

  const toggleFollowingBox = () => {
    setShowFollowingBox(!showFollowingBox);
  };

  const onUpdate = async () => {
    await dispatch(getCurrentUser());
    await dispatch(userSubscribers({ id: data._id }));
    await dispatch(usersSubscribedTo({ id: data._id }));
  };

  const renderProfileSection = () => {
    switch (selectUserProfileSection) {
      case "Videos":
        return data ? (
          <UserVideoSection id={data._id} />
        ) : (
          <div>Loading...</div>
        );
      case "LikedVideos":
        return data ? (
          <LikedVideoSection id={data._id} />
        ) : (
          <div>Loading...</div>
        );
      case "Playlist":
        return data ? <PlaylistSection id={data._id} /> : <div>Loading...</div>;

      default:
        return <UserVideoSection />;
    }
  };

  const userProfileSection = [
    { name: "Videos" },
    { name: "LikedVideos" },
    { name: "Playlist" },
  ];

  return (
    // <div className="w-full bg-background-primary h-screen items-center justify-center p-4 overflow-y-scroll">
    //   <div className="w-full h-full flex flex-col items-center justify-start">
    //     <div className="relative w-full sm:w-3/4 mt-10 px-4 sm:px-0 group">
    //       <img
    //         src={data?.coverImage}
    //         alt="YouTube Channel Banner"
    //         className="w-full h-[30vw] sm:h-[15vw] object-cover rounded-xl"
    //       />
    //       <div
    //         title="update-cover-image"
    //         className="bg-background-secondary p-2 rounded-full cursor-pointer absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
    //       >
    //         <CiEdit
    //           onClick={handleCoverImageEditClick}
    //           className="text-main-text text-3xl font-light rounded-full"
    //         />
    //       </div>
    //     </div>
    //     <div className="flex flex-col sm:flex-row items-center sm:items-start w-full sm:w-3/4 mt-4 px-4 sm:px-0">
    //       <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
    //         <div className="relative w-[50px] sm:w-[200px] h-[150px] sm:h-[200px]">
    //           <img
    //             src={data?.avatar}
    //             alt="Profile"
    //             className="w-full h-full rounded-full object-cover"
    //           />
    //           <div className="absolute inset-0 w-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 z-10">
    //             <CiEdit
    //               onClick={handleAvatarEditClick}
    //               className="text-main-text text-3xl font-light rounded-full"
    //             />
    //           </div>
    //         </div>
    //         <div className="flex flex-col items-center sm:items-start justify-center text-center sm:text-left">
    //           <h1 className="text-2xl sm:text-3xl font-bold text-main-text">
    //             {data?.username}
    //           </h1>
    //           <h3 className="text-lg sm:text-xl font-semibold text-secondary-text">
    //             {data?.email}
    //           </h3>
    //           <div className="flex gap-2">
    //             <h1
    //               className="text-gray-500 text-lg text-secondary-text"
    //               onClick={() => toggleFollowerBox()}
    //             >
    //               Followers: <span>{subscriber?.subscriberCount}</span>
    //             </h1>
    //             <h1
    //               className="text-gray-500 text-lg text-secondary-text"
    //               onClick={() => toggleFollowingBox()}
    //             >
    //               Following: <span>{subscribedTo.subscribedToCount}</span>
    //             </h1>
    //           </div>
    //           <button className="flex items-center justify-center gap-1 text-blue-500 underline cursor-pointer text-secondary-text">
    //             Change Password <RiLockPasswordFill />
    //           </button>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    //   <div className="w-full sm:w-3/4 border-b flex items-center justify-center sm:justify-start mt-10 px-4 sm:px-0 p-2">
    //     <ul className="flex flex-wrap items-center justify-center sm:justify-start w-full gap-4">
    //       {userProfileSection.map((curr, i) => (
    //         <li key={i} onClick={() => setSelectUserProfileSection(curr.name)}>
    //           <button className="text-lg font-semibold">{curr.name}</button>
    //         </li>
    //       ))}
    //     </ul>
    //   </div>
    //   <div className="w-full h-full sm:w-3/4 mt-10 flex items-center justify-center  sm:px-0">
    //     {renderProfileSection()}
    //   </div>

    //   {editCoverImage && (
    //     <EditCoverImage
    //       isOpen={editCoverImage}
    //       onClose={handleCoverImageEditClick}
    //       onUpdate={onUpdate}
    //     />
    //   )}
    //   {editAvatar && (
    //     <EditAvatar
    //       isOpen={editAvatar}
    //       onClose={handleAvatarEditClick}
    //       onUpdate={onUpdate}
    //     />
    //   )}
    //   {showFollowerBox && (
    //     <FollowerBox
    //       isOpen={showFollowerBox}
    //       onUpdate={onUpdate}
    //       onClose={toggleFollowerBox}
    //       data={subscriber.subscriber}
    //     />
    //   )}
    //   {showFollowingBox && (
    //     <FollowingBox
    //       isOpen={showFollowingBox}
    //       onClose={toggleFollowingBox}
    //       onUpdate={onUpdate}
    //       data={subscribedTo.channelSubscribedTo}
    //     />
    //   )}
    // </div>

    <div className="w-full bg-background-primary h-screen items-center justify-center p-4 overflow-y-scroll">
      <div className="w-full h-full flex flex-col items-center justify-start">
        {/* Cover Image Section */}
        <div className="relative w-full sm:w-3/4 mt-10 px-4 sm:px-0 group">
          <img
            src={data?.coverImage}
            alt="YouTube Channel Banner"
            className="w-full h-[30vw] sm:h-[15vw] object-cover rounded-xl"
          />
          <div
            title="update-cover-image"
            className="bg-background-secondary p-2 rounded-full cursor-pointer absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <CiEdit
              onClick={handleCoverImageEditClick}
              className="text-main-text text-3xl font-light rounded-full"
            />
          </div>
        </div>

        {/* Profile Section */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start w-full sm:w-3/4 mt-6 px-4 sm:px-0 gap-5">
          <div className="relative w-[100px] sm:w-[150px] h-[100px] sm:h-[150px]">
            <img
              src={data?.avatar}
              alt="Profile"
              className="w-full h-full rounded-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 z-10">
              <CiEdit
                onClick={handleAvatarEditClick}
                className="text-main-text text-3xl font-light rounded-full"
              />
            </div>
          </div>
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl font-bold text-main-text">
              {data?.username}
            </h1>
            <h3 className="text-lg sm:text-xl font-semibold text-secondary-text">
              {data?.email}
            </h3>
            <div className="flex gap-4 mt-2">
              <button
                onClick={() => toggleFollowerBox()}
                className="text-gray-500 text-lg text-secondary-text hover:text-main-text"
              >
                Followers: <span>{subscriber?.subscriberCount}</span>
              </button>
              <button
                onClick={() => toggleFollowingBox()}
                className="text-gray-500 text-lg text-secondary-text hover:text-main-text"
              >
                Following: <span>{subscribedTo.subscribedToCount}</span>
              </button>
            </div>
            <button className="flex items-center justify-center gap-1 text-blue-500 underline cursor-pointer text-secondary-text mt-2">
              Change Password <RiLockPasswordFill />
            </button>
          </div>
        </div>

        {/* Profile Tabs */}
        <div className="w-full sm:w-3/4 flex items-center justify-center sm:justify-start mt-6 px-4 sm:px-0">
          <ul className="flex gap-6">
            {userProfileSection.map((curr, i) => (
              <li key={i}>
                <button
                  onClick={() => setSelectUserProfileSection(curr.name)}
                  className={`text-lg font-semibold ${
                    selectUserProfileSection === curr.name
                      ? "text-main-text underline"
                      : "text-secondary-text"
                  }`}
                >
                  {curr.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Profile Section Content */}
        <div className="w-full sm:w-3/4 mt-6">{renderProfileSection()}</div>
      </div>

      {/* Modals */}
      {editCoverImage && (
        <EditCoverImage
          isOpen={editCoverImage}
          onClose={handleCoverImageEditClick}
          onUpdate={onUpdate}
        />
      )}
      {editAvatar && (
        <EditAvatar
          isOpen={editAvatar}
          onClose={handleAvatarEditClick}
          onUpdate={onUpdate}
        />
      )}
      {showFollowerBox && (
        <FollowerBox
          isOpen={showFollowerBox}
          onUpdate={onUpdate}
          onClose={toggleFollowerBox}
          data={subscriber.subscriber}
        />
      )}
      {showFollowingBox && (
        <FollowingBox
          isOpen={showFollowingBox}
          onClose={toggleFollowingBox}
          onUpdate={onUpdate}
          data={subscribedTo.channelSubscribedTo}
        />
      )}
    </div>
  );
};

export default Channel;
