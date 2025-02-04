import Image from "next/image"
import girl from "../../../public/guy.jpeg"
import { IoMdCheckmark } from "react-icons/io";
import Link from "next/link";
import { BsHandbag, BsLightning } from 'react-icons/bs';
import { IoRocketOutline, IoSunnyOutline } from 'react-icons/io5';
import { FaRegSquareCheck } from 'react-icons/fa6';


interface TableProps {
    activeTab: 'all' | 'NewOrders' | 'PendingOrders' | 'SentOut' | 'Completed';
    orderStatus?: string;
    handleTabChange: (tab: string) => void;
}


interface TableItem {
    name: string;
    price: string;
    trackingId: string;
    pendingSince: string;
    pendingTime: string;
    quantity: string;
    orderDate: string;
    orderTime: string;
    Id: number;
    
    // isPending: boolean;
    status?: 'new' | 'pending' | 'sent' | 'completed';
}

const tableItems: TableItem[] = [
    {
        name: 'Mens high neck black turtle polo shirt',
        price: 'N 23,000',
        trackingId: '#425t74',
        pendingSince: '14 November 2024',
        pendingTime: '14:32:43',
        quantity: '3pcs',
        orderDate: '14 November',
        orderTime: ' 2024 14:32:43',
        // isPending: false,
        status: 'new',
        Id:2,
    },
    {
        name: 'Mens high neck black turtle polo shirt',
        price: 'N 23,000',
        trackingId: '#425t70',
        pendingSince: '14 November 2024',
        pendingTime: '14:32:43',
        quantity: '3pcs',
        orderDate: '14 November',
        orderTime: ' 2024 14:32:43',
        // isPending: false,
        status: 'pending',
        Id:3
    },
    {
        name: 'Mens high neck black turtle polo shirt',
        price: 'N 23,000',
        trackingId: '#425t77',
        pendingSince: '14 November 2024',
        pendingTime: '14:32:43',
        quantity: '3pcs',
        orderDate: '14 November',
        orderTime: ' 2024 14:32:43',
        // isPending: false,
        status: 'pending',
        Id:4,
    },
    {
        name: 'Mens high neck black turtle polo shirt',
        price: 'N 23,000',
        trackingId: '#425t52',
        pendingSince: '14 November 2024',
        pendingTime: '14:32:43',
        quantity: '3pcs',
        orderDate: '14 November',
        orderTime: ' 2024 14:32:43',
        // isPending: false,
        status: 'sent',
        Id:5,
    },
    {
        name: 'Mens high neck black turtle polo shirt',
        price: 'N 23,000',
        trackingId: '#425t22',
        pendingSince: '14 November 2024',
        pendingTime: '14:32:43',
        quantity: '3pcs',
        orderDate: '14 November',
        orderTime: ' 2024 14:32:43',
        // isPending: false,
        status: 'completed',
        Id:6,
    },
    {
        name: 'Mens high neck black turtle polo shirt',
        price: 'N 23,000',
        trackingId: '#425t12',
        pendingSince: '14 November 2024',
        pendingTime: '14:32:43',
        quantity: '3pcs',
        orderDate: '14 November',
        orderTime: ' 2024 14:32:43',
        // isPending: false,
        status: 'new',
        Id:7,
    },
    {
        name: 'Mens high neck black turtle polo shirt',
        price: 'N 23,000',
        trackingId: '#425t08',
        pendingSince: '14 November 2024',
        pendingTime: '14:32:43',
        quantity: '3pcs',
        orderDate: '14 November',
        orderTime: ' 2024 14:32:43',
        // isPending: false,
        status: 'completed',
        Id:8,
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
        // isPending: false,
        status: 'sent',
        Id:9,
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
        // isPending: false,
        status: 'new',
        Id:10,
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
        // isPending: false,
        status: 'pending',
        Id:11,
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
        // isPending: false,
        status: 'pending',
        Id:12,
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
        // isPending: false,
        status: 'completed',
        Id:13,
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
        // isPending: false,
        status: 'new',
        Id:14,
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
        // isPending: false,
        status: 'sent',
        Id:15,
    },
    {
        name: 'Mens high neck black turtle polo shirt',
        price: 'N 23,000',
        trackingId: '#425t74',
        pendingSince: '14 November 2024',
        pendingTime: '14:32:43',
        quantity: '3pcs',
        orderDate: '14 November',
        orderTime: ' 2024 14:32:43',
        // isPending: false,
        status: 'pending',
        Id:1,
    },
];





