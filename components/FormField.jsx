

const FormField = ({ labelName, placeholder, isTextArea, inputType, value, handleChange }) => {
  return (
    <div>
        <label className="flex-1 w-full flex flex-col">
            {labelName && (<span className="font-epilogue font-medium text-[14px] leading-[22px]
            text-[#ffffff] mb-[10px]">{labelName}</span>)}

            {isTextArea ? (
                <textarea
                    required
                    value={value}
                    onChange={handleChange}
                    rows={10}
                    placeholder={placeholder}
                    className="py-[15px] px-[25px] outline-none border-[1px] border-t-0 border-l-0 border-[#3a3a43]
                    bg-transparent font-epilogue text-white text-[14px] placeholder:text-[#4b5264]
                    rounded-[10px] min-w-[300px]"
                />
            ) : (
                <input
                    required
                    value={value}
                    onChange={handleChange}
                    type={inputType}
                    placeholder={placeholder}
                    step="0.1"
                    className="py-[15px] px-[25px] outline-none border-[1px] border-t-0 border-l-0 border-[#3a3a43]
                    bg-transparent font-epilogue text-white text-[14px] placeholder:text-[#4b5264]
                    rounded-[10px] min-w-[300px]"
                />
            )}
            
        </label>
    </div>
  )
}

export default FormField;