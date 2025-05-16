import { CatalogManagements } from "@/components/CatalogManagement";
import SellerHeader from "@/components/SellerHeader";
import { mockCatalogData } from "@/lib/mock-data";

const CatalogManagement = () => {
  return (
    <div className="flex-1">
      <SellerHeader />

      <div className="container mx-auto px-6 py-6">
        <CatalogManagements catalogData={mockCatalogData} />
      </div>
    </div>
  );
};

export default CatalogManagement;
