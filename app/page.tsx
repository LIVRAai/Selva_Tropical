import Link from "next/link";

export default function HomePage() {
  return <main className="mx-auto max-w-6xl px-4 py-10">
    <section className="card animate-floatIn bg-blushBeige p-8">
      <p className="text-sm uppercase tracking-[0.2em] text-earthCoffee">Rituales botánicos</p>
      <h1 className="mt-2 text-4xl font-semibold">Cuidado Artesanal para piel y hogar</h1>
      <p className="mt-4 max-w-2xl">Una tienda sensorial, tropical y premium creada para descubrir piezas naturales con detalle humano.</p>
      <Link href="/catalogo" className="btn-primary mt-6">Explorar catálogo</Link>
    </section>
    <section className="mt-10 grid gap-4 md:grid-cols-3">{["Ingredientes nobles", "Hecho a mano", "Envío personalizado"].map((b) => <article key={b} className="card p-5"><h3 className="font-medium">{b}</h3></article>)}</section>
    <section className="mt-10"><h2 className="text-2xl font-semibold">Productos destacados</h2><p className="text-sm">Descubre selecciones curadas desde el catálogo.</p><Link href="/catalogo" className="btn-primary mt-4">Ver boutique</Link></section>
    <section id="esencia" className="mt-12 card bg-oliveDeep p-8 text-ivoryWarm"><h2 className="text-2xl">Nuestra esencia</h2><p className="mt-3">Selva Tropical une tradición artesanal y estética contemporánea para regalar bienestar cotidiano.</p></section>
    <section className="mt-12 rounded-3xl bg-macawBlue p-8 text-ivoryWarm"><h2 className="text-2xl">Tu ritual comienza hoy</h2><Link href="/catalogo" className="mt-4 inline-block rounded-full bg-macawOrange px-6 py-3 font-semibold">Elegir mis favoritos</Link></section>
  </main>;
}
