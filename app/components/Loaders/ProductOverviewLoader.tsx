const ProductOverviewLoader = () => {
  const productarray = ["", "", "", "", "", "", "", ""];
  return (
    <div className=" w-full  ">
      <div className="w-full gap-[2rem] flex md:flex-row flex-col justify-between mt-4">
        {/* Main Product Image */}
        <div className="w-[20rem] flex-shrink-0 md:max-w-[40%] overflow-hidden aspect-[1/1.2] rounded-[20px] bg-black/50 animate-pulse"></div>

        {/* Product Info */}
        <div className="flex flex-col w-full">
          <h1 className="text-2xl font-bold mb-4 w-[20rem]  bg-black/20 animate-pulse h-[2rem] max-w-[90%]"></h1>
          <div className="flex items-center gap-2">
            <p className="text-[18px] bg-black/20 h-[1.3rem] w-[30%] "></p>
            <p className="text-[18px] bg-black/20 h-[1.3rem] w-[50%] "></p>
          </div>

          {/* Support Images */}
          <div className="mt-5 flex flex-col gap-[1rem]">
            <p className="text-[18px] bg-black/20 h-[1.6rem] w-[40%] "></p>
            <div className="flex flex-wrap  gap-[1rem]">
              {productarray.map((img: any, i: number) => (
                <div
                  key={i}
                  className="size-[70px] animate-pulse  bg-black/20 rounded-[10px] overflow-hidden"
                ></div>
              ))}
            </div>{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductOverviewLoader;
