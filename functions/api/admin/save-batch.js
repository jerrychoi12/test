export async function onRequestPost(context) {
  const { env, request } = context;
  
  try {
    // 프론트엔드에서 보낸 { products: [...] } 배열을 받습니다.
    const body = await request.json();
    const products = body.products;

    // 한꺼번에 처리할 명령(SQL)들을 담을 상자
    const statements = [];

    for (const product of products) {
      if (product.id) {
        // 이미 있는 품목은 업데이트
        statements.push(
          env.sj_db.prepare(`
            UPDATE products 
            SET category=?, item_code=?, name=?, features=?, size=?, package_size=?, manufacturer=?, origin=?, note=?, image1=?, image2=?, image3=?, image4=?, image5=?
            WHERE id=?
          `).bind(
            product.category, product.code, product.name, product.features, product.size, 
            product.packing, // db의 package_size 칸에 프론트엔드의 packing을 넣음
            product.manufacturer, product.origin, product.note, 
            product.image1, product.image2, product.image3, product.image4, product.image5, 
            product.id
          )
        );
      } else {
        // 새로 추가된 품목(id가 없음)은 새로 삽입
        statements.push(
          env.sj_db.prepare(`
            INSERT INTO products (category, item_code, name, features, size, package_size, manufacturer, origin, note, image1, image2, image3, image4, image5)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          `).bind(
            product.category, product.code, product.name, product.features, product.size, 
            product.packing,
            product.manufacturer, product.origin, product.note, 
            product.image1, product.image2, product.image3, product.image4, product.image5
          )
        );
      }
    }

    // Cloudflare D1의 batch 기능으로 한방에 묶어서 DB에 저장!
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