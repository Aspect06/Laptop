CREATE TABLE `sprays` (
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`Gang` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
	`Model` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
	`x` LONGTEXT NOT NULL COLLATE 'utf8mb4_general_ci',
	`y` LONGTEXT NOT NULL COLLATE 'utf8mb4_general_ci',
	`z` LONGTEXT NOT NULL COLLATE 'utf8mb4_general_ci',
	`Heading` LONGTEXT NOT NULL COLLATE 'utf8mb4_general_ci',
	`Contest` LONGTEXT NULL DEFAULT '{"ContestedBy":"","BeingContested":false}' COLLATE 'utf8mb4_general_ci',
	PRIMARY KEY (`id`) USING BTREE
)
COLLATE='utf8mb4_general_ci'
ENGINE=InnoDB
AUTO_INCREMENT=57
;
