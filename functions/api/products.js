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
