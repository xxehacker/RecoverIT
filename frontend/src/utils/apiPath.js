export const BASE_URL = "http://localhost:9000";

export const API_ENDPOINTS = {
  AUTH: {
    SIGNUP: "/api/v1/users/signup",
    LOGIN: "/api/v1/users/login",
    GET_PROFILE: "/api/v1/users/profile",
  },
  LOST: {
    GETALL_LOST: "/api/v1/lostItems", // get all lost items - method get
    REPORT_LOST: "/api/v1/lostItems/report", // report lost item - method post
    GET_LOST_REPORT: (id) => `/api/v1/lostItems/report/${id}`, // get lost report by id
    DELETE_LOST_REPORT: (id) => `/api/v1/lostItems/report/${id}`, // delete lost report by id
  },
  FOUND: {
    GETALL_FOUND_REPORT: "/api/v1/foundItems", // get all found items - method get
    REPORT_FOUND: "/api/v1/foundItems/report", // report found item - method post
    GET_FOUND_REPORT: (id) => `/api/v1/foundItems/report/${id}`, // get found report by id
    DELETE_FOUND_REPORT: (id) => `/api/v1/foundItems/report/${id}`, // delete found report by id
  },
  CLAIM: {
    // GET_CLAIM: (id) => `/api/v1/claimItems/${id}`, // get claim by id
    SUBMIT_CLAIM: "/api/v1/claimItems", // create claim - method post
    GETALL_CLAIM: "/api/v1/claimItems", // get all claims - method get
    GET_CLAIM: (id) => `/api/v1/claimItems/${id}`, // get claim by id
    UPDATE_CLAIM: (id) => `/api/v1/claimItems/${id}`, // update claim by id
    DELETE_CLAIM: (id) => `/api/v1/claimItems/${id}`, // delete claim by id
  },
};
