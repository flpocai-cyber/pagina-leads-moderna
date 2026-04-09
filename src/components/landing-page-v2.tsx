"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  Brain,
  Building2,
  GraduationCap,
  Phone,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
} from "lucide-react";

const introCards = [
  {
    title: "Ensino inovador",
    text: "Projetos interdisciplinares, tecnologia e aprendizagem ativa desde os primeiros anos.",
    icon: Brain,
  },
  {
    title: "Cuidado real",
    text: "Equipe próxima das famílias, rotina organizada e acompanhamento individual.",
    icon: ShieldCheck,
  },
  {
    title: "Estrutura completa",
    text: "Ambientes modernos para aprender, conviver, praticar esportes e descobrir talentos.",
    icon: Building2,
  },
];

const stats = [
  { value: 500, suffix: "+", label: "famílias ativas", icon: Users },
  { value: 1900, suffix: "+", label: "alunos impactados", icon: GraduationCap },
  { value: 750, suffix: "+", label: "experiências por semestre", icon: Sparkles },
  { value: 30, suffix: "+", label: "projetos e conquistas", icon: BadgeCheck },
];

const testimonials = [
  {
    name: "Mariana Lopes",
    role: "Mãe do 4º ano",
    quote:
      "A escola uniu acolhimento, organização e proposta pedagógica forte. A gente sentiu confiança logo na primeira visita.",
    image:
      "https://plus.unsplash.com/premium_photo-1661645867620-60ca2624b6ca?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000",
  },
  {
    name: "Ricardo Mendes",
    role: "Pai da Educação Infantil",
    quote:
      "Meu filho se adaptou muito bem e a equipe passa segurança o tempo todo. É uma escola que realmente acompanha de perto.",
    image:
      "https://images.unsplash.com/photo-1756982477204-9d4688418c49?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000",
  },
  {
    name: "Ana Carolina Silva",
    role: "Mãe do Ensino Médio",
    quote:
      "Além do conteúdo acadêmico, minha filha ganhou autonomia, repertório e visão de futuro. Isso fez muita diferença para nós.",
    image:
      "https://plus.unsplash.com/premium_photo-1661675922245-737ceaaf2c9e?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000",
  },
];

const stageCards = [
  {
    title: "Educação Infantil",
    subtitle: "Descoberta com afeto",
    image: "/sala.png",
  },
  {
    title: "Ensino Fundamental",
    subtitle: "Base sólida e protagonismo",
    image: "/colegio.png",
  },
  {
    title: "Ensino Médio",
    subtitle: "Preparação acadêmica e projeto de vida",
    image: "/sala.png",
  },
];

type FormState = {
  name: string;
  phone: string;
  email: string;
  age: string;
};

const initialForm: FormState = {
  name: "",
  phone: "",
  email: "",
  age: "",
};

