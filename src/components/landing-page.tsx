"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  Brain,
  Building2,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  MapPin,
  MonitorSmartphone,
  Phone,
  Play,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

const stats = [
  { value: "28+", label: "anos formando alunos com propósito" },
  { value: "4.500+", label: "famílias impactadas ao longo da jornada" },
  { value: "96%", label: "de satisfação nas pesquisas com responsáveis" },
];

const differentials = [
  {
    icon: Brain,
    title: "Ensino inovador",
    description:
      "Metodologias ativas, cultura digital e acompanhamento individual para manter o aluno engajado e evoluindo.",
  },
  {
    icon: ShieldCheck,
    title: "Segurança e acolhimento",
    description:
      "Ambiente monitorado, equipe próxima às famílias e rotina pensada para transmitir tranquilidade todos os dias.",
  },
  {
    icon: GraduationCap,
    title: "Formação completa",
    description:
      "Desenvolvimento acadêmico, socioemocional e humano em cada fase da vida escolar.",
  },
  {
    icon: Building2,
    title: "Estrutura inspiradora",
    description:
      "Salas modernas, espaços maker e ambientes preparados para aprender, conviver e descobrir talentos.",
  },
];

const schoolStages = [
  {
    title: "Educação Infantil",
    description: "Descoberta com afeto, ludicidade e estímulos que respeitam cada infância.",
  },
  {
    title: "Ensino Fundamental",
    description: "Base sólida com protagonismo, leitura crítica e repertório para o mundo real.",
  },
  {
    title: "Ensino Médio",
    description: "Preparação acadêmica forte com projeto de vida, tecnologia e visão de futuro.",
  },
];

const testimonials = [
  {
    name: "Mariana Lopes",
    role: "Mãe do 4º ano",
    quote:
      "Escolhemos o colégio pela proposta inovadora e ficamos pela atenção verdadeira que eles têm com cada aluno.",
    image:
      "https://plus.unsplash.com/premium_photo-1661645867620-60ca2624b6ca?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000",
  },
  {
    name: "Ricardo Mendes",
    role: "Pai da Educação Infantil",
    quote:
      "A adaptação do meu filho foi leve, segura e muito acolhedora. Sentimos confiança desde a primeira visita.",
    image:
      "https://images.unsplash.com/photo-1756982477204-9d4688418c49?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000",
  },
  {
    name: "Ana Carolina Silva",
    role: "Mãe do Ensino Médio",
    quote:
      "Além do ensino forte, o colégio ajuda os alunos a enxergarem possibilidades reais para o futuro.",
    image:
      "https://plus.unsplash.com/premium_photo-1661675922245-737ceaaf2c9e?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000",
  },
];

const logos = ["Geekie", "Cambridge", "Google for Education", "LEGO Education"];

type FormState = {
  name: string;
  phone: string;
  email: string;
  age: string;
};

const initialFormState: FormState = {
  name: "",
  phone: "",
  email: "",
  age: "",
};

const sectionReveal: Variants = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  description: string;
  align?: "left" | "center";
}) {
  return (
    <div className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      <div className="glass-chip inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[var(--navy)]">
        <Sparkles className="h-4 w-4" />
        {eyebrow}
      </div>
      <h2 className="font-display text-balance mt-5 text-3xl font-semibold tracking-tight text-[var(--navy)] sm:text-4xl lg:text-[3.2rem]">
        {title}
      </h2>
      <p className="mt-4 text-base leading-7 text-[var(--muted)] sm:text-lg">{description}</p>
    </div>
  );
}

function TestimonialCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 5500);

    return () => window.clearInterval(timer);
  }, []);

  const activeTestimonial = testimonials[activeIndex];

  return (
    <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
      <div className="relative min-h-[360px] overflow-hidden rounded-[28px]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.55),_rgba(226,234,244,0.78)_45%,_rgba(196,210,227,0.92)_100%)]" />
        <motion.div
          key={activeTestimonial.image}
          initial={{ opacity: 0.35, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <Image
            src={activeTestimonial.image}
            alt={activeTestimonial.name}
            fill
            sizes="(max-width: 1024px) 100vw, 40vw"
            className="object-contain p-4"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a2540]/82 via-[#0a2540]/18 to-transparent" />
        <div className="glass-overlay-dark absolute bottom-5 left-5 right-5 rounded-[24px] p-5">
          <p className="text-sm uppercase tracking-[0.2em] text-white/80">Depoimento em destaque</p>
          <p className="mt-2 text-lg font-semibold text-white">{activeTestimonial.name}</p>
          <p className="text-sm text-white/85">{activeTestimonial.role}</p>
        </div>
      </div>

      <div className="glass-panel rounded-[32px] p-6 sm:p-8">
        <div className="flex items-center gap-3 text-[var(--navy)]">
          <BadgeCheck className="h-5 w-5" />
          <span className="text-sm font-semibold uppercase tracking-[0.22em]">
            Famílias que recomendam
          </span>
        </div>

        <motion.blockquote
          key={activeIndex}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="mt-6 text-2xl font-medium leading-tight text-[var(--navy)] sm:text-3xl"
        >
          “{activeTestimonial.quote}”
        </motion.blockquote>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          {testimonials.map((testimonial, index) => (
            <button
              key={testimonial.name}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`rounded-full px-4 py-2 text-sm transition ${
                index === activeIndex
                  ? "bg-[var(--navy)] text-white shadow-lg"
                  : "bg-white/70 text-[var(--navy)]"
              }`}
            >
              {testimonial.name}
            </button>
          ))}
        </div>

        <div className="mt-8 flex items-center gap-3">
          <button
            type="button"
            onClick={() =>
              setActiveIndex((current) => (current - 1 + testimonials.length) % testimonials.length)
            }
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--line)] bg-white/80 text-[var(--navy)] transition hover:-translate-y-0.5"
            aria-label="Depoimento anterior"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => setActiveIndex((current) => (current + 1) % testimonials.length)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--line)] bg-white/80 text-[var(--navy)] transition hover:-translate-y-0.5"
            aria-label="Próximo depoimento"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

function LeadForm() {
  const [form, setForm] = useState(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const whatsappUrl = useMemo(() => {
    const message = encodeURIComponent(
      `Olá! Quero mais informações sobre matrículas.\nNome: ${form.name || "-"}\nWhatsApp: ${form.phone || "-"}\nE-mail: ${form.email || "-"}\nIdade do aluno: ${form.age || "-"}`
    );

    return `https://wa.me/5511999999999?text=${message}`;
  }, [form]);

  function updateField<K extends keyof FormState>(field: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);

    window.setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    }, 900);
  }

  return (
    <div className="glass-panel relative rounded-[32px] p-6 shadow-[var(--shadow-soft)] sm:p-8">
      <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/90 to-transparent" />
      <div className="flex items-center gap-3 text-[var(--navy)]">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--navy)] text-white shadow-lg">
          <Phone className="h-5 w-5" />
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--navy-soft)]">
            Matrículas abertas
          </p>
          <h3 className="font-display text-2xl font-semibold text-[var(--navy)]">
            Agende uma visita e receba uma proposta personalizada
          </h3>
        </div>
      </div>

      <form className="mt-8 grid gap-4" onSubmit={handleSubmit}>
        <label className="grid gap-2">
          <span className="text-sm font-medium text-[var(--navy)]">Nome do responsável</span>
          <input
            required
            value={form.name}
            onChange={(event) => updateField("name", event.target.value)}
            placeholder="Como podemos te chamar?"
            className="rounded-2xl border border-[var(--line)] bg-white/80 px-4 py-3.5 outline-none transition focus:border-[var(--navy-soft)] focus:bg-white"
          />
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="grid gap-2">
            <span className="text-sm font-medium text-[var(--navy)]">WhatsApp</span>
            <input
              required
              value={form.phone}
              onChange={(event) => updateField("phone", event.target.value)}
              placeholder="(11) 99999-9999"
              className="rounded-2xl border border-[var(--line)] bg-white/80 px-4 py-3.5 outline-none transition focus:border-[var(--navy-soft)] focus:bg-white"
            />
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-medium text-[var(--navy)]">E-mail</span>
            <input
              required
              type="email"
              value={form.email}
              onChange={(event) => updateField("email", event.target.value)}
              placeholder="voce@exemplo.com"
              className="rounded-2xl border border-[var(--line)] bg-white/80 px-4 py-3.5 outline-none transition focus:border-[var(--navy-soft)] focus:bg-white"
            />
          </label>
        </div>

        <label className="grid gap-2">
          <span className="text-sm font-medium text-[var(--navy)]">Idade do aluno (opcional)</span>
          <input
            value={form.age}
            onChange={(event) => updateField("age", event.target.value)}
            placeholder="Ex: 6 anos"
            className="rounded-2xl border border-[var(--line)] bg-white/80 px-4 py-3.5 outline-none transition focus:border-[var(--navy-soft)] focus:bg-white"
          />
        </label>

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-2 inline-flex items-center justify-center gap-2 rounded-2xl bg-[var(--navy)] px-6 py-4 text-base font-semibold text-white shadow-xl transition hover:-translate-y-0.5 hover:bg-[var(--navy-soft)] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? "Enviando..." : "Quero mais informações"}
          <ArrowRight className="h-5 w-5" />
        </button>

        <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
          <p className="text-[var(--muted)]">Seus dados estão protegidos.</p>
          <Link
            href={whatsappUrl}
            target="_blank"
            className="font-semibold text-[var(--navy)] transition hover:text-[var(--navy-soft)]"
          >
            Falar agora no WhatsApp
          </Link>
        </div>

        {isSubmitted ? (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700"
          >
            Recebemos seus dados. Abrimos o WhatsApp para acelerar seu atendimento.
          </motion.p>
        ) : null}
      </form>
    </div>
  );
}

