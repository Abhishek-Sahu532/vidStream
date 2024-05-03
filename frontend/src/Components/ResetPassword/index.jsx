import React from "react";
import { Heading, Button, Input, Img, Text } from "../../components";
import { default as ModalProvider } from "react-modal";

export default function ResetPassword({ isOpen, ...props }) {
  return (
    <ModalProvider {...props} appElement={document.getElementById("root")} isOpen={isOpen} className="min-w-[480px]">
      <div className="flex flex-col items-center justify-center w-full p-[29px] border-blue_gray-100_01 border border-solid bg-white-A700 rounded-[10px]">
        <div className="flex flex-col items-center justify-start w-full gap-[31px] my-[9px]">
          <div className="flex flex-row justify-center w-full">
            <div className="flex flex-col items-center justify-start w-full gap-[22px]">
              <div className="flex flex-col items-center justify-start w-full gap-2">
                <div className="flex flex-row justify-between items-center w-full">
                  <Heading size="3xl" as="h1" className="tracking-[-0.72px]">
                    Reset Password
                  </Heading>
                  <Button size="sm" shape="square" className="w-[30px]">
                    <Img src="images/img_icon_24px_close.svg" />
                  </Button>
                </div>
                <Text as="p" className="!text-gray-900">
                  Enter the email address associated with your account and we&#39;ll send you a link to reset your
                  password.
                </Text>
              </div>
              <Input
                type="email"
                name="password"
                placeholder="user / email address"
                prefix={<Img src="images/img_icon_24px_email.svg" alt="icon / 24px / email" />}
                className="w-full gap-3.5 font-semibold border-blue_gray-100_01 border border-solid"
              />
            </div>
          </div>
          <div className="flex flex-col items-center justify-start w-full gap-[18px]">
            <Button size="4xl" className="w-full font-bold">
              Get OTP
            </Button>
            <Button
              color="white_A700"
              size="2xl"
              className="w-full text-gray-900 font-bold border-gray-600_02 border border-solid"
            >
              Return to sign in
            </Button>
          </div>
          <div className="h-px w-full bg-blue_gray-100_01" />
          <div className="flex flex-row justify-center w-full gap-2">
            <a href="#" className="ml-[25px]">
              <Heading size="lg" as="h2" className="!text-gray-600_02 tracking-[-0.40px] text-center">
                Don’t have an account?
              </Heading>
            </a>
            <a href="#" className="mr-[25px]">
              <Heading size="lg" as="h3" className="tracking-[-0.40px]">
                Create Account
              </Heading>
            </a>
          </div>
        </div>
      </div>
    </ModalProvider>
  );
}
