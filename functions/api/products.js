export async function onRequestGet(context) {
  const { env } = context;
  const db = env.sj_db || env.DB;
  
  if (!db) {
    return new Response(JSON.stringify({ 
      success: false, 
      error: "데이터베이스 연결을 찾을 수 없습니다." 
    }), { status: 500 });
  }

  try {
    const { results } = await db.prepare(`
      SELECT * FROM products ORDER BY id DESC
    `).all();

    return new Response(JSON.stringify({ success: true, products: results }), { 
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

export async function onRequestPost(context) {
  const { env, request } = context;
  const db = env.sj_db || env.DB;
  
  if (!db) {
    return new Response(JSON.stringify({ 
      success: false, 
      error: "데이터베이스 연결을 찾을 수 없습니다." 
    }), { status: 500 });
  }

  try {
    const data = await request.json();
    
    // Validate required fields
    if (!data.name || !data.category) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: "제품명과 카테고리는 필수 입력 사항입니다." 
      }), { status: 400 });
    }

    let result;
    if (data.id) {
      // UPDATE existing product
      result = await db.prepare(`
        UPDATE products 
        SET category = ?, category2 = ?, name = ?, features = ?, 
            model = ?, color_size = ?, package = ?, manufacturer = ?, 
            origin = ?, spec = ?, img1 = ?, img2 = ?, img3 = ?, 
            img4 = ?, img5 = ?
        WHERE id = ?
      `).bind(
        data.category, data.category2 || "", data.name, data.features || "",
        data.model || "", data.color_size || "", data.package || "", data.manufacturer || "",
        data.origin || "", data.spec || "", data.img1 || "", data.img2 || "",
        data.img3 || "", data.img4 || "", data.img5 || "", data.id
      ).run();
    } else {
      // INSERT new product
      result = await db.prepare(`
        INSERT INTO products (
          category, category2, name, features, model, color_size, 
          package, manufacturer, origin, spec, img1, img2, 
          img3, img4, img5
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).bind(
        data.category, data.category2 || "", data.name, data.features || "",
        data.model || "", data.color_size || "", data.package || "", data.manufacturer || "",
        data.origin || "", data.spec || "", data.img1 || "", data.img2 || "",
        data.img3 || "", data.img4 || "", data.img5 || ""
      ).run();
    }

    return new Response(JSON.stringify({ success: true, result }), { 
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    console.error("D1 Error:", err);
    return new Response(JSON.stringify({ success: false, error: err.message }), { 
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
