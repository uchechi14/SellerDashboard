/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { supabase } from "@/app/utils/superBaseClient";
import { useState, useRef, useEffect } from "react";

const ColorDropdown = () => {
  const [colors, setColors] = useState<any>([]);
  const [searchColor, setSearchColor] = useState("");
  const [selectedColor, setSelectedColor] = useState("Select a color");
  const [isColorDropdownOpen, setIsColorDropdownOpen] = useState(false);
  const colorDropdownRef = useRef(null);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase.from("cubby_color").select("*");

      if (error) {
        console.error("Error fetching colors:", error);
      }
      console.log(data);

      setColors(data);
    };

    fetchCategories();
  }, []);

  // Filter Colors for Search
  const filteredColors = colors.filter((color: any) =>
    color.color_name.toLowerCase().includes(searchColor.toLowerCase())
  );

  // Handle Color Selection
  const handleColorSelect = (color: any) => {
    setSelectedColor(color);
    setIsColorDropdownOpen(false);
    setSearchColor("");
  };

  return (
    <div className="mt-5 relative">
      <p className="text-[18px] text-black opacity-[50%] mt-2">Select Color</p>
      <button
        className="w-full p-3 border rounded-lg bg-[#e0e0e0] text-black text-left"
        onClick={() => setIsColorDropdownOpen(!isColorDropdownOpen)}
        type="button"
      >
        {selectedColor}
      </button>

      {isColorDropdownOpen && (
        <div
          ref={colorDropdownRef}
          className="absolute w-full mt-2 bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto z-10"
        >
          <input
            type="text"
            placeholder="Search color..."
            value={searchColor}
            onChange={(e) => setSearchColor(e.target.value)}
            className="w-full p-2 border-b rounded-t-md text-black"
          />
          <ul className="max-h-40 overflow-y-auto">
            {filteredColors.length > 0 ? (
              filteredColors.map((color: any) => (
                <li
                  key={color.id}
                  onClick={() => handleColorSelect(color.color_name)}
                  className="p-3 cursor-pointer hover:bg-gray-200"
                >
                  {color.color_name}
                </li>
              ))
            ) : (
              <li className="p-3 text-gray-500">No color found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ColorDropdown;
