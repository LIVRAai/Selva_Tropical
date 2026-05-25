import Link from "next/link";
import { getProducts } from "@/lib/products";

const benefits = [
  { icon: "✧", title: "Ingredientes nobles", text: "Fórmulas con materias primas seleccionadas para cuidar sin exceso." },
  { icon: "𖦹", title: "Hecho a mano", text: "Cada pieza se elabora en lotes cortos con atención artesanal real." },
  { icon: "☽", title: "Pedido personalizado", text: "Te acompañamos por WhatsApp para elegir referencias ideales." }
];

export default async function HomePage() {
  let featured = [] as Awaited<ReturnType<typeof getProducts>>;
  try {
    const products = await getProducts();
    featured = products.filter((item) => item.featured).slice(0, 3);
  } catch {
    featured = [];
  }

  return <main className="mx-auto max-w-6xl px-4 pb-16 pt-8 md:pt-12">
    <section className="card relative overflow-hidden bg-gradient-to-br from-blushBeige to-ivoryWarm p-6 md:p-10">
      <div className="grid items-center gap-8 md:grid-cols-2">
        <div>
          <span className="inline-flex rounded-full border border-earthCoffee/20 bg-white/70 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-earthCoffee">Cuidado artesanal botánico</span>
          <h1 className="mt-4 text-4xl leading-tight md:text-6xl">Rituales naturales para sentir la piel y el hogar en calma</h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-oliveMid">Jabones y piezas artesanales creadas con ingredientes nobles, aromas suaves y detalles que convierten lo cotidiano en un ritual.</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/catalogo" className="btn-primary">Explorar catálogo</Link>
            <a href="#esencia" className="btn-secondary">Conocer esencia</a>
          </div>
        </div>
        <div className="relative">
          <div className="card organic-line relative overflow-hidden bg-oliveDeep p-6 text-ivoryWarm">
            <p className="text-xs uppercase tracking-[0.2em] text-mossSoft">Edición sensorial</p>
            <h2 className="mt-3 text-3xl">Naturaleza, textura y pausa</h2>
            <p className="mt-3 text-sm text-ivoryWarm/90">Diseñamos una experiencia íntima para elegir tus favoritos con calma, intención y belleza.</p>
            <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-2xl bg-ivoryWarm/10 p-3">Aromas suaves</div>
              <div className="rounded-2xl bg-ivoryWarm/10 p-3">Texturas nobles</div>
              <div className="rounded-2xl bg-ivoryWarm/10 p-3">Atención humana</div>
              <div className="rounded-2xl bg-ivoryWarm/10 p-3">Compra guiada</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="mt-9 grid gap-4 md:grid-cols-3">
      {benefits.map((item) => <article key={item.title} className="card p-5 hover:-translate-y-1">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-blushBeige text-lg text-earthCoffee">{item.icon}</span>
        <h3 className="mt-3 text-2xl">{item.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-oliveMid">{item.text}</p>
      </article>)}
    </section>

    <section className="mt-12">
      <div className="mb-5 flex items-end justify-between gap-4">
        <div><p className="text-xs uppercase tracking-[0.18em] text-mossSoft">Selección curada</p><h2 className="text-4xl">Productos destacados</h2></div>
        <Link href="/catalogo" className="btn-secondary">Ver boutique</Link>
      </div>
      {featured.length > 0 ? <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{featured.map((p) => <article key={p.id} className="card overflow-hidden hover:-translate-y-1">
        <img src={p.image} alt={p.name} className="h-60 w-full object-cover" />
        <div className="p-4"><p className="text-xs uppercase tracking-[0.14em] text-mossSoft">{p.category}</p><h3 className="mt-1 text-2xl">{p.name}</h3><p className="mt-2 font-semibold text-earthCoffee">{p.price.toLocaleString("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 })}</p><Link href={`/catalogo/${p.slug}`} className="mt-4 inline-flex text-sm font-semibold text-oliveDeep underline-offset-4 hover:underline">Descubrir pieza</Link></div>
      </article>)}</div> : <div className="grid gap-4 sm:grid-cols-3">{[1,2,3].map((i) => <div key={i} className="card animate-pulse p-4"><div className="h-40 rounded-2xl bg-oliveDeep/10" /><div className="mt-4 h-4 w-1/3 rounded bg-oliveDeep/10" /><div className="mt-2 h-6 w-2/3 rounded bg-oliveDeep/10" /><div className="mt-3 h-4 w-1/2 rounded bg-oliveDeep/10" /></div>)}</div>}
    </section>

    <section id="esencia" className="relative mt-12 overflow-hidden rounded-3xl bg-oliveDeep p-7 text-ivoryWarm md:p-10">
      <div className="absolute -left-12 top-2 h-36 w-36 rounded-full border border-ivoryWarm/20" />
      <div className="absolute -right-10 bottom-4 h-24 w-24 rounded-full border border-macawOrange/35" />
      <p className="text-xs uppercase tracking-[0.2em] text-mossSoft">Nuestra esencia</p>
      <h2 className="mt-2 text-4xl">Nuestra esencia</h2>
      <p className="mt-3 max-w-3xl leading-relaxed text-ivoryWarm/90">Selva Tropical nace de una idea simple: cuidar también puede sentirse bello. Cada pieza une naturaleza, calma y trabajo artesanal para crear rituales cotidianos con intención.</p>
      <div className="mt-6 grid max-w-2xl gap-3 sm:grid-cols-3">{["Natural", "Artesanal", "Con calma"].map((v) => <div key={v} className="rounded-2xl border border-ivoryWarm/20 bg-ivoryWarm/10 px-4 py-3 text-center font-medium">{v}</div>)}</div>
    </section>

    <section className="mt-12 rounded-3xl bg-earthCoffee p-8 text-ivoryWarm md:p-10">
      <h2 className="text-4xl">Empieza tu ritual con Selva Tropical</h2>
      <p className="mt-3 max-w-2xl text-ivoryWarm/90">Elige tus favoritos y recibe una atención cercana por WhatsApp.</p>
      <Link href="/catalogo" className="mt-6 inline-flex rounded-full bg-macawOrange px-6 py-3 text-sm font-semibold text-ivoryWarm transition duration-300 hover:bg-[#b86027]">Elegir mis favoritos</Link>
    </section>
  </main>;
}
