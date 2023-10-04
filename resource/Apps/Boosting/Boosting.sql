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
