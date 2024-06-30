import Chart from "react-apexcharts";
import { useMediaQuery } from "react-responsive";

const ProductPriceChart = ({ data }) => {

  const isMobile = useMediaQuery({ query: '(max-width: 500px)' })
  const isTablet = useMediaQuery({ query: '(max-width: 1000px)' })
  const isLaptop = useMediaQuery({ query: '(max-width: 1500px)' })

  function productPrices(data) {
    return data.map((item) => Number(item?.productPrice));
  }

  function productNames(data) {
    return data.map((item) => item?.product);
  }

  const allProductPrices = productPrices(data);
  const Prices = [
    {
      name: "Product Prices",
      data: allProductPrices,
    },
  ];
  const allProductNames = productNames(data);

  return (
    <div className=" flex justify-center items-center sm:relative sm:left-6 bg-white/90 backdrop-blur-3xl  border-b-4 shadow-2xl border-t-4 border-gray-100   rounded-2xl">
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
            categories: allProductNames,
          },
          fill: {
            colors: "#04e397",
            opacity: 1,
          },
          tooltip: {
            y: {
              formatter: (val) => `₹${val}`,
            },
          },
        }}
        series={Prices}
        width={isMobile ? 300: isTablet ? 450 : isLaptop ? 900 : 1300}
        height={400}
        type="bar"
      />
    </div>
  );
};

export default ProductPriceChart;
