CREATE TABLE "users" (
  "id" int PRIMARY KEY,
  "userName" varchar,
  "loggedIn" boolean,
  "avatar" varchar,
  "gender" char,
  "ip" varchar,
  "location" varchar,
  "createdAt" timestamp,
  "updatedAt" timestamp
);

CREATE TABLE "rooms" (
  "id" int PRIMARY KEY,
  "name" varchar,
  "title" varchar,
  "avatar" string,
  "createdAt" timestamp,
  "updatedAt" timestamp
);

CREATE TABLE "roomMembers" (
  "id" int PRIMARY KEY,
  "roomId" int,
  "memberId" int
);

CREATE TABLE "conversations" (
  "from" int,
  "to" int,
  "type" varchar,
  "text" varchar,
  "at" timestamp,
  "read" boolean,
  "sent" boolean,
  "delievered" boolean
);

ALTER TABLE "roomMembers" ADD FOREIGN KEY ("roomId") REFERENCES "rooms" ("id");

ALTER TABLE "roomMembers" ADD FOREIGN KEY ("memberId") REFERENCES "users" ("id");

ALTER TABLE "conversations" ADD FOREIGN KEY ("from") REFERENCES "users" ("id");

ALTER TABLE "conversations" ADD FOREIGN KEY ("to") REFERENCES "users" ("id");

ALTER TABLE "conversations" ADD FOREIGN KEY ("to") REFERENCES "roomMembers" ("id");