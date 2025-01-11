import Image from "next/image"
import girl from "../../../public/guy.jpeg"


const tableItems = [
    {
        name: 'Mens high neck black turtle polo shirt',
        price: 'N 23,000',
        trackingId: '#425t72',
        pendingSince: '14 November 2024',
        pendingTime: '14:32:43',
        quantity: '3pcs',
        orderDate: '14 November',
        orderTime: ' 2024 14:32:43',
        actions: [
            { label: 'Accept', className: 'bg-[#0171E3]', textColor: 'text-[white]' },
            { label: 'Reject', className: 'bg-[#000000]', textColor: 'text-[white]' }
        ]
    },
    {
        name: 'Mens high neck black turtle polo shirt',
        price: 'N 23,000',
        trackingId: '#425t72',
        pendingSince: '14 November 2024',
        pendingTime: '14:32:43',
        quantity: '3pcs',
        orderDate: '14 November',
        orderTime: ' 2024 14:32:43',
        actions: [
            { label: 'Accept', className: 'bg-[#0171E3]', textColor: 'text-[white]' },
            { label: 'Reject', className: 'bg-[#000000]', textColor: 'text-[white]' }
        ]
    },
    {
        name: 'Mens high neck black turtle polo shirt',
        price: 'N 23,000',
        trackingId: '#425t72',
        pendingSince: '14 November 2024',
        pendingTime: '14:32:43',
        quantity: '3pcs',
        orderDate: '14 November',
        orderTime: ' 2024 14:32:43',
        actions: [
            { label: 'Accept', className: 'bg-[#0171E3]', textColor: 'text-[white]' },
            { label: 'Reject', className: 'bg-[#000000]', textColor: 'text-[white]' }
        ]
    },
]


export default function NewOrderTable () {
    return (
        <div className="overflow-x-auto mt-4 bg-white rounded-[15px]">
        <table className="w-full min-w-[55rem] bg-white rounded-[15px]">
            <thead className="text-left rounded-sm border-b-[1px] border-b-[#D9D9D9]">
                <tr className="">
                    <td className="text-[13px] p-3">Product Name</td>
                    <td className="text-[13px] p-3">Price</td>
                    <td className="text-[13px] p-3">Tracking ID</td>
                    <td className="text-[13px] p-3">Pending Since</td>
                    <td className="text-[13px] p-3">Quantity</td>
                    <td className="text-[13px] p-3">Order date</td>
                    <td className="text-[13px] p-3">Actions</td>
                </tr>
            </thead>
            <tbody>
                {tableItems.map((items, index) => (
                     <tr key={index}>
                     <td className="p-3">
                         <div className="flex items-center gap-2 ">
                             <div>
                                 <Image src={girl} alt="cloth" className="w-[50px] h-[50px] rounded-[10px]" />
                             </div>
                             <p className="text-[12px] font-medium">{items.name}</p>
                         </div>
                     </td>
                     <td className="text-[12px] p-3 font-semibold">{items.price}</td>
                     <td className="p-3">
                         <div className="flex items-center px-[5px] gap-1 py-[7px]  justify-center rounded-[20px] bg-[#0171E308]">
                             <p className="text-[12px] font-medium">Product ID:</p>
                             <p className="px-[7px] py-[2px] bg-[#E1E3FF] text-[11px] rounded-[20px] text-[#0171E3]">{items.trackingId}</p>
                         </div>
                     </td>
                     <td className="p-3">
                         <div>
                             <p className="text-[12px] font-medium">{items.pendingSince}</p>
                             <p className="text-[12px] font-medium">{items.pendingTime}</p>
                         </div>
                     </td>
                     <td className="p-3">
                         <p className="text-[12px] font-medium">QTY: {items.quantity}</p>
                     </td>
                     <td className="p-3">
                     <div>
                             <p className="text-[12px] font-medium">{items.orderDate}</p>
                             <p className="text-[12px] font-medium">{items.orderTime}</p>
                         </div>
                     </td>
                     <td className="p-3 ">
                         <div className="flex items-center gap-2">
                         <button className="py-[10px] px-[10px] bg-[#0171E3] rounded-[18px] text-[white] text-[11px]">Accept</button>
                         <button className="py-[10px] px-[10px] bg-[#000000] rounded-[18px] text-[white] text-[11px]">Reject</button>
                        </div>
                     </td>
                 </tr>

                ))}
               
            </tbody>
        </table>
    </div>
    )
}