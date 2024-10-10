import React from "react";
import {
  Input,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { useCopyToClipboard } from "usehooks-ts";
import { CheckIcon, DocumentDuplicateIcon } from "@heroicons/react/24/outline";
import { IoMdClose } from "react-icons/io";
import { useParams } from "react-router-dom";


export function ShareComponent({ open, handleClose }) {
  const [value, copy] = useCopyToClipboard();
  const [copied, setCopied] = React.useState(false);

  const {id} = useParams()
  const [inputValue, setInputValue] = React.useState(
    `https://vid-stream-client.vercel.app/video/${id}`
  );
  return (
    <Dialog className="flex justify-between "
      open={open}
      onClose={handleClose}
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
    >
      <DialogHeader className="" onClick={handleClose}>
        <IoMdClose />
      </DialogHeader>
      <DialogBody className="flex items-center gap-4">
        <div className="w-56">
          <Input
            value={inputValue}
            type="text"
            className="!border w-60 !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
            labelProps={{
              className: "hidden",
            }}
            containerProps={{ className: "min-w-[100px]" }}
          />
        </div>
        <Button
          size="md" 
          variant="outlined"
          onMouseLeave={() => setCopied(false)}
          onClick={() => {
            copy(inputValue);
            setCopied(true);
          }}
          className="flex items-center gap-2 bg-gradient text-white/90"
        >
          {copied ? (
            <>
              <CheckIcon className="h-4 w-4 text-white" />
              Copied
            </>
          ) : (
            <>
              <DocumentDuplicateIcon className="h-4 w-4 text-white" />
              Copy
            </>
          )}
        </Button>
      </DialogBody>
      <DialogFooter onClick={handleClose}>
      <IoMdClose/>
      </DialogFooter>
    </Dialog>
  );
}
