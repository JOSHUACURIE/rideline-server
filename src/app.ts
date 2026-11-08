
import express from "express";
import cors from 'cors';
import busRoutes from './modules/buses/routes/bus.routes'



const app = express();

app.use(cors());
app.use(express.json());


app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "RideLine API is running"
  });
});


app.use("/api/v1/buses", busRoutes);


app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Endpoint not found"
  });
});

export default app;
