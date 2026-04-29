export async function onRequestGet(context) {
  const { env } = context;
  
  // 1. DB 연결 객체 찾기 (sj_db 또는 DB)
  const db = env.sj_db || env.DB;

  if (!db) {
    return new Response(JSON.stringify({ 
      success: false, 
      error: "데이터베이스 연결을 찾을 수 없습니다. (sj_db 또는 DB 바인딩을 확인하세요)" 
    }), { status: 500 });
  }

  try {
    // 2. 데이터 조회
    const { results } = await db.prepare(
      "SELECT * FROM products ORDER BY id DESC"
    ).all();

    // 3. 데이터가 비어있을 경우에 대한 로그 (F12 콘솔에서 확인 가능)
    if (!results || results.length === 0) {
      console.log("DB 접속은 성공했으나 데이터가 0건입니다.");
    }

    return new Response(JSON.stringify({ success: true, products: results }), {
      headers: { 
        "Content-Type": "application/json",
        "Cache-Control": "no-cache" // 캐시 방지 추가
      },
    });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: err.message }), { 
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}