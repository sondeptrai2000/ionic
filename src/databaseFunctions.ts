import { openDB } from "idb";
import { Property } from "./models";

const DATABASE_NAME = "DEMO DB";
//if database has not created, it will create a new one
async function initDB() {
  const db = await openDB(DATABASE_NAME, 1, {
    upgrade(db) {
      // Create a store of objects
      const store = db.createObjectStore("propertys", {
        // The 'id' property of the object will be the key.
        keyPath: "id",
        // If it isn't explicitly set, create a value by auto incrementing.
        autoIncrement: true,
      });
    },
  });
}

initDB().then(() => {
  console.log("Init database done! ", DATABASE_NAME);
});

export async function updateProperty(property: Property) {
  //open database propertys
  const db = await openDB(DATABASE_NAME, 1);
  //update new property information
  await db.put("propertys", property);
}

export async function deleteProperty(id: number) {
  //open database propertys
  const db = await openDB(DATABASE_NAME, 1);
  //Delete property by id
  await db.delete("propertys", id);
}

export async function getProperty(id: number) {
  //open database propertys
  const db = await openDB(DATABASE_NAME, 1);
  //Get property information  by id
  const property = await db.get("propertys", id);
  return property;
}

export async function getAllPropertys() {
  //open database propertys
  const db = await openDB(DATABASE_NAME, 1);
  //Get all property information in DB
  var cursor = await db.getAll("propertys");
  console.log(cursor)
  return cursor;
}

export async function insertProperty(property: Property) {
  //open database propertys
  const db = await openDB(DATABASE_NAME, 1);
  const tx = db.transaction("propertys", "readwrite");
  //store means table
  const store = tx.objectStore("propertys");
  await store.put(property);
}
