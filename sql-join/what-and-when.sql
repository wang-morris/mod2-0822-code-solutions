select "genres"."name" as "genreName",
       "films"."releaseYear"
  from "genres"
  join  "filmGenre" using ("genreId")
  join  "films" using ("filmId")
  where "films"."title" = 'Boogie Amelie';
