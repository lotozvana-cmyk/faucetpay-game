import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = "f2afd1309c057a23d3ee971fcb2ee0c9045e3a4aa0245df95b2d6b921ca69b20";
const API_URL = "https://faucetpay.io/api/v1";

// Поповнення
app.post("/deposit", async (req, res) => {
    try {
        const { address } = req.body;

        const response = await axios.post(`${API_URL}/check-balance`, {
            api_key: API_KEY,
            currency: "BTC",
            address
        });

        res.json(response.data);
    } catch (error) {
        res.json({ error: error.message });
    }
});

// Вивід
app.post("/withdraw", async (req, res) => {
    try {
        const { to, amount } = req.body;

        const response = await axios.post(`${API_URL}/send`, {
            api_key: API_KEY,
            currency: "BTC",
            to,
            amount
        });

        res.json(response.data);
    } catch (error) {
        res.json({ error: error.message });
    }
});

app.listen(3000, () => console.log("Server running on port 3000"));
