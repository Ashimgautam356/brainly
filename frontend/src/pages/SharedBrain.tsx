import { Button } from "../components/Button"
import { ShareIcon } from "../icons/ShareIcon"
import { useOutletContext} from "react-router-dom"
import { Card } from "../components/Card"
import { ResposeType } from "../hooks/useContent"
// import { useBrain } from "../hooks/useBrain"
import { useState } from "react"



type OutletContextType = {
    setSharelink: React.Dispatch<React.SetStateAction<boolean>>;
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  };

export const SharedBrain = () => {
     const{setSharelink}:OutletContextType = useOutletContext()
    const [linkContent,setLinkContet] = useState<any>({})
    //  const {shareId} = useParams()
    // const contents = useBrain(String(shareId)).then(resp => setLinkContet(resp))

      setLinkContet("")
  return (
    <>
     <div className="flex flex-row justify-between items-center py-12">
       <div className="text-3xl font-bold">
        {linkContent?.userName}'s Contents
       </div>
       <div className=" flex">
         <div className="mr-4">
           <Button variants="secondary" size="md" text="Share" startIcon={<ShareIcon size="md" />} onClick={() => { setSharelink(true) }}></Button >
 
         </div>
       </div>
     </div>
 
   {/* contents */ }
   <div className="flex gap-8 flex-row flex-wrap ">
     {
       linkContent?.content?.map((contents: ResposeType) => {
 
         return (
           <Card date={contents?.date} title={(contents?.title)} type={(contents?.type)} link={contents?.link} key={contents?._id} id={contents._id}></Card>
         )
       })
     }
   </div>
   </>
  )
}
