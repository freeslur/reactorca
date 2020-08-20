import { axios_base } from '../api/DefaultCRUD';

// axios.defaults.withCredentials = true;
const client = axios_base();

const getSysInfo = client.get('/sys_info');

export default getSysInfo;
