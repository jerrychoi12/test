export async function onRequestPost(context) {
  const { env, request } = context;
  try {
    const body = await request.json();
    const products = body.products || [];
    const statements = [];

    for (const product of products) {
      // 데이터 이름이 달라도 안전하게 가져오도록 설정
      const p_category = product.category || "";
      const p_code = product.item_code || product.code || "";
      const p_name = product.name || "";
      const p_features = product.features || "";
      const p_size = product.size || "";
      const p_packing = product.package_size || product.packing || "";
      const p_manufacturer = product.manufacturer || "";
      const p_origin = product.origin || "";
      const p_note = product.note || "";

      if (product.id) {
        statements.push(
          env.sj_db.prepare(`
            UPDATE products 
            SET category=?, item_code=?, name=?, features=?, size=?, package_size=?, manufacturer=?, origin=?, note=?, image1=?, image2=?, image3=?, image4=?, image5=?
            WHERE id=?
          `).bind(
            p_category, p_code, p_name, p_features, p_size, p_packing,
            p_manufacturer, p_origin, p_note, 
            product.image1, product.image2, product.image3, product.image4, product.image5, 
            product.id
          )
        );
      } else {
        statements.push(
          env.sj_db.prepare(`
            INSERT INTO products (category, item_code, name, features, size, package_size, manufacturer, origin, note, image1, image2, image3, image4, image5)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          `).bind(
            p_category, p_code, p_name, p_features, p_size, p_packing,
            p_manufacturer, p_origin, p_note, 
            product.image1, product.image2, product.image3, product.image4, product.image5
          )
        );
      }
    }

    if (statements.length > 0) {
      await env.sj_db.batch(statements);
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