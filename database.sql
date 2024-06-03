CREATE TABLE "todo" (
"id" serial primary key,
"note" varchar (250),
"complete" boolean
);

INSERT INTO "todo"
	("note", "complete")
VALUES
	('make a database', 'true'),
	('make a table in the database', 'true'),
	('write code for the server', 'false');

    SELECT * FROM "todo";