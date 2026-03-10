import {
  mysqlTable,
  mysqlSchema,
  AnyMySqlColumn,
  index,
  smallint,
  varchar,
  timestamp,
  foreignKey,
  datetime,
  text,
  decimal,
  mysqlEnum,
  char,
  int,
  unique,
  mysqlView,
  mediumtext,
  tinyint,
  mediumint,
  year,
} from 'drizzle-orm/mysql-core';
import { sql } from 'drizzle-orm';
import { primaryKey } from 'drizzle-orm/mysql-core';

export const actor = mysqlTable(
  'actor',
  {
    actorId: smallint('actor_id').autoincrement().notNull().primaryKey(),
    firstName: varchar('first_name', { length: 45 }).notNull(),
    lastName: varchar('last_name', { length: 45 }).notNull(),
    lastUpdate: timestamp('last_update', { mode: 'string' })
      .default(sql`current_timestamp()`)
      .notNull(),
  },
  (table) => [index('idx_actor_last_name').on(table.lastName)],
);

export const address = mysqlTable(
  'address',
  {
    addressId: smallint('address_id').autoincrement().notNull().primaryKey(),
    address: varchar({ length: 50 }).notNull(),
    address2: varchar({ length: 50 }),
    district: varchar({ length: 20 }).notNull(),
    cityId: smallint('city_id')
      .notNull()
      .references(() => city.cityId, {
        onDelete: 'restrict',
        onUpdate: 'cascade',
      }),
    postalCode: varchar('postal_code', { length: 10 }),
    phone: varchar({ length: 20 }).notNull(),
    lastUpdate: timestamp('last_update', { mode: 'string' })
      .default(sql`current_timestamp()`)
      .notNull(),
  },
  (table) => [index('idx_fk_city_id').on(table.cityId)],
);

export const category = mysqlTable('category', {
  categoryId: tinyint('category_id').autoincrement().notNull().primaryKey(),
  name: varchar({ length: 25 }).notNull(),
  lastUpdate: timestamp('last_update', { mode: 'string' })
    .default(sql`current_timestamp()`)
    .notNull(),
});

export const city = mysqlTable(
  'city',
  {
    cityId: smallint('city_id').autoincrement().notNull().primaryKey(),
    city: varchar({ length: 50 }).notNull(),
    countryId: smallint('country_id')
      .notNull()
      .references(() => country.countryId, {
        onDelete: 'restrict',
        onUpdate: 'cascade',
      }),
    lastUpdate: timestamp('last_update', { mode: 'string' })
      .default(sql`current_timestamp()`)
      .notNull(),
  },
  (table) => [index('idx_fk_country_id').on(table.countryId)],
);

export const country = mysqlTable('country', {
  countryId: smallint('country_id').autoincrement().notNull().primaryKey(),
  country: varchar({ length: 50 }).notNull(),
  lastUpdate: timestamp('last_update', { mode: 'string' })
    .default(sql`current_timestamp()`)
    .notNull(),
});

export const customer = mysqlTable(
  'customer',
  {
    customerId: smallint('customer_id').autoincrement().notNull().primaryKey(),
    storeId: tinyint('store_id')
      .notNull()
      .references(() => store.storeId, {
        onDelete: 'restrict',
        onUpdate: 'cascade',
      }),
    firstName: varchar('first_name', { length: 45 }).notNull(),
    lastName: varchar('last_name', { length: 45 }).notNull(),
    email: varchar({ length: 50 }),
    addressId: smallint('address_id')
      .notNull()
      .references(() => address.addressId, {
        onDelete: 'restrict',
        onUpdate: 'cascade',
      }),
    active: tinyint().default(1).notNull(),
    createDate: datetime('create_date', { mode: 'string' }).notNull(),
    lastUpdate: timestamp('last_update', { mode: 'string' })
      .default(sql`current_timestamp()`)
      .notNull(),
  },
  (table) => [
    index('idx_fk_store_id').on(table.storeId),
    index('idx_fk_address_id').on(table.addressId),
    index('idx_last_name').on(table.lastName),
  ],
);

