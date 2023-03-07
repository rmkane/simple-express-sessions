DROP TABLE IF EXISTS `accounts`;

CREATE TABLE IF NOT EXISTS `accounts` (
  `id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  `username` VARCHAR(50) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `email` VARCHAR(100) NOT NULL
);

INSERT INTO `accounts` (`username`, `password`, `email`)
  VALUES ('admin', 'admin', 'admin@admin.com'),
    ('test', 'test', 'test@test.com');