import { getRequest} from "./utils";

const BASE_URL = "/officer/requests";

export const getALLRequests = () => getRequest(`${BASE_URL}`);
