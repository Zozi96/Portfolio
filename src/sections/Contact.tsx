import React, { useState } from "react";
import { Send, CheckCircle2, AlertCircle, Mail, MapPin } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { z } from "zod";
import { Section, SectionHeader, Reveal } from "../components/ui/Section";
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
    `w-full rounded-[10px] border px-4 py-3 text-sm leading-6 outline-none transition-colors duration-200 ${
      errors[name]
        ? "border-red-500 bg-red-50/70 dark:bg-red-950/20"
        : "border-border bg-surface focus:border-accent-primary focus:ring-4 focus:ring-accent-soft"
    } text-text-primary placeholder:text-text-muted`;

  return (
    <Section id="contact">
      <SectionHeader
        eyebrow={t("sectionLabels.contact")}
        title={t("contact.title")}
        intro={t("contact.intro")}
      />

      <div className="grid gap-6 lg:grid-cols-[0.82fr_minmax(0,1.18fr)]">
        <Reveal className="h-full">
          <aside className="flex h-full flex-col rounded-card border border-border bg-surface p-7 shadow-card">
            <p className="text-[13px] font-semibold uppercase tracking-[0.08em] text-text-muted">
              {t("contact.sideTitle")}
            </p>
            <p className="mt-4 text-[16.5px] leading-7 text-text-primary">
              {t("contact.sideDescription")}
            </p>
            <p className="mt-5 rounded-[10px] bg-accent-soft px-4 py-3.5 text-sm leading-6 text-text-secondary">
              {t("contact.sideAvailability")}
            </p>

            <div className="mt-6 space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 text-accent-primary" aria-hidden="true" />
                <div>
                  <p className="text-xs uppercase tracking-[0.08em] text-text-muted">
                    {t("contact.sideEmailLabel")}
                  </p>
                  <a
                    href={`mailto:${t("footer.email")}`}
                    className="focus-ring mt-0.5 inline-block break-all rounded-md font-medium text-text-primary hover:text-accent-primary"
                  >
                    {t("footer.email")}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 text-accent-primary" aria-hidden="true" />
                <div>
                  <p className="text-xs uppercase tracking-[0.08em] text-text-muted">
                    {t("contact.sideLocationLabel")}
                  </p>
                  <p className="mt-0.5 font-medium text-text-primary">Villahermosa, Tabasco, Mexico</p>
                </div>
              </div>
            </div>
          </aside>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="rounded-card border border-border bg-surface p-7 shadow-card">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="contact-fullName" className="text-sm font-medium text-text-primary">
                    {t("contact.nameLabel")} <span className="text-accent-primary">*</span>
                  </label>
                  <input
                    id="contact-fullName"
                    type="text"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    className={inputClasses("fullName")}
                    placeholder="John Doe"
                    aria-invalid={errors.fullName ? "true" : "false"}
                  />
                  {errors.fullName && <p className="text-xs text-red-500" aria-live="polite">{errors.fullName}</p>}
                </div>

                <div className="space-y-2">
                  <label htmlFor="contact-email" className="text-sm font-medium text-text-primary">
                    {t("contact.emailLabel")} <span className="text-accent-primary">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className={inputClasses("email")}
                    placeholder="john@company.com"
                    aria-invalid={errors.email ? "true" : "false"}
                  />
                  {errors.email && <p className="text-xs text-red-500" aria-live="polite">{errors.email}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="contact-type" className="text-sm font-medium text-text-primary">
                    {t("contact.typeLabel")} <span className="text-accent-primary">*</span>
                  </label>
                  <select
                    id="contact-type"
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
                  {errors.type && <p className="text-xs text-red-500" aria-live="polite">{errors.type}</p>}
                </div>

                <div className="space-y-2">
                  <label htmlFor="contact-subject" className="text-sm font-medium text-text-primary">
                    {t("contact.subjectLabel")}
                  </label>
                  <input
                    id="contact-subject"
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
                  <label htmlFor="contact-message" className="text-sm font-medium text-text-primary">
                    {t("contact.messageLabel")} <span className="text-accent-primary">*</span>
                  </label>
                  <span className={`text-[10px] ${form.message.length > 1000 ? "text-red-500" : "text-text-muted"}`}>
                    {form.message.length} / 1000
                  </span>
                </div>
                <textarea
                  id="contact-message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={6}
                  className={`${inputClasses("message")} resize-none`}
                  placeholder={t("contact.messagePlaceholder")}
                  aria-invalid={errors.message ? "true" : "false"}
                />
                {errors.message && <p className="text-xs text-red-500" aria-live="polite">{errors.message}</p>}
              </div>

              <div className="flex flex-col gap-4 border-t border-border pt-5">
                <Button variant="primary" className="w-full sm:w-auto sm:min-w-[220px]" disabled={status === "sending" || status === "success"}>
                  {status === "sending" ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      {t("contact.sending")}
                    </>
                  ) : status === "success" ? (
                    <>
                      <CheckCircle2 className="h-4 w-4" />
                      {t("contact.success")}
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
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
                      className="flex items-center gap-2 rounded-[10px] bg-red-50 p-4 text-red-600 dark:bg-red-900/20 dark:text-red-400"
                    >
                      <AlertCircle className="h-5 w-5" />
                      <p className="text-sm font-medium">{t("contact.error")}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </form>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
