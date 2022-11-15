-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_deliveryman" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_At" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_deliveryman" ("id", "password", "username") SELECT "id", "password", "username" FROM "deliveryman";
DROP TABLE "deliveryman";
ALTER TABLE "new_deliveryman" RENAME TO "deliveryman";
CREATE UNIQUE INDEX "deliveryman_username_key" ON "deliveryman"("username");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