export const film = mysqlTable(
  'film',
  {
    filmId: smallint('film_id').autoincrement().notNull().primaryKey(),
    title: varchar({ length: 128 }).notNull(),
    description: text(),
    // Warning: Can't parse year(4) from database
    releaseYear: year('release_year'),
    languageId: tinyint('language_id')
      .notNull()
      .references(() => language.languageId, {
        onDelete: 'restrict',
        onUpdate: 'cascade',
      }),
    originalLanguageId: tinyint('original_language_id').references(
      () => language.languageId,
      {
        onDelete: 'restrict',
        onUpdate: 'cascade',
      },
    ),
    rentalDuration: tinyint('rental_duration').default(3).notNull(),
    rentalRate: decimal('rental_rate', { precision: 4, scale: 2 })
      .default('4.99')
      .notNull(),
    length: smallint(),
    replacementCost: decimal('replacement_cost', { precision: 5, scale: 2 })
      .default('19.99')
      .notNull(),
    rating: mysqlEnum(['G', 'PG', 'PG-13', 'R', 'NC-17']).default('G'),
    // Warning: Can't parse set('Trailers','Commentaries','Deleted Scenes','Behind the Scenes') from database
    // set('Trailers','Commentaries','Deleted Scenes','Behind the Scenes')Type: set('Trailers','Commentaries','Deleted Scenes','Behind the Scenes')("special_features"),
    lastUpdate: timestamp('last_update', { mode: 'string' })
      .default(sql`current_timestamp()`)
      .notNull(),
  },
  (table) => [
    index('idx_title').on(table.title),
    index('idx_fk_language_id').on(table.languageId),
    index('idx_fk_original_language_id').on(table.originalLanguageId),
  ],
);

export const filmActor = mysqlTable(
  'film_actor',
  {
    actorId: smallint('actor_id')
      .notNull()
      .references(() => actor.actorId, {
        onDelete: 'restrict',
        onUpdate: 'cascade',
      }),
    filmId: smallint('film_id')
      .notNull()
      .references(() => film.filmId, {
        onDelete: 'restrict',
        onUpdate: 'cascade',
      }),
    lastUpdate: timestamp('last_update', { mode: 'string' })
      .default(sql`current_timestamp()`)
      .notNull(),
  },
  (table) => [index('idx_fk_film_id').on(table.filmId)],
);

export const filmCategory = mysqlTable('film_category', {
  filmId: smallint('film_id')
    .notNull()
    .references(() => film.filmId, {
      onDelete: 'restrict',
      onUpdate: 'cascade',
    }),
  categoryId: tinyint('category_id')
    .notNull()
    .references(() => category.categoryId, {
      onDelete: 'restrict',
      onUpdate: 'cascade',
    }),
  lastUpdate: timestamp('last_update', { mode: 'string' })
    .default(sql`current_timestamp()`)
    .notNull(),
});

export const filmText = mysqlTable('film_text', {
  filmId: smallint('film_id').notNull(),
  title: varchar({ length: 255 }).notNull(),
  description: varchar({ length: 2000 }),
});

export const inventory = mysqlTable(
  'inventory',
  {
    inventoryId: mediumint('inventory_id')
      .autoincrement()
      .notNull()
      .primaryKey(),
    filmId: smallint('film_id')
      .notNull()
      .references(() => film.filmId, {
        onDelete: 'restrict',
        onUpdate: 'cascade',
      }),
    storeId: tinyint('store_id')
      .notNull()
      .references(() => store.storeId, {
        onDelete: 'restrict',
        onUpdate: 'cascade',
      }),
    lastUpdate: timestamp('last_update', { mode: 'string' })
      .default(sql`current_timestamp()`)
      .notNull(),
  },
  (table) => [
    index('idx_fk_film_id').on(table.filmId),
    index('idx_store_id_film_id').on(table.storeId, table.filmId),
  ],
);

export const language = mysqlTable('language', {
  languageId: tinyint('language_id').autoincrement().notNull().primaryKey(),
  name: char({ length: 20 }).notNull(),
  lastUpdate: timestamp('last_update', { mode: 'string' })
    .default(sql`current_timestamp()`)
    .notNull(),
});

