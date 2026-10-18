import { useMemo, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Slider } from '@/components/ui/slider';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { IrpfArticle } from '@/components/IrpfArticle';

const formatEuro = (value: number) =>
  new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(value);

const formatPercent = (value: number) =>
  new Intl.NumberFormat('es-ES', {
    style: 'percent',
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
  }).format(value);

const COLORS = {
  net: 'hsl(var(--chart-2))',
  iva: 'hsl(var(--chart-4))',
  irpf: 'hsl(var(--chart-1))',
  cuota: 'hsl(var(--chart-5))',
};

type Segment = {
  name: string;
  value: number;
  color: string;
  description: string;
};

type LegalDoc = 'privacidad' | 'cookies' | 'aviso';

const LEGAL_DOCS: Record<
  LegalDoc,
  { title: string; paragraphs: string[] }
> = {
  privacidad: {
    title: 'Política de Privacidad',
    paragraphs: [
      'El responsable del tratamiento de los datos personales recogidos a través de este sitio web es el titular de la herramienta, con domicilio en España. El tratamiento se realiza de conformidad con el Reglamento (UE) 2016/679 (RGPD) y la Ley Orgánica 3/2018, de Protección de Datos Personales y garantía de los derechos digitales (LOPDGDD).',
      'Los datos que pueda facilitar (por ejemplo, al contactar con nosotros) se utilizarán exclusivamente para gestionar su solicitud, mejorar el servicio y cumplir obligaciones legales. Esta calculadora funciona de forma local en su navegador: los importes que introduce no se envían ni se almacenan en un servidor.',
      'No cedemos sus datos a terceros salvo obligación legal. Puede ejercer los derechos de acceso, rectificación, supresión, oposición, limitación y portabilidad dirigiéndose al titular del sitio, y reclamar ante la Agencia Española de Protección de Datos (www.aepd.es).',
      'Este texto es genérico e informativo. No sustituye el asesoramiento jurídico personalizado ni las políticas que deba adoptar cada responsable según su actividad real.',
    ],
  },
  cookies: {
    title: 'Política de Cookies',
    paragraphs: [
      'Este sitio puede utilizar cookies técnicas necesarias para el funcionamiento de la página y, en su caso, cookies de preferencia para recordar que ha aceptado el aviso de cookies. Las cookies son pequeños archivos que se almacenan en su dispositivo.',
      'Las cookies técnicas no requieren consentimiento. Si en el futuro se incorporasen cookies analíticas o de terceros, se le solicitará consentimiento previo, salvo que estén exceptuadas por la normativa aplicable (Ley 34/2002, LSSI-CE, y directrices de la AEPD).',
      'Puede configurar o eliminar cookies desde las opciones de su navegador. Si rechaza las no esenciales, algunas funciones de personalización podrían no estar disponibles. El botón «Aceptar» del banner registra su consentimiento en esta sesión.',
      'Este texto es un modelo estándar para webs de herramientas en España y tiene carácter meramente informativo.',
    ],
  },
  aviso: {
    title: 'Aviso Legal',
    paragraphs: [
      'Este sitio web ofrece una herramienta de cálculo orientativo sobre IRPF y cuotas de autónomos. El acceso y uso implican la aceptación de las presentes condiciones. El titular se reserva el derecho de modificar contenidos y funcionalidades sin previo aviso.',
      'La información y los resultados tienen carácter meramente informativo y educativo. No constituyen asesoramiento fiscal, contable ni jurídico. El usuario es responsable de verificar los datos con la normativa vigente y, en su caso, con un profesional colegiado.',
      'Queda prohibido el uso ilícito del sitio, la reproducción no autorizada de sus contenidos y cualquier actividad que pueda dañar la herramienta o a terceros. El titular no se responsabiliza de decisiones tomadas con base exclusiva en los resultados de la calculadora ni de interrupciones técnicas ajenas a su control.',
      'Para cualquier comunicación puede utilizar los medios de contacto que figuren en el sitio. La legislación aplicable es la española y, salvo norma imperativa en contrario, los tribunales del domicilio del titular serán competentes para resolver las controversias.',
    ],
  },
};

