import React, { ReactNode } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from 'lucide-react';

interface GlassmorphicModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: ReactNode;
  footerContent?: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  hideCloseButton?: boolean;
}

const GlassmorphicModal: React.FC<GlassmorphicModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  footerContent,
  size = 'md',
  hideCloseButton = false,
}) => {
  console.log('GlassmorphicModal loaded');

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
  };

  if (!isOpen) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className={`
          bg-white/10 backdrop-blur-xl
          border border-white/20
          shadow-2xl rounded-xl
          text-white
          p-0
          overflow-hidden
          ${sizeClasses[size]}
        `}
        onInteractOutside={(e) => {
          // Prevent closing on interact outside if desired, for now allow
          // e.preventDefault(); // Uncomment this to prevent closing on clicking outside
        }}
        hideCloseButton={true} // We use a custom close button
      >
        {(title || !hideCloseButton) && (
          <DialogHeader className="p-6 pb-0 relative">
            {title && <DialogTitle className="text-2xl font-semibold text-white">{title}</DialogTitle>}
            {description && <DialogDescription className="text-gray-300 mt-1">{description}</DialogDescription>}
            {!hideCloseButton && (
              <DialogClose asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4 rounded-full text-gray-300 hover:text-white hover:bg-white/20"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </Button>
              </DialogClose>
            )}
          </DialogHeader>
        )}

        <div className="p-6 pt-4 max-h-[70vh] overflow-y-auto text-gray-200">
          {children}
        </div>

        {footerContent && (
          <DialogFooter className="p-6 pt-4 bg-black/10 border-t border-white/10">
            {footerContent}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default GlassmorphicModal;