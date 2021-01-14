import { getRequest, postRequest, putRequest, deleteRequest} from "./utils";

const BASE_URL = "/admin/stations";

export const getAllStations = () => getRequest(`${BASE_URL}`);

export const deleteStations = (id) => deleteRequest(`${BASE_URL}/${id}`);

export const updateStations = (id,data) => putRequest(`${BASE_URL}/${id}`,data);

export const saveStations = (data) => postRequest(`${BASE_URL}`,data);