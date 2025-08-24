export default function AuthLoadingComponent({
  loading,
}: {
  loading: boolean;
}) {
  if (!loading) return null;
  return (
    <span className="w-full flex-1 p-2 flex items-center justify-center space-x-1">
      <span
        className="w-1 h-1 bg-black rounded-full animate-bounce"
        style={{ animationDelay: "0s" }}
      ></span>
      <span
        className="w-1 h-1 bg-black rounded-full animate-bounce"
        style={{ animationDelay: "0.2s" }}
      ></span>
      <span
        className="w-1 h-1 bg-black rounded-full animate-bounce"
        style={{ animationDelay: "0.4s" }}
      ></span>
    </span>
  );
}
