import { useState } from "react";

const OrderCard = ({ order }) => {
  const [showDetails, setShowDetails] = useState(false);

  console.log(order);

  return (
    <div className="w-64 rounded-lg shadow-md p-4">
      <h4 className="text-lg font-medium">Order number: {order.id}</h4>
      <button
        className="mt-2 w-full text-blue-500"
        onClick={() => setShowDetails(!showDetails)}
      >
        {showDetails ? "Hide Details" : "Show Details"}
      </button>
      {showDetails && (
        <div className="mt-2">
          <h3 className="text-lg font-medium">Details</h3>
          {order.items.map((item) => (
            <p key={item.id} className="mt-2">
              {item.item.title} - ${item.item_total_price}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

// const Orders = () => {
//   return (
//     <div className="flex flex-wrap gap-4">
//       {orders.map((order) => (
//         <OrderCard key={order.id} order={order} />
//       ))}
//     </div>
//   );
// };

export default OrderCard;
