import Database from "better-sqlite3";

const db = new Database("database.db");

db.exec(`CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    guestName TEXT,
    roomNumb INTEGER,
    content TEXT
)`);

db.exec(`
    INSERT into messages (guestName, roomNumb, content)
    VALUES 
    ('Ronaldo', 44, 'SIUUUUUU'),
    ('Gordon Ramsay', 100, 'What are you...an idiot sandwich!!')
`);
