import { useDispatch, useSelector } from "react-redux";
import useAxios, { axiosPublic } from "./useAxios";
import { removeAllProduct, updateProductCount } from "../features/productSlice";
import { toastInfo, toastSuccess } from "../helpers/toastify";
import { addProduct } from "../features/productSlice";

const useProductCalls = () => {
  const { axiosWithToken } = useAxios();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);
  const { products } = useSelector((state) => state.product);

  const getAllItems = async (setItems) => {
    try {
      const { data } = await axiosPublic.get("items/");
      setItems(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getSearchedItems = async (search, setItems) => {
    try {
      const { data } = await axiosPublic.get(`items/?search=${search}`);
      setItems(data);
    } catch (error) {
      console.log(error);
    }
  };

  const addOrderItem = async (itemData) => {
    if (currentUser) {
      try {
        const { data } = await axiosWithToken.post("orderitems/", {
          item_id: itemData.id,
          quantity: itemData.quantity,
        });

        getAllOrderItems();
      } catch (error) {
        console.log(error);
      }
    } else {
      products?.some((el) => el.id === itemData.id) ||
        dispatch(addProduct({ ...itemData, quantity: 1 }));
    }
  };

  const productsAddOrderItems = () => {
    products.length && products.forEach((product) => addOrderItem(product));
    dispatch(removeAllProduct());
  };

  const getAllOrderItems = async (setOrderItems = null) => {
    if (currentUser) {
      try {
        const { data } = await axiosWithToken.get("orderitems/");
        dispatch(updateProductCount(data.length));
        setOrderItems && setOrderItems(data);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log(products);
      dispatch(updateProductCount(products.length));
      setOrderItems && setOrderItems(products);
    }
  };

  const updateOrderItems = async (id, info, setProduct, setOrderItems) => {
    try {
      const { data } = await axiosWithToken.patch(`orderitems/${id}/`, info);
      console.log(data);
      setProduct(data);
      getAllOrderItems(setOrderItems);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteOrderItems = async (id, setOrderItems) => {
    try {
      const { data } = await axiosWithToken.delete(`orderitems/${id}/`);
      getAllOrderItems(setOrderItems);
    } catch (error) {
      console.log(error);
    }
  };

  const createOrder = async (orderInfo) => {
    try {
      console.log(orderInfo);
      const { data } = await axiosWithToken.post(`orders/`, orderInfo);
      toastSuccess("Order has been placed!");
    } catch (error) {
      console.log(error);
    }
  };

  const getOrders = async (setAllOrders) => {
    try {
      const { data } = await axiosWithToken.get(`orders/`);
      setAllOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    getAllItems,
    getSearchedItems,
    addOrderItem,
    getAllOrderItems,
    updateOrderItems,
    deleteOrderItems,
    createOrder,
    getOrders,
    productsAddOrderItems,
  };
};

export default useProductCalls;
