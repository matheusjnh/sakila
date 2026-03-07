import { relations } from 'drizzle-orm/relations';
import {
  city,
  address,
  country,
  customer,
  store,
  language,
  film,
  actor,
  filmActor,
  category,
  filmCategory,
  inventory,
  payment,
  rental,
  staff,
} from './schema.ts';

export const addressRelations = relations(address, ({ one, many }) => ({
  city: one(city, {
    fields: [address.cityId],
    references: [city.cityId],
  }),
  customers: many(customer),
  staff: many(staff),
  stores: many(store),
}));

export const cityRelations = relations(city, ({ one, many }) => ({
  addresses: many(address),
  country: one(country, {
    fields: [city.countryId],
    references: [country.countryId],
  }),
}));

export const countryRelations = relations(country, ({ many }) => ({
  cities: many(city),
}));

export const customerRelations = relations(customer, ({ one, many }) => ({
  address: one(address, {
    fields: [customer.addressId],
    references: [address.addressId],
  }),
  store: one(store, {
    fields: [customer.storeId],
    references: [store.storeId],
  }),
  payments: many(payment),
  rentals: many(rental),
}));

export const storeRelations = relations(store, ({ one, many }) => ({
  customers: many(customer),
  inventories: many(inventory),
  staff_storeId: many(staff, {
    relationName: 'staff_storeId_store_storeId',
  }),
  address: one(address, {
    fields: [store.addressId],
    references: [address.addressId],
  }),
  staff_managerStaffId: one(staff, {
    fields: [store.managerStaffId],
    references: [staff.staffId],
    relationName: 'store_managerStaffId_staff_staffId',
  }),
}));

export const filmRelations = relations(film, ({ one, many }) => ({
  language_languageId: one(language, {
    fields: [film.languageId],
    references: [language.languageId],
    relationName: 'film_languageId_language_languageId',
  }),
  language_originalLanguageId: one(language, {
    fields: [film.originalLanguageId],
    references: [language.languageId],
    relationName: 'film_originalLanguageId_language_languageId',
  }),
  filmActors: many(filmActor),
  filmCategories: many(filmCategory),
  inventories: many(inventory),
}));

export const languageRelations = relations(language, ({ many }) => ({
  films_languageId: many(film, {
    relationName: 'film_languageId_language_languageId',
  }),
  films_originalLanguageId: many(film, {
    relationName: 'film_originalLanguageId_language_languageId',
  }),
}));

export const filmActorRelations = relations(filmActor, ({ one }) => ({
  actor: one(actor, {
    fields: [filmActor.actorId],
    references: [actor.actorId],
  }),
  film: one(film, {
    fields: [filmActor.filmId],
    references: [film.filmId],
  }),
}));

export const actorRelations = relations(actor, ({ many }) => ({
  filmActors: many(filmActor),
}));

export const filmCategoryRelations = relations(filmCategory, ({ one }) => ({
  category: one(category, {
    fields: [filmCategory.categoryId],
    references: [category.categoryId],
  }),
  film: one(film, {
    fields: [filmCategory.filmId],
    references: [film.filmId],
  }),
}));

export const categoryRelations = relations(category, ({ many }) => ({
  filmCategories: many(filmCategory),
}));

export const inventoryRelations = relations(inventory, ({ one, many }) => ({
  film: one(film, {
    fields: [inventory.filmId],
    references: [film.filmId],
  }),
  store: one(store, {
    fields: [inventory.storeId],
    references: [store.storeId],
  }),
  rentals: many(rental),
}));

export const paymentRelations = relations(payment, ({ one }) => ({
  customer: one(customer, {
    fields: [payment.customerId],
    references: [customer.customerId],
  }),
  rental: one(rental, {
    fields: [payment.rentalId],
    references: [rental.rentalId],
  }),
  staff: one(staff, {
    fields: [payment.staffId],
    references: [staff.staffId],
  }),
}));

export const rentalRelations = relations(rental, ({ one, many }) => ({
  payments: many(payment),
  customer: one(customer, {
    fields: [rental.customerId],
    references: [customer.customerId],
  }),
  inventory: one(inventory, {
    fields: [rental.inventoryId],
    references: [inventory.inventoryId],
  }),
  staff: one(staff, {
    fields: [rental.staffId],
    references: [staff.staffId],
  }),
}));

export const staffRelations = relations(staff, ({ one, many }) => ({
  payments: many(payment),
  rentals: many(rental),
  address: one(address, {
    fields: [staff.addressId],
    references: [address.addressId],
  }),
  store: one(store, {
    fields: [staff.storeId],
    references: [store.storeId],
    relationName: 'staff_storeId_store_storeId',
  }),
  stores: many(store, {
    relationName: 'store_managerStaffId_staff_staffId',
  }),
}));
