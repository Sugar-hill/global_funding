

const CountBox = ({ title, value }) => {
    return (
      <div className="flex flex-col items-center w-[98px]"> 
        <h4 className="font-epilogue font-bold text-[12px] text-white p-2 bg-[#1c1c24]
        rounded-t-[10px] w-full text-center truncate"> {value} </h4>
        <p className="font-epilogue font-normal text-[11px] text-[#808191] bg-[#28282e]
        px-2 py-1 w-full rounded-b-[10px] text-center"> {title} </p>
      </div>
    )
  }
  
  export default CountBox;