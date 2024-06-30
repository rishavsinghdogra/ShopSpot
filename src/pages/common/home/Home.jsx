import { useState, useEffect, useRef } from "react";
import { fetchStoresData, fetchProductsData } from "@/utils/Utils";
import StoreCard from "@/components/custom/StoreCard";
import StoreSkeleton from "@/components/custom/StoreSkeleton";
import LocationSearch from "@/components/custom/LocationSearch";
import SelecLocationForAnalytics from "./SelectLocationForAnalytics";
import ProductPriceInShop from "./ProductPriceInShops";

const ITEMS_PER_PAGE = 10; // Define the number of items per page

const Home = ({ setSelectedComponent, setOtherStoreAccessKey }) => {
  const [storesData, setStoresData] = useState(["empty"]); //empty to make array length one so that not found doesn't render first
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1); // Current page state
  const [value, setValue] = useState(null);
  const storesSectionRef = useRef(null); // Reference to the stores section
  // const [allStoresNames, setAllStoresNames] = useState(null)
  const [chartData, setChartData] = useState(null);

  // console.log("Stores data",storesData);

  useEffect(() => {
    const fetchStores = async () => {
      //function to fetch stores
      setLoading(true);
      const result = await fetchStoresData(value);
      setStoresData(result);
      setLoading(false); // Data has been loaded
    };
    fetchStores();
  }, [value]);

  function getAllStroesNames() {
    if (storesData[0] !== "empty") {
      const result = storesData.map((store) => store?.storeName);
      // console.log("All stores names",result)
      return result;
    }
  }
  const allStoresNames = getAllStroesNames();
  // const fetchEveryStoreProducts = async () => {
  //   let allStoresData = [];

  //   for (let i = 0; i < storesData.length; i++) {
  //     const productsData = await fetchProductsData(storesData[i]?.accessKey);
  //     allStoresData = [...allStoresData, ...productsData];
  //   }

  //   console.log("allproductstoexist", allStoresData);
  //   setEveryStoreProductData(allStoresData);
  // };

  // fetchEveryStoreProducts();

  // Calculate the current page's data
  const currentPageData = storesData.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  // Calculate total pages based on the number of items per page
  const totalPages = Math.ceil(storesData.length / ITEMS_PER_PAGE);

  // Function to handle page change
  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
  };

  // Function to scroll to the store cards section
  const handleGetStartedClick = () => {
    storesSectionRef.current.scrollIntoView({ behavior: "smooth" });
    setValue("");
  };

  return (
    <div className="home flex flex-col items-center justify-center sm:ml-[50px] px-4 py-8">
      {/* Banner Section */}
      <div className="banner flex flex-col items-center py-12 px-8 bg-gray-100 bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-lg text-white w-full relative z-10">
        <h1 className="text-4xl font-bold mb-4">Welcome to ShopSpot</h1>
        <p className="text-lg text-center mb-6">
          Discover a wide variety of stores and find the best deals on your
          favorite products. Our platform offers a seamless shopping experience
          with top-rated stores at your fingertips.
        </p>
        <div className="flex flex-row flex-wrap space-x-2 space-y-2 justify-center items-center ">
          <button
            onClick={handleGetStartedClick}
            className="px-8 py-3 w-[200px] bg-white text-gray-800 rounded-lg hover:bg-gray-200 transition-colors duration-300 relative left-1 top-1 mb-1"
          >
            See every shop
          </button>
          <LocationSearch
            setStoresData={setStoresData}
            setLoading={setLoading}
            value={value}
            setValue={setValue}
          />
          {allStoresNames && (
            <SelecLocationForAnalytics
              setChartData={setChartData}
              sector={value}
              storesData={storesData}
            />
          )}
        </div>
      </div>

      {/* Animated Floating Effect */}
      <div className="absolute top-0 left-0 w-full h-full z-0 overflow-hidden">
        <div className="absolute top-[-20%] left-1/2 transform -translate-x-1/2 w-80 h-80 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full animate-float"></div>
        <div className="absolute top-[-10%] left-1/2 transform -translate-x-1/2 w-60 h-60 bg-gradient-to-br from-purple-400 to-blue-600 rounded-full animate-float-slower"></div>
      </div>

      {chartData && (
        <div className="mt-10">
        <ProductPriceInShop
          chartData={chartData}
          chartShopNames={allStoresNames}
          
        />
        </div>
      )}

      {/* Stores Section */}

      <div
        className="stores-section flex flex-col items-center mt-8 w-full relative z-10"
        ref={storesSectionRef}
      >
        {!storesData.length ? (
          <div className="flex flex-col items-center justify-center text-5xl text-white font-bold">
            No shop found in this area
            <img src="/public/images/notFound.png" className="w-96" />
          </div>
        ) : (
          <div className="flex h-[70%] flex-wrap justify-center w-full max-w-screen-xl mx-auto my-4">
            {loading ? (
              // Display skeletons while loading
              <>
                <StoreSkeleton />
                <StoreSkeleton />
                <StoreSkeleton />
                <StoreSkeleton />
              </>
            ) : (
              // Display actual store cards after data is loaded
              currentPageData.map((store, index) => (
                <StoreCard
                  key={index}
                  storeName={store.storeName}
                  location={store.location}
                  email={store.email}
                  setSelectedComponent={setSelectedComponent}
                  currentStoreAccessKey={store.accessKey}
                  setOtherStoreAccessKey={setOtherStoreAccessKey}
                />
              ))
            )}
          </div>
        )}

        {/* Pagination controls */}
        {!loading && totalPages > 1 && (
          <div className="flex justify-center flex-wrap my-4">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              className={`px-4 py-2 mx-1 text-white bg-slate-900 rounded-xl ${
                page === 1
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-slate-700"
              }`}
            >
              Previous
            </button>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`px-4 py-2 mx-1 rounded-xl ${
                  page === index + 1
                    ? "bg-slate-900 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
              className={`px-4 py-2 mx-1 text-white bg-slate-900 rounded-xl  ${
                page === totalPages
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-slate-700"
              }`}
            >
              Next
            </button>
          </div>
        )}
      </div>
      
    </div>
  );
};

export default Home;
