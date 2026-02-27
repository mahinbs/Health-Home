import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface ScratchCardProps {
  isOpen: boolean;
  onClose: () => void;
  reward: {
    amount: number;
    type: 'wallet' | 'discount' | 'benefit';
    message: string;
  };
}

export default function ScratchCard({ isOpen, onClose, reward }: ScratchCardProps) {
  const [isScratched, setIsScratched] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;

      // Draw silver scratch layer
      ctx.fillStyle = '#C0C0C0';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#FFD700';
      ctx.font = 'bold 20px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('Scratch Here!', canvas.width / 2, canvas.height / 2);

      let isDrawing = false;

      const handleMouseDown = (e: MouseEvent) => {
        isDrawing = true;
        scratch(e);
      };

      const handleMouseMove = (e: MouseEvent) => {
        if (isDrawing) scratch(e);
      };

      const handleMouseUp = () => {
        isDrawing = false;
      };

      const handleTouchStart = (e: TouchEvent) => {
        isDrawing = true;
        scratch(e.touches[0]);
      };

      const handleTouchMove = (e: TouchEvent) => {
        if (isDrawing) scratch(e.touches[0]);
      };

      const handleTouchEnd = () => {
        isDrawing = false;
      };

      const scratch = (e: MouseEvent | Touch) => {
        const rect = canvas.getBoundingClientRect();
        const x = (e.clientX || e.touches?.[0]?.clientX || 0) - rect.left;
        const y = (e.clientY || e.touches?.[0]?.clientY || 0) - rect.top;

        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.arc(x, y, 30, 0, Math.PI * 2);
        ctx.fill();

        // Check if enough area is scratched
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const pixels = imageData.data;
        let transparentPixels = 0;

        for (let i = 3; i < pixels.length; i += 4) {
          if (pixels[i] === 0) transparentPixels++;
        }

        const scratchedPercentage = (transparentPixels / (pixels.length / 4)) * 100;

        if (scratchedPercentage > 30 && !revealed) {
          setRevealed(true);
          setIsScratched(true);
        }
      };

      canvas.addEventListener('mousedown', handleMouseDown);
      canvas.addEventListener('mousemove', handleMouseMove);
      canvas.addEventListener('mouseup', handleMouseUp);
      canvas.addEventListener('touchstart', handleTouchStart);
      canvas.addEventListener('touchmove', handleTouchMove);
      canvas.addEventListener('touchend', handleTouchEnd);

      return () => {
        canvas.removeEventListener('mousedown', handleMouseDown);
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mouseup', handleMouseUp);
        canvas.removeEventListener('touchstart', handleTouchStart);
        canvas.removeEventListener('touchmove', handleTouchMove);
        canvas.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [isOpen, revealed]);

  const handleTransferToBank = () => {
    // Navigate to payment page or open UPI/Google Pay modal
    alert(`Transferring ₹${reward.amount} to your bank account via UPI/Google Pay...`);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-3xl p-6 max-w-md w-full animate-scale-in">
        <div className="text-center mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
            <i className="ri-gift-2-fill text-white text-3xl"></i>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Congratulations! 🎉</h2>
          <p className="text-gray-600">You've completed 1km! Scratch to reveal your reward!</p>
        </div>

        <div className="relative mb-4">
          <div className="bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl p-8 text-center min-h-[200px] flex items-center justify-center">
            {revealed ? (
              <div className="animate-bounce-in">
                <div className="text-4xl font-bold text-white mb-2">₹{reward.amount}</div>
                <p className="text-white/90">{reward.message}</p>
              </div>
            ) : (
              <div className="text-white/80">
                <i className="ri-question-line text-4xl"></i>
              </div>
            )}
          </div>
          {!revealed && (
            <canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full rounded-2xl cursor-pointer touch-none"
              style={{ touchAction: 'none' }}
            />
          )}
        </div>

        {revealed && (
          <div className="space-y-3">
            <button
              onClick={handleTransferToBank}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <i className="ri-bank-line"></i>
              <span>Transfer to Bank (UPI/Google Pay)</span>
            </button>
            <button
              onClick={onClose}
              className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-white/40 transition-colors"
            >
              Add to Wallet
            </button>
          </div>
        )}

        {!revealed && (
          <button
            onClick={onClose}
            className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-white/40 transition-colors"
          >
            Close
          </button>
        )}
      </div>
    </div>
  );
}

