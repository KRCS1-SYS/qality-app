export const BACKEND_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}`;
export const loginAPI = `${BACKEND_URL}/auth/v1/login`;
export const signupAPI = `${BACKEND_URL}/auth/v1/signup`;
export const selfAPI = `${BACKEND_URL}/auth/v1/user`;
export const getMachinesAPI = `${BACKEND_URL}/auth/v1/machine`;
export const getQualityAPI = `${BACKEND_URL}/auth/v1/query`;
export const addMachinesAPI = `${BACKEND_URL}/auth/v1/machine`;
export const addQualityAPI = `${BACKEND_URL}/auth/v1/query`;
export const deleteMachinesAPI = `${BACKEND_URL}/auth/v1/machine`;
export const approveQualityAPI = `${BACKEND_URL}/auth/v1/query/approve`;
