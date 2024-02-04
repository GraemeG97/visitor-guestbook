import express from "express";
import cors from "cors";

const PORT = "4444";
import Database from "better-sqlite3";

const db = new Database("database.db");

const app = express();

app.use(cors());
app.use(express.json());

//post route to create new message entries
app.post(`/messages`, (req, res) => {
  try {
    const guestName = req.body.guestName;
    const roomNumber = req.body.roomNumb;
    const message = req.body.content;

    const newGuest = db
      .prepare(
        `INSERT INTO messages (guestName, roomNumb, content) VALUES (?, ?, ?) `
      )
      .run(guestName, roomNumber, message);
    res.status(200).json(newGuest);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

app.get("/messages", (req, res) => {
  try {
    if (req.query.id) {
      let message = db
        .prepare(`SELECT * FROM messages WHERE id = ?`)
        .all(req.query.id);
      res.status(200).json(message);
      return;
    }
    let messages = db.prepare(`SELECT * FROM messages`).all();
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.listen(PORT, () => {
  console.log(`Server started on PORT: ${PORT}`);
});
