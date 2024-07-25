CREATE Table comments
(
    id VARCHAR (255) PRIMARY KEY NOT NULL,
    comment VARCHAR(4096) NOT NULL,
    viewid VARCHAR(255) NOT NULL,
    createdby VARCHAR(255) NOT NULL,
    creatername VARCHAR(255) NOT NULL,
    createdat VARCHAR(255) NOT NULL,
    isDeleted INT DEFAULT 0,
    FOREIGN KEY (createdby) REFERENCES users(id),
    FOREIGN KEY (viewid) REFERENCES views(id)
)

SELECT * FROM comments

DROP TABLE comments