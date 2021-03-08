import { getRequest, postRequest, putRequest, deleteRequest} from "./utils";

const BASE_URL = "/officer/recovery";

export const getAllRecovery = (id) => getRequest(`${BASE_URL}/${id}`);

export const deleteRecovery = (id) => deleteRequest(`${BASE_URL}/${id}`);

export const deleteRecoveryWeapon = (id,weaponModelID) => deleteRequest(`${BASE_URL}/weaponModel/${id}/${weaponModelID}`);

export const deleteRecoveryAmmunition = (id,ammoModelID) => deleteRequest(`${BASE_URL}/ammoModel/${id}/${ammoModelID}`);

export const updateRecovery = (id,data) => putRequest(`${BASE_URL}/${id}`,data);

export const saveRecovery = (data) => postRequest(`${BASE_URL}`,data);

export const getRecovery = (station,id) => getRequest(`${BASE_URL}/${station}/${id}`);