export default function Header() {
  return (
    <div className="border-secondary bg-background fixed flex h-[59px] w-full justify-center border-b p-4">
      <div className="border-secondary flex w-full max-w-[540px] items-center justify-between">
        <span className="text-lg font-semibold">@username</span>
        <span className="text-sm opacity-70">Account 1</span>
      </div>
    </div>
  );
}
