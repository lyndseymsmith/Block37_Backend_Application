DROP TABLE IF EXISTS pieces;
DROP TABLE IF EXISTS exhibitions;

CREATE TABLE exhibitions (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    location TEXT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL
);

CREATE TABLE pieces (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    artist TEXT NOT NULL,
    year INTEGER NOT NULL,
    medium TEXT NOT NULL,
    exhibition_id INTEGER REFERENCES exhibitions(id) ON DELETE CASCADE
);