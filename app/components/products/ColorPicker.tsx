import { useState } from "react"
import ImageInput from "./ImageInput"
import {  CirclePicker  } from "react-color"


export default function ColorPicker () {
    

      const [inputValue, setInputValue] = useState<string>("")
       const [selectColor, setSelectColor] = useState<string>('#fff')
       
       const customColors= ["#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF", "#00FFFF"]
    
    
       const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const color = e.target.value.trim().toLowerCase()
        setInputValue(color)
    
        if(isValidColor(color)) {
            setSelectColor(color)
        }
       }
    
       const isValidColor = (color: string): boolean => {
        const s = new Option().style;
        s.color = color;
        return !!s.color;
    };
      
      
    interface ColorResult {
        hex: string;
        // other properties that might come from your color picker
    }
    
    const handleChangeColor = (color: ColorResult) => {
        setSelectColor(color.hex)
        setInputValue(color.hex)
    }


    return(
        <>
        <div className="flex flex-col ">
          <ImageInput/>
          <CirclePicker 
                                width={150}
                                colors={customColors}
                                circleSize={36}
                                circleSpacing={10}
                                className="mt-4" color = {selectColor} onChangeComplete={handleChangeColor} />
                                <input type="text" value={inputValue} onChange={handleInputChange} className="w-[170px] mt-2 border-2 outline-none px-2 rounded-md py-1 border-[#E9E9E9]" />
                                <p>Selected Color: <span style={{ color: selectColor }}>{selectColor}</span></p>
                                
                                </div>                 
                            </>
    )
}