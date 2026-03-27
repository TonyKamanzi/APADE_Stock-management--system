// components/Loader.jsx
export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-4 min-h-screen bg-stone-50">
      <div className="flex gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-bounce [animation-delay:0ms]" />
        <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-bounce [animation-delay:150ms]" />
        <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-bounce [animation-delay:300ms]" />
      </div>
      <p className="text-stone-400 text-sm tracking-widest uppercase">
        Loading…
      </p>
    </div>
  );
}
