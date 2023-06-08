type Params = { params: { nickname: string } };
export default function Page({ params: { nickname } }: Params) {
  return <div>닉네임: {nickname}</div>;
}
