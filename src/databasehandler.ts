
import { openDB } from 'idb'
import { Property } from './models'

const DATABASE_NAME = 'DEMO DB'

initDB().then(()=>{
    console.log("Init database done! ",DATABASE_NAME)
})




export async function updateProperty(property:Property) {
    //find in the database with the id
    const db = await openDB(DATABASE_NAME, 1);
    const tx = db.transaction('propertys', 'readwrite');
    await db.put("propertys",property);
    await tx.done;
}

export async function deleteProperty(id:number) {
    const db = await openDB(DATABASE_NAME, 1);
    await db.delete("propertys",id);
}

export async function getProperty(id:number) {
    const db = await openDB(DATABASE_NAME, 1);
    const property = await db.get('propertys',id)
    return property;
}

export async function getAllPropertys() {
    const db = await openDB(DATABASE_NAME, 1);
    var cursor = await db.getAll("propertys")
    return cursor;
}

export async function  insertProperty(property:Property){
    const db = await openDB(DATABASE_NAME, 1)
    const tx = db.transaction('propertys', 'readwrite');
    //store means table
    const store = tx.objectStore('propertys');
    await store.put(property)
    console.log("insertion done!")
}

//if database has not created, it will create a new one
async function initDB(){
    const db = await openDB(DATABASE_NAME,1,{
        upgrade(db){
            // Create a store of objects
            const store = db.createObjectStore('propertys', {
                // The 'id' property of the object will be the key.
                keyPath: 'id',
                // If it isn't explicitly set, create a value by auto incrementing.
                autoIncrement: true,
            });
        }
    })
}