import React, { useState } from "react";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { z } from "zod";
import { Section } from "../components/ui/Section";
import { Button } from "../components/ui/Button";
import { useLanguage } from "../context/LanguageContext";

const contactSchema = z.object({
  fullName: z.string().min(1, "Required"),
  email: z.email("Invalid email format").min(1, "Required"),
  type: z.string().min(1, "Required"),
  subject: z.string().default(""),
  message: z
    .string()
    .min(1, "Required")
    .min(20, "Minimum 20 characters")
    .max(1000, "Maximum 1000 characters"),
});

type FormState = z.infer<typeof contactSchema>;

const INITIAL_STATE: FormState = {
  fullName: "",
  email: "",
  type: "",
  subject: "",
  message: "",
};

export default function Contact() {
  const { t } = useLanguage();
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});

  const validate = () => {
    const result = contactSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof FormState, string>> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as keyof FormState] = err.message;
        }
      });
      setErrors(fieldErrors);
      return false;
    }
    setErrors({});
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("sending");

    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";
      const apiPath = import.meta.env.VITE_SEND_EMAIL_PATH || "/notifications/send-email";
      const apiKey = import.meta.env.VITE_API_KEY || "";

      const response = await fetch(`${apiUrl}${apiPath}`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": apiKey,
        },
        body: JSON.stringify({
          subject: form.subject.trim() || t(`contact.types.${form.type as keyof typeof INITIAL_STATE}`),
          previewText: `Mensaje de ${form.fullName}`,
          templateVariables: {
            headline: form.subject.trim() || "Nueva Consulta desde Portfolio",
            body: `Has recibido un nuevo mensaje.\n\nNombre: ${form.fullName}\nEmail: ${form.email}\nTipo: ${t(`contact.types.${form.type as keyof typeof INITIAL_STATE}`)}\n\nMensaje:\n${form.message}`,
            badge: t(`contact.types.${form.type as keyof typeof INITIAL_STATE}`),
            actionUrl: `mailto:${form.email}`,
            actionLabel: `Responder a ${form.fullName.split(' ')[0]}`,
            footerNote: "Enviado desde el formulario de contacto de tu portfolio."
          }
        }),
      });

      if (!response.ok) throw new Error("API Error");

      setStatus("success");
      setForm(INITIAL_STATE);
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      console.error("Error sending notification:", error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormState]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const inputClasses = (name: keyof FormState) => `
    w-full px-4 py-3 rounded-xl border transition-all duration-200 outline-none
    ${errors[name]
      ? "border-red-500 bg-red-50/50 dark:bg-red-950/20"
      : "border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 focus:border-emerald-500 dark:focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
    }
    text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500
  `;

  return (
    <Section id="contact" className="relative">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white mb-4">
            {t("contact.title")}
          </h2>
          <div className="h-1.5 w-20 bg-emerald-500 rounded-full mx-auto" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm border border-zinc-200 dark:border-zinc-800 p-8 rounded-3xl shadow-xl"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 ml-1">
                  {t("contact.nameLabel")} <span className="text-emerald-500">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  className={inputClasses("fullName")}
                  placeholder="John Doe"
                />
                {errors.fullName && <p className="text-xs text-red-500 ml-1">{errors.fullName}</p>}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 ml-1">
                  {t("contact.emailLabel")} <span className="text-emerald-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className={inputClasses("email")}
                  placeholder="john@company.com"
                />
                {errors.email && <p className="text-xs text-red-500 ml-1">{errors.email}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Type */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 ml-1">
                  {t("contact.typeLabel")} <span className="text-emerald-500">*</span>
                </label>
                <select
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                  className={inputClasses("type")}
                >
                  <option value="" disabled>Select an option</option>
                  <option value="project">{t("contact.types.project")}</option>
                  <option value="job">{t("contact.types.job")}</option>
                  <option value="consultancy">{t("contact.types.consultancy")}</option>
                  <option value="other">{t("contact.types.other")}</option>
                </select>
                {errors.type && <p className="text-xs text-red-500 ml-1">{errors.type}</p>}
              </div>

              {/* Subject */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 ml-1">
                  {t("contact.subjectLabel")}
                </label>
                <input
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  className={inputClasses("subject")}
                  placeholder="Quick context..."
                />
              </div>
            </div>

            {/* Message */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 ml-1">
                  {t("contact.messageLabel")} <span className="text-emerald-500">*</span>
                </label>
                <span className={`text-[10px] ${form.message.length > 1000 ? "text-red-500" : "text-zinc-400"}`}>
                  {form.message.length} / 1000
                </span>
              </div>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={5}
                className={`${inputClasses("message")} resize-none`}
                placeholder="How can I help you?"
              />
              {errors.message && <p className="text-xs text-red-500 ml-1">{errors.message}</p>}
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <Button
                variant="primary"
                className="w-full sm:w-auto min-w-[200px]"
                disabled={status === "sending" || status === "success"}
              >
                {status === "sending" ? (
                  <>
                    <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                    {t("contact.sending")}
                  </>
                ) : status === "success" ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    {t("contact.success")}
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    {t("contact.sendButton")}
                  </>
                )}
              </Button>
            </div>

            {/* Status Messages */}
            <AnimatePresence>
              {status === "error" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex items-center gap-2 text-red-500 bg-red-50 dark:bg-red-900/20 p-4 rounded-xl"
                >
                  <AlertCircle className="w-5 h-5" />
                  <p className="text-sm font-medium">{t("contact.error")}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </motion.div>
      </div>
    </Section>
  );
}
