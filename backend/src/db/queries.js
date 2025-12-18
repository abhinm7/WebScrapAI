const { eq } = require("drizzle-orm");
const { db } = require("./index.js");
const { tasks } = require("./schema.js");

const createTask = async (data) => {
    await db.insert(tasks).values(data);
}

const updateTask = async (id, updates) => {
    await db.update(tasks).set(updates).where(eq(tasks.id, id));
}

const fetchTask = async (id) => {
    const result = await db
        .select()
        .from(tasks)
        .where(eq(tasks.id, id));
    return result[0];
};


module.exports = { createTask, updateTask, fetchTask };