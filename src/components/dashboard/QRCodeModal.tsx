import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Download, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Event } from '@/hooks/useEvents';
import { toast } from '@/hooks/use-toast';

interface QRCodeModalProps {
  event: Event | null;
  open: boolean;
  onClose: () => void;
}

export const QRCodeModal = ({ event, open, onClose }: QRCodeModalProps) => {
  const [copied, setCopied] = useState(false);

  if (!event) return null;

  const checkInUrl = `${window.location.origin}/check-in/${event.id}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(checkInUrl);
      setCopied(true);
      toast({
        title: 'Link copied!',
        description: 'Check-in link has been copied to clipboard.',
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: 'Failed to copy',
        description: 'Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleDownload = () => {
    const svg = document.getElementById('qr-code-svg');
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.download = `${event.title.replace(/\s+/g, '-')}-qr-code.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
    };

    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Event QR Code</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center py-6">
          <div className="bg-card p-4 rounded-xl border shadow-sm mb-4">
            <QRCodeSVG
              id="qr-code-svg"
              value={checkInUrl}
              size={200}
              level="H"
              includeMargin
              bgColor="transparent"
              fgColor="currentColor"
              className="text-foreground"
            />
          </div>

          <h3 className="font-semibold text-foreground text-center mb-1">
            {event.title}
          </h3>
          <p className="text-sm text-muted-foreground text-center mb-4">
            Scan to check in to this event
          </p>

          <div className="flex gap-2 w-full">
            <Button
              variant="outline"
              className="flex-1"
              onClick={handleCopyLink}
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Link
                </>
              )}
            </Button>
            <Button variant="default" className="flex-1" onClick={handleDownload}>
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
