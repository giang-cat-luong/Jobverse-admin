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
};