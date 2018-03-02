/* todo sækja pakka sem vantar  */

const connectionString = process.env.DATABASE_URL;
const { Client } = require('pg');

/**
 * Create a note asynchronously.
 *
 * @param {Object} note - Note to create
 * @param {string} note.title - Title of note
 * @param {string} note.text - Text of note
 * @param {string} note.datetime - Datetime of note
 *
 * @returns {Promise} Promise representing the object result of creating the note
 */

async function create({ title, text, datetime } = {}) {
  const client = new Client({ connectionString });
  await client.connect();
  const query = 'INSERT INTO notes(title, text, datetime) VALUES($1, $2, $3)';
  const values = [title, text, datetime];
  try {
    await client.query(query, values);
  } catch (err) {
    console.error('Error inserting data');
    throw err;
  } finally {
    await client.end();
  }
}

/**
 * Read all notes.
 *
 * @returns {Promise} Promise representing an array of all note objects
 */

async function readAll() {
  const client = new Client({ connectionString });
  await client.connect();

  try {
    const result = await client.query('SELECT * FROM notes');
    const { rows } = result;
    return rows;
  } catch (err) {
    console.error('Error selecting data');
    throw err;
  } finally {
    await client.end();
  }
}


/**
 * Read a single note.
 *
 * @param {number} id - Id of note
 *
 * @returns {Promise} Promise representing the note object or null if not found
 */
async function readOne(id) {
  /* todo útfæra */
  const client = new Client({ connectionString });
  await client.connect();
  try {
    const result = await client.query('SELECT id,title, text, datetime FROM notes WHERE id = ' + id);
    const { rows } = result;
    return rows;
  } catch (e) {
    console.error('Error selecting data');
    throw e;
    const s = 'query not found';
    return s;
  } finally {
    await client.end();
  }
}

/**
 * Update a note asynchronously.
 *
 * @param {number} id - Id of note to update
 * @param {Object} note - Note to create
 * @param {string} note.title - Title of note
 * @param {string} note.text - Text of note
 * @param {string} note.datetime - Datetime of note
 *
 * @returns {Promise} Promise representing the object result of creating the note
 */
async function update(id, { title, text, datetime } = {}) {
  /* todo útfæra */
  const client = new Client({ connectionString });
  await client.connect();
  try {
    const values = [title, text, datetime];
    await client.query('UPDATE notes SET title = $1, text = $2, datetime = $3 WHERE id = ' + id, values);
    const item = await readOne(id);
    return item;
  } catch (e) {
    console.error('Error updating data');
    throw e;
    return "query not found";
  } finally {
    await client.end();
  }
}

/**
 * Delete a note asynchronously.
 *
 * @param {number} id - Id of note to delete
 *
 * @returns {Promise} Promise representing the boolean result of creating the note
 */
async function del(id) {
  /* todo útfæra */
  const client = new Client({ connectionString });
  await client.connect();
  try {
    await client.query('DELETE FROM notes WHERE id = ' + id);
    return 'success';
  } catch (e) {
    console.error('Error deleting data');
    throw e;
  } finally {
    await client.end();
  }
}

module.exports = {
  create,
  readAll,
  readOne,
  update,
  del,
};
