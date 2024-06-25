import Chart from "react-apexcharts";

const ProductPriceInShop = ({ chartData, chartShopNames}) => {

  console.log(chartData)
  console.log(chartShopNames)

  return (
    <div className=" flex justify-center items-center  bg-white backdrop-blur-3xl  border-b-4 shadow-2xl border-t-4 border-gray-100   rounded-lg">
      <Chart
        options={{
          plotOptions: {
            chart: {
              type: "area",
            },
          },
          dataLabels: {
            enabled: false,
          },
          stroke: {
            curve: "smooth",
          },
          xaxis: {
            categories: chartShopNames,
          },
          fill: {
            // colors : "#5D3FD3",
            opacity: 1,
          },
          tooltip: {
            y: {
              formatter: (val) => `₹${val}`,
            },
          },
        }}
        series={chartData}
        width={1000}
        height={400}
        type="area"
      />
    </div>
  );
};

export default ProductPriceInShop;
