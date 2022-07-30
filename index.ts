import "dotenv/config";
import app from "./src/main";

const PORT: number = Number(process.env.PORT) || 8080;

app.listen(PORT, () => {
   console.log(`Runnig on port: ${PORT}`);
});
