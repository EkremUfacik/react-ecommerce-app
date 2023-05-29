const ProductDetail = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="flex">
        <div className="w-1/2">
          <img src="product-image.jpg" alt="Product" className="w-full" />
        </div>
        <div className="w-1/2 px-8">
          <h1 className="text-3xl font-bold mb-4">Ürün Adı</h1>
          <p className="text-gray-600 mb-4">Ürün açıklaması burada yer alır.</p>
          <div className="flex items-center mb-4">
            <span className="text-lg font-bold text-gray-800">Fiyat:</span>
            <span className="text-lg font-bold text-green-600 ml-2">
              $99.99
            </span>
          </div>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
            Sepete Ekle
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
