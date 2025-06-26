import express from 'express';
import sql from 'mssql';
import cors from 'cors';

const app = express();
app.use(cors());

// ✅ Vul deze waarden in met jouw eigen info:
const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: 'fixserver01.database.windows.net',
  database: 'FIXDB',
  options: {
    encrypt: true,
    enableArithAbort: true
  }
};

app.get('/', (req, res) => {
  res.send('API is live! Gebruik /data om gegevens op te halen.');
});

app.get('/data', async (req, res) => {
  try {
    await sql.connect(config);
    const result = await sql.query`SELECT gemeente FROM dbo.vragenlijst_2025_Q1`;
    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`✅ API draait op poort ${port}`));
