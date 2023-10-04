ALTER TABLE `characters`
	ADD COLUMN `laptopData` LONGTEXT NULL DEFAULT '{"background": "https://cdn.discordapp.com/attachments/1144648749122076793/1144667642658050078/image.png", "darkMode": false}' AFTER `z`;

CREATE TABLE `boosting_contracts` (
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`stateId` INT(11) NULL DEFAULT NULL,
	`model` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
	`cost` INT(11) NULL DEFAULT '100',
	`class` VARCHAR(50) NULL DEFAULT 'D' COLLATE 'utf8mb4_general_ci',
	PRIMARY KEY (`id`) USING BTREE
)
COLLATE='utf8mb4_general_ci'
ENGINE=InnoDB
AUTO_INCREMENT=2
;

CREATE TABLE `gangs` (
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
	`members` LONGTEXT NULL DEFAULT '[]' COLLATE 'utf8mb4_general_ci',
	`progression` VARCHAR(50) NOT NULL DEFAULT '[]' COLLATE 'utf8mb4_general_ci',
	`ranks` LONGTEXT NULL DEFAULT '[{"label":"Leader", "managePermissions": true, "disabled": true}, {"label":"Member", "managePermissions": false, "disabled": true}]' COLLATE 'utf8mb4_general_ci',
	`sprayModel` VARCHAR(50) NULL DEFAULT '' COLLATE 'utf8mb4_general_ci',
	`GangSprays` LONGTEXT NULL DEFAULT '[]' COLLATE 'utf8mb4_general_ci',
	`DiscoveredSprays` LONGTEXT NULL DEFAULT '[]' COLLATE 'utf8mb4_general_ci',
	PRIMARY KEY (`id`) USING BTREE
)
COLLATE='utf8mb4_general_ci'
ENGINE=InnoDB
AUTO_INCREMENT=18
;

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