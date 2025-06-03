import client from "../client.js";

export async function getAllArtPieces() {
  const { rows } = await client.query(`SELECT * FROM pieces`);
  return rows;
}

export async function getArtPieceById(id) {
  const { rows } = await client.query(`SELECT * FROM pieces WHERE id = $1`, [
    id,
  ]);
  return rows[0];
}

export async function createArtPiece({
  title,
  artist,
  year,
  medium,
  exhibitionId,
}) {
  const { rows } = await client.query(
    `INSERT INTO pieces (title, artist, year, medium, exhibition_id) VALUES ($1, $2, $3, $4, $5) RETURNING *;`,
    [title, artist, year, medium, exhibitionId]
  );
  return rows[0];
}

export async function updateArtPiece(id, fields) {
  const keys = Object.keys(fields);

  if (keys.length === 0) {
    throw new Error("Cannot update piece with no fields");
  }

  const setStr = keys
    .map((key, index) => `"${key}" = $${index + 1}`)
    .join(", ");
  const values = Object.values(fields);
  console.log("KEYS:", keys);
  console.log("SET STR:", setStr);
  console.log("VALUES:", values);

  const { rows } = await client.query(
    `UPDATE pieces SET ${setStr} WHERE id = $${keys.length + 1} RETURNING *;`,
    [...values, id]
  );

  return rows[0];
}

export async function deleteArtPiece(id) {
  const { rows } = await client.query(
    `DELETE FROM pieces WHERE id = $1 RETURNING *;`,
    [id]
  );
  return rows[0];
}
