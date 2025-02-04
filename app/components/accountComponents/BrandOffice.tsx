import { LuPlus } from "react-icons/lu";
import { MdErrorOutline } from "react-icons/md";

type props = {
  setStep: React.Dispatch<React.SetStateAction<number>>;
};

const BrandOffice = ({ setStep }: props) => {
  return (
    <form>
      <div className="w-full bg-white rounded-[12px] flex gap-3 px-3 py-3">
        <MdErrorOutline className="text-[25px]" />
        <p className="text-[13px]">
          Step 3 and 4 is optional and can be skipped, upon filling this and
          submitting you are eligible to be verified as a seller and improve
          your chance of sales
        </p>
      </div>
      <p className="text-[15px] mt-5">BRAND OFFICE PICTURES</p>
        <div className="grid grid-cols-3 gap-3 w-full items-center mt-[10px]" >
          <label
            className="aspect-[1/1] bg-[#F3F3F3] rounded-[1] flex justify-center items-center md:aspect-[1/0.4] md:rounded-[20px]  mobile:w-full"
            htmlFor="upload-button"
          >
            <input type="file" id="upload-button" className="hidden" />
            <div className="flex justify-center items-center  text-[25px] ">
              <LuPlus />
            </div>
          </label>
          <label
            className="aspect-[1/1] mt-[10px] bg-[#F3F3F3] r flex justify-center items-centerounded-[1] md:aspect-[1/0.4] md:rounded-[20px]  mobile:w-full"
            htmlFor="upload-button"
          >
            <input type="file" id="upload-button" className="hidden" />
            <div className="flex justify-center items-center  text-[25px] ">
              <LuPlus />
            </div>
          </label>
          <label
            className="aspect-[1/1] mt-[10px] bg-[#F3F3F3] r flex justify-center items-centerounded-[1] md:aspect-[1/0.4] md:rounded-[20px]  mobile:w-full"
            htmlFor="upload-button"
          >
            <input type="file" id="upload-button" className="hidden" />
            <div className="flex justify-center items-center  text-[25px] ">
              <LuPlus />
            </div>
          </label>
        </div>
        <div>
  
     
      </div>
      <div className="mt-[25px] ">
        <p className="text-[15px] mt-3">BRAND RESIDENTIAL DETAILS</p>
        <div className="grid md:grid-cols-2 gap-4 mt-2">
          <input
            placeholder="Street name"
            autoComplete="street-address"
            type="text"
            className="w-full bg-[white] border outline-none border-black px-[10px] rounded-[15px] h-[4rem] focus:border-opacity-70 border-opacity-30 transition duration-300 "
          />

          <input
            placeholder="Street number"
            autoComplete="street-address"
            type="text"
            className="w-full bg-[white] border outline-none border-black px-[10px] rounded-[15px] h-[4rem] focus:border-opacity-70 border-opacity-30 transition duration-300 "
          />

          <input
            placeholder="Street number"
            autoComplete="street-address"
            type="text"
            className="w-full bg-[white] border outline-none border-black px-[10px] rounded-[15px] h-[4rem] focus:border-opacity-70 border-opacity-30 transition duration-300 "
          />
          <select className="w-full bg-[white] border outline-none border-black px-[10px] rounded-[15px] h-[4rem] focus:border-opacity-70 border-opacity-30 transition duration-300 text-black text-opacity-[50%]">
            <option className="">Country</option>
            <option>hhh</option>
            <option>hhh</option>
          </select>
        </div>
      </div>
      <div className="flex justify-between mt-20 text-sm">
        <button
          className="px-[25px] py-[10px] rounded-[35px] uppercase border border-black hover:opacity-[80%] transition-all ease-in-out duration-300"
          onClick={() => {
            setStep((prev) => prev - 1);
          }}
        >
          Back
        </button>
        <button
          className="px-[25px] py-[10px] hover:opacity-[80%] transition-all ease-in-out duration-300 rounded-[35px] uppercase  text-white bg-black"
          onClick={() => {
            setStep((prev) => prev + 1);
          }}
        >
          Next
        </button>
      </div>
    </form>
  );
};

export default BrandOffice;
