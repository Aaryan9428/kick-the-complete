import { createActor } from "@/backend";
import type { OrderFormData } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { zodResolver } from "@hookform/resolvers/zod";
import * as Dialog from "@radix-ui/react-dialog";
import { CheckCircle, Loader2, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const SHOE_SIZES = ["6", "7", "8", "9", "10", "11", "12", "13"];

const schema = z.object({
  customerName: z.string().min(2, "Name is required"),
  phone: z
    .string()
    .min(10, "Enter a valid phone number")
    .regex(/^[0-9+\s-]{10,15}$/, "Enter a valid phone number"),
  shoeSize: z.string().min(1, "Please select a size"),
  quantity: z.number().int().min(1, "Minimum quantity is 1"),
  address: z.string().min(10, "Address is required"),
  note: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  productId?: string;
}

export function OrderModal({
  isOpen,
  onClose,
  productName,
  productId: _productId,
}: OrderModalProps) {
  const { actor } = useActor(createActor);
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { quantity: 1 },
  });

  const handleClose = () => {
    reset();
    setSubmitted(false);
    setServerError(null);
    onClose();
  };

  const onSubmit = async (data: FormValues) => {
    if (!actor) {
      setServerError("Connection unavailable. Please try again.");
      return;
    }
    setServerError(null);
    try {
      const result = await actor.submitOrderRequest(
        data.customerName,
        data.phone,
        productName,
        data.shoeSize,
        BigInt(data.quantity),
        data.address,
        data.note ?? "",
      );
      if (result.__kind__ === "ok") {
        setSubmitted(true);
      } else {
        setServerError(result.err ?? "Something went wrong. Please try again.");
      }
    } catch {
      setServerError("Unable to submit order. Please try again.");
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <Dialog.Portal>
        <AnimatePresence>
          {isOpen && (
            <>
              <Dialog.Overlay asChild>
                <motion.div
                  data-ocid="order_modal.overlay"
                  className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                />
              </Dialog.Overlay>

              <Dialog.Content asChild>
                <motion.div
                  data-ocid="order_modal.dialog"
                  className="fixed inset-0 z-50 flex items-center justify-center p-4"
                  initial={{ opacity: 0, scale: 0.96, y: 16 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, y: 16 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="relative w-full max-w-lg rounded-2xl border border-white/10 bg-card/95 backdrop-blur-xl shadow-2xl overflow-hidden">
                    {/* Header */}
                    <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-white/8">
                      <div>
                        <Dialog.Title className="text-lg font-display font-bold text-foreground">
                          Order Now
                        </Dialog.Title>
                        <Dialog.Description className="text-xs text-muted-foreground mt-0.5 truncate max-w-[300px]">
                          {productName}
                        </Dialog.Description>
                      </div>
                      <button
                        type="button"
                        data-ocid="order_modal.close_button"
                        onClick={handleClose}
                        aria-label="Close order form"
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-white/10 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Body */}
                    <div className="px-6 py-5 max-h-[70vh] overflow-y-auto">
                      {submitted ? (
                        <motion.div
                          data-ocid="order_modal.success_state"
                          className="flex flex-col items-center text-center py-8 gap-4"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{
                            duration: 0.4,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                        >
                          <div className="w-16 h-16 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center">
                            <CheckCircle className="w-8 h-8 text-green-400" />
                          </div>
                          <div>
                            <h3 className="text-xl font-display font-bold text-foreground mb-2">
                              Order Sent!
                            </h3>
                            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
                              Your order request has been sent successfully. Our
                              team will contact you shortly on WhatsApp or
                              phone.
                            </p>
                          </div>
                          <button
                            type="button"
                            data-ocid="order_modal.confirm_button"
                            onClick={handleClose}
                            className="mt-2 px-8 py-2.5 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-sm transition-colors"
                          >
                            Done
                          </button>
                        </motion.div>
                      ) : (
                        <form
                          onSubmit={handleSubmit(onSubmit)}
                          className="space-y-4"
                          noValidate
                        >
                          {/* Product (read-only) */}
                          <div>
                            <label
                              htmlFor="order-productName"
                              className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5"
                            >
                              Product
                            </label>
                            <div
                              id="order-productName"
                              className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-sm text-foreground/70 truncate"
                            >
                              {productName}
                            </div>
                          </div>

                          {/* Name + Phone */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label
                                htmlFor="order-customerName"
                                className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5"
                              >
                                Your Name{" "}
                                <span className="text-primary">*</span>
                              </label>
                              <input
                                id="order-customerName"
                                {...register("customerName")}
                                data-ocid="order_modal.input"
                                placeholder="Full name"
                                className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-sm text-foreground placeholder-foreground/30 focus:outline-none focus:border-primary transition-colors"
                              />
                              {errors.customerName && (
                                <p
                                  data-ocid="order_modal.field_error"
                                  className="text-xs text-primary mt-1"
                                >
                                  {errors.customerName.message}
                                </p>
                              )}
                            </div>
                            <div>
                              <label
                                htmlFor="order-phone"
                                className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5"
                              >
                                Phone <span className="text-primary">*</span>
                              </label>
                              <input
                                id="order-phone"
                                {...register("phone")}
                                data-ocid="order_modal.input"
                                type="tel"
                                placeholder="10-digit number"
                                className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-sm text-foreground placeholder-foreground/30 focus:outline-none focus:border-primary transition-colors"
                              />
                              {errors.phone && (
                                <p
                                  data-ocid="order_modal.field_error"
                                  className="text-xs text-primary mt-1"
                                >
                                  {errors.phone.message}
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Size + Quantity */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label
                                htmlFor="order-shoeSize"
                                className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5"
                              >
                                Shoe Size{" "}
                                <span className="text-primary">*</span>
                              </label>
                              <select
                                id="order-shoeSize"
                                {...register("shoeSize")}
                                data-ocid="order_modal.select"
                                className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-sm text-foreground focus:outline-none focus:border-primary transition-colors appearance-none"
                              >
                                <option value="" className="bg-card">
                                  Select size
                                </option>
                                {SHOE_SIZES.map((s) => (
                                  <option key={s} value={s} className="bg-card">
                                    UK {s}
                                  </option>
                                ))}
                              </select>
                              {errors.shoeSize && (
                                <p
                                  data-ocid="order_modal.field_error"
                                  className="text-xs text-primary mt-1"
                                >
                                  {errors.shoeSize.message}
                                </p>
                              )}
                            </div>
                            <div>
                              <label
                                htmlFor="order-quantity"
                                className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5"
                              >
                                Quantity <span className="text-primary">*</span>
                              </label>
                              <input
                                id="order-quantity"
                                {...register("quantity", {
                                  valueAsNumber: true,
                                })}
                                data-ocid="order_modal.input"
                                type="number"
                                min={1}
                                className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
                              />
                              {errors.quantity && (
                                <p
                                  data-ocid="order_modal.field_error"
                                  className="text-xs text-primary mt-1"
                                >
                                  {errors.quantity.message}
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Address */}
                          <div>
                            <label
                              htmlFor="order-address"
                              className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5"
                            >
                              Delivery Address{" "}
                              <span className="text-primary">*</span>
                            </label>
                            <textarea
                              id="order-address"
                              {...register("address")}
                              data-ocid="order_modal.textarea"
                              rows={3}
                              placeholder="Full delivery address"
                              className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-sm text-foreground placeholder-foreground/30 focus:outline-none focus:border-primary transition-colors resize-none"
                            />
                            {errors.address && (
                              <p
                                data-ocid="order_modal.field_error"
                                className="text-xs text-primary mt-1"
                              >
                                {errors.address.message}
                              </p>
                            )}
                          </div>

                          {/* Note */}
                          <div>
                            <label
                              htmlFor="order-note"
                              className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5"
                            >
                              Note{" "}
                              <span className="text-muted-foreground/50 normal-case font-normal">
                                (optional)
                              </span>
                            </label>
                            <textarea
                              id="order-note"
                              {...register("note")}
                              data-ocid="order_modal.textarea"
                              rows={2}
                              placeholder="Any special instructions…"
                              className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-sm text-foreground placeholder-foreground/30 focus:outline-none focus:border-primary transition-colors resize-none"
                            />
                          </div>

                          {/* Server error */}
                          {serverError && (
                            <div
                              data-ocid="order_modal.error_state"
                              className="rounded-lg border border-primary/40 bg-primary/10 px-4 py-3 text-sm text-primary"
                            >
                              {serverError}
                            </div>
                          )}

                          {/* Submit */}
                          <button
                            type="submit"
                            data-ocid="order_modal.submit_button"
                            disabled={isSubmitting}
                            className="w-full py-3 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-sm tracking-wide transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                          >
                            {isSubmitting ? (
                              <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Placing Order…
                              </>
                            ) : (
                              "Place Order"
                            )}
                          </button>
                        </form>
                      )}
                    </div>
                  </div>
                </motion.div>
              </Dialog.Content>
            </>
          )}
        </AnimatePresence>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
