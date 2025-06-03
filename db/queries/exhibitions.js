import client from '../client.js';

export async function getAllExhibitions() {
  const { rows } = await client.query(`SELECT * FROM exhibitions;`);
  return rows;
}

export async function getExhibitionById(id) {
  const { rows } = await client.query(`SELECT * FROM exhibitions WHERE id = $1;`, [id]);
  return rows[0];
}

export async function createExhibition({ name, location, start_date, end_date }) {
  const { rows } = await client.query(
    `
    INSERT INTO exhibitions (name, location, start_date, end_date)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
    `,
    [name, location, start_date, end_date]
  );
  return rows[0];
}

export async function updateExhibition(id, fields) {
  const keys = Object.keys(fields);

  if (keys.length === 0) {
    throw new Error("No fields provided for update");
  }

  const setStr = keys.map((key, index) => `"${key}" = $${index + 1}`).join(", ");
  const values = Object.values(fields);

  const { rows } = await client.query(
    `UPDATE exhibitions SET ${setStr} WHERE id = $${keys.length + 1} RETURNING *;`,
    [...values, id]
  );

  return rows[0];
}

export async function deleteExhibition(id) {
  const { rows } = await client.query(`DELETE FROM exhibitions WHERE id = $1 RETURNING *;`, [id]);
  return rows[0];
}
