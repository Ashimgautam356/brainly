import { Button } from "../components/Button"
import { ShareIcon } from "../icons/ShareIcon"
import { PlusIcon } from "../icons/PlusIcon"
import { useOutletContext } from "react-router-dom"
import { Card } from "../components/Card"
import { useContent } from "../hooks/useContent"
import { ResposeType } from "../hooks/useContent"

type OutletContextType = {
  setSharelink: React.Dispatch<React.SetStateAction<boolean>>;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const TwitterPage = () => {
    const{setSharelink,setModalOpen}:OutletContextType = useOutletContext()
    const userContent = useContent().filter(content=>content.type =='twitter')
  return (
 <>
     <div className="flex flex-row justify-between items-center py-12">
       <div className="text-3xl font-bold">
        Twitter Notes
       </div>
       <div className=" flex">
         <div className="mr-4">
           <Button variants="secondary" size="md" text="Share" startIcon={<ShareIcon size="md" />} onClick={() => { setSharelink(true) }}></Button >
 
         </div>
         <Button variants="primary" size="md" text="Add Content" startIcon={<PlusIcon size="md" />} onClick={() => { setModalOpen(true) }}></Button>
       </div>
     </div>
 
   {/* contents */ }
   <div className="flex gap-8 flex-row flex-wrap ">
     {
       userContent?.map((contents: ResposeType) => {
 
         return (
           <Card date={contents?.date} title={(contents?.title)} type={(contents?.type)} link={contents?.link} key={contents?._id} id={contents._id}></Card>
         )
       })
     }
   </div>
   </>
  )
}
