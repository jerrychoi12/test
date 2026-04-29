export async function onRequestPost(context) {
  const { env, request } = context;
  const db = env.sj_db || env.DB;
  
  if (!db) {
    return new Response(JSON.stringify({ 
      success: false, 
      error: "데이터베이스 연결을 찾을 수 없습니다. (sj_db 또는 DB 바인딩을 확인하세요)" 
    }), { status: 500 });
  }

  try {
    const body = await request.json();
    const products = body.products || [];
    const statements = [];

    for (const product of products) {
      // Ensure all fields are present or default to empty string
      const p = {
        category: product.category || "",
        category2: product.category2 || "",
        name: product.name || "",
        features: product.features || "",
        model: product.model || "",
        color_size: product.color_size || "",
        package: product.package || "",
        manufacturer: product.manufacturer || "",
        origin: product.origin || "",
        spec: product.spec || "",
        img1: product.img1 || "",
        img2: product.img2 || "",
        img3: product.img3 || "",
        img4: product.img4 || "",
        img5: product.img5 || "",
        item_code: product.item_code || ""
      };

      if (!p.item_code) continue; 

      statements.push(
        db.prepare(`
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
        `).bind(
          p.category, p.category2, p.name, p.features, p.model, p.color_size, p.package,
          p.manufacturer, p.origin, p.spec, p.img1, p.img2, p.img3, p.img4, p.img5, p.item_code
        )
      );
    }

    if (statements.length > 0) {
      await db.batch(statements);
    }

    return new Response(JSON.stringify({ success: true }), { 
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: err.message }), { 
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
