CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Table Definition
CREATE TABLE "public"."accounts" (
    "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
    "email" text,
    "created_at" timestamptz,
    "stripe_customer_id" varchar,
    PRIMARY KEY ("id")
);

-- Table Definition
CREATE TABLE "public"."account_sessions" (
    "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
    "account_id" uuid NOT NULL,
    "token" uuid NOT NULL,
    "deleted_at" timestamptz,
    "created_at" timestamptz NOT NULL,
    "ip" text,
    PRIMARY KEY ("id")
);

-- Table Definition
CREATE TABLE "public"."products" (
    "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
    "name" text,
    "price" int4,
    PRIMARY KEY ("id")
);