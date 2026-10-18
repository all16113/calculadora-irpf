import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: '¿La retención del 15% es el IRPF que pagaré al final del año?',
    answer:
      'No. La retención es un anticipo. El IRPF definitivo se calcula sobre el rendimiento neto anual (ingresos menos gastos deducibles) aplicando los tramos estatales y autonómicos. Si has retenido de más, Hacienda te devolverá; si has retenido de menos, deberás ingresar la diferencia.',
  },
  {
    question: '¿Puedo aplicar el 7% si ya fui autónomo hace unos años?',
    answer:
      'El tipo reducido exige no haber ejercido actividad profesional en el año anterior al inicio. Si dejaste de ser autónomo y ha transcurrido más de un año sin actividad profesional, suele caber de nuevo. Conviene confirmarlo con tu gestoría porque el cómputo es por ejercicio, no por meses.',
  },
  {
    question: '¿Debo retener IRPF si facturo a un particular o a un cliente extranjero?',
    answer:
      'Como regla general, no. La retención la practica un pagador establecido en España que sea empresario o profesional. Los particulares y muchos clientes no residentes no retienen. Eso no te exime de declarar esos ingresos: seguirás tributando por ellos en tu IRPF y, si no hay retención, deberás regularizarlo con pagos fraccionados o en la declaración anual.',
  },
  {
    question: '¿La cuota de autónomos se descuenta de la factura al cliente?',
    answer:
      'Nunca. El cliente no ve ni paga tu cuota de la Seguridad Social. Es un gasto tuyo, mensual, que sí puedes deducir como gasto de la actividad al calcular el rendimiento neto. La calculadora de esta página lo resta del neto para que veas la liquidez real, no porque forme parte de la factura.',
  },
  {
    question: 'Si elijo el 7%, ¿pagaré menos impuestos en 2026?',
    answer:
      'Pagarás menos cada mes, pero no necesariamente menos al año. El tipo impositivo de la renta no cambia por usar el 7%. Solo adelantas menos. Si tus beneficios son altos, es habitual que en junio del año siguiente salga a pagar. Algunas personas prefieren el 15% precisamente para evitar un susto de tesorería.',
  },
  {
    question: '¿Esta calculadora sustituye a un asesor fiscal?',
    answer:
      'No. Es una estimación mensual orientativa: reparte IVA, retención y cuota sobre lo facturado. No aplica módulos, reducciones, tramos autonómicos ni regularizaciones del RETA. Úsala para entender el flujo de caja y consulta a un profesional antes de tomar decisiones.',
  },
];

