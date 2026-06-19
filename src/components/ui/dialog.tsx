"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface DialogContextValue {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const DialogContext = React.createContext<DialogContextValue | null>(null);

const useDialogContext = () => {
  const context = React.useContext(DialogContext);

  if (!context) {
    throw new Error("Dialog components must be used within a Dialog.");
  }

  return context;
};

interface DialogProps {
  children: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const Dialog = ({ children, open, onOpenChange }: DialogProps) => {
  React.useEffect(() => {
    if (!open) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onOpenChange(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onOpenChange, open]);

  return (
    <DialogContext.Provider value={{ open, setOpen: onOpenChange }}>
      {children}
    </DialogContext.Provider>
  );
};

interface DialogTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  children: React.ReactElement<{ onClick?: (event: React.MouseEvent<HTMLElement>) => void }>;
}

export const DialogTrigger = ({ asChild = false, children, ...props }: DialogTriggerProps) => {
  const { setOpen } = useDialogContext();

  if (asChild) {
    return React.cloneElement(children, {
      ...props,
      onClick: (event: React.MouseEvent<HTMLElement>) => {
        children.props.onClick?.(event);
        if (!event.defaultPrevented) {
          setOpen(true);
        }
      },
    });
  }

  return (
    <button
      type="button"
      {...props}
      onClick={(event) => {
        props.onClick?.(event);
        if (!event.defaultPrevented) {
          setOpen(true);
        }
      }}
    >
      {children}
    </button>
  );
};

interface DialogPortalProps {
  children: React.ReactNode;
}

const DialogPortal = ({ children }: DialogPortalProps) => {
  const { open } = useDialogContext();

  if (!open || typeof document === "undefined") {
    return null;
  }

  return createPortal(children, document.body);
};

type DialogOverlayProps = React.HTMLAttributes<HTMLDivElement>;

export const DialogOverlay = React.forwardRef<HTMLDivElement, DialogOverlayProps>(
  ({ className, ...props }, ref) => {
    const { setOpen } = useDialogContext();

    return (
      <div
        ref={ref}
        className={cn("fixed inset-0 z-50 bg-overlay/45 backdrop-blur-[1px]", className)}
        onClick={() => setOpen(false)}
        {...props}
      />
    );
  }
);
DialogOverlay.displayName = "DialogOverlay";

interface DialogContentProps extends React.HTMLAttributes<HTMLDivElement> {
  hideClose?: boolean;
}

export const DialogContent = React.forwardRef<HTMLDivElement, DialogContentProps>(
  ({ className, children, hideClose = false, ...props }, ref) => {
    const { setOpen } = useDialogContext();

    return (
      <DialogPortal>
        <DialogOverlay />
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            ref={ref}
            role="dialog"
            aria-modal="true"
            className={cn(
              "relative w-full max-w-lg rounded-2xl border border-border bg-surface p-6 text-text-primary shadow-[0_24px_80px_rgba(16,24,40,0.18)]",
              className
            )}
            onClick={(event) => event.stopPropagation()}
            {...props}
          >
            {!hideClose ? (
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface text-text-secondary transition-colors hover:bg-surface-secondary hover:text-text-primary"
                aria-label="Close dialog"
              >
                <X className="h-4 w-4" />
              </button>
            ) : null}
            {children}
          </div>
        </div>
      </DialogPortal>
    );
  }
);
DialogContent.displayName = "DialogContent";

export const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col space-y-2 text-left", className)} {...props} />
);

export const DialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end", className)} {...props} />
);

export const DialogTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h2 ref={ref} className={cn("text-xl font-semibold leading-none tracking-tight", className)} {...props} />
  )
);
DialogTitle.displayName = "DialogTitle";

export const DialogDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("text-sm text-text-secondary", className)} {...props} />
));
DialogDescription.displayName = "DialogDescription";

interface DialogCloseProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  children: React.ReactElement<{ onClick?: (event: React.MouseEvent<HTMLElement>) => void }>;
}

export const DialogClose = ({ asChild = false, children, ...props }: DialogCloseProps) => {
  const { setOpen } = useDialogContext();

  if (asChild) {
    return React.cloneElement(children, {
      ...props,
      onClick: (event: React.MouseEvent<HTMLElement>) => {
        children.props.onClick?.(event);
        if (!event.defaultPrevented) {
          setOpen(false);
        }
      },
    });
  }

  return (
    <button
      type="button"
      {...props}
      onClick={(event) => {
        props.onClick?.(event);
        if (!event.defaultPrevented) {
          setOpen(false);
        }
      }}
    >
      {children}
    </button>
  );
};
