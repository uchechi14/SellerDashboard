
interface ChartProps {
    title: string;
    amount: string;
    text: string;
    chart?: string;
    style?: React.CSSProperties;
    style2?: React.CSSProperties;
    rate: string;
    // icon:  React.ReactNode;
}
export default function Chart({title, amount, text, chart, style, style2, rate,}: ChartProps) {
    return (
        <div className="flex justify-between w-full ">
           <div className="w-full justify-center flex py-[20px] bg-white rounded-[20px] ">
           <div className="w-[85%] flex justify-between flex-col">
                <div className="flex justify-between">
                    <div>
                    <h1 className="text-[16px] font-medium">{title}</h1>
                    <p className="text-[24px] font-semibold">{amount}</p>
                    </div>
                    <div>{chart}</div>
                </div>
                <div className="flex justify-between mt-3">
                    <div style={style}>{text}</div>
                    <div style={style2}>{rate}</div>
                </div>
            </div>
           </div>
        </div>
    )
}