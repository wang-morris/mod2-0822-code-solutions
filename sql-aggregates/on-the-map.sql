select "countries"."name" as "country",
    count("cities"."countryId") as "cities"
  from "countries"
  join "cities" using ("countryId")
  group by ("countries"."name");
