import { toast } from "react-toastify";

export function useCopy() {
  const handleCopyAddress = (target: string) => {
    if (target === "") {
      toast.error("Failed to copy!");
      return;
    }
    navigator.clipboard.writeText(target);
    toast.success("Copied!");
  };

  return { handleCopyAddress };
}
