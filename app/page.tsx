import YourDreams from '@/app/ui/landing/YourDreams'

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-[100dvh] p-8 font-[family-name:var(--font-geist-sans)]">
      <header> header</header>
      <main className="flex flex-col items-center">
        <YourDreams />
      </main>
      <footer className=" flex gap-6 bg-slate-400 w-screen flex-wrap items-center justify-center sticky bottom-0"> Footer </footer>
    </div>
  );
}
