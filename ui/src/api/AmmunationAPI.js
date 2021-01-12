import { getRequest, postRequest, putRequest, deleteRequest} from "./utils";

const BASE_URL = "/officer/ammunations";

export const getAllLessons = () => getRequest(`${BASE_URL}`);

export const deleteLessons = (id) => deleteRequest(`${BASE_URL}/${id}`);

export const updateLessons = (id,data) => putRequest(`${BASE_URL}/${id}`,data);

export const saveLessons = (data) => postRequest(`${BASE_URL}`,data);