export async function onRequestDelete(context) {
  const { env, params } = context;
  const id = params.id; // 삭제할 상품 번호를 주소에서 읽어옴

  try {
    // 여기서도 sj_db를 사용합니다.
    await env.sj_db.prepare("DELETE FROM products WHERE id = ?").bind(id).run();
    
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}