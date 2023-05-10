import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import useAxios, { axiosPublic } from "./useAxios";
import { updateProductCount } from "../features/productSlice";

const useProductCalls = () => {
  const { axiosWithToken } = useAxios();
  const dispatch = useDispatch();

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
    try {
      const { data } = await axiosWithToken.post("orderitems/", itemData);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllOrderItems = async (setOrderItems = null) => {
    try {
      const { data } = await axiosWithToken.get("orderitems/");
      dispatch(updateProductCount(data.length));
      setOrderItems && setOrderItems(data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateOrderItems = async (id, info, setProduct, setOrderItems) => {
    try {
      const { data } = await axiosWithToken.patch(`orderitems/${id}/`, info);
      console.log(data);
      setProduct(data);
      !data && getAllOrderItems(setOrderItems);
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
  };
};

export default useProductCalls;
