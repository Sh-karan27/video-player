import React from "react";

const FollowerBox = ({ isOpen, onUpdate, onClose, data }) => {
  const handleClose = () => {
    onUpdate();
    onClose();
  };

  return isOpen ? (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 p-4">
      <div className="bg-background-secondary rounded-lg shadow-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center border-b border-secondary-text pb-4 mb-4">
          <h2 className="text-main-text text-lg font-semibold">Followers</h2>
          <button
            className="text-secondary-text hover:text-main-text transition-colors"
            onClick={handleClose}
          >
            ✕
          </button>
        </div>

        <div className="space-y-4">
          {data.map((curr) => (
            <div
              key={curr._id}
              className="flex items-center justify-between bg-background-primary p-4 rounded-lg shadow-md"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={curr.avatar}
                  alt="follower"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <span className="text-main-text font-medium">
                  {curr.username}
                </span>
              </div>
              <button
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  curr.subscribedToSubscriber
                    ? "bg-main-text text-background-primary hover:opacity-90"
                    : "bg-background-primary border border-main-text text-main-text hover:bg-main-text hover:text-background-primary"
                }`}
              >
                {curr.subscribedToSubscriber ? "Following" : "Follow"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  ) : null;
};

export default FollowerBox;