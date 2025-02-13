import BaseLayout from "../BaseLayout";
import Header from "../components/dashboard/Header";
import Chart from "../components/ui/card";
import Table from "../components/ui/Table";
// import ApexChart from "../components/ui/chart";

export default function DashboardHome() {
  return (
    <BaseLayout>
      <div className="w-full  mx-auto ">
        <Header
          title="Dashboard"
          note="Take a deep lovely into your statistical performance"
        />

        <div
          className=" gap-5  mt-[20px] grid md:grid-cols-3 w-full
        "
        >
          <Chart
            title="Amount sold"
            amount="₦430,876"
            chart="chart"
            text="Since this month"
            style={{ fontSize: "13px" }}
            rate="23.65%"
            style2={{
              color: "#0071E3",
              display: "flex",
              alignItems: "center",
              fontSize: "13px",
            }}
          />
          <Chart
            title="Products sold"
            amount="4343 Sold"
            chart="chart"
            text="Since this month"
            style={{ fontSize: "13px" }}
            rate="23.65%"
            style2={{
              color: "",
              display: "",
              alignItems: "",
              fontSize: "",
            }}
          />
          <Chart
            title="Pending Products"
            amount="23 products"
            text="See all"
            style={{
              padding: "5px 10px 5px 10px",
              fontSize: "13px",
              borderRadius: "50px",
              backgroundColor: "#0171E3",
              color: "white",
              cursor: "pointer",
            }}
            style2={{
              color: "",
              display: "",
              alignItems: "",
              fontSize: "",
            }}
            rate=""
          />
          <Chart
            title="Advertised Products"
            amount="87 products"
            text="See all"
            style={{
              padding: "5px 10px 5px 10px",
              fontSize: "13px",
              borderRadius: "50px",
              backgroundColor: "#0171E3",
              color: "white",
              cursor: "pointer",
            }}
            style2={{
              color: "",
              display: "",
              alignItems: "",
              fontSize: "",
            }}
            rate=""
          />
        </div>

        <div className="mt-6 overflow-hidden  w-full">
          <p className="text-[16px] font-semibold">New Orders</p>
          <div className="flex overflow-x-auto w-full">
            <Table />
            <div>{/* <ApexChart/> */}</div>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
}
