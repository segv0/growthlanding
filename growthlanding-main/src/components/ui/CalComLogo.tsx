export default function CalComLogo({ className = "h-4 w-auto" }: { className?: string }) {
  return (
    <img
      src="/calcom-logo.avif"
      alt="Cal.com"
      className={`${className} rounded-md`}
    />
  );
}
