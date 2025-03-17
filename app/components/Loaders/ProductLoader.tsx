const ProductsItems = ["", "", "", "", "", ""];

const ProductLoader = () => {
  return (
    <div className="w-full grid grid-cols-cardGrid gap-4">
      {ProductsItems.map((item, index) => (
        <div
          className="w-full  flex justify-center relative bg-[#] rounded-[20px] py-3"
          key={index}
        >
          <div className="w-[93%]  flex flex-col gap-[1.6rem] relative">
            <div className="w-full bg-black/50 animate-pulse  aspect-square  rounded-[20px]  overflow-hidden"></div>
            <div className="border-black/60 border  backdrop-blur-md absolute flex h-[2.5rem] w-[6rem] top-[1rem] animate-pulse bg-black/60 left-[1rem] justify-center items-center rounded-full gap-2"></div>
            <div className="">
              <div className="flex justify-between">
                <p className="text-[13px] w-[50%] animate-pulse bg-black/50"></p>
                <div>
                  <div className="px-[13px] text-white animate-pulse w-[6rem] h-[2.5rem] py-[5px] bg-[#0171E3] text-[13px] rounded-full"></div>
                </div>
              </div>
              <div className="flex justify-between items-center mt-3">
                <p className="text-[13px] h-[1.5rem] w-[30%] animate-pulse bg-black/30"></p>
                <p className="text-[13px] h-[1.5rem] w-[30%] animate-pulse bg-black/60"></p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default ProductLoader;
