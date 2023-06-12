import { KAKAO_kawlt, KAKAO_kdt, NEXT_PUBLIC_PRODUCT_WEB_URL } from '@/consts/env';

export default async function clearKakaoOGCache(nickname: string) {
  const headers = new Headers();
  headers.append('content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
  headers.append('cookie', `_kdt=${KAKAO_kdt}; _kawlt=${KAKAO_kawlt};`);

  const requestOptions: RequestInit = {
    method: 'POST',
    headers: headers,
    body: `url=${NEXT_PUBLIC_PRODUCT_WEB_URL}/${encodeURIComponent(nickname)}`,
    cache: 'no-cache',
  };

  await fetch('https://developers.kakao.com/tool/debugger/api/sharing/purge', requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log('error', error));
}
