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
  ADMIN: {
    GETALL_USERS: "/api/v1/admin/users", // get all users - method get
    GET_USER: (id) => `/api/v1/admin/users/${id}`, // get user by id
    DELETE_USER: (id) => `/api/v1/admin/users/${id}`, // delete user by id
    // GET ALL LOST , FOUND , CLAIM ITEMS
    GETALL_LOST_ITEMS: "/api/v1/lostItems", // get all lost items - method get
    GETALL_FOUND_ITEMS: "/api/v1/foundItems", // get all found items - method get
    GETALL_CLAIM_ITEMS: "/api/v1/admin/claimItems", // get all claim items - method get
    // UPDATE LOST , FOUND , CLAIM ITEMS
    UPDATE_LOST_ITEM: "/api/v1/admin/update-lost-item", // update lost item by id
    UPDATE_FOUND_ITEM: "/api/v1/admin/update-found-item", // update found item by id
    UPDATE_CLAIM_ITEM: "/api/v1/admin/update-claim-item", // update claim item by id
    // DELETE LOST , FOUND , CLAIM ITEMS
    DELETE_LOST_ITEM: (id) => `/api/v1/admin/lostItems/${id}`, // delete lost item by id
    DELETE_FOUND_ITEM: (id) => `/api/v1/admin/foundItems/${id}`, // delete found item by id
    DELETE_CLAIM_ITEM: (id) => `/api/v1/admin/claimItems/${id}`, // delete claim item by id
    // GET DASHBOARD DATA
    GET_ADMIN_DASHBOARD_DATA: "/api/v1/admin/dashboard", // get dashboard data - method get
  },
};
