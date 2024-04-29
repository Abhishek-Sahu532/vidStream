import { SuggestionCard } from "../../Components/Suggestioncard";
import { VideoPlayer } from "../../Components/VideoPlayer";

export const VideoDetails = () => {
  return (
    <div>
    <div className="p-8 mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4">
    <div className="col-span-2">
    <VideoPlayer />
    </div>
     <div className="col-span-2 md:col-span-1 ">
     <SuggestionCard  />
      <SuggestionCard  />
      <SuggestionCard  />
      <SuggestionCard  />
      <SuggestionCard  />
     </div>
     
    </div>
   
    </div>
  );
};
