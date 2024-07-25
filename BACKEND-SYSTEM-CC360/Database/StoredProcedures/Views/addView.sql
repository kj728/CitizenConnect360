USE CITIZENCONNECT360;
GO
CREATE OR ALTER PROCEDURE addView(
    @id VARCHAR(255),
    @title VARCHAR(255),
    @description VARCHAR(4096),
    @viewsummary VARCHAR(1000),
    @createdby VARCHAR(255),
    @creatername VARCHAR(255),
    @createdat  VARCHAR(255)

)
AS
BEGIN
    INSERT INTO views
        (id, title, description, viewsummary, createdby,creatername, createdat)
    VALUES
        (@id, @title, @description, @viewsummary, @createdby, @creatername, @createdat)
END