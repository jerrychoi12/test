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
    const product = await request.json();

    if (product.id) {
      // 기존 상품 수정 (Update)
      await db.prepare(`
        UPDATE products 
        SET category=?, category2=?, item_code=?, name=?, features=?, model=?, color_size=?, package=?, manufacturer=?, origin=?, spec=?, img1=?, img2=?, img3=?, img4=?, img5=?
        WHERE id=?
      `).bind(
        product.category || "", 
        product.category2 || "", 
        product.item_code || "", 
        product.name || "", 
        product.features || "", 
        product.model || "", 
        product.color_size || "", 
        product.package || "", 
        product.manufacturer || "", 
        product.origin || "", 
        product.spec || "", 
        product.img1 || "", 
        product.img2 || "", 
        product.img3 || "", 
        product.img4 || "", 
        product.img5 || "", 
        product.id
      ).run();
    } else {
      // 새 상품 등록 (Insert)
      await db.prepare(`
        INSERT INTO products (category, category2, item_code, name, features, model, color_size, package, manufacturer, origin, spec, img1, img2, img3, img4, img5)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).bind(
        product.category || "", 
        product.category2 || "", 
        product.item_code || "", 
        product.name || "", 
        product.features || "", 
        product.model || "", 
        product.color_size || "", 
        product.package || "", 
        product.manufacturer || "", 
        product.origin || "", 
        product.spec || "", 
        product.img1 || "", 
        product.img2 || "", 
        product.img3 || "", 
        product.img4 || "", 
        product.img5 || ""
      ).run();
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