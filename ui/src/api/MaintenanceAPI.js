import { getRequest, postRequest, putRequest, deleteRequest} from "./utils";

const BASE_URL = "/officer/maintenance";

export const getAllMaintenance = (id) => getRequest(`${BASE_URL}/${id}`);

export const deleteMaintenance = (id) => deleteRequest(`${BASE_URL}/${id}`);

export const updateMaintenance = (id,data) => putRequest(`${BASE_URL}/${id}`,data);

export const saveMaintenance = (data) => postRequest(`${BASE_URL}`,data);