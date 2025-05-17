type ServiceCatalogData = {
    service_catalogs: ServiceCatalog[];
  };
  
  type ServiceCatalog = {
    id: string;
    name: string;
    image: string | null;
    sections: Section[];
  };
  
  type Section = {
    section_title: string;
    categories: Category[];
  };
  
  type Category = {
    id: string;
    name: string;
    image: string | null;
  };

  export type { ServiceCatalogData, ServiceCatalog, Section, Category };
  