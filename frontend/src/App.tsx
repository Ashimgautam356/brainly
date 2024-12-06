import{ Button} from "./components/Button"
import { PlusIcon } from "./icons/PlusIcon"
import { ShareIcon } from "./icons/ShareIcon"


export const App = () => {
  return (
    <div>
      <Button variants="primary" size="md" text="Add Content" startIcon={<PlusIcon  size="md"/>}></Button>
      <Button variants="secondary" size="md" text="Share" startIcon={<ShareIcon  size="md"/>}></Button>
    </div>
  )
}
