
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
    const store = tx.objectStore('propertys');
    var updateProperty = await store.get(property.id!) as Property
    //update the found record with new values
    updateProperty.property  = property.property
    updateProperty.bedrooms = property.bedrooms
    updateProperty.monthlyRent =property.monthlyRent
    updateProperty.furniture = property.furniture
    updateProperty.notes = property.notes
    updateProperty.reporter = property.reporter
    updateProperty.time = property.time
    console.log(updateProperty)
    //really do the update: from memory ->database
    await db.put("propertys",updateProperty);
    await tx.done;
}

export async function deleteProperty(id:number) {
    const db = await openDB(DATABASE_NAME, 1);
    await db.delete("propertys",id);
}

export async function getProperty(id:number) {
    const db = await openDB(DATABASE_NAME, 1);
    const property = await db.get('propertys',id)
    console.log("i am getting the property "+ property)
    return property;
}

export async function getAllPropertys() {
    const db = await openDB(DATABASE_NAME, 1);
    var cursor = await db.transaction("propertys").objectStore("propertys").
         
    openCursor();
    var propertys = []; //init an empty array
    //while there are propertys left
    while (cursor) {
        propertys.push(cursor.value); //add the new property to the result
        cursor = await cursor.continue(); //move to the next property
    }
    return propertys;
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