export function LandingPage() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.25], [0, reduceMotion ? 0 : -60]);
  const heroCardY = useTransform(scrollYProgress, [0, 0.22], [0, reduceMotion ? 0 : 44]);
  const heroImageScale = useTransform(scrollYProgress, [0, 0.32], [1, reduceMotion ? 1 : 1.58]);
  const navScale = useTransform(scrollYProgress, [0, 0.12], [1, reduceMotion ? 1 : 0.98]);
  const navY = useTransform(scrollYProgress, [0, 0.12], [0, reduceMotion ? 0 : -2]);

  return (
    <main className="overflow-hidden">
      <div className="pointer-events-none fixed inset-x-0 top-4 z-[200] px-5 sm:px-6 lg:px-8">
        <motion.header
          style={{ scale: navScale, y: navY }}
          className="pointer-events-auto mx-auto w-full max-w-6xl"
        >
          <div className="glass-nav mx-auto flex w-full items-center justify-between rounded-full px-5 py-3 sm:px-6">
            <Link href="#top" className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--navy)] text-white">
                <BookOpen className="h-5 w-5" />
              </div>
              <div>
                <p className="font-display text-sm font-semibold uppercase tracking-[0.26em] text-[var(--navy)]">
                  Colégio Horizonte
                </p>
                <p className="text-xs text-[var(--muted)]">Matrículas 2026</p>
              </div>
            </Link>

            <nav className="hidden items-center gap-7 text-sm text-[var(--navy)] lg:flex">
              <Link href="#diferenciais">Diferenciais</Link>
              <Link href="#etapas">Ensino</Link>
              <Link href="#depoimentos">Depoimentos</Link>
              <Link
                href="#formulario"
                className="button-primary rounded-full px-5 py-2.5 font-semibold transition hover:bg-[var(--navy-soft)]"
              >
                Agende uma visita
              </Link>
            </nav>
          </div>
        </motion.header>
      </div>

      <section className="section-shell relative isolate min-h-screen px-5 pb-16 pt-24 sm:px-6 sm:pt-28 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col">
          <div
            id="top"
            className="relative grid min-h-[calc(100svh-7rem)] items-center gap-10 pb-10 pt-6 lg:grid-cols-[0.92fr_1.08fr] lg:gap-14 lg:pt-10"
          >
            <motion.div
              initial={{ opacity: 0, y: 36 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative z-10 max-w-2xl"
            >
              <div className="glass-chip inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[var(--navy)]">
                <Sparkles className="h-4 w-4" />
                Educação com excelência, inovação e acolhimento
              </div>
              <h1 className="font-display text-balance mt-6 text-5xl font-semibold leading-[0.96] tracking-tight text-[var(--navy)] sm:text-6xl lg:text-[5.5rem]">
                O futuro do seu filho começa com a educação certa.
              </h1>
              <p className="text-balance mt-6 max-w-xl text-lg leading-8 text-[var(--muted)] sm:text-xl">
                Uma jornada educacional que combina desempenho acadêmico, segurança,
                tecnologia e formação humana para preparar seu filho para um mundo em
                transformação.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="#formulario"
                  className="button-primary inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-base font-semibold shadow-xl transition hover:-translate-y-0.5 hover:bg-[var(--navy-soft)]"
                >
                  Agende uma visita
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Link
                  href="#diferenciais"
                  className="button-secondary inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-base font-semibold transition hover:-translate-y-0.5 hover:bg-white"
                >
                  <Play className="h-5 w-5" />
                  Conheça os diferenciais
                </Link>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {stats.map((stat) => (
                  <div key={stat.label} className="glass-panel rounded-[24px] px-5 py-4">
                    <p className="font-display text-3xl font-semibold text-[var(--navy)]">
                      {stat.value}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{stat.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div style={{ y: heroY }} className="relative h-[540px] lg:h-[640px]">
              <div className="absolute -left-4 top-10 hidden h-36 w-36 rounded-full bg-[rgba(94,143,255,0.2)] blur-3xl sm:block" />
              <div className="absolute right-0 top-8 h-[82%] w-[88%] overflow-hidden rounded-[32px] shadow-[var(--shadow-soft)]">
                <motion.div style={{ scale: heroImageScale }} className="absolute inset-0 will-change-transform">
                  <Image
                    src="/colegio.png"
                    alt="Vista aérea do colégio"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-tr from-[#0a2540]/76 via-transparent to-white/16" />
              </div>

              <motion.div
                style={{ y: heroCardY }}
                className="glass-panel absolute left-0 top-0 max-w-[250px] rounded-[28px] p-5"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--navy)] text-white">
                    <MonitorSmartphone className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[var(--navy)]">Aprendizagem ativa</p>
                    <p className="text-sm text-[var(--muted)]">Tecnologia integrada ao ensino</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25, duration: 0.8, ease: "easeOut" }}
                className="glass-panel absolute bottom-5 right-0 max-w-[290px] rounded-[28px] p-5"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--navy-soft)]">
                  Visita guiada
                </p>
                <p className="mt-2 text-xl font-semibold text-[var(--navy)]">
                  Descubra como o Colégio Horizonte cuida de cada etapa da formação.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-6 lg:px-8">
        <motion.div
          variants={sectionReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          className="mx-auto max-w-6xl"
        >
          <SectionHeader
            eyebrow="Prova social"
            title="Uma escola escolhida por famílias que valorizam excelência e confiança"
            description="Parcerias pedagógicas reconhecidas, tradição acadêmica e uma experiência escolar que transmite segurança desde o primeiro contato."
            align="center"
          />

          <div className="mt-10 grid gap-4 md:grid-cols-4">
            {logos.map((logo) => (
              <div
                key={logo}
                className="glass-panel flex min-h-24 items-center justify-center rounded-[24px] px-5 py-4 text-center text-sm font-semibold uppercase tracking-[0.22em] text-[var(--navy)]"
              >
                {logo}
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      <section id="diferenciais" className="section-shell px-5 py-20 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-[40px]">
          <Image
            src="/sala.png"
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-[0.26]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(245,247,250,0.62)_0%,rgba(226,235,245,0.56)_28%,rgba(196,213,232,0.34)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(94,143,255,0.16),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(10,37,64,0.1),transparent_28%)]" />
        </div>

        <motion.div
          variants={sectionReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mx-auto max-w-6xl"
        >
          <SectionHeader
            eyebrow="Diferenciais"
            title="Muito mais do que ensino: uma proposta pensada para formar alunos completos"
            description="Cada detalhe da rotina escolar foi desenhado para unir aprendizado consistente, cuidado genuíno e experiências que desenvolvem autonomia."
          />

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {differentials.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.article
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.6, delay: index * 0.08, ease: "easeOut" }}
                  className="glass-panel group rounded-[28px] p-6 transition hover:-translate-y-1"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-[18px] bg-[var(--navy)] text-white shadow-lg transition group-hover:scale-105">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-display mt-6 text-2xl font-semibold text-[var(--navy)]">
                    {item.title}
                  </h3>
                  <p className="mt-3 max-w-md text-base leading-7 text-[var(--muted)]">
                    {item.description}
                  </p>
                </motion.article>
              );
            })}
          </div>
        </motion.div>
      </section>

      <section className="px-5 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_0.9fr]">
          <motion.div
            variants={sectionReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.22 }}
            className="relative min-h-[420px] overflow-hidden rounded-[32px]"
          >
            <Image
              src="https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=1400&q=80"
              alt="Alunos em atividade prática"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a2540]/82 via-[#0a2540]/30 to-transparent" />
            <div className="absolute bottom-6 left-6 max-w-sm text-white">
              <p className="text-sm uppercase tracking-[0.22em] text-white/70">Experiência visual</p>
              <h3 className="font-display mt-3 text-3xl font-semibold">
                Espaços que estimulam curiosidade, colaboração e protagonismo.
              </h3>
            </div>
          </motion.div>

          <motion.div
            variants={sectionReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.22 }}
            className="glass-panel rounded-[32px] p-6 sm:p-8"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--navy-soft)]">
              O que as famílias sentem na prática
            </p>
            <h3 className="font-display mt-4 text-3xl font-semibold text-[var(--navy)]">
              Uma escola preparada para ensinar bem e acolher melhor ainda.
            </h3>
            <p className="mt-4 text-base leading-7 text-[var(--muted)]">
              Do atendimento inicial ao acompanhamento pedagógico, a jornada é desenhada
              para oferecer clareza, proximidade e segurança em cada decisão da família.
            </p>

            <div className="mt-8 space-y-4">
              {[
                "Comunicação próxima com pais e responsáveis",
                "Projetos interdisciplinares e experiências maker",
                "Rotina organizada para favorecer evolução contínua",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-2xl bg-white/65 px-4 py-4">
                  <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-[var(--navy)]" />
                  <span className="text-sm leading-6 text-[var(--navy)]">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section id="depoimentos" className="section-shell px-5 py-20 sm:px-6 lg:px-8">
        <motion.div
          variants={sectionReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mx-auto max-w-6xl"
        >
          <SectionHeader
            eyebrow="Depoimentos"
            title="Histórias reais de quem encontrou a escola certa"
            description="Confiança se constrói com experiência. Estes relatos mostram o impacto de uma educação que olha para o presente e prepara para o futuro."
          />
          <div className="mt-12">
            <TestimonialCarousel />
          </div>
        </motion.div>
      </section>

      <section id="etapas" className="px-5 py-20 sm:px-6 lg:px-8">
        <motion.div
          variants={sectionReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mx-auto max-w-6xl"
        >
          <SectionHeader
            eyebrow="Estrutura de ensino"
            title="Uma jornada contínua, da infância à preparação para os próximos grandes passos"
            description="Cada segmento foi pensado para desenvolver competências acadêmicas, emocionais e sociais com consistência."
            align="center"
          />

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {schoolStages.map((stage, index) => (
              <motion.article
                key={stage.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                className="group rounded-[30px] border border-[var(--line)] bg-white/70 p-6 shadow-[var(--shadow-card)] backdrop-blur-sm transition hover:-translate-y-1 hover:border-white/80"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--navy-soft)]">
                  Etapa {index + 1}
                </p>
                <h3 className="font-display mt-5 text-3xl font-semibold text-[var(--navy)]">
                  {stage.title}
                </h3>
                <p className="mt-4 text-base leading-7 text-[var(--muted)]">{stage.description}</p>
                <div className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[var(--navy)]">
                  Saiba mais
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="px-5 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl overflow-hidden rounded-[36px] bg-[linear-gradient(135deg,#07182d_0%,#102b47_55%,#19406a_100%)] px-6 py-10 text-white shadow-[0_30px_80px_rgba(10,37,64,0.35)] sm:px-10 lg:px-12 lg:py-14">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center"
          >
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/65">
                Chamada emocional
              </p>
              <h2 className="font-display text-balance mt-4 text-4xl font-semibold sm:text-5xl">
                Seu filho merece mais do que ensino. Ele merece um futuro.
              </h2>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-white/78">
                Escolha uma escola que combina acolhimento, excelência acadêmica e visão
                de mundo para transformar potencial em conquista.
              </p>
            </div>
            <Link
              href="#formulario"
              className="button-light inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-base font-semibold transition hover:-translate-y-0.5"
            >
              Quero conhecer o colégio
              <ArrowRight className="h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      <section id="formulario" className="section-shell px-5 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <motion.div
            variants={sectionReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <SectionHeader
              eyebrow="Captação de matrículas"
              title="Converse com nossa equipe e descubra a melhor jornada para o seu filho"
              description="Preencha o formulário para receber atendimento personalizado, detalhes sobre proposta pedagógica, estrutura e processo de matrícula."
            />

            <div className="mt-8 space-y-4">
              {[
                {
                  icon: Users,
                  title: "Atendimento consultivo",
                  text: "Entendemos o perfil do aluno e indicamos o melhor caminho.",
                },
                {
                  icon: BadgeCheck,
                  title: "Resposta rápida",
                  text: "Nossa equipe entra em contato para tirar dúvidas e apresentar a escola.",
                },
                {
                  icon: MapPin,
                  title: "Visita guiada",
                  text: "Conheça de perto os espaços, a metodologia e o clima do colégio.",
                },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="glass-panel flex items-start gap-4 rounded-[24px] p-4"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--navy)] text-white">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-[var(--navy)]">{item.title}</h3>
                      <p className="mt-1 text-sm leading-6 text-[var(--muted)]">{item.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            variants={sectionReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <LeadForm />
          </motion.div>
        </div>
      </section>

      <footer className="px-5 pb-12 pt-6 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 rounded-[32px] border border-white/60 bg-white/70 px-6 py-8 shadow-[var(--shadow-card)] backdrop-blur-sm lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="font-display text-2xl font-semibold text-[var(--navy)]">Colégio Horizonte</p>
            <p className="mt-2 max-w-xl text-sm leading-6 text-[var(--muted)]">
              Rua das Descobertas, 245, Centro, São Paulo - SP. Atendimento de segunda a
              sexta, das 8h às 18h.
            </p>
          </div>

          <div className="flex flex-col gap-2 text-sm text-[var(--navy)]">
            <Link href="tel:+551130000000">(11) 3000-0000</Link>
            <Link href="mailto:matriculas@colegiohorizonte.com.br">
              matriculas@colegiohorizonte.com.br
            </Link>
            <div className="flex items-center gap-4 pt-2">
              <Link href="https://instagram.com" target="_blank">
                Instagram
              </Link>
              <Link href="https://facebook.com" target="_blank">
                Facebook
              </Link>
              <Link href="https://linkedin.com" target="_blank">
                LinkedIn
              </Link>
            </div>
          </div>
        </div>
      </footer>

      <Link
        href="https://wa.me/5511999999999?text=Olá!%20Quero%20mais%20informações%20sobre%20matrículas."
        target="_blank"
        className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3.5 text-sm font-semibold text-white shadow-2xl transition hover:-translate-y-0.5"
      >
        <Phone className="h-4 w-4" />
        WhatsApp
      </Link>
    </main>
  );
}
