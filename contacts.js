const fs = require("node:fs/promises");
const path = require("node:path");
const crypto = require("crypto");

const filePath = path.join(__dirname, "./", "db", "contacts.json");

async function readFile() {
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data);
}

async function writeFile(contacts) {
    await fs.writeFile(filePath, JSON.stringify(contacts));
}

async function listContacts() {
    const contacts = await readFile();
    console.table(contacts);
    return contacts;
}

async function getContactById(contactId) {
    const contacts = await readFile();
    const contact = contacts.filter((contact) => contact.id === contactId);
    if (contact.length === 0) {
        console.log("null");
    } else {
        console.table(contact);
    }
    return contact;
}

async function removeContact(contactId) {
    const contacts = await readFile();
    const contact = contacts.filter((contact) => contact.id !== contactId);
    await writeFile(contact);
    if (contact.length === contacts.length) {
        console.log("null");
    } else {
        console.table(contact);
    }
    return contact;
}

async function addContact(name, email, phone) {
    const contacts = await readFile();
    const contact = { id: crypto.randomUUID(), name, phone, email };
    contacts.push(contact);
    console.table(contacts);
    await writeFile(contacts);
    return contacts;
}

module.exports = { listContacts, getContactById, removeContact, addContact };
