'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

const heroImage = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/homepage-1sCnoKooo5t6Ju5TSQ3RwSKLXErPaD.png'
const mapImage = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/material%20map-HAXgKHq2suaMWxwpkcFCmfm2qhS8S2.png'

const features = [
  { number: '01', title: 'See every discovery', description: 'Follow each student as they move from curious beginner to confident science explorer.', color: 'bg-primary' },
  { number: '02', title: 'Track the journey', description: 'Simple progress snapshots make it easy to celebrate wins and spot where support is needed.', color: 'bg-accent' },
  { number: '03', title: 'Keep learning playful', description: 'A colorful game map turns lessons into a world students are excited to return to.', color: 'bg-secondary' },
]

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <header className="relative z-20 mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8 lg:px-10">
        <a href="#top" className="flex items-center gap-3" aria-label="SciPlay home">
          <span className="grid size-11 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-playful" aria-hidden="true">
            <span className="relative block size-5 rounded-full border-[3px] border-current"><span className="absolute -right-1 -top-1 size-2 rounded-full bg-accent" /></span>
          </span>
          <span className="font-display text-xl tracking-tight">sci<span className="text-coral">-</span>play</span>
        </a>
        <nav className={`${menuOpen ? 'flex' : 'hidden'} absolute left-5 right-5 top-20 flex-col gap-4 rounded-2xl border border-border bg-card p-5 shadow-playful-lg md:static md:flex md:flex-row md:items-center md:gap-8 md:border-0 md:bg-transparent md:p-0 md:shadow-none`} aria-label="Main navigation">
          <a className="text-sm font-bold text-muted-foreground hover:text-foreground" href="#how-it-works">How it works</a>
          <a className="text-sm font-bold text-muted-foreground hover:text-foreground" href="#for-teachers">For teachers</a>
          <a className="text-sm font-bold text-muted-foreground hover:text-foreground" href="#progress">Progress tracking</a>
          <Button size="lg" className="rounded-xl shadow-playful"><a href="#start">Get started</a></Button>
          <Button size="lg" className="rounded-xl shadow-playful"><a href="/auth/login">Log in</a></Button>
        </nav>
        <button type="button" className="rounded-xl border border-border bg-card px-3 py-2 text-sm font-bold md:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Toggle navigation">Menu</button>
      </header>

      <section id="top" className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 pb-20 pt-8 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-10 lg:pb-28 lg:pt-16">
        <div className="relative z-10">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-extrabold text-ocean shadow-playful">
            <span className="size-2 rounded-full bg-leaf" aria-hidden="true" /> Built for curious minds
          </div>
          <h1 className="font-display max-w-2xl text-balance text-5xl leading-[0.98] tracking-[-0.04em] text-navy sm:text-7xl">Every student has a <span className="text-primary">science story</span> to explore.</h1>
          <p className="mt-7 max-w-xl text-pretty text-lg leading-8 text-muted-foreground sm:text-xl">SciPlay turns science learning into a colorful game map—and gives teachers a clear view of every discovery, milestone, and moment of progress.</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button size="lg" className="h-12 rounded-xl px-6 text-base font-extrabold shadow-playful"><a href="#start">Start exploring</a></Button>
            <Button variant="outline" size="lg" className="h-12 rounded-xl px-6 text-base font-extrabold"><a href="#how-it-works">See how it works</a></Button>
          </div>
          <div className="mt-10 flex items-center gap-4 text-sm font-bold text-muted-foreground"><span className="flex -space-x-2" aria-hidden="true"><span className="size-9 rounded-full border-2 border-background bg-secondary" /><span className="size-9 rounded-full border-2 border-background bg-accent" /><span className="size-9 rounded-full border-2 border-background bg-primary" /></span><span>Made for classrooms that love to wonder.</span></div>
        </div>
        <div className="relative">
          <div className="absolute -right-6 -top-7 z-10 rounded-2xl border-2 border-foreground/10 bg-secondary px-4 py-3 text-sm font-extrabold text-secondary-foreground shadow-playful rotate-6">Level up learning!</div>
          <div className="overflow-hidden rounded-[2rem] border-4 border-card bg-card shadow-playful-lg rotate-1">
            <img src={heroImage} alt="Bright illustrated science classroom with colorful lab equipment" className="aspect-[4/3] w-full object-cover" />
          </div>
          <div className="absolute -bottom-7 -left-5 rounded-2xl border-2 border-foreground/10 bg-card px-5 py-4 shadow-playful -rotate-3"><p className="font-mono text-xs font-bold uppercase tracking-widest text-muted-foreground">Class progress</p><p className="mt-1 font-display text-2xl text-primary">+24 discoveries</p></div>
        </div>
      </section>

      <section id="progress" className="border-y border-border bg-aqua px-5 py-20 sm:px-8 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-7xl"><div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-end"><div><p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-ocean">The progress view</p><h2 className="font-display mt-4 max-w-xl text-balance text-4xl tracking-tight text-navy sm:text-5xl">From first question to big <span className="text-coral">breakthrough.</span></h2></div><p className="max-w-xl text-lg leading-8 text-muted-foreground">Teachers get a friendly command center for the whole class. No spreadsheets, no guesswork—just a living map of where every learner is headed next.</p></div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">{features.map((feature) => <article key={feature.number} className="rounded-3xl border-2 border-border bg-card p-6 shadow-playful"><div className={`grid size-12 place-items-center rounded-2xl ${feature.color} font-mono font-bold text-primary-foreground`}>{feature.number}</div><h3 className="font-display mt-6 text-2xl text-navy">{feature.title}</h3><p className="mt-3 leading-7 text-muted-foreground">{feature.description}</p></article>)}</div>
        </div>
      </section>

      <section id="how-it-works" className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-2 lg:items-center lg:px-10 lg:py-28">
        <div className="overflow-hidden rounded-[2rem] border-4 border-card bg-card shadow-playful-lg -rotate-2">
          <img src={mapImage} alt="Colorful science game map with a winding path through a space landscape" className="aspect-[16/10] w-full object-cover" />
        </div>
      <div id="for-teachers">
        <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-ocean">
        A better classroom dashboard
        </p>
        <h2 className="font-display mt-4 text-balance text-4xl tracking-tight text-navy sm:text-5xl">Teachers guide the mission. Students own the adventure.</h2>
        <p className="mt-6 text-lg leading-8 text-muted-foreground">Create student accounts, assign science worlds, and watch confidence grow through meaningful milestones. SciPlay keeps the admin work clear so the classroom can stay full of discovery.</p>
        <ul className="mt-8 flex flex-col gap-4 text-base font-bold text-navy"><li className="flex items-center gap-3"><span className="grid size-7 place-items-center rounded-full bg-leaf text-primary-foreground">✓</span> See class and individual progress</li><li className="flex items-center gap-3"><span className="grid size-7 place-items-center rounded-full bg-leaf text-primary-foreground">✓</span> Celebrate completed science worlds</li><li className="flex items-center gap-3"><span className="grid size-7 place-items-center rounded-full bg-leaf text-primary-foreground">✓</span> Know exactly where to lend a hand</li></ul></div></section>

      <section id="start" className="mx-5 mb-8 overflow-hidden rounded-[2rem] bg-primary px-6 py-14 text-center text-primary-foreground shadow-playful-lg sm:mx-8 sm:px-12 lg:mx-auto lg:max-w-7xl lg:py-20"><p className="font-mono text-xs font-bold uppercase tracking-[0.2em] opacity-80">Ready for the next discovery?</p><h2 className="font-display mx-auto mt-4 max-w-2xl text-balance text-4xl tracking-tight sm:text-6xl">Make progress feel like play.</h2><p className="mx-auto mt-5 max-w-xl text-lg leading-8 opacity-90">Give every learner a map, a mission, and a reason to keep asking great questions.</p><Button size="lg" variant="secondary" className="mt-8 h-12 rounded-xl px-7 text-base font-extrabold shadow-playful"><a href="mailto:hello@sciplay.example">Bring SciPlay to your class</a></Button></section>
      <footer className="mx-auto flex max-w-7xl flex-col gap-3 px-5 pb-8 text-sm font-bold text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10"><span className="font-display text-lg text-navy">sci<span className="text-coral">-</span>play</span><span>Learning is the greatest adventure.</span></footer>
    </main>
  )
}
