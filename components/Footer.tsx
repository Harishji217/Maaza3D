export function Footer() {
  return (
    <footer className="bg-gray-950 px-6 py-16 text-white">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1.4fr_0.8fr_0.8fr_1.2fr]">
        <div>
          <h2 className="text-3xl font-black">Nano Banana</h2>
          <p className="mt-4 max-w-sm text-sm leading-6 text-white/60">
            Premium cold-crafted juices made for vivid mornings, focused afternoons, and small daily rituals that taste like a little upgrade.
          </p>
        </div>

        <FooterColumn title="Shop" links={["Cream Mango", "Dutch Chocolate", "Ruby Pomegranate", "Subscriptions"]} />
        <FooterColumn title="Support" links={["Delivery", "Returns", "Freshness Promise", "Contact"]} />

        <div>
          <h3 className="text-sm font-black uppercase tracking-[0.22em] text-white/45">Newsletter</h3>
          <p className="mt-4 text-sm leading-6 text-white/60">Get launch drops and seasonal batches before everyone else.</p>
          <form className="mt-5 flex overflow-hidden rounded-full border border-white/10 bg-white/8 p-1">
            <input
              type="email"
              aria-label="Email address"
              placeholder="you@example.com"
              className="min-w-0 flex-1 bg-transparent px-4 text-sm text-white outline-none placeholder:text-white/35"
            />
            <button className="rounded-full bg-white px-5 py-3 text-sm font-black text-gray-950 transition hover:bg-orange-400">
              Join
            </button>
          </form>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <h3 className="text-sm font-black uppercase tracking-[0.22em] text-white/45">{title}</h3>
      <ul className="mt-4 space-y-3">
        {links.map((link) => (
          <li key={link}>
            <a href="#top" className="text-sm font-semibold text-white/72 transition hover:text-white">
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
