import { loader } from "@public/assets/icons";
import Image from "@node_modules/next/image";

const Loading = () => {
  return (
    <div className="h-screen
    items-center justify-center">
      <Image src={loader} alt='loader' width={350} height={350} 
        className={'object-contain'} />
    </div>
  )
}

export default Loading;