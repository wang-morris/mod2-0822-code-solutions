select "title",
       "filmId"
  from "films"
where "rentalRate" < '1'
limit 50;
