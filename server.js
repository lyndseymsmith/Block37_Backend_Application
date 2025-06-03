import app from "./app.js";
import client from "./db/client.js";

const PORT = process.env.PORT || 3000;

client
  .connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to the database:", err);
  });
