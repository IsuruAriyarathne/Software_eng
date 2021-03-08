import { getRequest} from "./utils";

const BASE_URL = "/centralizedOfficer";

export const getALLStations = () => getRequest(`${BASE_URL}/stations`);

export const getAllRecoveries = () => getRequest(`${BASE_URL}/recovery`);

export const getAllMaintenance = () => getRequest(`${BASE_URL}/maintainanceRecords`);

