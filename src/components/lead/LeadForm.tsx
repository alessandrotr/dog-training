'use client';

import {useState} from 'react';
import Image from 'next/image';
import {useTranslation} from 'react-i18next';
import {Send, CheckCircle2, AlertCircle, X, Sparkles, PawPrint} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {Heading, Text, Eyebrow, MultiSelect} from '@/components/ui';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Textarea} from '@/components/ui/textarea';
import {useInquiryCart} from '@/components/InquiryCartProvider';
import {submitLead, makeLeadSchema, type LeadPayload} from '@/lib/lead';

type Status = 'idle' | 'loading' | 'success' | 'error';
type Errors = Partial<Record<'name' | 'email' | 'message', string>>;

const EMPTY: LeadPayload = {name: '', email: '', dogAge: '', dogBreed: '', message: ''};

// Unified contact intake form. Rendered both on the /contact page and inside
// the lead dialog. Submits through submitLead() (currently a stub). Validation
// runs through a zod schema (see makeLeadSchema) that drops the message
// requirement once services are attached to the inquiry.
export default function LeadForm({onSuccess, available = true}: {onSuccess?: () => void; available?: boolean}) {
  const {t, i18n} = useTranslation();
  const cart = useInquiryCart();
  const de = i18n.language === 'de';
  const waitlist = !available; // fully booked → frame the form as a waitlist join
  const [data, setData] = useState<LeadPayload>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>('idle');

  // Service picker: the catalog drives a multi-select, the inquiry cart is the
  // source of truth for what's chosen. Reconcile the two on change.
  const selected = cart.catalog.filter((s) => cart.has(s.slug)).map((s) => s.slug);
  function handleServices(next: string[]) {
    next
      .filter((slug) => !cart.has(slug))
      .forEach((slug) => {
        const item = cart.catalog.find((s) => s.slug === slug);
        if (item) cart.add(item);
      });
    selected.filter((slug) => !next.includes(slug)).forEach((slug) => cart.remove(slug));
  }

  function set<K extends keyof LeadPayload>(key: K, value: string) {
    setData((d) => ({...d, [key]: value}));
    if (key in errors) setErrors((e) => ({...e, [key]: undefined}));
  }

  function validate(): LeadPayload | null {
    const schema = makeLeadSchema(
      {
        name: t('contact.fields.fullName'),
        email: t('contact.fields.emailAddress'),
        message: t('contact.fields.detailBehaviors'),
      },
      // A message is required unless services were added to the inquiry.
      cart.items.length === 0,
    );
    const result = schema.safeParse(data);
    if (!result.success) {
      const f = result.error.flatten().fieldErrors;
      setErrors({name: f.name?.[0], email: f.email?.[0], message: f.message?.[0]});
      return null;
    }
    setErrors({});
    return result.data;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const clean = validate();
    if (!clean) return;
    setStatus('loading');
    try {
      const prefix = de ? 'Interessiert an: ' : 'Interested in: ';
      const services = cart.items.map((i) => i.title);
      const waitlistNote = waitlist ? (de ? '⏳ Wartelisten-Anfrage' : '⏳ Waitlist request') : '';
      const message = [waitlistNote, services.length ? `${prefix}${services.join(', ')}` : '', clean.message?.trim()]
        .filter(Boolean)
        .join('\n\n');
      await submitLead({...clean, message});
      cart.clear();
      setStatus('success');
      onSuccess?.();
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center gap-3 py-8 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
          <CheckCircle2 className="h-7 w-7" />
        </div>
        <Heading level={3} size="card">
          {waitlist ? (de ? 'Du bist auf der Warteliste!' : "You're on the waitlist!") : t('contact.successTitle')}
        </Heading>
        <Text className="max-w-sm">
          {waitlist
            ? de
              ? 'Sophia meldet sich, sobald ein Platz frei wird.'
              : 'Sophia will reach out as soon as a spot opens up.'
            : t('contact.successText')}
        </Text>
        <Button
          variant="outline"
          onClick={() => {
            setData(EMPTY);
            setStatus('idle');
          }}
        >
          {t('contact.sendAnother')}
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 text-left">
      {waitlist && (
        <div className="rounded-2xl border border-amber-200/60 bg-amber-50 p-3.5 text-[13px] leading-relaxed text-amber-900">
          <span className="font-bold">{de ? 'Aktuell ausgebucht.' : 'Currently fully booked.'}</span>{' '}
          {de
            ? 'Trag dich in die Warteliste ein – Sophia meldet sich, sobald ein Platz frei wird.'
            : 'Join the waitlist and Sophia will reach out as soon as a spot opens up.'}
        </div>
      )}

      {/* Selected programs */}
      {cart.items.length > 0 && (
        <div className="rounded-2xl border border-amber-200/60 bg-linear-to-br from-amber-50 to-white p-3.5 shadow-sm">
          <div className="mb-2.5 flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-wider text-amber-800">
              <Sparkles className="h-3.5 w-3.5" />
              {de ? 'Anfrage zu' : 'Inquiring about'}
            </span>
            <span className="rounded-full bg-amber-100 px-2 py-0.5 font-mono text-[10px] font-bold text-amber-800">
              {cart.items.length}
            </span>
          </div>
          <ul className="space-y-2">
            {cart.items.map((item) => (
              <li
                key={item.slug}
                className="group flex items-center gap-3 rounded-xl border border-amber-200/50 bg-white p-2 shadow-xs transition-colors hover:border-amber-300/70"
              >
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-amber-100">
                  {item.imageUrl ? (
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      sizes="48px"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <span className="flex h-full w-full items-center justify-center text-amber-700">
                      <PawPrint className="h-5 w-5" />
                    </span>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <p className="truncate font-sans text-sm font-bold text-stone-900">{item.title}</p>
                    {item.price && (
                      <span className="shrink-0 font-sans text-sm font-extrabold text-amber-950">{item.price}</span>
                    )}
                  </div>
                  {item.shortDescription && (
                    <p className="mt-0.5 truncate text-xs leading-relaxed text-stone-500">{item.shortDescription}</p>
                  )}
                </div>
                <button
                  type="button"
                  aria-label={`Remove ${item.title}`}
                  onClick={() => cart.remove(item.slug)}
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-amber-700/50 transition-colors hover:bg-amber-100 hover:text-amber-900"
                >
                  <X className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Manual program picker */}
      {cart.catalog.length > 0 && (
        <div className="space-y-1.5">
          <Label htmlFor="lead-services">{de ? 'Programme hinzufügen' : 'Add a program'}</Label>
          <MultiSelect
            id="lead-services"
            options={cart.catalog.map((s) => ({value: s.slug, label: s.title, hint: s.price}))}
            value={selected}
            onValueChange={handleServices}
            placeholder={de ? 'Programme auswählen…' : 'Choose programs…'}
            summary={(n) => (de ? `${n} ausgewählt` : `${n} selected`)}
          />
        </div>
      )}

      {/* Contact details */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="lead-name">{t('contact.fields.fullName')}</Label>
          <Input id="lead-name" value={data.name} onChange={(e) => set('name', e.target.value)} aria-invalid={!!errors.name} />
          {errors.name && <p className="font-mono text-[10px] text-red-500">{errors.name}</p>}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="lead-email">{t('contact.fields.emailAddress')}</Label>
          <Input id="lead-email" type="email" value={data.email} onChange={(e) => set('email', e.target.value)} aria-invalid={!!errors.email} />
          {errors.email && <p className="font-mono text-[10px] text-red-500">{errors.email}</p>}
        </div>
      </div>

      {/* About the dog */}
      <div className="space-y-2.5 pb-1.5">
        <Eyebrow tone="brand" className="flex items-center gap-1.5">
          <PawPrint className="h-3.5 w-3.5" /> {de ? 'Über deinen Hund' : 'About your pup'}
        </Eyebrow>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="lead-dog-age">{de ? 'Alter' : 'Age'}</Label>
            <Input
              id="lead-dog-age"
              value={data.dogAge ?? ''}
              onChange={(e) => set('dogAge', e.target.value)}
              placeholder={de ? 'z. B. 8 Monate' : 'e.g. 8 months'}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="lead-dog-breed">{de ? 'Rasse' : 'Breed'}</Label>
            <Input
              id="lead-dog-breed"
              value={data.dogBreed ?? ''}
              onChange={(e) => set('dogBreed', e.target.value)}
              placeholder={de ? 'z. B. Border Collie' : 'e.g. Border Collie'}
            />
          </div>
        </div>
      </div>

      {/* Message */}
      <div className="space-y-1.5">
        <Label htmlFor="lead-message">{t('contact.fields.detailBehaviors')}</Label>
        <Textarea
          id="lead-message"
          rows={4}
          value={data.message ?? ''}
          onChange={(e) => set('message', e.target.value)}
          placeholder={t('contact.fields.detailPlaceholder')}
          aria-invalid={!!errors.message}
        />
        {errors.message && <p className="font-mono text-[10px] text-red-500">{errors.message}</p>}
      </div>

      {status === 'error' && (
        <p className="flex items-center gap-1.5 font-mono text-xs text-red-500">
          <AlertCircle className="h-4 w-4" /> {t('contact.fields.sendButton')} — try again.
        </p>
      )}

      <Button
        type="submit"
        size="lg"
        disabled={status === 'loading'}
        className="h-12 w-full rounded-xl bg-amber-700 text-sm font-bold tracking-tight text-white shadow-lg shadow-amber-900/15 transition-all hover:bg-amber-800 hover:shadow-xl hover:shadow-amber-900/25 active:scale-[0.98] disabled:hover:bg-amber-700"
      >
        {status === 'loading'
          ? t('contact.fields.transmitting')
          : waitlist
            ? de
              ? 'Auf die Warteliste'
              : 'Join the waitlist'
            : t('contact.fields.sendButton')}
        {status !== 'loading' && <Send className="h-4 w-4" />}
      </Button>
    </form>
  );
}
