import clsx from 'clsx';

export default function CommonLayout({ children, className }: ComponentDefaultPropsWithChildren) {
  return (
    <main className={clsx('relative mx-auto w-full max-w-[1280px]', className)}>{children}</main>
  );
}
