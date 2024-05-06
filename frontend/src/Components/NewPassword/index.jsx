import React from "react";
// import { Heading, Button, Input, Img, Text } from "../../components";
// import { default as ModalProvider } from "react-modal";

import {
  Card,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";
export const NewPassword = () => {
  return (
    <Card className="w-96 mx-auto  mt-24">
      <div className="flex flex-col items-center justify-center w-full p-[29px] border-blue_gray-100_01 border border-solid bg-white-A700 rounded-[10px]">
        <div className="flex flex-col items-center justify-start w-full mt-2.5 mb-[7px] gap-[31px]">
          <div className="flex flex-row justify-center w-full">
            <div className="flex flex-col items-center justify-start w-full gap-6">
              <div className="flex flex-col items-start justify-start w-full gap-3.5">
                <div className="flex flex-row justify-between items-center w-full">
                  <Typography className="text-2xl tracking-[-0.72px]">
                    New Password
                  </Typography>
                </div>
                <p className="!text-gray-900">Enter your new password</p>
              </div>
              <Input
                type="password"
                name="newpassword"
                placeholder="Password"
                label="Password"
                // prefix={<Img src="images/img_icon_20px_lock.svg" alt="icon / 20px / lock " />}
                // suffix={<Img src="images/img_icon_20px_eyehide.svg" alt="icon / 20px / eye-hide" />}
                className="w-full gap-3.5 font-semibold border-blue_gray-100_01 border border-solid"
              />
              <Input
                type="password"
                name="newpassword"
                label="Re-New Password"
                placeholder="Re-New Password"
                // prefix={<Img src="images/img_icon_20px_lock.svg" alt="icon / 20px / lock " />}
                // suffix={<Img src="images/img_icon_20px_eyehide.svg" alt="icon / 20px / eye-hide" />}
                className="w-full gap-3.5 font-semibold border-blue_gray-100_01 border border-solid"
              />
            </div>
          </div>
          <Button  className="w-full font-bold">
            Update Password
          </Button>
        </div>
      </div>
    </Card>
  );
};
