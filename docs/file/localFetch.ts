// localFetch.ts
// 서버 없이 Vue 개발 중 fetch처럼 사용할 수 있는 로컬 mock API 함수
// localStorage 기반으로 loginMap, boardMap을 저장소로 사용
// fetch와 비슷하게 Response 객체를 반환하며, 확장 가능한 구조로 설계됨

type Method = 'POST'
type RequestBody = Record<string, any>

// localStorage 저장 키
const LOGIN_KEY = 'loginMap'
const BOARD_KEY = 'boardMap'

// 목록 페이징 단위
const PAGE_SIZE = 3

// "현재 일시"를 "yyyymmdd hhmmss" 형태로 반환하는 유틸 함수
function getNowDateString(): string {
  const now = new Date()
  const pad = (n: number) => n.toString().padStart(2, '0')
  return (
    now.getFullYear().toString() +
    pad(now.getMonth() + 1) +
    pad(now.getDate()) +
    ' ' +
    pad(now.getHours()) +
    pad(now.getMinutes()) +
    pad(now.getSeconds())
  )
}

// 100~500ms 사이 랜덤 지연을 만들어주는 함수
function delayRandom(): Promise<void> {
  const delay = Math.floor(Math.random() * 400) + 100
  return new Promise((resolve) => setTimeout(resolve, delay))
}

// localStorage에서 key에 해당하는 Map 객체를 반환
function getMap(key: string): Map<string, any> {
  const raw = localStorage.getItem(key)
  try {
    const obj = raw ? JSON.parse(raw) : {}
    return new Map(Object.entries(obj))
  } catch {
    return new Map()
  }
}

// Map 객체를 localStorage에 JSON으로 저장
function setMap(key: string, map: Map<string, any>) {
  const obj = Object.fromEntries(map.entries())
  localStorage.setItem(key, JSON.stringify(obj))
}

// fetch 스타일의 응답 객체 생성 (성공 시)
function createResponse(data: any, status = 200, statusText = 'OK') {
  return new Response(JSON.stringify(data), {
    status,
    statusText,
    headers: { 'Content-Type': 'application/json' },
  })
}

// fetch 스타일의 응답 객체 생성 (실패 시)
function createError(status: number, message: string) {
  return new Response(null, {
    status,
    statusText: message,
  })
}

// ✅ 메인 함수: fetch 스타일의 mock API 진입점
// 사용 방식:
// const res = await localFetch('/login', { method: 'POST', body: { userId, password } })
// if (res.ok) { const data = await res.json() } else { res.statusText }
export async function localFetch(
  url: string,
  options: { method: Method; body?: RequestBody }
): Promise<Response> {
  // 지연 응답
  await delayRandom()

  // 요청 정보 분해
  const { method, body = {} } = options
  const loginMap = getMap(LOGIN_KEY)
  const boardMap = getMap(BOARD_KEY)

  try {
    switch (url) {
      case '/login': {
        const { userId, password } = body
        if (!userId || !password) return createError(400, 'Missing credentials')

        const savedPw = loginMap.get(userId)
        if (!savedPw) {
          // 첫 로그인 → 저장
          loginMap.set(userId, password)
          setMap(LOGIN_KEY, loginMap)
        } else if (savedPw !== password) {
          return createError(403, 'Invalid password')
        }
        return createResponse({ userId })
      }

      case '/post': {
        const { title, contents, userId } = body
        if (!title || !contents || !userId)
          return createError(400, 'Missing post data')

        const now = getNowDateString()
        const boardSeq = Date.now().toString() // ID 생성
        boardMap.set(boardSeq, {
          boardSeq,
          title,
          contents,
          userId,
          regDate: now,
          modDate: now,
        })
        setMap(BOARD_KEY, boardMap)
        return createResponse({ boardSeq })
      }

      case '/get': {
        const { boardSeq } = body
        if (!boardSeq || !boardMap.has(boardSeq)) {
          return createError(404, 'Post not found')
        }
        return createResponse(boardMap.get(boardSeq))
      }

      case '/list': {
        const { pageNumber = 1, keyword = '' } = body
        const allPosts = Array.from(boardMap.values()) as any[]

        // 제목 또는 내용에 keyword 포함되는 경우 필터링 + 등록일자 기준 최신 정렬
        const filtered = allPosts
          .filter((post) =>
            [post.title, post.contents].some((text) =>
              text.includes(keyword)
            )
          )
          .sort((a, b) => b.regDate.localeCompare(a.regDate))

        const totalCount = filtered.length
        const start = (pageNumber - 1) * PAGE_SIZE
        const paged = filtered.slice(start, start + PAGE_SIZE)

        return createResponse({
          pageNumber,
          pageSize: PAGE_SIZE,
          totalCount,
          list: paged,
        })
      }

      case '/delete': {
        const { boardSeq, userId } = body
        const post = boardMap.get(boardSeq)
        if (!post) return createError(404, 'Post not found')
        if (post.userId !== userId) return createError(403, 'Forbidden')

        boardMap.delete(boardSeq)
        setMap(BOARD_KEY, boardMap)
        return createResponse({})
      }

      case '/update': {
        const { boardSeq, title, contents, userId } = body
        const post = boardMap.get(boardSeq)
        if (!post) return createError(404, 'Post not found')
        if (post.userId !== userId) return createError(403, 'Forbidden')

        post.title = title
        post.contents = contents
        post.modDate = getNowDateString()
        boardMap.set(boardSeq, post)
        setMap(BOARD_KEY, boardMap)
        return createResponse({})
      }

      // 라우팅되지 않은 URL
      default:
        return createError(404, 'Unknown API')
    }
  } catch (err: any) {
    // 예외 발생 시
    return createError(500, err?.message || 'Internal Error')
  }
}
