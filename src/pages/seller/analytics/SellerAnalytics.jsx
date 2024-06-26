import { useEffect, useState } from "react";
import { fetchProductsData } from "@/utils/Utils";
import ProductCard from "@/components/custom/ProductCard";
import ProductPriceChart from "./ProductPriceChart";
import { DNA } from "react-loader-spinner";
import { useContext } from "react";
import { UserDataContext } from "@/contexts/UserDataContext";
import { CardFooter } from "@/components/ui/card";


const SellerAnalytics = ({ accessKey, otherStoreAccessKey }) => {
  const [loading, setLoading] = useState(false);
  const [productsData, setProductsData] = useState([]);
  console.log(productsData);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 14;
  console.log(productsData);
  const { currentStore } = useContext(UserDataContext);

  console.log(currentStore);

  

  useEffect(() => {
    const fetchStores = async () => {
      setLoading(true);
      const result = await fetchProductsData(
        otherStoreAccessKey ? otherStoreAccessKey : accessKey
      );
      setProductsData(result);
      setTimeout(function () {
        setLoading(false);
      }, 2000);
    };
    fetchStores();
  }, [accessKey, otherStoreAccessKey]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = productsData.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  const totalPages = Math.ceil(productsData.length / itemsPerPage);

  if (loading) {
    return (
      <div className=" min-h-screen w-full flex flex-col items-center justify-center">
        <DNA height="200" width="200" />
        <div className=" text-slate-200 text-2xl">Analytics Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center w-full">
      {/* Banners */}
      <div className="banner flex flex-col items-center justify-center sm:ml-[50px] py-12 px-8 bg-gray-100 bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-lg text-white w-[70%] mt-8 relative z-10">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to Analytics Section
        </h1>
        <p className="text-lg text-center mb-20 sm:mb-8">
          Get useful insights with the help of interactive graphs, Which
          enhances your decision making power!
        </p>
        <div className="">
          <CardFooter className="sm:flex  justify-center font-bold sm:w-[40%]   mx-auto mb-3  h-[20%] space-x-2 bg-blue-300/70 border border-white/20 rounded-xl py-1 shadow-sm absolute bottom-1 left-1 right-1 ">
            <img
              src="./images/Store.png"
              alt=""
              className="h-8 hidden sm:block "
            />
            <h1 className="h-8 relative  text-nowrap top-1 ">{currentStore?.name}</h1>
          </CardFooter>
        </div>
      </div>

      {/* Product Listing */}
      <div className="  sm:ml-[70px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-7 gap-4 py-8">
        {currentProducts.map((product, index) => (
          <ProductCard
            key={index}
            description={product.description}
            imageUrl={product.imageUrl}
            productPrice={product.productPrice}
            product={product.product}
            accessKey={product.accessKey}
            currentStore = {currentStore}
          />
        ))}
      </div>

      {/* Product Price Chart */}
      <ProductPriceChart data={productsData} />
      

      {/* Pagination Controls */}
      <div className="flex justify-center flex-wrap my-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 mx-1 text-white bg-slate-900 rounded-xl ${
            currentPage === 1
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
              currentPage === index + 1
                ? "bg-slate-900 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 mx-1 text-white bg-slate-900 rounded-xl ${
            currentPage === totalPages
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-slate-700"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SellerAnalytics;
