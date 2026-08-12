"use client";

type WebGLFallbackProps = Readonly<{ message: string }>;

export function WebGLFallback({ message }: WebGLFallbackProps) {
  return (
    <div
      className="fixed inset-0 z-0 grid place-items-center bg-[radial-gradient(circle,#27201a,#080706_70%)] text-stone"
      role="status"
    >
      <div className="max-w-sm p-6 text-center">
        <span aria-hidden="true">◈</span>
        <p className="mt-3 text-sm leading-relaxed">{message}</p>
      </div>
    </div>
  );
}
