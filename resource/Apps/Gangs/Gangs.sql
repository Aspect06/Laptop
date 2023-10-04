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