export const payment = mysqlTable(
  'payment',
  {
    paymentId: smallint('payment_id').autoincrement().notNull().primaryKey(),
    customerId: smallint('customer_id')
      .notNull()
      .references(() => customer.customerId, {
        onDelete: 'restrict',
        onUpdate: 'cascade',
      }),
    staffId: tinyint('staff_id')
      .notNull()
      .references(() => staff.staffId, {
        onDelete: 'restrict',
        onUpdate: 'cascade',
      }),
    rentalId: int('rental_id').references(() => rental.rentalId, {
      onDelete: 'set null',
      onUpdate: 'cascade',
    }),
    amount: decimal({ precision: 5, scale: 2 }).notNull(),
    paymentDate: datetime('payment_date', { mode: 'string' }).notNull(),
    lastUpdate: timestamp('last_update', { mode: 'string' })
      .default(sql`current_timestamp()`)
      .notNull(),
  },
  (table) => [
    index('idx_fk_staff_id').on(table.staffId),
    index('idx_fk_customer_id').on(table.customerId),
  ],
);

export const rental = mysqlTable(
  'rental',
  {
    rentalId: int('rental_id').autoincrement().notNull().primaryKey(),
    rentalDate: datetime('rental_date', { mode: 'string' }).notNull(),
    inventoryId: mediumint('inventory_id')
      .notNull()
      .references(() => inventory.inventoryId, {
        onDelete: 'restrict',
        onUpdate: 'cascade',
      }),
    customerId: smallint('customer_id')
      .notNull()
      .references(() => customer.customerId, {
        onDelete: 'restrict',
        onUpdate: 'cascade',
      }),
    returnDate: datetime('return_date', { mode: 'string' }),
    staffId: tinyint('staff_id')
      .notNull()
      .references(() => staff.staffId, {
        onDelete: 'restrict',
        onUpdate: 'cascade',
      }),
    lastUpdate: timestamp('last_update', { mode: 'string' })
      .default(sql`current_timestamp()`)
      .notNull(),
  },
  (table) => [
    index('idx_fk_inventory_id').on(table.inventoryId),
    index('idx_fk_customer_id').on(table.customerId),
    index('idx_fk_staff_id').on(table.staffId),
    unique('rental_date').on(
      table.rentalDate,
      table.inventoryId,
      table.customerId,
    ),
  ],
);

export const staff = mysqlTable(
  'staff',
  {
    staffId: tinyint('staff_id').autoincrement().notNull().primaryKey(),
    firstName: varchar('first_name', { length: 45 }).notNull(),
    lastName: varchar('last_name', { length: 45 }).notNull(),
    addressId: smallint('address_id')
      .notNull()
      .references(() => address.addressId, {
        onDelete: 'restrict',
        onUpdate: 'cascade',
      }),
    // Warning: Can't parse blob from database
    // blobType: blob("picture"),
    email: varchar({ length: 50 }),
    storeId: tinyint('store_id')
      .notNull()
      .references((): AnyMySqlColumn => store.storeId, {
        onDelete: 'restrict',
        onUpdate: 'cascade',
      }),
    active: tinyint().default(1).notNull(),
    username: varchar({ length: 16 }).notNull(),
    password: varchar({ length: 40 }),
    lastUpdate: timestamp('last_update', { mode: 'string' })
      .default(sql`current_timestamp()`)
      .notNull(),
  },
  (table) => [
    index('idx_fk_store_id').on(table.storeId),
    index('idx_fk_address_id').on(table.addressId),
  ],
);

export const store = mysqlTable(
  'store',
  {
    storeId: tinyint('store_id').autoincrement().notNull().primaryKey(),
    managerStaffId: tinyint('manager_staff_id')
      .notNull()
      .references((): AnyMySqlColumn => staff.staffId, {
        onDelete: 'restrict',
        onUpdate: 'cascade',
      }),
    addressId: smallint('address_id')
      .notNull()
      .references(() => address.addressId, {
        onDelete: 'restrict',
        onUpdate: 'cascade',
      }),
    lastUpdate: timestamp('last_update', { mode: 'string' })
      .default(sql`current_timestamp()`)
      .notNull(),
  },
  (table) => [
    index('idx_fk_address_id').on(table.addressId),
    unique('idx_unique_manager').on(table.managerStaffId),
  ],
);
