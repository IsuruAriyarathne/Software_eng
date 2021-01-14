import { getRequest, postRequest, putRequest, deleteRequest} from "./utils";

const BASE_URL = "/officer/ammunitions";

export const getAllAmmunition = () => getRequest(`${BASE_URL}`);

export const deleteAmmunition = (id) => deleteRequest(`${BASE_URL}/${id}`);

export const updateAmmunition = (id,data) => putRequest(`${BASE_URL}/${id}`,data);

export const saveAmmunition = (data) => postRequest(`${BASE_URL}`,data);