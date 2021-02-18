import express from 'express';
import Assignment from './assignment/assignment';

const app = express();
const PORT = 8000;

app.get('/', (req, res) => res.send('Welcome please follow http://localhost:' + PORT + "/report for result"));

app.get('/report', async (req, res) => {

    try {
        await Assignment.getCSVData("./Dataset3.csv").then((data) => {
            res.status(200).json({ error: null, data: data });
        });
    } catch (e) {
        res.status(500).json({ error: e.message, data: null });
    }

});

app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});

export default app;