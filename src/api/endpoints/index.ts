
export const API_ROUTES = {
  admin:{
    membership: "/admin/membership",
    create_membership: "/admin/membership",
    update_membership: "/admin/membership",
    delete_membership: "/admin/membership",
  },
  catalog:{
    get_all_catalogs:"/service/catalogs/all",
    get_catalog: "/admin/service/catalogs",
    create_catalog: "/admin/service/catalogs",
  },
  type:{
    get_catalog: "/admin/service/types",
    create_catalog: "/admin/service/types",
  },
  image: {
    upload: "/image",
  },
  auth: {
    login: "/admin/login",
  },
  apply_freelance: {
    get_all: "/admin/jobs/pending",
    approve_request: "/admin/jobs/approve",
    reject_request: "/admin/profile/deny/freelancer",
    get_job_detail: "/admin/jobs/detail",
    get_freelancer_list: "/admin/profile/verify/freelancer/list",
    get_freelancer_detail: "/admin/profile/verify/freelancer",
    verify_freelancer: "/admin/profile/verify/freelancer",
    approve_payment: "/admin/profile/payment/status"
  },
  bank:{
    get_bank: "admin/banks",
    search_bank:"admin/banks/search",
    add_bank:"admin/banks",
    import_bank:"/admin/banks/import"
  }
};