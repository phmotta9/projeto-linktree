export function FeedbackToast({ message }: { message: string }) {
  if (!message) return null;

  return (
    <div className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2 animate-[feedback-in_180ms_ease-out] rounded-lg border border-orange-300/20 bg-zinc-950/95 px-4 py-3 text-sm text-white shadow-xl shadow-black/30" role="status" aria-live="polite">
      {message}
    </div>
  );
}
