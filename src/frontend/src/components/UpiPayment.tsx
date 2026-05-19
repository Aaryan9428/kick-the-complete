import { CheckCircle2, Smartphone } from "lucide-react";
import { motion } from "motion/react";
import { QRCodeSVG } from "qrcode.react";

interface UpiPaymentProps {
  total: number;
  orderId: string;
  onPaymentConfirmed: () => void;
}

export function UpiPayment({
  total,
  orderId,
  onPaymentConfirmed,
}: UpiPaymentProps) {
  const upiId = "9834757639@ybl";
  const storeName = "Kicks+The+Complete+Sneakers+Store";
  const upiUri = `upi://pay?pa=${upiId}&pn=${storeName}&am=${total}&cu=INR&tn=Order+${orderId}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="rounded-2xl border border-red-500/30 bg-black/60 backdrop-blur-xl shadow-[0_0_40px_rgba(239,68,68,0.15)] p-6 space-y-5"
      data-ocid="upi_payment.card"
    >
      {/* Heading */}
      <div className="flex items-center gap-2">
        <span className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center shrink-0">
          <Smartphone className="w-4 h-4 text-red-400" />
        </span>
        <h3 className="font-display font-bold bg-gradient-to-r from-red-400 to-rose-300 bg-clip-text text-transparent text-base tracking-wide">
          Scan to Pay via UPI
        </h3>
      </div>

      {/* QR Code */}
      <div className="flex flex-col items-center gap-4">
        <div className="p-3 rounded-xl bg-[#0d0d0d] border border-red-500/20 shadow-[0_0_30px_rgba(239,68,68,0.1)]">
          <QRCodeSVG
            data-ocid="upi_payment.qr_code"
            value={upiUri}
            size={200}
            bgColor="#0d0d0d"
            fgColor="#ef4444"
            level="M"
            includeMargin={false}
          />
        </div>

        {/* UPI ID */}
        <div className="text-center space-y-1">
          <p className="text-xs text-gray-500 uppercase tracking-widest">
            UPI ID
          </p>
          <code
            className="inline-block bg-gray-900 border border-red-500/30 rounded-lg px-3 py-1.5 text-red-400 font-mono text-sm font-bold tracking-wider"
            data-ocid="upi_payment.upi_id"
          >
            {upiId}
          </code>
        </div>

        {/* Amount */}
        <div className="text-center space-y-0.5">
          <p className="text-xs text-gray-500 uppercase tracking-widest">
            Amount to Pay
          </p>
          <p
            className="text-3xl font-display font-black text-white"
            data-ocid="upi_payment.amount"
          >
            ₹{total.toLocaleString("en-IN")}
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-red-500/20 to-transparent" />

      {/* Mobile Fallback */}
      <div className="text-center">
        <a
          href={upiUri}
          data-ocid="upi_payment.pay_via_app_link"
          className="inline-flex items-center gap-2 text-sm font-semibold text-red-400 hover:text-red-300 border border-red-500/30 hover:border-red-500/60 rounded-lg px-4 py-2 transition-all duration-200 hover:bg-red-500/5 hover:shadow-[0_0_15px_rgba(239,68,68,0.2)]"
        >
          <Smartphone className="w-4 h-4" />
          Pay via UPI App
        </a>
        <p className="text-xs text-gray-600 mt-2">
          Opens your UPI app directly on mobile
        </p>
      </div>

      {/* Confirm Button */}
      <button
        type="button"
        data-ocid="upi_payment.confirm_button"
        onClick={onPaymentConfirmed}
        className="w-full relative overflow-hidden rounded-xl py-3.5 px-6 font-display font-bold text-white text-sm tracking-wide bg-gradient-to-r from-red-600 to-rose-500 hover:from-red-500 hover:to-rose-400 transition-all duration-200 shadow-[0_0_25px_rgba(239,68,68,0.35)] hover:shadow-[0_0_35px_rgba(239,68,68,0.55)] active:scale-[0.99] flex items-center justify-center gap-2"
      >
        <CheckCircle2 className="w-4 h-4" />I Have Completed Payment
      </button>
    </motion.div>
  );
}