export function IrpfArticle() {
  return (
    <article className="mt-16 rounded-2xl border border-slate-200 bg-white px-6 py-12 shadow-sm sm:px-10 lg:px-14">
      <header className="mb-10">
        <p className="text-sm font-medium tracking-wide text-slate-500">
          Guía 2026
        </p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-800 sm:text-3xl">
          Cómo funciona el IRPF para autónomos en España en 2026
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
          Facturar por cuenta propia obliga a distinguir tres cantidades que
          se mezclan con facilidad: lo que te retiene el cliente, lo que pagas
          a la Seguridad Social y lo que Hacienda liquida en la declaración
          anual. Esta guía acompaña a la calculadora y resume cómo encajan
          esas piezas en 2026.
        </p>
      </header>

      <div className="max-w-3xl space-y-10 text-[17px] leading-8 text-slate-700">
        <section>
          <h3 className="mb-3 text-xl font-semibold tracking-tight text-slate-800">
            Qué grava el IRPF del autónomo (y qué no)
          </h3>
          <p>
            El Impuesto sobre la Renta de las Personas Físicas no grava lo que
            facturas, sino el rendimiento neto: ingresos menos gastos
            deducibles (cuota de autónomos, material, software, alquiler o
            suministros afectos). Sobre esa base se aplican los tramos
            estatales y autonómicos. Por eso dos autónomos con la misma
            facturación pueden deber cantidades muy distintas.
          </p>
          <p className="mt-4">
            El IVA es otro impuesto. Lo repercutimos al cliente y lo
            ingresamos (o compensamos) en el modelo 303. No forma parte de tu
            renta. Si la calculadora muestra un 21 % de IVA, es porque está
            incluido en el total facturado; la base sobre la que se calcula el
            IRPF es el importe sin IVA.
          </p>
        </section>

        <section>
          <h3 className="mb-3 text-xl font-semibold tracking-tight text-slate-800">
            Retención en factura: 15 % general frente al 7 % de inicio
          </h3>
          <p>
            Cuando un profesional (diseño, consultoría, arquitectura, abogacía,
            formación, traducción, programación, etc.) emite factura a una
            empresa o a otro autónomo establecido en España, el pagador debe
            practicar retención de IRPF sobre la base imponible. El tipo
            general en 2026 sigue siendo el 15 %. Ese dinero no te lo paga el
            cliente: lo ingresa en Hacienda a tu nombre. En la práctica cobras
            menos cada mes, pero ya llevas adelantado parte del impuesto.
          </p>
          <p className="mt-4">
            El 7 % es un tipo reducido, no un descuento fiscal. Puedes
            aplicarlo el año en que inicias la actividad profesional y los dos
            ejercicios siguientes, siempre que no hayas ejercido actividad
            profesional en el año anterior y comuniques al pagador que te
            corresponde ese porcentaje. Es opcional: si prefieres más
            retención —y menos riesgo de que la declaración salga a pagar—
            puedes seguir con el 15 % aunque tengas derecho al 7 %.
          </p>
          <p className="mt-4">
            Un ejemplo: facturas 1.000 € de base más 210 € de IVA. Con el 15 %
            el cliente te transfiere 1.060 €; con el 7 %, 1.140 €. El IVA no
            cambia y el IRPF anual se calculará igual: solo adelantas menos.
            Hay excepciones (algunas actividades profesionales al 7 %
            permanente; agrarias y forestales al 1 % o 2 %; módulos, en
            general, al 1 %).
          </p>
          <p className="mt-4">
            No todos los autónomos retienen. El comercio, la hostelería, el
            transporte o las reformas suelen ser actividades empresariales, no
            profesionales: sus facturas no llevan IRPF. Tampoco se retiene
            cuando el cliente es un particular. En esos casos el impuesto no
            desaparece: se gestiona con pagos fraccionados (modelo 130 en
            estimación directa, 131 en objetiva) y con la declaración de la
            renta.
          </p>
        </section>

        <section>
          <h3 className="mb-3 text-xl font-semibold tracking-tight text-slate-800">
            La cuota de la Seguridad Social: otro organismo, otra lógica
          </h3>
          <p>
            La retención de IRPF y la cuota de autónomos se confunden porque
            ambas salen del bolsillo cada mes, pero no son el mismo tributo ni
            van al mismo sitio. La cuota del Régimen Especial de Trabajadores
            Autónomos (RETA) se paga a la Tesorería General de la Seguridad
            Social. Cubre contingencias comunes, profesionales, cese de
            actividad, formación y el Mecanismo de Equidad Intergeneracional.
            En 2026 el tipo conjunto ronda el 31,5 % sobre la base de
            cotización elegida dentro del tramo de rendimientos netos.
          </p>
          <p className="mt-4">
            Con la cotización por ingresos reales, la base depende de tus
            rendimientos netos mensuales. Hay tabla reducida por debajo de
            1.166,70 €/mes y tabla general hasta más de 6.000 €/mes, cada una
            con base mínima y máxima. Quien empieza puede usar la tarifa plana
            si cumple requisitos. Al cierre del año se regulariza: si ganaste
            más, te reclaman; si ganaste menos, pueden devolverte.
          </p>
          <p className="mt-4">
            La diferencia práctica es nítida. La retención del 15 % o del 7 %
            aparece en la factura, la practica el cliente y es un pago a cuenta
            del IRPF. La cuota de la Seguridad Social no aparece en la factura,
            la pagas tú por domiciliación y es un gasto deducible que reduce el
            rendimiento sobre el que se calcula el IRPF. Bajar la retención
            mejora la liquidez inmediata; bajar la cuota (si el tramo lo
            permite) reduce un coste real, aunque también reduce la base de
            futuras prestaciones.
          </p>
        </section>

        <section>
          <h3 className="mb-3 text-xl font-semibold tracking-tight text-slate-800">
            Pagos a cuenta, declaración anual y cómo leer la calculadora
          </h3>
          <p>
            El calendario fiscal del autónomo en 2026 sigue tres ritmos. Cada
            mes (o trimestre, según la forma de pago) se abona la cuota RETA.
            Cada trimestre, si no hay retención suficiente o la actividad no
            lleva retención, se presenta el modelo 130 o 131: un 20 % del
            rendimiento neto del periodo, restando ya las retenciones
            soportadas. En abril-junio del año siguiente se presenta la
            declaración de la renta, donde se consolidan ingresos, gastos,
            retenciones, pagos fraccionados y el resto de rentas (nóminas,
            alquileres, rendimientos financieros).
          </p>
          <p className="mt-4">
            La herramienta de esta página no liquida el impuesto anual: estima
            el reparto de una factura mensual. Toma los ingresos facturados,
            extrae el IVA si está incluido, aplica el 15 % o el 7 % sobre la
            base y resta la cuota de autónomos que indiques. El resultado
            “neto” es una foto de tesorería, útil para saber cuánto te queda
            para vivir y para impuestos futuros. El recuadro de carga fiscal
            suma retención y cuota porque ambos salen ese mes, aunque uno sea
            anticipo y el otro cotización.
          </p>
          <p className="mt-4">
            Prueba el 7 % si estás en los tres primeros años; súbelo al 15 %
            si quieres acercarte al IRPF final; y ajusta la cuota a tu tramo o
            a la tarifa plana. Guarda margen para la renta y para la
            regularización del RETA: no todo lo facturado es dinero disponible.
          </p>
        </section>
      </div>

      <section className="mt-14 border-t border-slate-200 pt-10">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-800">
          Preguntas frecuentes (FAQ)
        </h2>
        <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600">
          Respuestas cortas a las dudas que más se cruzan con los controles de
          la calculadora.
        </p>
        <Accordion
          type="single"
          collapsible
          className="mt-6 w-full max-w-3xl"
        >
          {faqs.map((faq, index) => (
            <AccordionItem
              key={faq.question}
              value={`faq-${index}`}
              className="border-slate-200"
            >
              <AccordionTrigger className="text-left text-base font-medium leading-7 text-slate-800 hover:no-underline hover:text-slate-950">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-[15px] leading-7 text-slate-600">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </article>
  );
}
