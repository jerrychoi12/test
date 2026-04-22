import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for Admin Save (Cloudflare D1 Simulation/Proxy)
  app.post("/api/admin/save", async (req, res) => {
    const data = req.body;
    console.log("Admin Save Requested:", data);

    const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
    const databaseId = process.env.CLOUDFLARE_DATABASE_ID;
    const apiToken = process.env.CLOUDFLARE_API_TOKEN;

    if (!accountId || !databaseId || !apiToken) {
      console.warn("Cloudflare credentials not fully provided. Simulating success.");
      return res.json({ success: true, message: "Simulated success (missing env vars)" });
    }

    try {
      // Cloudflare D1 API Query - Upsert logic or Insert
      const query = data.id 
        ? `UPDATE products SET category=?, item_code=?, name=?, features=?, size=?, package_size=?, manufacturer=?, origin=?, note=?, image1=?, image2=?, image3=?, image4=?, image5=? WHERE id=?`
        : `INSERT INTO products (category, item_code, name, features, size, package_size, manufacturer, origin, note, image1, image2, image3, image4, image5) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
      
      const params = [
        data.category, data.item_code, data.name, data.features, data.size, 
        data.package_size, data.manufacturer, data.origin, data.note,
        data.image1, data.image2, data.image3, data.image4, data.image5
      ];
      if (data.id) params.push(data.id);

      const response = await fetch(
        `https://api.cloudflare.com/client/v4/accounts/${accountId}/d1/databases/${databaseId}/query`,
        {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${apiToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sql: query,
            params: params,
          }),
        }
      );

      const result = await response.json();
      if (result.success) {
        res.json({ success: true });
      } else {
        console.error("Cloudflare D1 Error:", result.errors);
        res.status(500).json({ success: false, errors: result.errors });
      }
    } catch (error) {
      console.error("API Error:", error);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  });

  app.get("/api/admin/products", async (req, res) => {
    const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
    const databaseId = process.env.CLOUDFLARE_DATABASE_ID;
    const apiToken = process.env.CLOUDFLARE_API_TOKEN;

    if (!accountId || !databaseId || !apiToken) {
      // Return empty list if not configured
      return res.json({ success: true, products: [] });
    }

    try {
      const response = await fetch(
        `https://api.cloudflare.com/client/v4/accounts/${accountId}/d1/databases/${databaseId}/query`,
        {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${apiToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sql: "SELECT * FROM products ORDER BY id DESC",
          }),
        }
      );
      const result = await response.json();
      if (result.success) {
        res.json({ success: true, products: result.result[0].results });
      } else {
        res.status(500).json({ success: false, errors: result.errors });
      }
    } catch (error) {
      res.status(500).json({ success: false });
    }
  });

  app.delete("/api/admin/products/:id", async (req, res) => {
    const { id } = req.params;
    const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
    const databaseId = process.env.CLOUDFLARE_DATABASE_ID;
    const apiToken = process.env.CLOUDFLARE_API_TOKEN;

    if (!accountId || !databaseId || !apiToken) return res.json({ success: true });

    try {
      const response = await fetch(
        `https://api.cloudflare.com/client/v4/accounts/${accountId}/d1/databases/${databaseId}/query`,
        {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${apiToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sql: "DELETE FROM products WHERE id = ?",
            params: [id],
          }),
        }
      );
      const result = await response.json();
      res.json({ success: result.success });
    } catch (error) {
      res.status(500).json({ success: false });
    }
  });

  app.post("/api/admin/save-batch", async (req, res) => {
    const { products } = req.body;
    const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
    const databaseId = process.env.CLOUDFLARE_DATABASE_ID;
    const apiToken = process.env.CLOUDFLARE_API_TOKEN;

    if (!accountId || !databaseId || !apiToken) {
      return res.json({ success: true });
    }

    try {
      // Cloudflare D1 can handle multiple queries in a batch
      const queries = products.map((data: any) => {
        const sql = data.id 
          ? `UPDATE products SET category=?, item_code=?, name=?, features=?, size=?, package_size=?, manufacturer=?, origin=?, note=?, image1=?, image2=?, image3=?, image4=?, image5=? WHERE id=?`
          : `INSERT INTO products (category, item_code, name, features, size, package_size, manufacturer, origin, note, image1, image2, image3, image4, image5) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        
        const params = [
          data.category, data.item_code, data.name, data.features, data.size, 
          data.package_size, data.manufacturer, data.origin, data.note,
          data.image1, data.image2, data.image3, data.image4, data.image5
        ];
        if (data.id) params.push(data.id);

        return { sql, params };
      });

      const response = await fetch(
        `https://api.cloudflare.com/client/v4/accounts/${accountId}/d1/databases/${databaseId}/batch`,
        {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${apiToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(queries),
        }
      );

      const result = await response.json();
      res.json({ success: result.success });
    } catch (error) {
      console.error("Batch API Error:", error);
      res.status(500).json({ success: false });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
