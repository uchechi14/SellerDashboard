// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Spinner = ({ bg }: any) => {
    return (
      <div
        style={{ borderTopColor: bg }}
        className={`inline-block h-[60%] aspect-square  border-[3px] ${
          bg == "white" ? "border-[gray] border-t-[white]" : ""
        } rounded-full animate-spin`}
      ></div>
    );
  };
  
  export default Spinner;