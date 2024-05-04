import { useSelector } from "react-redux"
import {Advertisement }from "../../Components/Events"
import {VideoDetailsCard }from "../../Components/VideoDetailsCard"


const Root = () => {

  const {loading, videos} = useSelector((state) => state.videos)
  console.log(videos)
  return (
    <div>
      <Advertisement />
      <div className="flex gap-10 p-8 flex-wrap justify-around ">
      {
        video && video.map((vid, index)=>(
          <VideoDetailsCard vid={vid}  key={index}/>
        ))
      }
      
      {/* <VideoDetailsCard />
      <VideoDetailsCard />
      <VideoDetailsCard /> */}
      </div>
    
    </div>
  )
}

export default Root
