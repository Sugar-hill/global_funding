

const CustomButton = ({ btnType, title, styles,
    handleClick }) => {
  return (
    <div>
        <button 
            type={btnType}
            className={` font-epilogue font-semibold text-[16px] 
               leading-[26px] text-white min-h-[40px] px-4
               rounded-[10px] ${styles}`}
            onClick={handleClick}
        >
            {title}
        </button>
    </div>
  )
}

export default CustomButton; 