import { getRequest, postRequest, putRequest, deleteRequest} from "./utils";

const BASE_URL = "/centralizedofficer/ammunitions";

export const getAllAmmunitions = () => getRequest(`${BASE_URL}`);

export const deleteAmmunitions = (id) => deleteRequest(`${BASE_URL}/${id}`);

export const updateAmmunitions = (id,data) => putRequest(`${BASE_URL}/${id}`,data);

export const saveAmmunitions = (data) => postRequest(`${BASE_URL}`,data);