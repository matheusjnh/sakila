import { film, category as categoryTable } from '@src/db/schema.js';
import { eq, like } from 'drizzle-orm';
import { MySql2Database } from 'drizzle-orm/mysql2';

// [
//   {
//     "id": 19,
//     "title": "AMADEUS HOLY",
//     "releaseYear": 2006,
//     "length": 113,
//     "rating": "PG",
//     "category": "Action"
//   }
// ]

export const getFilmsByCategory = async (
  db: MySql2Database,
  category: string,
) => {
  return await db
    .select({
      id: film.filmId,
      title: film.title,
      releaseYear: film.releaseYear,
      length: film.length,
      rating: film.rating,
    })
    .from(film)
    .where(eq(film.filmId, 1000));
};