function LeadForm() {
  const [form, setForm] = useState(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const whatsappUrl = useMemo(() => {
    const message = encodeURIComponent(
      `Olá! Quero mais informações sobre matrículas.\nNome: ${form.name || "-"}\nWhatsApp: ${form.phone || "-"}\nE-mail: ${form.email || "-"}\nIdade do aluno: ${form.age || "-"}`
    );

    return `https://wa.me/5511999999999?text=${message}`;
  }, [form]);

  function setField<K extends keyof FormState>(field: K, value: FormState[K]) {
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
    <div className="glass-panel rounded-[34px] p-6 sm:p-8">
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--navy-soft)]">
        Matrículas abertas
      </p>
      <h3 className="font-display mt-4 text-3xl font-semibold text-[var(--navy)]">
        Agende uma visita e conheça a proposta ideal para o seu filho.
      </h3>
      <p className="mt-3 text-base leading-7 text-[var(--muted)]">
        Atendimento consultivo, apresentação da estrutura e contato rápido pelo WhatsApp.
      </p>

      <form className="mt-8 grid gap-4" onSubmit={handleSubmit}>
        <input
          required
          value={form.name}
          onChange={(event) => setField("name", event.target.value)}
          placeholder="Nome do responsável"
          className="rounded-2xl border border-[var(--line)] bg-white/80 px-4 py-3.5 outline-none transition focus:border-[var(--navy-soft)]"
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <input
            required
            value={form.phone}
            onChange={(event) => setField("phone", event.target.value)}
            placeholder="WhatsApp"
            className="rounded-2xl border border-[var(--line)] bg-white/80 px-4 py-3.5 outline-none transition focus:border-[var(--navy-soft)]"
          />
          <input
            required
            type="email"
            value={form.email}
            onChange={(event) => setField("email", event.target.value)}
            placeholder="E-mail"
            className="rounded-2xl border border-[var(--line)] bg-white/80 px-4 py-3.5 outline-none transition focus:border-[var(--navy-soft)]"
          />
        </div>
        <input
          value={form.age}
          onChange={(event) => setField("age", event.target.value)}
          placeholder="Idade do aluno (opcional)"
          className="rounded-2xl border border-[var(--line)] bg-white/80 px-4 py-3.5 outline-none transition focus:border-[var(--navy-soft)]"
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="button-primary inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-4 text-base font-semibold transition hover:-translate-y-0.5 disabled:opacity-70"
        >
          {isSubmitting ? "Enviando..." : "Quero mais informações"}
          <ArrowRight className="h-5 w-5" />
        </button>

        <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
          <span className="text-[var(--muted)]">Seus dados estão protegidos.</span>
          <Link href={whatsappUrl} target="_blank" className="font-semibold text-[var(--navy)]">
            Falar agora no WhatsApp
          </Link>
        </div>

        {isSubmitted ? (
          <p className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            Recebemos seus dados e abrimos o WhatsApp para acelerar o atendimento.
          </p>
        ) : null}
      </form>
    </div>
  );
}

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-white/75 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[var(--navy-soft)] shadow-[var(--shadow-card)]">
      <Sparkles className="h-4 w-4" />
      {children}
    </div>
  );
}

function AnimatedStat({
  value,
  suffix,
  label,
  icon: Icon,
}: {
  value: number;
  suffix: string;
  label: string;
  icon: typeof Users;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { amount: 0.5 });
  const reduceMotion = useReducedMotion();
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) {
      const resetId = window.requestAnimationFrame(() => {
        setDisplayValue(0);
      });

      return () => window.cancelAnimationFrame(resetId);
    }

    if (reduceMotion) {
      const instantId = window.requestAnimationFrame(() => {
        setDisplayValue(value);
      });

      return () => window.cancelAnimationFrame(instantId);
    }

    const resetId = window.requestAnimationFrame(() => {
      setDisplayValue(0);
    });

    const duration = 1400;
    let start: number | null = null;
    let frameId = 0;

    const update = (now: number) => {
      if (start === null) {
        start = now;
      }

      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(value * eased));

      if (progress < 1) {
        frameId = window.requestAnimationFrame(update);
      }
    };

    frameId = window.requestAnimationFrame(update);

    return () => {
      window.cancelAnimationFrame(resetId);
      window.cancelAnimationFrame(frameId);
    };
  }, [isInView, reduceMotion, value]);

  return (
    <div ref={ref} className="flex items-center gap-4 text-white">
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white/16 backdrop-blur-sm">
        <Icon className="h-6 w-6" />
      </div>
      <div>
        <p className="font-display text-3xl font-semibold">
          {displayValue}
          {suffix}
        </p>
        <p className="text-sm text-white/75">{label}</p>
      </div>
    </div>
  );
}

