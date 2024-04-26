import {Advertisement }from "../../Components/Events"
import {VideoDetailsCard }from "../../Components/VideoDetailsCard"


const Root = () => {
  return (
    <div>
      <Advertisement />
      <div className="flex gap-10 p-8 flex-wrap justify-around ">
      <VideoDetailsCard />
      <VideoDetailsCard />
      <VideoDetailsCard />
      <VideoDetailsCard />
      </div>
    
    </div>
  )
}

export default Root
