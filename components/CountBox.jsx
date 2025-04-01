

const CountBox = ({ title, value }) => {
  return (
    <div className="flex flex-col items-center w-[150px]">
      <h4 className="font-epilogue font-bold text-[30px] text-[#ffffff] p-3 bg-[#0c0a09] rounded-t-[10px] w-full text-center truncate">{value}</h4>
      <p className="font-epilogue font-normal text-[16px] text-[#cfd0d8] bg-[#000000] px-3 py-2 w-full rouned-b-[10px] text-center">{title}</p>
    </div>
  )
}
  
  export default CountBox;