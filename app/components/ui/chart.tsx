// 'use client'

// import { useState } from "react";
// import dynamic from "next/dynamic";
// import { ApexOptions } from "apexcharts";



// const ReactApexChart = dynamic(() => import('react-apexcharts'), {
//     ssr: false
// });

// interface ChartState {
//     series: number[],
//     options: ApexOptions;
// }

// const ApexChart = () => {
//     const [state] = useState<ChartState>({
      
//         series: [44, 55, 41, 17, 15],
//         options: {
//           chart: {
//             type: 'donut',
//           },
//           responsive: [{
//             breakpoint: 480,
//             options: {
//               chart: {
//                 width: 200
//               },
//               legend: {
//                 position: 'bottom'
//               }
//             }
//           }]
//         },
      
      
//     });

    

//     return (
//       <div className="w-full">
//         <div id="chart">
//             <ReactApexChart 
//             options={state.options} 
//             series={state.series} 
//             type="donut" 
//             height={350} />
//           </div>
//       </div>
//     );
//   }

// export default ApexChart;