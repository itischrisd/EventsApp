CREATE DATABASE IF NOT EXISTS events_db;

USE events_db;

DROP TABLE IF EXISTS Participations;
DROP TABLE IF EXISTS Events;
DROP TABLE IF EXISTS Users;

CREATE TABLE Users
(
    id        INT AUTO_INCREMENT PRIMARY KEY,
    username  VARCHAR(255) NOT NULL,
    email     VARCHAR(255) NOT NULL UNIQUE,
    password  VARCHAR(255) NOT NULL,
    isAdmin   TINYINT(1)   NOT NULL,
    deletedAt DATETIME
);


CREATE TABLE Events
(
    id          INT AUTO_INCREMENT PRIMARY KEY,
    name        VARCHAR(255) NOT NULL,
    description TEXT,
    date        DATETIME     NOT NULL,
    createdBy   INT          NOT NULL,
    deletedAt   DATETIME,
    FOREIGN KEY (createdBy) REFERENCES Users (id) ON DELETE CASCADE
);

CREATE TABLE Participations
(
    id               INT AUTO_INCREMENT PRIMARY KEY,
    userId           INT                                NOT NULL,
    eventId          INT                                NOT NULL,
    comment          TEXT,
    registrationDate DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deletedAt        DATETIME,
    FOREIGN KEY (userId) REFERENCES Users (id) ON DELETE CASCADE,
    FOREIGN KEY (eventId) REFERENCES Events (id) ON DELETE CASCADE,
    UNIQUE (userId, eventId)
);
