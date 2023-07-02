'use client';

import { useRouter } from 'next/navigation';
import { FormEvent, useCallback, useState } from 'react';

function InputForm() {
  const router = useRouter();
  const [summonerName, setSummonerName] = useState<string>('');

  const onSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      router.push(`/${summonerName}`);
    },
    [router, summonerName],
  );

  return (
    <form onSubmit={onSubmit} className="w-full max-w-xl mx-auto">
      <input
        className="border-2 border-white rounded-md p-2 w-full max-w-xl mx-auto text-black"
        type="text"
        placeholder="소환사 이름을 입력하세요."
        value={summonerName}
        onChange={(e) => {
          setSummonerName(e.target.value);
        }}
      />
      <button
        type="submit"
        disabled={summonerName === ''}
        className="bg-blue-500 text-white rounded-md p-2 w-full max-w-xl mx-auto mt-2 sm:mt-4 transition-opacity hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        소환사 전적검색
      </button>
    </form>
  );
}

export default function MainPage() {
  return (
    <div className="bg-black h-screen min-h-[600px] text-white flex justify-center items-center flex-col px-2 sm:px-8">
      <p className="text-4xl font-bold mb-4">소환사 이름 입력</p>
      <InputForm />
    </div>
  );
}
