import { postRequest} from "./utils";

const BASE_URL = "/officer/requests";

export const saveRequest = (data) => postRequest(`${BASE_URL}`,data);
