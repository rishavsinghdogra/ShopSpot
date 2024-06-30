import Chart from "react-apexcharts";
import { useMediaQuery } from "react-responsive";


const ProductPriceInShop = ({ chartData, chartShopNames}) => {

  const isMobile = useMediaQuery({ query: '(max-width: 500px)' })
  const isTablet = useMediaQuery({ query: '(max-width: 1000px)' })
  const isLaptop = useMediaQuery({ query: '(max-width: 1500px)' })

  

  console.log(chartData)
  console.log(chartShopNames)

  

  return (
    <div className="w-full mx-auto  flex justify-center items-center  bg-white backdrop-blur-3xl  border-b-4 shadow-2xl border-t-4 border-gray-100   rounded-lg">
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
        width={isMobile ? 300: isTablet ? 450 : isLaptop ? 900 : 1300}
        height={400}
        type="area"
      />
    </div>
  );
};

export default ProductPriceInShop;
