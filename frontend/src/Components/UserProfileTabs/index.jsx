import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import { useState, useEffect } from "react";
import { VideoPlayerForProfilePage } from "../VideoPlayerForProfilePage";

export function UserProfileTabs({ userVideos }) {
  const [selectedTab, setSelectedTab] = useState("home");
  const [videos, setVideos] = useState(userVideos);

  const [isLoading, setIsLoading] = useState(false);
  console.log(videos);
  const data = [
    {
      label: "Home",
      value: "home",
      desc: () => (
        <>
          <h2>Home Tab</h2>
          <p>
            It really matters and then like it really doesn't matter. What
            matters is the people who are sparked by it. And the people who are
            like offended by it, it doesn't matter.
          </p>
        </>
      ),
    },
    {
      label: "Videos",
      value: "videos",
      desc: () => (
        <div className="flex gap-4 flex-wrap "> 
        {videos?.length ? 
        (
          <>
          {videos?.map((video) => (
            <VideoPlayerForProfilePage vid={video} />
          ))}
          </>
        )   : <div>No videos found</div>
        }
         
        
        </div>
      ),
    },
    {
      label: "Playlist",
      value: "playlist",
      desc: () => <p>No playlist created.</p>,
    },
  ];
  return (
    <Tabs
      id="custom-animation"
      value="home"
    >
      <TabsHeader>
        {data.map(({ label, value }) => (
          <Tab key={value} value={value}>
            {label}
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody
        // animate={{
        //   initial: { y: 250 },
        //   mount: { y: 0 },
        //   unmount: { y: 250 },
        // }}
      >
        {data.map(({ value, desc }) => (
          <TabPanel key={value} value={value}>
            {desc()}
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
  );
}
