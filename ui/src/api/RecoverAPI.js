import { getRequest, postRequest, putRequest, deleteRequest} from "./utils";

const BASE_URL = "/officer/recovery";

export const getAllRecovery = (id) => getRequest(`${BASE_URL}/${id}`);

export const deleteRecovery = (id) => deleteRequest(`${BASE_URL}/${id}`);

export const updateRecovery = (id,data) => putRequest(`${BASE_URL}/${id}`,data);

export const saveRecovery = (data) => postRequest(`${BASE_URL}`,data);