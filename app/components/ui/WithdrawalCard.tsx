
interface ChartProps {
    title: string;
    amount: string;
    text: string;
    chart?: string;
    style?: React.CSSProperties;
    style2?: React.CSSProperties;
    style3?: React.CSSProperties;
    style4?: React.CSSProperties;
    style5?: React.CSSProperties;
    handleClick?: (event: React.MouseEvent<HTMLElement>) => void
    rate: string;
    // icon:  React.ReactNode;
}
export default function WithdrawalCard({title, amount, text, chart, style, style2, style3, style4, style5, rate,handleClick}: ChartProps) {
    return (
        <div className="flex justify-between w-full rounded-[20px] tablet:" style={style3}>
           <div className="w-full justify-center flex py-[20px]  ">
           <div className="w-[85%] flex justify-between flex-col">
                <div className="flex justify-between">
                    <div>
                    <h1 className="text-[16px] font-medium" style={style4} >{title}</h1>
                    <p className="text-[24px] font-semibold" style={style5}>{amount}</p>
                    </div>
                    <div>{chart}</div>
                </div>
                <div className="flex justify-between mt-3">
                    <div style={style} onClick={handleClick}>{text}</div>
                    <div style={style2}>{rate}</div>
                </div>
            </div>
           </div>
        </div>
    )
}