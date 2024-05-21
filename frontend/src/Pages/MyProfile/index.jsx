import React, { useEffect, useState } from "react";
import { UserProfileTabs } from "../../Components/UserProfileTabs";
import { Button } from "@material-tailwind/react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { UpdateProfileDialogBox } from "../../Components/UpdateProfileDialogBox";
import Title from "../../Title";
import { Loader } from "../../Components/Loader";

export const MyProfile = () => {
  const { loading, user } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  useEffect(() => {}, [user]);
  return (
    <section className="w-full overflow-hidden dark:bg-gray-900 mt-20">
      {loading ? (
        <Loader />
      ) : (
        <>
          <Title title={user.fullname} />
          {/* COVER IMAGE */}

          <div className="bg-cover  ">
            <img
              src={
                user && user.coverImage
                  ? user.coverImage
                  : "https://yt3.ggpht.com/HR5bTyedjHyoOd9h2zty2OAqZ3MFM6T7_R48jhdd2rQE2aSPHOD2B-ibdv-yLSTy4_AAF6XdoCk=w2560-fcrop64=1,00005a57ffffa5a8-nd-c0xffffffff-rj-k-no"
              }
              alt="banner"
              className="w-full h-44"
            />
          </div>
          {/* PROFILE CONTAINER */}

          <div className="-mt-1 bg-grey-lighter">
  <div className="container mx-auto px-4 sm:px-16">
    <div className="flex flex-col sm:flex-row justify-between items-center py-4">
      <div className="flex items-center mb-4 sm:mb-0">
        <img className="w-16 h-16 sm:w-24 sm:h-24 rounded-full" src={user.avatar} />
        <div className="ml-4 sm:ml-6">
          <div className="text-xl sm:text-2xl font-normal flex items-center">
            <span className="mr-2">{user.fullname}</span>
            <span className="w-3 h-3 text-white inline-block text-center rounded-full bg-grey-dark text-2xs">
              &#10003;
            </span>
          </div>
          <p className="mt-2 font-hairline text-xs sm:text-sm">
            126,014 subscribers
          </p>
        </div>
      </div>
      <div className="text-grey-dark flex flex-col sm:flex-row md:flex-row items-center mt-4 sm:mt-0">
  <Button
    className="rounded-md appearance-none px-3 py-2 bg-blue-gray-400 uppercase text-grey-darker text-xs sm:text-sm font-semibold mb-2 sm:mb-0 sm:mr-4"
    onClick={handleOpen}
    variant="gradient"
  >
    Update Profile
  </Button>
  <UpdateProfileDialogBox
    open={open}
    handleClose={handleClose}
  />
  <Link to="/user-videos">
    <Button className="rounded-md appearance-none px-3 py-2 bg-blue-gray-400 uppercase text-grey-darker text-xs sm:text-sm font-semibold">
      Manage Videos
    </Button>
  </Link>
</div>

    </div>
  </div>
</div>

        </>
      )}

      <div className="w-full sm:w-[70%] mt-4 sm:mt-0">
                <UserProfileTabs />
              </div>
    </section>
  );
};
