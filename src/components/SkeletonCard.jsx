import React from "react";

const SkeletonCard = ({ props }) => {
  const ProductCard = () => (
    <div className="rounded-lg shadow-md w-[250px] h-[420px] p-2  px-4 border border-gray-200 animate-pulse">
      <div className=" flex items-center justify-center w-[220px] h-[220px] rounded-lg shadow-md bg-gray-300 m-auto my-4">
        <svg
          className="w-12 h-12 text-gray-200 dark:text-gray-600"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 640 512"
        >
          <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
        </svg>
      </div>
      <div className="rounded-full h-4 bg-gray-300 my-4 mt-8"></div>
      <div className="rounded-full h-4 bg-gray-300 my-4"></div>
      <div className="rounded-full h-4 bg-gray-300 my-4"></div>
      <div className="rounded-full h-6 bg-gray-300 w-3/4 m-auto"></div>
    </div>
  );

  const CartCard = () => (
    <div className="flex justify-between items-center border-b-2 w-full lg:w-4/5 m-auto md:flex-row flex-col gap-4 animate-pulse">
      <div className="flex flex-1 justify-center items-center self-start p-2 ">
        <div className=" flex flex-shrink-0 items-center justify-center w-[120px] h-[120px] object-contain rounded-lg shadow-md bg-gray-300 m-auto my-2">
          <svg
            className="w-12 h-12 text-gray-200 dark:text-gray-600"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 640 512"
          >
            <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
          </svg>
        </div>
        <div className="flex gap-4 flex-col w-80 md:w-full ml-8">
          <div className="bg-gray-300 w-1/2 h-4"></div>
          <div className=" bg-gray-300 w-4/5 h-4"></div>
        </div>
      </div>

      <div className="flex gap-4 justify-center items-center mb-2">
        <div className="bg-gray-300 h-6 w-14 rounded-full"></div>

        <div className="bg-gray-300 h-8 w-20 rounded-full"></div>
        <div className="bg-gray-300 h-6 w-6 rounded-full"></div>
      </div>
    </div>
  );

  if (props === "product") return <ProductCard />;
  if (props === "cart") return <CartCard />;
};

export default SkeletonCard;
