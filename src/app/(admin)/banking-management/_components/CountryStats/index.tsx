
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Globe, Building2, MapPin } from "lucide-react";
import { Country } from "@/types/bank";

interface CountryStatsProps {
  countries: Country[];
  totalBanks: number;
}

export function CountryStats({ countries, totalBanks }: CountryStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Countries</CardTitle>
          <Globe className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{countries.length}</div>
          <p className="text-xs text-muted-foreground">
            Supported countries
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Banks</CardTitle>
          <Building2 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalBanks}</div>
          <p className="text-xs text-muted-foreground">
            Banks in system
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Average</CardTitle>
          <MapPin className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {countries.length > 0 ? Math.round(totalBanks / countries.length) : 0}
          </div>
          <p className="text-xs text-muted-foreground">
            Banks per country
          </p>
        </CardContent>
      </Card>

      <Card className="md:col-span-2 lg:col-span-3">
        <CardHeader>
          <CardTitle className="text-sm font-medium">Distribution by Country</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {countries.map((country) => (
              <Badge key={country.country_code} variant="secondary" className="text-xs">
                {country.country_code} - {country.country_name} ({country.bank_count})
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
