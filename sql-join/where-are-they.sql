select "addresses"."line1" as "streetAddress",
       "addresses"."district",
       "cities"."name" as "city"
  from "addresses"
  join "cities" using ("cityId");
