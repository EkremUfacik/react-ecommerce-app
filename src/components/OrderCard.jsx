import { useState } from "react";

const OrderCard = ({ order }) => {
  const [showDetails, setShowDetails] = useState(false);
  console.log(order);

  return (
    <div className="w-64 rounded-lg shadow-md p-4">
      <h4 className="text-lg font-bold font-serif">
        Order number: <span className="font-normal font-sans">{order.id}</span>{" "}
      </h4>
      <button
        className="mt-2 w-full text-primary font-bold"
        onClick={() => setShowDetails(!showDetails)}
      >
        {showDetails ? "Hide Details" : "Show Details"}
      </button>
      {showDetails && (
        <div className="mt-2">
          <h3 className="text-lg font-bold font-serif">Details</h3>
          {order.items.map((i) => (
            <p key={i.id} className="mt-2 font-bold">
              {i.quantity} x {i.item.title} - ${i.item_total_price}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderCard;