export function LandingPageV2() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const navScale = useTransform(scrollYProgress, [0, 0.12], [1, reduceMotion ? 1 : 0.98]);
  const navY = useTransform(scrollYProgress, [0, 0.12], [0, reduceMotion ? 0 : -2]);
  const heroImageScale = useTransform(scrollYProgress, [0, 0.3], [1, reduceMotion ? 1 : 1.6]);
  const heroImageY = useTransform(scrollYProgress, [0, 0.3], [0, reduceMotion ? 0 : 38]);

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
              <Link href="#depoimentos">Depoimentos</Link>
              <Link href="#ensino">Ensino</Link>
              <Link
                href="#formulario"
                className="button-primary rounded-full px-5 py-2.5 font-semibold"
              >
                Agende uma visita
              </Link>
            </nav>
          </div>
        </motion.header>
      </div>

      <section id="top" className="px-5 pb-18 pt-28 sm:px-6 sm:pt-32 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div>
            <SectionEyebrow>Nosso sistema de ensino inspira mais</SectionEyebrow>
            <h1 className="font-display mt-6 max-w-3xl text-5xl font-semibold leading-[0.96] tracking-tight text-[var(--navy)] sm:text-6xl lg:text-[5rem]">
              Uma escola preparada para desenvolver repertório, confiança e futuro.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-[var(--muted)]">
              Educação com tecnologia, acolhimento e acompanhamento próximo para famílias
              que buscam uma jornada completa de formação.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="#formulario"
                className="button-primary inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-base font-semibold"
              >
                Agende uma visita
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="#diferenciais"
                className="button-secondary inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-base font-semibold"
              >
                Ver diferenciais
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-4 top-10 hidden h-36 w-36 rounded-full bg-[rgba(94,143,255,0.18)] blur-3xl sm:block" />
            <div className="relative h-[480px] overflow-hidden rounded-[40px] shadow-[0_34px_90px_rgba(10,37,64,0.18)] sm:h-[560px]">
              <motion.div
                style={{ scale: heroImageScale, y: heroImageY }}
                className="absolute inset-0 will-change-transform"
              >
                <Image
                  src="/colegio.png"
                  alt="Vista aérea do colégio"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a2540]/72 via-[#0a2540]/12 to-white/8" />
            </div>

            <div className="glass-panel absolute left-5 top-5 max-w-[270px] rounded-[28px] p-5 sm:left-7 sm:top-7">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--navy)] text-white">
                  <BadgeCheck className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--navy-soft)]">
                    Excelência e acolhimento
                  </p>
                  <p className="mt-2 text-base leading-7 text-[var(--navy)]">
                    Uma experiência escolar que combina segurança, inovação e atenção real às famílias.
                  </p>
                </div>
              </div>
            </div>

            <div className="glass-panel absolute bottom-5 right-5 max-w-[300px] rounded-[28px] p-5 sm:bottom-7 sm:right-7">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--navy-soft)]">
                Estrutura inspiradora
              </p>
              <p className="mt-3 text-xl font-semibold leading-8 text-[var(--navy)]">
                Um campus moderno, marcante e pensado para aprender bem em cada etapa.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="diferenciais" className="px-5 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="overflow-hidden rounded-[36px] bg-[linear-gradient(135deg,rgba(10,37,64,0.94),rgba(30,58,95,0.92))] text-white shadow-[0_28px_80px_rgba(10,37,64,0.22)]">
            <div className="grid gap-8 px-6 py-10 lg:grid-cols-[0.95fr_1.05fr] lg:px-10">
              <div>
                <SectionEyebrow>Diferenciais</SectionEyebrow>
                <h2 className="font-display mt-6 text-4xl font-semibold sm:text-5xl">
                  Um modelo de ensino completo, claro e envolvente.
                </h2>
                <p className="mt-4 max-w-xl text-lg leading-8 text-white/76">
                  O colégio foi pensado para desenvolver desempenho acadêmico, autonomia,
                  segurança e visão de futuro em cada etapa.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {introCards.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.title}
                      className="rounded-[28px] border border-white/12 bg-white/10 p-5 backdrop-blur-sm transition duration-300 ease-out hover:scale-[1.04] hover:border-white/24 hover:bg-white/14 hover:shadow-[0_18px_40px_rgba(7,24,45,0.24)]"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[var(--navy)]">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="mt-5 text-xl font-semibold">{item.title}</h3>
                      <p className="mt-3 text-sm leading-6 text-white/72">{item.text}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-18 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-[36px]">
          <div className="relative">
            <Image src="/sala.png" alt="Sala de aula" width={1600} height={500} className="h-[220px] w-full object-cover sm:h-[260px]" />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,37,64,0.82),rgba(30,58,95,0.62),rgba(30,58,95,0.72))]" />
            <div className="absolute inset-0 grid gap-6 px-6 py-8 sm:grid-cols-2 lg:grid-cols-4 lg:px-10">
              {stats.map((stat) => {
                return (
                  <AnimatedStat
                    key={stat.label}
                    value={stat.value}
                    suffix={stat.suffix}
                    label={stat.label}
                    icon={stat.icon}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section id="depoimentos" className="px-5 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <SectionEyebrow>Depoimentos</SectionEyebrow>
            <h2 className="font-display mt-6 text-4xl font-semibold text-[var(--navy)] sm:text-5xl">
              Famílias que escolheram com confiança.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-[var(--muted)]">
              Relatos reais de quem buscava qualidade educacional, segurança e uma escola com visão de futuro.
            </p>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {testimonials.map((item) => (
              <article key={item.name} className="glass-panel rounded-[30px] p-5">
                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={`${item.name}-${index}`} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="mt-5 text-base leading-7 text-[var(--navy)]">“{item.quote}”</p>
                <div className="mt-6 flex items-center gap-4">
                  <div className="relative h-16 w-16 overflow-hidden rounded-full bg-slate-100">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  <div>
                    <p className="font-semibold text-[var(--navy)]">{item.name}</p>
                    <p className="text-sm text-[var(--muted)]">{item.role}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="ensino" className="px-5 py-18 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <SectionEyebrow>Etapas de ensino</SectionEyebrow>
            <h2 className="font-display mt-6 text-4xl font-semibold text-[var(--navy)] sm:text-5xl">
              Uma jornada que acompanha cada fase do desenvolvimento.
            </h2>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {stageCards.map((stage) => (
              <article
                key={stage.title}
                className="overflow-hidden rounded-[30px] border border-white/60 bg-white/72 shadow-[var(--shadow-card)]"
              >
                <div className="relative h-[250px]">
                  <Image src={stage.image} alt={stage.title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a2540]/74 via-[#0a2540]/20 to-transparent" />
                </div>
                <div className="p-6">
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--navy-soft)]">
                    {stage.subtitle}
                  </p>
                  <h3 className="font-display mt-3 text-2xl font-semibold text-[var(--navy)]">
                    {stage.title}
                  </h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="formulario" className="px-5 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <SectionEyebrow>Captação de matrículas</SectionEyebrow>
            <h2 className="font-display mt-6 text-4xl font-semibold text-[var(--navy)] sm:text-5xl">
              O próximo passo pode começar com uma visita.
            </h2>
            <p className="mt-4 max-w-xl text-lg leading-8 text-[var(--muted)]">
              Conheça de perto a estrutura, converse com nossa equipe e descubra como o colégio pode apoiar a trajetória do seu filho.
            </p>

            <div className="mt-8 space-y-4">
              {[
                "Atendimento rápido pelo WhatsApp",
                "Apresentação da metodologia e da rotina escolar",
                "Visita guiada com foco na etapa ideal do aluno",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-2xl bg-white/75 px-4 py-4 shadow-[var(--shadow-card)]">
                  <BadgeCheck className="h-5 w-5 text-[var(--navy)]" />
                  <span className="text-[var(--navy)]">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <LeadForm />
        </div>
      </section>

      <footer className="px-5 pb-12 pt-8 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-5 rounded-[30px] border border-white/60 bg-white/72 px-6 py-8 shadow-[var(--shadow-card)] lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="font-display text-2xl font-semibold text-[var(--navy)]">Colégio Horizonte</p>
            <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
              Rua das Descobertas, 245, Centro, São Paulo - SP. Atendimento de segunda a sexta, das 8h às 18h.
            </p>
          </div>
          <div className="flex flex-col gap-2 text-sm text-[var(--navy)]">
            <Link href="tel:+551130000000">(11) 3000-0000</Link>
            <Link href="mailto:matriculas@colegiohorizonte.com.br">matriculas@colegiohorizonte.com.br</Link>
            <div className="flex items-center gap-4 pt-1">
              <Link href="https://instagram.com" target="_blank">Instagram</Link>
              <Link href="https://facebook.com" target="_blank">Facebook</Link>
              <Link href="https://linkedin.com" target="_blank">LinkedIn</Link>
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
