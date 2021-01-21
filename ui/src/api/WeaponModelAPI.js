import { getRequest, postRequest, putRequest, deleteRequest} from "./utils";

const BASE_URL = "/centralizedofficer/weaponModels";

export const getAllWeaponModels = () => getRequest(`${BASE_URL}`);

export const deleteWeaponModels = (id) => deleteRequest(`${BASE_URL}/${id}`);

export const updateWeaponModels = (id,data) => putRequest(`${BASE_URL}/${id}`,data);

export const saveWeaponModels = (data) => postRequest(`${BASE_URL}`,data);
