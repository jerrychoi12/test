export async function onRequestGet(context) {
  const { env } = context;
  try {
    // sj_db에서 모든 품목을 가져옵니다.
    const { results } = await env.sj_db.prepare(
      "SELECT * FROM products ORDER BY id DESC"
    ).all();

    return new Response(JSON.stringify({ success: true, products: results }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: err.message }), { 
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}