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

    const accountId = (process.env.CLOUDFLARE_ACCOUNT_ID || "").trim();
    const databaseId = (process.env.CLOUDFLARE_DATABASE_ID || process.env.DATABASE_ID || "").trim();
    const apiToken = (process.env.CLOUDFLARE_API_TOKEN || "").trim();

    if (!accountId || !databaseId || !apiToken) {
      console.warn("Cloudflare credentials not fully provided. Simulating success.");
      return res.json({ success: true, message: "Simulated success (missing env vars)" });
    }

    try {
      // Prioritize modern field names (spec instead of note, size instead of color_size, etc.)
      const category = data.category || "";
      const category2 = data.category2 || "";
      const item_code = data.item_code || "";
      const name = data.name || "";
      const features = data.features || "";
      const model = data.model || "";
      const color_size = data.color_size || data.size || "";
      const pkg = data.package || data.package_size || "";
      const manufacturer = data.manufacturer || "";
      const origin = data.origin || "";
      const spec = data.spec || data.note || "";
      const img1 = data.img1 || data.image1 || "";
      const img2 = data.img2 || data.image2 || "";
      const img3 = data.img3 || data.image3 || "";
      const img4 = data.img4 || data.image4 || "";
      const img5 = data.img5 || data.image5 || "";

      const query = data.id 
        ? `UPDATE products SET category=?, category2=?, item_code=?, name=?, features=?, model=?, color_size=?, package=?, manufacturer=?, origin=?, spec=?, img1=?, img2=?, img3=?, img4=?, img5=? WHERE id=?`
        : `INSERT INTO products (category, category2, item_code, name, features, model, color_size, package, manufacturer, origin, spec, img1, img2, img3, img4, img5) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
      
      const params = [
        category, category2, item_code, name, features, model, color_size, 
        pkg, manufacturer, origin, spec,
        img1, img2, img3, img4, img5
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

  const handleProductsRequest = async (req: express.Request, res: express.Response) => {
    const accountId = (process.env.CLOUDFLARE_ACCOUNT_ID || "").trim();
    const databaseId = (process.env.CLOUDFLARE_DATABASE_ID || process.env.DATABASE_ID || "").trim();
    const apiToken = (process.env.CLOUDFLARE_API_TOKEN || "").trim();

    if (!accountId || !databaseId || !apiToken) {
      console.warn("Cloudflare credentials missing. Ensure CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_DATABASE_ID (or DATABASE_ID), and CLOUDFLARE_API_TOKEN are set in Environment Variables.");
      return res.json({ success: true, products: [] });
    }

    try {
      const url = `https://api.cloudflare.com/client/v4/accounts/${accountId}/d1/databases/${databaseId}/query`;
      const response = await fetch(
        url,
        {
          method: "POST",
          headers: { "Authorization": `Bearer ${apiToken}`, "Content-Type": "application/json" },
          body: JSON.stringify({ sql: "SELECT * FROM products ORDER BY id DESC" }),
        }
      );
      const data = await response.json();
      
      if (data.success && data.result && data.result[0]) {
        const results = data.result[0].results || [];
        console.log(`Fetched ${results.length} products from D1.`);
        
        // Map old fields to new fields for backward compatibility and various DB name conventions
        const products = results.map((p: any) => ({
          ...p,
          id: p.id,
          name: p.name || p.item_name || "",
          category: p.category || p.category1 || "",
          category2: p.category2 || p.sub_category || "",
          item_code: p.item_code || p.code || p.item_code || "",
          features: p.features || p.description || "",
          model: p.model || p.model_no || "",
          spec: p.spec || p.specification || p.note || "",
          color_size: p.color_size || p.size || "",
          package: p.package || p.package_size || p.packing || "",
          manufacturer: p.manufacturer || p.brand || "",
          origin: p.origin || p.country || "",
          img1: p.img1 || p.image1 || "",
          img2: p.img2 || p.image2 || "",
          img3: p.img3 || p.image3 || "",
          img4: p.img4 || p.image4 || "",
          img5: p.img5 || p.image5 || "",
        }));
        res.json({ success: true, products });
      } else {
        console.error("Cloudflare Query Failed or No Results:", data);
        res.json({ success: false, error: "Cloudflare D1 Query Failed", details: data });
      }
    } catch (err) {
      console.error("D1 Fetch Error:", err);
      res.status(500).json({ success: false, error: String(err) });
    }
  };

  app.get("/api/products", handleProductsRequest);
  app.get("/api/admin/products", handleProductsRequest);

  app.delete("/api/admin/products/:id", async (req, res) => {
    const { id } = req.params;
    const accountId = (process.env.CLOUDFLARE_ACCOUNT_ID || "").trim();
    const databaseId = (process.env.CLOUDFLARE_DATABASE_ID || process.env.DATABASE_ID || "").trim();
    const apiToken = (process.env.CLOUDFLARE_API_TOKEN || "").trim();

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
    const accountId = (process.env.CLOUDFLARE_ACCOUNT_ID || "").trim();
    const databaseId = (process.env.CLOUDFLARE_DATABASE_ID || process.env.DATABASE_ID || "").trim();
    const apiToken = (process.env.CLOUDFLARE_API_TOKEN || "").trim();

    if (!accountId || !databaseId || !apiToken) {
      return res.json({ success: true });
    }

    try {
      // Cloudflare D1 can handle multiple queries in a batch
      const queries = products.map((data: any) => {
        const sql = `
          INSERT INTO products (
            category, category2, name, features, model, color_size, package, 
            manufacturer, origin, spec, img1, img2, img3, img4, img5, item_code
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          ON CONFLICT(item_code) DO UPDATE SET
            category = excluded.category,
            category2 = excluded.category2,
            name = excluded.name,
            features = excluded.features,
            model = excluded.model,
            color_size = excluded.color_size,
            package = excluded.package,
            manufacturer = excluded.manufacturer,
            origin = excluded.origin,
            spec = excluded.spec,
            img1 = excluded.img1,
            img2 = excluded.img2,
            img3 = excluded.img3,
            img4 = excluded.img4,
            img5 = excluded.img5
        `;
        
        const params = [
          data.category || "", data.category2 || "", data.name || "", data.features || "", 
          data.model || "", data.color_size || "", data.package || "", data.manufacturer || "", 
          data.origin || "", data.spec || "", data.img1 || "", data.img2 || "", 
          data.img3 || "", data.img4 || "", data.img5 || "", data.item_code || ""
        ];

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
