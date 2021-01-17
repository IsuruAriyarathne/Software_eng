import { getRequest, postRequest, putRequest, deleteRequest} from "./utils";

const BASE_URL = "/officer/weapons";

export const getAllWeapons = (id) => getRequest(`${BASE_URL}/${id}`);

export const deleteWeapons = (id) => deleteRequest(`${BASE_URL}/${id}`);

export const updateWeapons = (id,data) => putRequest(`${BASE_URL}/${id}`,data);

export const saveWeapons = (data) => postRequest(`${BASE_URL}`,data);