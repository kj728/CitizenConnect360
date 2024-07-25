
USE CITIZENCONNECT360;
GO

CREATE OR ALTER PROCEDURE addComment(
    @id VARCHAR(255),
    @comment VARCHAR(4096),
    @viewid VARCHAR(255),
    @createdby VARCHAR(255),
    @creatername VARCHAR(255),
    @createdat VARCHAR(255)
)
AS
BEGIN
    INSERT INTO comments
        (id, comment, viewid, createdby,creatername, createdat)
    VALUES
        (@id, @comment, @viewid, @createdby,@creatername, @createdat)
END