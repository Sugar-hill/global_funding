import { loader } from "@public/assets/icons";

const Load = () => {
  return (
    <div className="fixed inset-0 z-10 h-screen  bg-[#ffffff3f] flex
    items-center justify-center flex-col">
      <img src={loader} alt="loader" className="w-[100px] h-[100px] object-contain" />

      <p className="mt-[20px] font-epilogue font-bold text-[20px]
      text-black text-center">
        Transaction in progress <br /> Please wait...
      </p>
    </div>
  )
}

export default Load;