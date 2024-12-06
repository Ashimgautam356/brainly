import { DeleteIcon } from "../icons/DeleteIcon"
import { ShareIcon } from "../icons/ShareIcon"
import { TwitterIcon } from "../icons/TwitterIcon"
import { YouttubeIcon } from "../icons/YouttubeIcon"

interface CardProps{
  title: string,
  link?: string,
  type:  "youtube"| "twitter",
  description?: string,
  tags?: [string], 
  time?: TimeRanges
}

const iconTypeStyle ={
  "youtube":<YouttubeIcon size="sm"></YouttubeIcon>,
  "twitter":<TwitterIcon size="sm"></TwitterIcon>
}

export const Card = ({title,link,type}:CardProps) => {

  // extracting the link id from the user's url
  const orginalLink = link as string
  const getVideoId = (link: string): string | null => {
    const match = link.match(/v=([^&]+)/); 
    return match ? match[1] : null; 
  };


  const videoId = type === "youtube" ? getVideoId(orginalLink) : null;
  return (
    <div className=" relative p-4 min-h-[25rem] bg-white rounded-lg border max-w-72 border-gray-200">
      <div className="flex flex-row justify-between">
        <div className=" flex items-center text-md">
          <div className="text-gray-500 pr-2">
            {iconTypeStyle[type]}
          </div>
          <div className="font-medium text-medium">
            {title}
          </div>
        </div>
        <div className=" flex items-center">
          <div className="pr-2 text-gray-500">
          <ShareIcon size="sm"></ShareIcon>
          </div>

          <div className="text-gray-500">
          <DeleteIcon size="sm"></DeleteIcon>
          </div>
        </div>
      </div>

      <div className="pt-4 relative max-h-72 overflow-hidden">
        {
          type == "youtube" && <iframe 
          className="w-full" 
          src={`https://www.youtube.com/embed/${videoId}`} 
          title="video" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          referrerPolicy="strict-origin-when-cross-origin" 
          allowFullScreen>

          </iframe>
        }
      

      {type == "twitter" && <blockquote className="twitter-tweet">
          <a href={link}></a> 
        </blockquote> }
        
      </div>

      <div className="flex mt-4 justify-around">
          <p className="bg-purple-200 text-purple-600 rounded-lg px-2 text-sm font-medium">#productivity</p>
          <p className="bg-purple-200 text-purple-600 rounded-lg px-2 text-sm font-medium">#ideas</p>
      </div>
      <div className="flex mt-5">
        <p className="text-gray-500 text-normal">Added on 10/03/2024</p>
      </div>
    </div>
  )
}
