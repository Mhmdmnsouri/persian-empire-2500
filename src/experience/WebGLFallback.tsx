"use client";

export function WebGLFallback() {
  return (
    <div
      className="fixed inset-0 z-0 grid place-items-center bg-[radial-gradient(circle,#27201a,#080706_70%)] text-stone"
      role="status"
    >
      <span aria-hidden="true">◈</span>
    </div>
  );
}
