import { getRequest} from "./utils";

const BASE_URL = "/centralizedOfficer/requests";

export const getALLRequests = () => getRequest(`${BASE_URL}`);
