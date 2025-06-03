import client from './client.js';

async function seedData() {
  try {
    await client.connect();

    console.log('Seeding database...');
    await client.query(`DELETE FROM pieces;`);
    await client.query(`DELETE FROM exhibitions;`);

    const { rows: exhibitions } = await client.query(`
      INSERT INTO exhibitions (name, location, start_date, end_date)
      VALUES
        ('Modern Visions', 'NYC Gallery', '2024-03-01', '2024-06-01'),
        ('The Abstract Edge', 'Berlin ArtHaus', '2023-09-15', '2023-12-15'),
        ('Silent Stories', 'Tokyo Metropolitan Museum', '2025-01-10', '2025-04-20')
      RETURNING *;
    `);

    await client.query(`
      INSERT INTO pieces (title, artist, year, medium, exhibition_id)
      VALUES
        ('Colorful Silence', 'J. Rivera', 2022, 'Acrylic on canvas', ${exhibitions[0].id}),
        ('Untitled No. 7', 'A. Kim', 2019, 'Digital', ${exhibitions[1].id}),
        ('Shadows and Lace', 'M. Tanaka', 2024, 'Ink on paper', ${exhibitions[2].id}),
        ('Dreaming In Rust', 'N. Torres', 2023, 'Oil on panel', ${exhibitions[0].id}),
        ('Static Bloom', 'R. Gao', 2021, 'Mixed media', ${exhibitions[1].id}),
        ('Smoke Signal', 'E. Morales', 2020, 'Charcoal', ${exhibitions[2].id}),
        ('Neon Thorns', 'S. Patel', 2022, 'Digital collage', ${exhibitions[1].id}),
        ('The Longing', 'L. Kimura', 2023, 'Acrylic', ${exhibitions[2].id}),
        ('Inkheart', 'D. Osei', 2018, 'Pen & ink', ${exhibitions[0].id}),
        ('Fractured Light', 'C. Nguyen', 2021, 'Photography', ${exhibitions[1].id});
    `);

    console.log('Database seeded successfully!');
  } catch (err) {
    console.error('Error seeding database:', err);
  } finally {
    await client.end();
  }
}

seedData();
