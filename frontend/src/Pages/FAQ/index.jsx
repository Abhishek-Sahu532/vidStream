import React, {useState} from 'react';
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from '@material-tailwind/react';

export const FaqPage = () => {

    const [open, setOpen] =useState(1);
 
    const handleOpen = (value) => setOpen(open === value ? 0 : value);
   
  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Vidstream FAQ</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">General</h2>
            
            <Accordion open={open === 1} className="mb-4">
              <AccordionHeader onClick={() => handleOpen(1)}>What is Vidstream?</AccordionHeader>
              <AccordionBody>
                Vidstream is a video streaming platform that allows users to
                upload, share, and watch videos online, similar to YouTube.
              </AccordionBody>
            </Accordion>
            <Accordion open={open === 2}className="mb-4">
             <AccordionHeader onClick={() => handleOpen(2)}>Is Vidstream free to use?</AccordionHeader>
              <AccordionBody>
                Yes, Vidstream is completely free for all users to upload and
                watch videos.
              </AccordionBody>
            </Accordion>
            <Accordion open={open === 3}className="mb-4">
             <AccordionHeader onClick={() => handleOpen(3)}>Do I need to create an account?</AccordionHeader>
              <AccordionBody>
                While you can watch videos on Vidstream without an account,
                creating a free account allows you to upload videos, comment,
                and subscribe to channels.
              </AccordionBody>
            </Accordion>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Uploading Videos</h2>
            <Accordion open={open === 4}className="mb-4">
             <AccordionHeader onClick={() => handleOpen(4)}>
                What types of videos can I upload?
              </AccordionHeader>
              <AccordionBody>
                You can upload most video file formats, including MP4, AVI,
                MOV, and more. However, all uploaded content must comply with
                Vidstream's community guidelines.
              </AccordionBody>
            </Accordion>
            <Accordion open={open === 5}className="mb-4">
             <AccordionHeader onClick={() => handleOpen(5)}>
                Is there a limit on video length or size?
              </AccordionHeader>
              <AccordionBody>
                There is no strict limit on video length, but longer videos may
                take more time to process and upload. The maximum file size for
                uploads is 128GB.
              </AccordionBody>
            </Accordion>
            <Accordion open={open === 6}className="mb-4">
             <AccordionHeader onClick={() => handleOpen(6)}>How do I upload a video?</AccordionHeader>
              <AccordionBody>
                To upload a video, simply sign in to your Vidstream account,
                click on the "Upload" button, select the video file from your
                computer, and follow the on-screen instructions.
              </AccordionBody>
            </Accordion>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Watching Videos</h2>
            <Accordion open={open === 7}className="mb-4">
             <AccordionHeader onClick={() => handleOpen(8)}>
                How do I search for videos on Vidstream?
              </AccordionHeader>
              <AccordionBody>
                You can use the search bar at the top of the Vidstream website
                to search for videos by title, tags, or keywords.
              </AccordionBody>
            </Accordion>
            <Accordion open={open === 8}className="mb-4">
             <AccordionHeader onClick={() => handleOpen(8)}>Can I create playlists?</AccordionHeader>
              <AccordionBody>
                Yes, with a Vidstream account, you can create custom playlists
                to organize and watch your favorite videos.
              </AccordionBody>
            </Accordion>
            <Accordion open={open === 9}className="mb-4">
             <AccordionHeader onClick={() => handleOpen(9)}>Can I watch videos offline?</AccordionHeader>
              <AccordionBody>
                Vidstream does not currently offer an offline viewing mode, but
                you can download certain videos for offline viewing using
                third-party tools (subject to copyright restrictions).
              </AccordionBody>
            </Accordion>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">
              Monetization and Copyright
            </h2>
            <Accordion open={open === 10}className="mb-4">
             <AccordionHeader onClick={() => handleOpen(10)}>
                Can I monetize my videos on Vidstream?
              </AccordionHeader>
              <AccordionBody>
                Vidstream offers a Partner Program that allows eligible creators
                to earn revenue from advertisements displayed on their videos.
              </AccordionBody>
            </Accordion>
            <Accordion open={open === 11}className="mb-4">
             <AccordionHeader onClick={() => handleOpen(11)}>
                What are Vidstream's copyright policies?
              </AccordionHeader>
              <AccordionBody>
                Vidstream respects intellectual property rights and has strict
                policies against copyright infringement. Users who repeatedly
                violate copyright may have their accounts terminated.
              </AccordionBody>
            </Accordion>
            <Accordion open={open === 12}className="mb-4">
             <AccordionHeader onClick={() => handleOpen(12)}>
                How do I report copyright violations?
              </AccordionHeader>
              <AccordionBody>
                If you believe your copyrighted work has been uploaded to
                Vidstream without permission, you can submit a copyright
                infringement notice through our online reporting system.
              </AccordionBody>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
};