const OrderTable: React.FC<TableProps> = ({activeTab, orderStatus,handleTabChange}) =>{

    console.log(orderStatus)

    const filteredTable = tableItems.filter(table => {
        switch (activeTab) {
            case 'all':
                return true;
            case 'NewOrders':
                return table.status === 'new';
            case 'PendingOrders':
                return table.status === 'pending';
            case 'SentOut':
                return table.status === 'sent';
            case 'Completed':
                return table.status === 'completed';
            default:
                return false;
        }
    });

    const orderTabs = [
        { id: 'all', label: 'All orders', icon: <BsLightning /> },
        { id: 'NewOrders', label: 'New orders', icon: <BsHandbag className="text-[17px]" /> },
        { id: 'PendingOrders', label: 'Pending orders', icon: <IoSunnyOutline className="text-[17px]" /> },
        { id: 'SentOut', label: 'Sent out', icon: <IoRocketOutline className="text-[17px]" /> },
        { id: 'Completed', label: 'Completed', icon: <FaRegSquareCheck className="text-[17px]" /> },
    ];
    
    

    return (
        <>
        
        <div>
        <h1 className='text-[20px] font-Helevetica'>Product Statistics ({filteredTable.length})</h1>
        <div className='flex gap-3 mt-4  overflow-x-auto'>
    {orderTabs.map((tab) => (
        <div 
            key={tab.id}
            className={`flex items-center  py-[10px] rounded-[20px] gap-[3px] whitespace-nowrap px-[1rem] text-[15px] cursor-pointer ${activeTab === tab.id ? 'bg-[#0171E3] text-white' : 'bg-[#E8E8E8]'}`}
            onClick={() => handleTabChange(tab.id)}
        >
            {tab.icon}
            {tab.label}
        </div>
    ))}
</div>

        </div>
        <div className="overflow-x-auto mt-4 bg-white rounded-[15px]">
        <table className="w-full min-w-[55rem] bg-white rounded-[15px]">
            <thead className="text-left rounded-sm border-b-[1px] border-b-[#D9D9D9]">
                <tr className="">
                    <td className="text-[13px] px-3 py-5">Product Name</td>
                    <td className="text-[13px] px-3 py-5">Price</td>
                    <td className="text-[13px] px-3 py-5">Tracking ID</td>
                    <td className="text-[13px] px-3 py-5">Pending Since</td>
                    <td className="text-[13px] px-3 py-5">Quantity</td>
                    <td className="text-[13px] px-3 py-5">Order date</td>
                    <td className="text-[13px] px-3 py-5">Actions</td>
                </tr>
            </thead>
            <tbody>
                {filteredTable.map((items, index) => (
                     <tr key={index}>
                     <td className="py-3  px-[7px]">
                         <div className="flex items-center gap-2 ">
                             <div>
                                 <Image src={girl} alt="cloth" className="w-[50px] h-[50px] rounded-[10px]" />
                             </div>
                             <p className="text-[12px] font-medium">{items.name}</p>
                         </div>
                     </td>
                     <td className="text-[12px] p-3 font-semibold">{items.price}</td>
                     <td className="py-3  px-[7px]">
                         <div className="flex items-center px-[5px] gap-1 py-[7px]  justify-center rounded-[20px] bg-[#0171E308]">
                             <p className="text-[12px] font-medium">Product ID:</p>
                             <p className="px-[7px] py-[2px] bg-[#E1E3FF] text-[11px] rounded-[20px] text-[#0171E3]">{items.trackingId}</p>
                         </div>
                     </td>
                     <td className="py-3  px-[7px]">
                         <div>
                             <p className="text-[12px] font-medium">{items.pendingSince}</p>
                             <p className="text-[12px] font-medium">{items.pendingTime}</p>
                         </div>
                     </td>
                     <td className="py-3  px-[7px]">
                         <p className="text-[12px] font-medium">QTY: {items.quantity}</p>
                     </td>
                     <td className="py-3  px-[7px]">
                     <div>
                             <p className="text-[12px] font-medium">{items.orderDate}</p>
                             <p className="text-[12px] font-medium">{items.orderTime}</p>
                         </div>
                     </td>
                     <td className="py-3  px-[7px]">
                         <div className="flex items-center gap-2">
                         <button className={`py-[10px] px-[10px] rounded-[18px] flex items-center gap-1 text-[white] text-[11px] 
                            ${items.status === 'new' ? 'bg-[#0171E3]' :
                            items.status === 'pending' ? 'bg-[#0171E3]' : 
                            items.status === 'sent' ? 'bg-[#EDF6FF] text-black' :  'bg-[#EDF6FF] text-black'}`}>{items.status === 'new' ? 'Accept' :
                             items.status === 'pending' ? 'Mark as sent out' :
                             items.status === 'sent' ?  'Awaiting Completion' : 'Completed'}
                               {items.status === 'completed' ? (
                                <div className="size-[15px] bg-[#2FEB99] rounded-full flex justify-center items-center"><IoMdCheckmark /></div>
                               ): ""}
                             </button>
                      <Link href={`/order/${items.Id}`}>
                      <button className="py-[10px] px-[10px] bg-[#000000] rounded-[18px] text-[white] text-[11px]">
                            {items.status === 'new' ? 'Reject':
                            'See Details'
                            }

                         </button>
                      </Link>
                        </div>
                     </td>
                 </tr>

                ))}
               
            </tbody>
        </table>
    </div>    </>
    )
}
export default OrderTable 