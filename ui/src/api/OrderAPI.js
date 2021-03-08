import { getRequest, postRequest, putRequest, deleteRequest} from "./utils";

const BASE_URL = "/centralizedofficer/orders";

export const getAllOrders = () => getRequest(`${BASE_URL}`);

export const getOrder = (id) => getRequest(`${BASE_URL}/${id}`);

export const deleteOrder = (id) => deleteRequest(`${BASE_URL}/${id}`);

export const deleteOrderWeapon = (id,weaponModelID) => deleteRequest(`${BASE_URL}/weapon/${id}/${weaponModelID}`);

export const deleteOrderAmmunition = (id,ammoModelID) => deleteRequest(`${BASE_URL}/ammo/${id}/${ammoModelID}`);

export const updateOrder = (id,data) => putRequest(`${BASE_URL}/${id}`,data);

export const saveOrder = (data) => postRequest(`${BASE_URL}`,data);
