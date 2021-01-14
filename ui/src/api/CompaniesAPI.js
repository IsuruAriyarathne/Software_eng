import { getRequest, postRequest, putRequest, deleteRequest} from "./utils";

const BASE_URL = "/centralizedofficer/companies";

export const getAllCompanies = () => getRequest(`${BASE_URL}`);

export const deleteCompanies = (id) => deleteRequest(`${BASE_URL}/${id}`);

export const updateCompanies = (id,data) => putRequest(`${BASE_URL}/${id}`,data);

export const saveCompanies = (data) => postRequest(`${BASE_URL}`,data);