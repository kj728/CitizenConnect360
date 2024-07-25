CREATE TABLE views
(
    id VARCHAR(255) PRIMARY KEY NOT NULL,
    title VARCHAR (255) NOT NULL,
    description VARCHAR (4096) NOT NULL,
    viewsummary VARCHAR (1024) NOT NULL,
    createdby VARCHAR(255) NOT NULL,
    creatername VARCHAR(255) NOT NULL,
    createdat VARCHAR(255) NOT NULL,
    isDeleted INT DEFAULT 0,
    FOREIGN KEY (createdby) REFERENCES users(id)

)

SELECT *
FROM views;

DROP TABLE views