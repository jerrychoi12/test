import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    base: '/',
    publicDir: path.resolve(__dirname, 'public'),
    plugins: [
      react(), 
      tailwindcss(),
      {
        name: 'api-dev-server-middleware',
        configureServer(server) {
          server.middlewares.use(async (req, res, next) => {
            const url = req.url || '';
            
            // Send JSON helper
            const sendJSON = (data: any, status = 200) => {
              res.writeHead(status, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify(data));
            };

            // Parse request body helper
            const getRequestBody = (): Promise<any> => {
              return new Promise((resolve) => {
                let body = '';
                req.on('data', (chunk) => { body += chunk; });
                req.on('end', () => {
                  try {
                    resolve(body ? JSON.parse(body) : {});
                  } catch {
                    resolve({});
                  }
                });
              });
            };

            const urlPath = url.split('?')[0];

            if (urlPath.startsWith('/api/')) {
              const accountId = (env.CLOUDFLARE_ACCOUNT_ID || '').trim();
              const databaseId = (env.CLOUDFLARE_DATABASE_ID || env.DATABASE_ID || '').trim();
              const apiToken = (env.CLOUDFLARE_API_TOKEN || '').trim();

              // 1. GET Products List
              if ((urlPath === '/api/products' || urlPath === '/api/admin/products') && req.method === 'GET') {
                if (!accountId || !databaseId || !apiToken) {
                  console.warn("Cloudflare D1 credentials missing in Vite Dev Server. Simulating Empty State.");
                  return sendJSON({ success: true, products: [] });
                }
                try {
                  const d1Url = `https://api.cloudflare.com/client/v4/accounts/${accountId}/d1/database/${databaseId}/query`;
                  const d1Res = await fetch(d1Url, {
                    method: 'POST',
                    headers: { 'Authorization': `Bearer ${apiToken}`, 'Content-Type': 'application/json' },
                    body: JSON.stringify({ sql: "SELECT * FROM products ORDER BY id DESC" }),
                  });
                  const data = await d1Res.json() as any;
                  if (data.success && data.result && data.result[0]) {
                    const results = data.result[0].results || [];
                    const products = results.map((p: any) => ({
                      ...p,
                      id: p.id,
                      name: p.name || p.item_name || "",
                      category: p.category || p.category1 || "",
                      category2: p.category2 || p.sub_category || "",
                      item_code: p.item_code || p.code || "",
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
                    return sendJSON({ success: true, products });
                  }
                  return sendJSON({ success: false, error: "Cloudflare D1 query fetch failed.", details: data });
                } catch (err) {
                  return sendJSON({ success: false, error: String(err) }, 500);
                }
              }

              // 2. POST Products Save / Update
              if ((urlPath === '/api/products' || urlPath === '/api/admin/save') && req.method === 'POST') {
                const data = await getRequestBody();
                if (!accountId || !databaseId || !apiToken) {
                  return sendJSON({ success: true, message: "Simulated success save (missing env variables)" });
                }
                try {
                  const query = data.id 
                    ? `UPDATE products SET category=?, category2=?, item_code=?, name=?, features=?, model=?, color_size=?, package=?, manufacturer=?, origin=?, spec=?, img1=?, img2=?, img3=?, img4=?, img5=? WHERE id=?`
                    : `INSERT INTO products (category, category2, item_code, name, features, model, color_size, package, manufacturer, origin, spec, img1, img2, img3, img4, img5) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
                  
                  const params = [
                    data.category || "", data.category2 || "", data.item_code || "", data.name || "", data.features || "", data.model || "", 
                    data.color_size || data.size || "", data.package || data.package_size || "", data.manufacturer || "", data.origin || "", data.spec || data.note || "", 
                    data.img1 || "", data.img2 || "", data.img3 || "", data.img4 || "", data.img5 || ""
                  ];
                  if (data.id) params.push(data.id);

                  const d1Url = `https://api.cloudflare.com/client/v4/accounts/${accountId}/d1/database/${databaseId}/query`;
                  const d1Res = await fetch(d1Url, {
                    method: 'POST',
                    headers: { 'Authorization': `Bearer ${apiToken}`, 'Content-Type': 'application/json' },
                    body: JSON.stringify({ sql: query, params }),
                  });
                  const result = await d1Res.json() as any;
                  if (result.success) {
                    return sendJSON({ success: true });
                  }
                  return sendJSON({ success: false, error: result.errors?.[0]?.message || "Cloudflare Error" }, 500);
                } catch (err) {
                  return sendJSON({ success: false, error: String(err) }, 500);
                }
              }

              // 3. DELETE Product
              if (urlPath.startsWith('/api/admin/products/') && req.method === 'DELETE') {
                const id = urlPath.split('/').pop();
                if (!accountId || !databaseId || !apiToken) {
                  return sendJSON({ success: true, message: "Simulated delete success" });
                }
                try {
                  const d1Url = `https://api.cloudflare.com/client/v4/accounts/${accountId}/d1/database/${databaseId}/query`;
                  const d1Res = await fetch(d1Url, {
                    method: 'POST',
                    headers: { 'Authorization': `Bearer ${apiToken}`, 'Content-Type': 'application/json' },
                    body: JSON.stringify({ sql: "DELETE FROM products WHERE id = ?", params: [id] }),
                  });
                  const result = await d1Res.json() as any;
                  return sendJSON({ success: result.success });
                } catch (err) {
                  return sendJSON({ success: false, error: String(err) }, 500);
                }
              }

              // 4. POST Save Batch
              if (urlPath === '/api/admin/save-batch' && req.method === 'POST') {
                const { products } = await getRequestBody();
                if (!accountId || !databaseId || !apiToken) {
                  return sendJSON({ success: true, message: "Simulated batch save success" });
                }
                try {
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

                  const d1Url = `https://api.cloudflare.com/client/v4/accounts/${accountId}/d1/database/${databaseId}/batch`;
                  const d1Res = await fetch(d1Url, {
                    method: 'POST',
                    headers: { 'Authorization': `Bearer ${apiToken}`, 'Content-Type': 'application/json' },
                    body: JSON.stringify(queries),
                  });
                  const result = await d1Res.json() as any;
                  return sendJSON({ success: result.success });
                } catch (err) {
                  return sendJSON({ success: false, error: String(err) }, 500);
                }
              }

              // 5. GET External Activities (Google Blogger/Blogspot Proxy)
              if (url === '/api/external-activities' && req.method === 'GET') {
                try {
                  const bloggerUrl = "https://longshortbulletsgo.blogspot.com/feeds/posts/default?alt=json";
                  const bloggerRes = await fetch(bloggerUrl, {
                    headers: {
                      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
                      "Accept": "application/json"
                    }
                  });
                  if (!bloggerRes.ok) {
                    throw new Error(`Blogger returned status ${bloggerRes.status}`);
                  }
                  const data = await bloggerRes.json() as any;
                  const entries = data.feed?.entry || [];
                  const posts = entries.map((entry: any) => {
                    const title = entry.title?.$t || "제목 없음";
                    const published = entry.published?.$t || entry.updated?.$t || "";
                    const content = entry.content?.$t || entry.summary?.$t || "";
                    const alternateLink = entry.link?.find((l: any) => l.rel === "alternate")?.href || "https://longshortbulletsgo.blogspot.com";
                    const author = entry.author?.[0]?.name?.$t || "에스제이코퍼레이션";
                    let thumbnail = "";
                    const imgReg = /<img[^>]+src="([^">]+)"/g;
                    const match = imgReg.exec(content);
                    if (match && match[1]) {
                      thumbnail = match[1];
                    }
                    let cleanSummary = content.replace(/<\/?[^>]+(>|$)/g, " ").replace(/\s+/g, " ").trim();
                    if (cleanSummary.length > 180) {
                      cleanSummary = cleanSummary.substring(0, 180) + "...";
                    }
                    return { title, published, content, summary: cleanSummary, url: alternateLink, author, thumbnail };
                  });
                  return sendJSON({ success: true, posts, isFallback: false });
                } catch {
                  return sendJSON({
                    success: true,
                    isFallback: true,
                    posts: [
                      {
                        title: "에스제이코퍼레이션, 반도체 및 디스플레이 핵심 제전용품 라인업 강화",
                        published: "2026-05-15T10:00:00.000Z",
                        summary: "삼성전자와 SK하이닉스 핵심 청정실 생산 라인에서 요구되는 ESD 방제전 글러브, 제전화 및 고성능 방진 와이퍼 라인업이 전반적으로 리뉴얼 강화되었습니다.",
                        url: "https://longshortbulletsgo.blogspot.com",
                        author: "홍보팀",
                        thumbnail: "https://raw.githubusercontent.com/jerrychoi12/img/main/warehouse.webp"
                      },
                      {
                        title: "미국 에리조나 2차전지 기가팩토리 청정룸 전용 특수 SUS 가구 전량 수주",
                        published: "2026-05-10T11:30:00.000Z",
                        summary: "에스제이코퍼레이션은 북미 지역 대형 배터리 공장 정밀 조립 공정에 도입될 커스텀 서스(SUS-304) 워크스테이션 및 클린룸 가구를 일괄 수주하는 대성공을 거두었습니다.",
                        url: "https://longshortbulletsgo.blogspot.com",
                        author: "해외영업본부",
                        thumbnail: "https://raw.githubusercontent.com/jerrychoi12/img/main/house.webp"
                      }
                    ]
                  });
                }
              }

              // If unhandled api path
              return sendJSON({ success: false, error: "API path not found or method not supported" }, 404);
            }

            next();
          });
        }
      }
    ],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});