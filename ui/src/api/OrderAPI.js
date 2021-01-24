import { getRequest, postRequest, putRequest, deleteRequest} from "./utils";

const BASE_URL = "/centralizedofficer/orders";

export const getAllOrders = () => getRequest(`${BASE_URL}`);

export const deleteAmmunitionsModels = (id) => deleteRequest(`${BASE_URL}/${id}`);

export const updateAmmunitionsModels = (id,data) => putRequest(`${BASE_URL}/${id}`,data);

export const saveAmmunitionsModels = (data) => postRequest(`${BASE_URL}`,data);
