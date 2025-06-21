import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Globe, Building2, MapPin } from "lucide-react";
import { Bank } from "@/types/bank";

interface CountryStatsProps {
  banks: Bank[];
}

export function CountryStats({ banks }: CountryStatsProps) {
  // ✅ Group by country
  const countryMap: Record<string, { name: string; count: number }> = {};

  for (const bank of banks) {
    if (!countryMap[bank.country]) {
      countryMap[bank.country] = { name: bank.country, count: 1 };
    } else {
      countryMap[bank.country].count++;
    }
  }

  const countries = Object.entries(countryMap).map(([code, { name, count }]) => ({
    country_code: code,
    country_name: name,
    bank_count: count,
  }));

  const totalBanks = banks.length;
  const totalCountries = countries.length;
  const average = totalCountries > 0 ? Math.round(totalBanks / totalCountries) : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Countries</CardTitle>
          <Globe className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalCountries}</div>
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
          <div className="text-2xl font-bold">{average}</div>
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
