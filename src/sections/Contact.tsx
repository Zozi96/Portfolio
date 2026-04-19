import React, { useState } from "react";
import { Send, CheckCircle2, AlertCircle, Mail, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { z } from "zod";
import { Section } from "../components/ui/Section";
import { Button } from "../components/ui/Button";
import { useLanguage } from "../context/LanguageContext";
import { useEmailService } from "../shared/context";
import { EmailBuilder } from "../shared/patterns/builder/email-builder";
import { SendEmailCommand } from "../shared/patterns/command/send-email.command";

const contactSchema = z.object({
  fullName: z.string().min(1, "Required"),
  email: z.email("Invalid email format").min(1, "Required"),
  type: z.string().min(1, "Required"),
  subject: z.string().default(""),
  message: z.string().min(1, "Required").min(20, "Minimum 20 characters").max(1000, "Maximum 1000 characters"),
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
  const emailService = useEmailService();
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});

  const validate = () => {
    const result = contactSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof FormState, string>> = {};
      const flattenedErrors = result.error.flatten().fieldErrors;

      Object.entries(flattenedErrors).forEach(([key, messages]) => {
        if (messages && messages.length > 0) {
          fieldErrors[key as keyof FormState] = messages[0];
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
      const emailPayload = EmailBuilder.create()
        .subject(form.subject.trim() || t(`contact.types.${form.type as keyof FormState}`))
        .preview(`Mensaje de ${form.fullName}`)
        .headline(form.subject.trim() || "Nueva consulta desde portfolio")
        .body(
          `Has recibido un nuevo mensaje.\n\n` +
            `Nombre: ${form.fullName}\n` +
            `Email: ${form.email}\n` +
            `Tipo: ${t(`contact.types.${form.type as keyof FormState}`)}\n\n` +
            `Mensaje:\n${form.message}`,
        )
        .badge(t(`contact.types.${form.type as keyof FormState}`))
        .action(`mailto:${form.email}`, `Responder a ${form.fullName.split(" ")[0] || form.fullName}`)
        .footer("Enviado desde el formulario de contacto del portfolio.")
        .build();

      const command = new SendEmailCommand(emailService);
      const result = await command.execute({ payload: emailPayload });

      if (!result.success) {
        throw new Error(result.error || "Failed to send email");
      }

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
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const inputClasses = (name: keyof FormState) =>
    `w-full rounded-2xl border px-4 py-3.5 text-sm leading-6 outline-none transition-all duration-200 ${
      errors[name]
        ? "border-red-500 bg-red-50/70 dark:bg-red-950/20"
        : "border-zinc-200/80 bg-white/80 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 dark:border-zinc-800 dark:bg-zinc-900/80 dark:focus:border-emerald-500"
    } text-zinc-950 placeholder:text-zinc-400 dark:text-zinc-100 dark:placeholder:text-zinc-500`;

  return (
    <Section id="contact" className="relative">
      <div className="mb-14 max-w-3xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-xs font-semibold uppercase tracking-[0.28em] text-emerald-600 dark:text-emerald-400"
        >
          {t("sectionLabels.contact")}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.05 }}
          className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-zinc-950 md:text-4xl dark:text-white"
        >
          {t("contact.title")}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mt-5 max-w-2xl text-base leading-8 text-zinc-600 dark:text-zinc-300"
        >
          {t("contact.intro")}
        </motion.p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.82fr_minmax(0,1.18fr)]">
        <motion.aside
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden rounded-[2rem] border border-zinc-200/70 bg-zinc-950 p-7 text-white shadow-[0_28px_90px_-50px_rgba(15,23,42,0.85)]"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.28),transparent_36%),linear-gradient(180deg,rgba(255,255,255,0.06),transparent_24%)]" />
          <div className="relative z-10">
            <p className="text-xs uppercase tracking-[0.28em] text-emerald-300">{t("contact.sideTitle")}</p>
            <p className="mt-5 text-lg leading-8 text-zinc-100">{t("contact.sideDescription")}</p>
            <p className="mt-6 rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm leading-7 text-zinc-300">
              {t("contact.sideAvailability")}
            </p>

            <div className="mt-8 space-y-4 text-sm text-zinc-300">
              <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
                <Mail className="mt-0.5 h-4 w-4 text-emerald-300" />
                <div>
                  <p className="text-[11px] uppercase tracking-[0.22em] text-zinc-500">{t("contact.sideEmailLabel")}</p>
                  <p className="mt-1 text-zinc-100">zfernandez@zozbit.com</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
                <MapPin className="mt-0.5 h-4 w-4 text-emerald-300" />
                <div>
                  <p className="text-[11px] uppercase tracking-[0.22em] text-zinc-500">{t("contact.sideLocationLabel")}</p>
                  <p className="mt-1 text-zinc-100">Villahermosa, Tabasco, Mexico</p>
                </div>
              </div>
            </div>
          </div>
        </motion.aside>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="rounded-[2rem] border border-zinc-200/70 bg-white/75 p-7 shadow-[0_24px_80px_-44px_rgba(15,23,42,0.28)] backdrop-blur-2xl dark:border-zinc-800/70 dark:bg-zinc-950/70 dark:shadow-[0_28px_90px_-52px_rgba(0,0,0,0.76)]"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <label className="ml-1 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  {t("contact.nameLabel")} <span className="text-emerald-500">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  className={inputClasses("fullName")}
                  placeholder="John Doe"
                  aria-invalid={errors.fullName ? "true" : "false"}
                />
                {errors.fullName && <p className="ml-1 text-xs text-red-500" aria-live="polite">{errors.fullName}</p>}
              </div>

              <div className="space-y-2">
                <label className="ml-1 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  {t("contact.emailLabel")} <span className="text-emerald-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className={inputClasses("email")}
                  placeholder="john@company.com"
                  aria-invalid={errors.email ? "true" : "false"}
                />
                {errors.email && <p className="ml-1 text-xs text-red-500" aria-live="polite">{errors.email}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <label className="ml-1 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  {t("contact.typeLabel")} <span className="text-emerald-500">*</span>
                </label>
                <select
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                  className={inputClasses("type")}
                  aria-invalid={errors.type ? "true" : "false"}
                >
                  <option value="" disabled>
                    {t("contact.selectPlaceholder")}
                  </option>
                  <option value="project">{t("contact.types.project")}</option>
                  <option value="job">{t("contact.types.job")}</option>
                  <option value="consultancy">{t("contact.types.consultancy")}</option>
                  <option value="other">{t("contact.types.other")}</option>
                </select>
                {errors.type && <p className="ml-1 text-xs text-red-500" aria-live="polite">{errors.type}</p>}
              </div>

              <div className="space-y-2">
                <label className="ml-1 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  {t("contact.subjectLabel")}
                </label>
                <input
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  className={inputClasses("subject")}
                  placeholder={t("contact.subjectPlaceholder")}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="ml-1 text-sm font-medium text-zinc-700 dark:text-zinc-300">
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
                rows={6}
                className={`${inputClasses("message")} resize-none`}
                placeholder={t("contact.messagePlaceholder")}
                aria-invalid={errors.message ? "true" : "false"}
              />
              {errors.message && <p className="ml-1 text-xs text-red-500" aria-live="polite">{errors.message}</p>}
            </div>

            <div className="flex flex-col gap-4 border-t border-zinc-200/70 pt-5 dark:border-zinc-800">
              <Button variant="primary" className="w-full sm:w-auto sm:min-w-[220px]" disabled={status === "sending" || status === "success"}>
                {status === "sending" ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    {t("contact.sending")}
                  </>
                ) : status === "success" ? (
                  <>
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    {t("contact.success")}
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    {t("contact.sendButton")}
                  </>
                )}
              </Button>

              <AnimatePresence>
                {status === "error" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex items-center gap-2 rounded-2xl bg-red-50 p-4 text-red-500 dark:bg-red-900/20"
                  >
                    <AlertCircle className="h-5 w-5" />
                    <p className="text-sm font-medium">{t("contact.error")}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </form>
        </motion.div>
      </div>
    </Section>
  );
}
