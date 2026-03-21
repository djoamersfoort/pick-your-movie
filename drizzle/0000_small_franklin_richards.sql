CREATE TABLE `movie` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`bkey` text NOT NULL,
	`title` text NOT NULL,
	`image` text NOT NULL,
	`year` integer NOT NULL,
	`score` integer NOT NULL,
	`age_rating` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `movie_bkey_unique` ON `movie` (`bkey`);--> statement-breakpoint
CREATE UNIQUE INDEX `movie_title_unique` ON `movie` (`title`);--> statement-breakpoint
CREATE TABLE `user` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`bkey` text NOT NULL,
	`name` text NOT NULL,
	`age` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `user_bkey_unique` ON `user` (`bkey`);--> statement-breakpoint
CREATE UNIQUE INDEX `user_name_unique` ON `user` (`name`);--> statement-breakpoint
CREATE TABLE `vote` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`bkey` text NOT NULL,
	`movie_id` integer,
	`user_id` integer,
	FOREIGN KEY (`movie_id`) REFERENCES `movie`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `vote_bkey_unique` ON `vote` (`bkey`);--> statement-breakpoint
CREATE UNIQUE INDEX `vote_movie_user` ON `vote` (`movie_id`,`user_id`);