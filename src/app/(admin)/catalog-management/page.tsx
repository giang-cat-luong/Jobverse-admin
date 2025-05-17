"use client";
import { API_ROUTES } from "@/api/endpoints";
import Error from "@/app/error";
import CatalogManagements from "@/components/CatalogManagement";
import Loading from "@/components/Loading";
import SellerHeader from "@/components/SellerHeader";
import { usePrivateFetch } from "@/hooks/api-hooks";
import { ServiceCatalogData } from "@/types/catalog";

const CatalogManagement = () => {

  const {
      data: catalogList,
      isLoading,
      error,
      mutate
    } = usePrivateFetch<ServiceCatalogData>(API_ROUTES.catalog.get_all_catalogs);
    
    console.log("Catalog List", catalogList);
  
    if (!catalogList || !catalogList.service_catalogs) return <Loading />;
    if (isLoading) return <Loading />;
    if (error) return <Error />;

  return (
    <div className="flex-1">
      <SellerHeader />

      <div className="container mx-auto px-6 py-6">
        <CatalogManagements catalogData={catalogList} />
      </div>
    </div>
  );
};

export default CatalogManagement;