function App() {
  const [ingresos, setIngresos] = useState(2500);
  const [irpfRate, setIrpfRate] = useState<15 | 7>(15);
  const [ivaActivo, setIvaActivo] = useState(true);
  const [cuotaAutonomos, setCuotaAutonomos] = useState(294);
  const [cookiesAceptadas, setCookiesAceptadas] = useState(false);
  const [legalDoc, setLegalDoc] = useState<LegalDoc | null>(null);

  const ivaRate = ivaActivo ? 0.21 : 0;
  const cuotaNum = Number.isFinite(cuotaAutonomos) ? cuotaAutonomos : 0;

  const { segmentos, totals } = useMemo(() => {
    const baseImponible = ingresos / (1 + ivaRate);
    const iva = ingresos - baseImponible;
    const irpf = baseImponible * (irpfRate / 100);
    const neto = baseImponible - irpf - cuotaNum;

    const segs: Segment[] = [
      { name: 'Neto', value: Math.max(neto, 0), color: COLORS.net, description: 'Lo que te queda tras impuestos' },
      { name: 'IVA', value: iva, color: COLORS.iva, description: `21% repercutido en factura` },
      { name: 'IRPF', value: irpf, color: COLORS.irpf, description: `${irpfRate}% de retención` },
      { name: 'Cuota autónomos', value: cuotaNum, color: COLORS.cuota, description: 'Cuota mensual de autónomos' },
    ];

    return {
      segmentos: segs,
      totals: {
        baseImponible,
        iva,
        irpf,
        cuotaAutonomos: cuotaNum,
        neto,
        cargaTotal: irpf + cuotaNum,
      },
    };
  }, [ingresos, irpfRate, ivaRate, cuotaNum]);

  return (
    <div className={`min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 px-4 py-10 sm:px-6 lg:px-8 ${cookiesAceptadas ? '' : 'pb-28'}`}>
      <div className="mx-auto max-w-5xl">
        <header className="mb-10 text-center">
          <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900 text-white">
            <span className="text-lg font-semibold">€</span>
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Calculadora de IRPF para Autónomos
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-base text-slate-500">
            Estima tu cuota de autónomos, retención de IRPF e IVA a partir de tus
            ingresos mensuales facturados.
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Controles */}
          <Card className="border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl">Tus datos</CardTitle>
              <CardDescription>
                Ajusta los valores para ver el reparto de tu factura mensual.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="space-y-4">
                <div className="flex items-end justify-between">
                  <Label htmlFor="ingresos" className="text-base font-medium text-slate-700">
                    Ingresos mensuales facturados
                  </Label>
                  <span className="text-2xl font-semibold tabular-nums text-slate-900">
                    {formatEuro(ingresos)}
                  </span>
                </div>
                <Slider
                  id="ingresos"
                  value={[ingresos]}
                  onValueChange={(v) => setIngresos(v[0])}
                  min={300}
                  max={10000}
                  step={50}
                />
                <div className="flex justify-between text-xs text-slate-400">
                  <span>300 €</span>
                  <span>10 000 €</span>
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <Label className="text-base font-medium text-slate-700">
                  Retención de IRPF
                </Label>
                <RadioGroup
                  value={String(irpfRate)}
                  onValueChange={(v) => setIrpfRate(Number(v) as 15 | 7)}
                  className="grid grid-cols-2 gap-3"
                >
                  {[
                    { value: '15', label: '15%', hint: 'Régimen general' },
                    { value: '7', label: '7%', hint: 'Inicio de actividad (3 primeros años)' },
                  ].map((opt) => (
                    <label
                      key={opt.value}
                      htmlFor={`r-${opt.value}`}
                      className="flex cursor-pointer flex-col gap-1 rounded-lg border border-slate-200 p-4 transition-colors hover:border-slate-300 has-[:checked]:border-slate-900 has-[:checked]:bg-slate-50"
                    >
                      <RadioGroupItem value={opt.value} id={`r-${opt.value}`} className="sr-only" />
                      <span className="text-lg font-semibold text-slate-900">{opt.label}</span>
                      <span className="text-xs text-slate-500">{opt.hint}</span>
                    </label>
                  ))}
                </RadioGroup>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-end justify-between gap-4">
                  <div className="space-y-0.5">
                    <Label htmlFor="cuota" className="text-base font-medium text-slate-700">
                      Cuota de autónomos / mes
                    </Label>
                    <p className="text-xs text-slate-500">
                      Importe que pagas a la Seguridad Social.
                    </p>
                  </div>
                  <Input
                    id="cuota"
                    type="number"
                    inputMode="numeric"
                    min={0}
                    max={2000}
                    step={1}
                    value={cuotaAutonomos}
                    onChange={(e) => {
                      const v = e.target.valueAsNumber;
                      setCuotaAutonomos(Number.isNaN(v) ? 0 : Math.max(0, v));
                    }}
                    className="w-28 text-right text-lg font-semibold tabular-nums"
                  />
                </div>
                <Slider
                  value={[Math.min(Math.max(cuotaAutonomos, 0), 2000)]}
                  onValueChange={(v) => setCuotaAutonomos(v[0])}
                  min={0}
                  max={2000}
                  step={1}
                />
                <div className="flex justify-between text-xs text-slate-400">
                  <span>0 €</span>
                  <span>2 000 €</span>
                </div>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base font-medium text-slate-700">
                    Repercutir IVA (21%)
                  </Label>
                  <p className="text-xs text-slate-500">
                    Incluye el IVA en los ingresos facturados.
                  </p>
                </div>
                <Switch checked={ivaActivo} onCheckedChange={setIvaActivo} />
              </div>
            </CardContent>
          </Card>

          {/* Resultado */}
          <Card className="border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl">Reparto de tu factura</CardTitle>
              <CardDescription>
                Cuota autónomos, IRPF e IVA frente a tu neto mensual.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={segmentos}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={95}
                      paddingAngle={2}
                      stroke="none"
                    >
                      {segmentos.map((s) => (
                        <Cell key={s.name} fill={s.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      content={({ active, payload }) => {
                        if (!active || !payload?.length) return null;
                        const p = payload[0].payload as Segment;
                        return (
                          <div className="rounded-lg border border-slate-200 bg-white px-3 py-2 shadow-md">
                            <p className="text-sm font-medium text-slate-900">{p.name}</p>
                            <p className="text-sm tabular-nums text-slate-600">{formatEuro(p.value)}</p>
                            <p className="text-xs text-slate-400">{p.description}</p>
                          </div>
                        );
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-4 space-y-2">
                {segmentos.map((s) => (
                  <div key={s.name} className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 text-slate-600">
                      <span
                        className="inline-block h-2.5 w-2.5 rounded-full"
                        style={{ backgroundColor: s.color }}
                      />
                      {s.name}
                    </span>
                    <span className="tabular-nums font-medium text-slate-900">
                      {formatEuro(s.value)}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Resumen */}
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <Card className="border-slate-200 bg-white shadow-sm">
            <CardContent className="p-5">
              <p className="text-sm text-slate-500">Base imponible</p>
              <p className="mt-1 text-2xl font-semibold tabular-nums text-slate-900">
                {formatEuro(totals.baseImponible)}
              </p>
              <p className="mt-1 text-xs text-slate-400">Ingresos sin IVA</p>
            </CardContent>
          </Card>
          <Card className="border-slate-200 bg-white shadow-sm">
            <CardContent className="p-5">
              <p className="text-sm text-slate-500">Neto mensual</p>
              <p className="mt-1 text-2xl font-semibold tabular-nums text-slate-900">
                {formatEuro(Math.max(totals.neto, 0))}
              </p>
              <p className="mt-1 text-xs text-slate-400">Tras IRPF y cuota</p>
            </CardContent>
          </Card>
          <Card className="border-slate-200 bg-slate-900 text-white shadow-sm">
            <CardContent className="p-5">
              <p className="text-sm text-slate-300">Carga fiscal</p>
              <p className="mt-1 text-2xl font-semibold tabular-nums">
                {formatEuro(totals.cargaTotal)}
              </p>
              <p className="mt-1 text-xs text-slate-400">
                {formatPercent(
                  totals.baseImponible > 0
                    ? totals.cargaTotal / totals.baseImponible
                    : 0
                )}{' '}
                de la base
              </p>
            </CardContent>
          </Card>
        </div>

        <IrpfArticle />

        <footer className="mt-10 text-center text-xs text-slate-400">
          Cálculo orientativo. No constituye asesoramiento fiscal.
        </footer>

        <footer className="mt-6 border-t border-slate-200 py-6">
          <nav
            aria-label="Información legal"
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-slate-500"
          >
            {(
              [
                { id: 'privacidad' as const, label: 'Política de Privacidad' },
                { id: 'cookies' as const, label: 'Política de Cookies' },
                { id: 'aviso' as const, label: 'Aviso Legal' },
              ] as const
            ).map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setLegalDoc(item.id)}
                className="underline-offset-4 transition-colors hover:text-slate-800 hover:underline"
              >
                {item.label}
              </button>
            ))}
          </nav>
        </footer>
      </div>

      {legalDoc && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4"
          role="presentation"
          onClick={() => setLegalDoc(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="legal-modal-title"
            className="max-h-[80vh] w-full max-w-lg overflow-y-auto rounded-xl border border-slate-200 bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2
              id="legal-modal-title"
              className="text-lg font-semibold text-slate-900"
            >
              {LEGAL_DOCS[legalDoc].title}
            </h2>
            <div className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
              {LEGAL_DOCS[legalDoc].paragraphs.map((p) => (
                <p key={p.slice(0, 48)}>{p}</p>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setLegalDoc(null)}
              className="mt-6 w-full rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-800"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      {!cookiesAceptadas && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 px-4 py-4 shadow-[0_-4px_20px_rgba(15,23,42,0.06)] backdrop-blur-sm">
          <div className="mx-auto flex max-w-5xl flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm leading-6 text-slate-600">
              Utilizamos cookies técnicas necesarias para el funcionamiento de
              esta web y, con su consentimiento, para recordar sus preferencias.
              Puede consultar más información en la{' '}
              <button
                type="button"
                onClick={() => setLegalDoc('cookies')}
                className="font-medium text-slate-800 underline underline-offset-2"
              >
                Política de Cookies
              </button>
              .
            </p>
            <button
              type="button"
              onClick={() => setCookiesAceptadas(true)}
              className="shrink-0 rounded-lg bg-slate-900 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-800"
            >
              Aceptar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
