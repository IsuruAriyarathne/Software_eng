import { getRequest, postRequest, putRequest, deleteRequest} from "./utils";

const BASE_URL = "/centralizedOfficer/companies";

export const getAllCompanies = () => getRequest(`${BASE_URL}`);

export const deleteCompanies = (id) => deleteRequest(`${BASE_URL}/${id}`);

export const deleteCompanyWeapon = (companyID,weaponModelID) => deleteRequest(`${BASE_URL}/${companyID}/${weaponModelID}`);

export const deleteCompanyAmmuition = (companyID,ammoModelID) => deleteRequest(`${BASE_URL}/${companyID}/${ammoModelID}`);

export const updateCompanies = (id,data) => putRequest(`${BASE_URL}/${id}`,data);

export const saveCompanies = (data) => postRequest(`${BASE_URL}`,data);

export const getDetails = (id) => getRequest(`${BASE_URL}/${id}`);