export default function About() {
  return (
    <div>
      <h2 className="text-4xl mb-4 font-serif text-emerald-900">Hello 👋</h2>
      <div className="flex items-start gap-4 flex-row-reverse mb-4">
        <img
          src="/photos/2022-08-17-me.jpeg"
          className="max-w-[40%] shadow-md rounded-sm"
        />
        <p className="flex-auto prose">
          Hi there. I'm Jon. This is what I looked like on the 17th August 2022.
          Below you'll find a little timeline containing things of note that
          have happened in my life so far.
        </p>
      </div>
      <hr className="mb-8" />

      <ul className="mb-28">
        {entries.map((entry, i) => {
          const prev = i > 0 ? entries[i - 1] : null;
          return (
            <li key={i} className={`mb-4 grid grid-cols-6 gap-4`}>
              <span className="text-orange-800">{entry.year}</span>
              <span className="col-span-5">{entry.what}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

const entries = [
  { year: "1986", month: null, what: "Born in Enfield, London." },
  {
    year: "1989",
    month: null,
    what: "Moved to the house in Whetstone, London that I would live in until I was 24.",
  },
  {
    year: "1998",
    month: null,
    what: "Had my first guitar lessons with my uncle John.",
  },
  {
    year: "2002",
    month: null,
    what: "Took a weekend job working on the meat & fish counter in my local Waitrose, where I met my good friend Ash. I can still fillet a fish pretty good.",
  },
  {
    year: "2002",
    month: null,
    what: "Left secondary school with a handful of very average GCSE's.",
  },
  {
    year: "2004",
    month: null,
    what: "Quit 6th form college (it was that or get expelled) without finishing my A-levels. I was studying Music and History.",
  },
  {
    year: "2004",
    month: null,
    what: "Took a full time job at Waitrose while working out what to do with my life.",
  },
  {
    year: "2005",
    month: null,
    what: "Started a Retail Management Training scheme with Waitrose.",
  },
  {
    year: "2006",
    month: null,
    what: "Joined a band called Rush Hour Soul that was looking for a lead guitarist. We renamed the band to The Foxes shortly after I joined.",
  },
  {
    year: "2007",
    month: null,
    what: 'Not long after completing the Retail Management Training scheme at Waitrose I handed in my notice to go full time with The Foxes. The store manager told me I was making a "big mistake".',
  },
  {
    year: "2007",
    month: null,
    what: "After being featured on MySpace The Foxes were invited to do a tour in the US, taking us from New York down to Austin and randomly also over to Hawaii.",
  },
  {
    year: "2007",
    month: null,
    what: "Toured extensively throughout the UK and Europe with The Foxes, playing hundreds of shows.",
  },
  {
    year: "2010",
    month: null,
    what: "Recorded The Foxes debut (and only) album, which was appropriately called Last of Many. We recorded at Sawmills Studios in Cornwall with John Cornfield producing",
  },
  {
    year: "2010",
    month: null,
    what: 'Starting to think I might need a post-music career and after a few pints with my friend Ash (of Waitrose fish counter fame) asking about his job as a "developer" I bought a book on HTML and CSS.',
  },
  {
    year: "2011",
    month: "March",
    what: "Took a job working on Waitrose.com doing basic content management. There was a big team working on an IBM WebSphere migration that I don't think was going very well, but some of them were kind enough to explain what they were working on.",
  },
  {
    year: "2011",
    month: null,
    what: "Landed my first proper developer job at a company called Mippin which made a mobile app builder. I wrote some truly terrible code here that at the time I thought was very clever.",
  },
  {
    year: "2012",
    month: "July",
    what: "Started a part-time Computer Science BSc at Birkbeck College at the University of London.",
  },
  {
    year: "2012",
    month: null,
    what: "Joined dating app Badoo as a Software Engineer on the Mobile Web team.",
  },
  {
    year: "2014",
    month: null,
    what: "Joined fashion aggregator Lyst as a Software Engineer.",
  },
  {
    year: "2015",
    month: "Feb",
    what: "First recording session at Tilehouse Studios, working on my own songs.",
  },
  {
    year: "2015",
    month: "June",
    what: "Bought my first place, a small flat in Clapton, London. By coincidence this flat is less than a mile from the house my Mum (and her Mum) grew up in.",
  },
  {
    year: "2015",
    month: "July",
    what: "Dropped out of my Computer Science degree as balancing it with working full-time was too hard.",
  },
  {
    year: "2015",
    month: "October",
    what: "Met my partner Sei, our first date was on Carnaby Street where we met for an afternoon coffee that progressed to a few pints in a local pub and then dinner.",
  },
  {
    year: "2016",
    month: "Oct",
    what: "Became an Engineering Manager at Lyst.",
  },
  {
    year: "2016",
    month: "May",
    what: "Released my first EP - Profit & Loss",
  },
  {
    year: "2016",
    month: "October",
    what: "First trip to Seoul to meet Sei's parents.",
  },
  {
    year: "2017",
    month: "April",
    what: "Joined online pharmacy Echo as Director of Engineering, where I met my future co-founders Benoit and Tom.",
  },
  {
    year: "2017",
    month: "May",
    what: "Released my second EP - Full Circle. Hanover Square, a song with a lot of chords, features my Uncle John on piano.",
  },
  {
    year: "2018",
    month: null,
    what: "Sei and I got enagaged.",
  },
  {
    year: "2019",
    month: "April",
    what: `Drove to Southampton to "have a look" at a litter of Poochon's (Poodle and Bichon Frise cross). Came home with little Bowie.`,
  },
  {
    year: "2020",
    month: "July",
    what: "After months of house hunting went to see a house in Chingford on a whim - put in an offer the same day.",
  },
  {
    year: "2021",
    month: "May",
    what: "Diagnosed with Hodgkins Lymphoma, which was (and still is) a total bummer.",
  },
  {
    year: "2022",
    month: "Jan",
    what: "Founded Keel with ex-Echo colleagues Tom and Benoit. We raised a £5M seed round from LocalGlobe and Earlybird.",
  },
  {
    year: "2022",
    month: "Feb",
    what: "Moved into our Chingford house after a lengthy renovation.",
  },
];
