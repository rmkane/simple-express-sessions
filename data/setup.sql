DROP TABLE IF EXISTS `accounts`;

CREATE TABLE IF NOT EXISTS `accounts` (
  `id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  `username` VARCHAR(50) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `email` VARCHAR(100) NOT NULL
);

INSERT INTO `accounts` (`username`, `password`, `email`)
  VALUES ('admin', '$2b$10$3007AsiJaMlkhjSVI4iokedqylBaYVxIMMVCpb.zgk0kE3QSsJLwW', 'admin@admin.com'),
    ('test', '$2b$10$g.xonoayU/mT..hPOMlULeIhqjrLb9G6SB6ta9HsclKS1WbpTvzbi', 'test@test.com');