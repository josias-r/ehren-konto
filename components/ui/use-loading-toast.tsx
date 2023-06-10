import { Loader2 } from "lucide-react";
import { useToast } from "./use-toast";

function useLoadingToast() {
  const { toast } = useToast();
  const loadingToast = (message: string) => {
    const { dismiss: dismissLoadingToast } = toast({
      variant: "secondary",
      duration: 1000000,

      description: (
        <div className="flex items-center">
          <Loader2
            className="animate-spin pointer-events-none m-0 mr-2"
            size="1rem"
          />{" "}
          {message}
        </div>
      ),
    });
    return { dismissLoadingToast };
  };
  const errorToast = (message: string) => {
    toast({
      variant: "destructive",
      title: "Error",
      description: message,
    });
  };

  return { loadingToast, errorToast };
}

export { useLoadingToast };
