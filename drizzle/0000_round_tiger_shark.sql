CREATE TABLE `actor` (
	`actor_id` smallint AUTO_INCREMENT NOT NULL,
	`first_name` varchar(45) NOT NULL,
	`last_name` varchar(45) NOT NULL,
	`last_update` timestamp NOT NULL DEFAULT current_timestamp(),
	CONSTRAINT `actor_actor_id` PRIMARY KEY(`actor_id`)
);
--> statement-breakpoint
CREATE TABLE `address` (
	`address_id` smallint AUTO_INCREMENT NOT NULL,
	`address` varchar(50) NOT NULL,
	`address2` varchar(50),
	`district` varchar(20) NOT NULL,
	`city_id` smallint NOT NULL,
	`postal_code` varchar(10),
	`phone` varchar(20) NOT NULL,
	`last_update` timestamp NOT NULL DEFAULT current_timestamp(),
	CONSTRAINT `address_address_id` PRIMARY KEY(`address_id`)
);
--> statement-breakpoint
CREATE TABLE `category` (
	`category_id` tinyint AUTO_INCREMENT NOT NULL,
	`name` varchar(25) NOT NULL,
	`last_update` timestamp NOT NULL DEFAULT current_timestamp(),
	CONSTRAINT `category_category_id` PRIMARY KEY(`category_id`)
);
--> statement-breakpoint
CREATE TABLE `city` (
	`city_id` smallint AUTO_INCREMENT NOT NULL,
	`city` varchar(50) NOT NULL,
	`country_id` smallint NOT NULL,
	`last_update` timestamp NOT NULL DEFAULT current_timestamp(),
	CONSTRAINT `city_city_id` PRIMARY KEY(`city_id`)
);
--> statement-breakpoint
CREATE TABLE `country` (
	`country_id` smallint AUTO_INCREMENT NOT NULL,
	`country` varchar(50) NOT NULL,
	`last_update` timestamp NOT NULL DEFAULT current_timestamp(),
	CONSTRAINT `country_country_id` PRIMARY KEY(`country_id`)
);
--> statement-breakpoint
CREATE TABLE `customer` (
	`customer_id` smallint AUTO_INCREMENT NOT NULL,
	`store_id` tinyint NOT NULL,
	`first_name` varchar(45) NOT NULL,
	`last_name` varchar(45) NOT NULL,
	`email` varchar(50),
	`address_id` smallint NOT NULL,
	`active` tinyint NOT NULL DEFAULT 1,
	`create_date` datetime NOT NULL,
	`last_update` timestamp NOT NULL DEFAULT current_timestamp(),
	CONSTRAINT `customer_customer_id` PRIMARY KEY(`customer_id`)
);
--> statement-breakpoint
CREATE TABLE `film` (
	`film_id` smallint AUTO_INCREMENT NOT NULL,
	`title` varchar(128) NOT NULL,
	`description` text,
	`release_year` year,
	`language_id` tinyint NOT NULL,
	`original_language_id` tinyint,
	`rental_duration` tinyint NOT NULL DEFAULT 3,
	`rental_rate` decimal(4,2) NOT NULL DEFAULT '4.99',
	`length` smallint,
	`replacement_cost` decimal(5,2) NOT NULL DEFAULT '19.99',
	`rating` enum('G','PG','PG-13','R','NC-17') DEFAULT 'G',
	`last_update` timestamp NOT NULL DEFAULT current_timestamp(),
	CONSTRAINT `film_film_id` PRIMARY KEY(`film_id`)
);
--> statement-breakpoint
CREATE TABLE `film_actor` (
	`actor_id` smallint NOT NULL,
	`film_id` smallint NOT NULL,
	`last_update` timestamp NOT NULL DEFAULT current_timestamp()
);
--> statement-breakpoint
CREATE TABLE `film_category` (
	`film_id` smallint NOT NULL,
	`category_id` tinyint NOT NULL,
	`last_update` timestamp NOT NULL DEFAULT current_timestamp()
);
--> statement-breakpoint
CREATE TABLE `film_text` (
	`film_id` smallint NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` varchar(2000)
);
--> statement-breakpoint
CREATE TABLE `inventory` (
	`inventory_id` mediumint AUTO_INCREMENT NOT NULL,
	`film_id` smallint NOT NULL,
	`store_id` tinyint NOT NULL,
	`last_update` timestamp NOT NULL DEFAULT current_timestamp(),
	CONSTRAINT `inventory_inventory_id` PRIMARY KEY(`inventory_id`)
);
--> statement-breakpoint
CREATE TABLE `language` (
	`language_id` tinyint AUTO_INCREMENT NOT NULL,
	`name` char(20) NOT NULL,
	`last_update` timestamp NOT NULL DEFAULT current_timestamp(),
	CONSTRAINT `language_language_id` PRIMARY KEY(`language_id`)
);
--> statement-breakpoint
CREATE TABLE `payment` (
	`payment_id` smallint AUTO_INCREMENT NOT NULL,
	`customer_id` smallint NOT NULL,
	`staff_id` tinyint NOT NULL,
	`rental_id` int,
	`amount` decimal(5,2) NOT NULL,
	`payment_date` datetime NOT NULL,
	`last_update` timestamp NOT NULL DEFAULT current_timestamp(),
	CONSTRAINT `payment_payment_id` PRIMARY KEY(`payment_id`)
);
--> statement-breakpoint
CREATE TABLE `rental` (
	`rental_id` int AUTO_INCREMENT NOT NULL,
	`rental_date` datetime NOT NULL,
	`inventory_id` mediumint NOT NULL,
	`customer_id` smallint NOT NULL,
	`return_date` datetime,
	`staff_id` tinyint NOT NULL,
	`last_update` timestamp NOT NULL DEFAULT current_timestamp(),
	CONSTRAINT `rental_rental_id` PRIMARY KEY(`rental_id`),
	CONSTRAINT `rental_date` UNIQUE(`rental_date`,`inventory_id`,`customer_id`)
);
--> statement-breakpoint
CREATE TABLE `staff` (
	`staff_id` tinyint AUTO_INCREMENT NOT NULL,
	`first_name` varchar(45) NOT NULL,
	`last_name` varchar(45) NOT NULL,
	`address_id` smallint NOT NULL,
	`email` varchar(50),
	`store_id` tinyint NOT NULL,
	`active` tinyint NOT NULL DEFAULT 1,
	`username` varchar(16) NOT NULL,
	`password` varchar(40),
	`last_update` timestamp NOT NULL DEFAULT current_timestamp(),
	CONSTRAINT `staff_staff_id` PRIMARY KEY(`staff_id`)
);
--> statement-breakpoint
CREATE TABLE `store` (
	`store_id` tinyint AUTO_INCREMENT NOT NULL,
	`manager_staff_id` tinyint NOT NULL,
	`address_id` smallint NOT NULL,
	`last_update` timestamp NOT NULL DEFAULT current_timestamp(),
	CONSTRAINT `store_store_id` PRIMARY KEY(`store_id`),
	CONSTRAINT `idx_unique_manager` UNIQUE(`manager_staff_id`)
);
--> statement-breakpoint
ALTER TABLE `address` ADD CONSTRAINT `address_city_id_city_city_id_fk` FOREIGN KEY (`city_id`) REFERENCES `city`(`city_id`) ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `city` ADD CONSTRAINT `city_country_id_country_country_id_fk` FOREIGN KEY (`country_id`) REFERENCES `country`(`country_id`) ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `customer` ADD CONSTRAINT `customer_store_id_store_store_id_fk` FOREIGN KEY (`store_id`) REFERENCES `store`(`store_id`) ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `customer` ADD CONSTRAINT `customer_address_id_address_address_id_fk` FOREIGN KEY (`address_id`) REFERENCES `address`(`address_id`) ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `film` ADD CONSTRAINT `film_language_id_language_language_id_fk` FOREIGN KEY (`language_id`) REFERENCES `language`(`language_id`) ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `film` ADD CONSTRAINT `film_original_language_id_language_language_id_fk` FOREIGN KEY (`original_language_id`) REFERENCES `language`(`language_id`) ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `film_actor` ADD CONSTRAINT `film_actor_actor_id_actor_actor_id_fk` FOREIGN KEY (`actor_id`) REFERENCES `actor`(`actor_id`) ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `film_actor` ADD CONSTRAINT `film_actor_film_id_film_film_id_fk` FOREIGN KEY (`film_id`) REFERENCES `film`(`film_id`) ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `film_category` ADD CONSTRAINT `film_category_film_id_film_film_id_fk` FOREIGN KEY (`film_id`) REFERENCES `film`(`film_id`) ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `film_category` ADD CONSTRAINT `film_category_category_id_category_category_id_fk` FOREIGN KEY (`category_id`) REFERENCES `category`(`category_id`) ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `inventory` ADD CONSTRAINT `inventory_film_id_film_film_id_fk` FOREIGN KEY (`film_id`) REFERENCES `film`(`film_id`) ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `inventory` ADD CONSTRAINT `inventory_store_id_store_store_id_fk` FOREIGN KEY (`store_id`) REFERENCES `store`(`store_id`) ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `payment` ADD CONSTRAINT `payment_customer_id_customer_customer_id_fk` FOREIGN KEY (`customer_id`) REFERENCES `customer`(`customer_id`) ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `payment` ADD CONSTRAINT `payment_staff_id_staff_staff_id_fk` FOREIGN KEY (`staff_id`) REFERENCES `staff`(`staff_id`) ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `payment` ADD CONSTRAINT `payment_rental_id_rental_rental_id_fk` FOREIGN KEY (`rental_id`) REFERENCES `rental`(`rental_id`) ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `rental` ADD CONSTRAINT `rental_inventory_id_inventory_inventory_id_fk` FOREIGN KEY (`inventory_id`) REFERENCES `inventory`(`inventory_id`) ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `rental` ADD CONSTRAINT `rental_customer_id_customer_customer_id_fk` FOREIGN KEY (`customer_id`) REFERENCES `customer`(`customer_id`) ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `rental` ADD CONSTRAINT `rental_staff_id_staff_staff_id_fk` FOREIGN KEY (`staff_id`) REFERENCES `staff`(`staff_id`) ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `staff` ADD CONSTRAINT `staff_address_id_address_address_id_fk` FOREIGN KEY (`address_id`) REFERENCES `address`(`address_id`) ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `staff` ADD CONSTRAINT `staff_store_id_store_store_id_fk` FOREIGN KEY (`store_id`) REFERENCES `store`(`store_id`) ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `store` ADD CONSTRAINT `store_manager_staff_id_staff_staff_id_fk` FOREIGN KEY (`manager_staff_id`) REFERENCES `staff`(`staff_id`) ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `store` ADD CONSTRAINT `store_address_id_address_address_id_fk` FOREIGN KEY (`address_id`) REFERENCES `address`(`address_id`) ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
CREATE INDEX `idx_actor_last_name` ON `actor` (`last_name`);--> statement-breakpoint
CREATE INDEX `idx_fk_city_id` ON `address` (`city_id`);--> statement-breakpoint
CREATE INDEX `idx_fk_country_id` ON `city` (`country_id`);--> statement-breakpoint
CREATE INDEX `idx_fk_store_id` ON `customer` (`store_id`);--> statement-breakpoint
CREATE INDEX `idx_fk_address_id` ON `customer` (`address_id`);--> statement-breakpoint
CREATE INDEX `idx_last_name` ON `customer` (`last_name`);--> statement-breakpoint
CREATE INDEX `idx_title` ON `film` (`title`);--> statement-breakpoint
CREATE INDEX `idx_fk_language_id` ON `film` (`language_id`);--> statement-breakpoint
CREATE INDEX `idx_fk_original_language_id` ON `film` (`original_language_id`);--> statement-breakpoint
CREATE INDEX `idx_fk_film_id` ON `film_actor` (`film_id`);--> statement-breakpoint
CREATE INDEX `idx_fk_film_id` ON `inventory` (`film_id`);--> statement-breakpoint
CREATE INDEX `idx_store_id_film_id` ON `inventory` (`store_id`,`film_id`);--> statement-breakpoint
CREATE INDEX `idx_fk_staff_id` ON `payment` (`staff_id`);--> statement-breakpoint
CREATE INDEX `idx_fk_customer_id` ON `payment` (`customer_id`);--> statement-breakpoint
CREATE INDEX `idx_fk_inventory_id` ON `rental` (`inventory_id`);--> statement-breakpoint
CREATE INDEX `idx_fk_customer_id` ON `rental` (`customer_id`);--> statement-breakpoint
CREATE INDEX `idx_fk_staff_id` ON `rental` (`staff_id`);--> statement-breakpoint
CREATE INDEX `idx_fk_store_id` ON `staff` (`store_id`);--> statement-breakpoint
CREATE INDEX `idx_fk_address_id` ON `staff` (`address_id`);--> statement-breakpoint
CREATE INDEX `idx_fk_address_id` ON `store` (`address_id`);