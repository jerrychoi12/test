export async function onRequestPost(context) {
  const { env, request } = context;
  
  try {
    const product = await request.json();

    if (product.id) {
      // 기존 상품 수정 (Update)
      await env.sj_db.prepare(`
        UPDATE products 
        SET category=?, item_code=?, name=?, features=?, size=?, package_size=?, manufacturer=?, origin=?, note=?, image1=?, image2=?, image3=?, image4=?, image5=?
        WHERE id=?
      `).bind(
        product.category, product.item_code, product.name, product.features, product.size, 
        product.package_size, product.manufacturer, product.origin, product.note, 
        product.image1, product.image2, product.image3, product.image4, product.image5, 
        product.id
      ).run();
    } else {
      // 새 상품 등록 (Insert)
      await env.sj_db.prepare(`
        INSERT INTO products (category, item_code, name, features, size, package_size, manufacturer, origin, note, image1, image2, image3, image4, image5)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).bind(
        product.category, product.item_code, product.name, product.features, product.size, 
        product.package_size, product.manufacturer, product.origin, product.note, 
        product.image1, product.image2, product.image3, product.image4, product.image5
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