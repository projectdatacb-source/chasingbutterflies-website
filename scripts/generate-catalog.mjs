import { writeFileSync } from "node:fs";

const films = {
  automobiles: [
    ["256747378", "vimeo", "Tata Yodha - Water", "https://i.vimeocdn.com/video/1146810761-3ebdae92603b0603814b0a062a2ceff06f96e890cb4c772ef99b6e13a7f81605-d_640?region=us"],
    ["244630948", "vimeo", "Tata Yodha - cylinder", "https://i.vimeocdn.com/video/1146799302-5a04017d15985027e91b360686b6181fa536b722ff7ef6b8fd4db3532a623f50-d_640?region=us"],
    ["256747149", "vimeo", "Tata Yodha - veggies", "https://i.vimeocdn.com/video/1146804319-d9f0f85a2b1c075e1077bb33c01c4a273f7b2f1beec5750644775ba5375c6bb2-d_640?region=us"],
    ["174507762", "vimeo", "Tata Ultra", "https://i.vimeocdn.com/video/1154003453-d02b980d2a0dd8765d138f3b44851e772f109149a519bd19f8ca77279e9a86ea-d_640?region=us"],
    ["906948189", "vimeo", "ZIDD HAI VIKAS KI 210623", "https://i.vimeocdn.com/video/1789032320-a5e0458f84a4c60c5ab0336ee2da5a30155a72036405436a12e3b7c4be85b140-d_295x166?region=us"],
    ["906945014", "vimeo", "TATA_SAFARI_OPT_(LINE)_171023", "https://i.vimeocdn.com/video/1789025963-feaadb319bd89337777ea0e0052b64d9b78d7810a4a7fb8b6c818df05fea4671-d_295x166?region=us"],
    ["744153914", "vimeo", "Tata Yodha Monk", "https://i.vimeocdn.com/video/1497094841-f5523212976c3d0b708e6166f6833dda31e72fa5f59da5c081e269357b475ec3-d_295x166?region=us"],
    ["724787881", "vimeo", "BALENO_90sec", "https://i.vimeocdn.com/video/1459300123-4572eef81e678e1f21dd3b5acf9d60a9edc893969b26e14f98e69c40e0ad78df-d_295x166?region=us"],
  ],
  gadgets: [
    ["KOJl7d9jB3g", "youtube", "Every Bad Moment #LooksGreat with the #realme15T", "https://i.ytimg.com/vi/KOJl7d9jB3g/hqdefault.jpg"],
    ["91694433", "vimeo", "Samsung S4 Father & son", "https://i.vimeocdn.com/video/471175933-9103fd396c7e42412a36e972b1d7a741e26a82072901f654e859bc52e9bcd255-d_640?region=us"],
    ["91697599", "vimeo", "Samsung S4 Wife", "https://i.vimeocdn.com/video/471180146-796d5b458230792d0edf5ec3ae187cdd26a19f802d1d003dfbb787e77aedb9bc-d_640?region=us"],
    ["91691078", "vimeo", "Samsung Ativ Teaser", "https://i.vimeocdn.com/video/471171978-69141aa467309e854d4e9812f75d12e04a75af0ccf80b5b680dff61927621e7a-d_295x166?region=us"],
    ["91695590", "vimeo", "Samsung S 4 Poster", "https://i.vimeocdn.com/video/471177547-847fb3c8ad17589930520d21bcb447e46abba5e952b2c64dbb11d3fc69071529-d_640?region=us"],
    ["569992802", "vimeo", "Samsung 90sec", "https://i.vimeocdn.com/video/1178655531-e03b3184ae5605ef19fc53b9322bb09a996360b5a054d71e31719c8d46fe7fe2-d_295x166?region=us"],
  ],
  cgi: [
    ["n3WXIBFIMgU", "youtube", "motorola signature: A statement", "https://i.ytimg.com/vi/n3WXIBFIMgU/hqdefault.jpg"],
    ["30CCP3x_E6U", "youtube", "Motorola Edge 70 Pro: Stunning night shots with Sony LYT 710 - starts ₹36,999* at Flipkart", "https://i.ytimg.com/vi/30CCP3x_E6U/hqdefault.jpg"],
    ["gkNN-6bmB-o", "youtube", "Say hello to the motorola edge 70 fusion 👋.", "https://i.ytimg.com/vi/gkNN-6bmB-o/hqdefault.jpg"],
    ["CXyOxZ2Kw8w", "youtube", "moto sound flow with Sound by Bose 🔊", "https://i.ytimg.com/vi/CXyOxZ2Kw8w/hqdefault.jpg"],
    ["rHw1lFXqP5Q", "youtube", "motorola edge 70: Say hello to an ultrathin design and 50MP triple cameras", "https://i.ytimg.com/vi/rHw1lFXqP5Q/hqdefault.jpg"],
    ["304996642", "vimeo", "A8 Star Product Video", "https://i.vimeocdn.com/video/1178640085-a05bc16164c0aa1a9c0bbaf1b3c31f7ebd54a3ea269548d626c5a4e4613381d6-d_640?region=us"],
    ["726993009", "vimeo", "Motorola 30 Sec_H.264", "https://i.vimeocdn.com/video/1463565151-4133e62fd33fb071c560f29655e2c8307951470890b7366db47878c4acb3897a-d_295x166?region=us"],
    ["949133115", "vimeo", "Flute & Guitar_60Sec_v03", "https://i.vimeocdn.com/video/1856801712-ca2c5dd5a6bbf48cac13fee82cb5b94d734d79aadf2ace60890beaf3c63c4ea5-d_295x166?region=us"],
    ["244629006", "vimeo", "Samsung On Max - product video", "https://i.vimeocdn.com/video/1146839137-20c564da296fe78b340654cb860cbabf89db9c8204376e5ba13cedc6206cecca-d_640?region=us"],
    ["393420391", "vimeo", "Samsung_On7_Prime_01", "https://i.vimeocdn.com/video/1146842039-3a170e9e086856dcd98d99512c911dfcbd68e2143ca5ad2b335f4ad607bed0b7-d_295x166?region=us"],
  ],
  fmcg: [
    ["727292167", "vimeo", "Lal HIT", "https://i.vimeocdn.com/video/1464115881-9f20f5784700362c92fd583b820ad38c10712b927597dc4a91e288dcc34c08c9-d_295x166?region=us"],
    ["767579257", "vimeo", "Borosil Steelers_Film 02_Edit_v7(MIXED-GRADED)_15102022", "https://i.vimeocdn.com/video/1541114530-bc8544ecd770aa1e6c9fe95ee210e435053f2dad94344f770039392ac393c39f-d_295x166?region=us"],
    ["747192657", "vimeo", "Parle Kaccha Mango Bite", "https://i.vimeocdn.com/video/1502753375-17f4773aaab5c018b174a1754b943c809d2342f43d08c348a6a810b32bec584c-d_295x166?region=us"],
    ["47511483", "vimeo", "Johnson n Johnson", "https://i.vimeocdn.com/video/329563851-55b3da158ed34b7ef195de504894095c0981577d9d38ffba75904ce0c4c7b109-d_640?region=us"],
    ["100185611", "vimeo", "Bayer Confidor", "https://i.vimeocdn.com/video/481590528-e33bb15261cac94bdb6b83c742c4e4f6d6fb3f179513f649d40fbdabde25c56e-d_640?region=us"],
    ["141760456", "vimeo", "SNAP_DEAL_MASTER_10_SEC_230615_SD", "https://i.vimeocdn.com/video/538854100-a28860dfbac151d2b3520feb1dab7151550c17843acf6eeacf93a3ca13f96e5d-d_295x166?region=us"],
    ["174504635", "vimeo", "KMB AGENCY CUT", "https://i.vimeocdn.com/video/581412152-9ea0d1774d0107b03691087f5881f61e2e2a1aca57ad99b651f250bc2ad47aaa-d_640?region=us"],
    ["512832867", "vimeo", "5 STAR - escape", "https://i.vimeocdn.com/video/1146842812-18d14c2aa461700155140792fad69b1b7b33a44eae019c88deaccc5db7c111f0-d_295x166?region=us"],
  ],
  lifestyle: [
    ["818834783", "vimeo", "MIA TANISHQ 60 SEC", "https://i.vimeocdn.com/video/1657421672-fefec3f3dc77451a5e359cbba3271e4f10e994d012e1a3bb03dae584bf08dec0-d_295x166?region=us"],
    ["361264229", "vimeo", "Amway Glister Herbal", "https://i.vimeocdn.com/video/1146812950-6feebe024f46466c411e7cfa2b213fd53f57368d7b06c517448bd12f415e8f6a-d_295x166?region=us"],
  ],
};

const stamp = "2026-11-03T00:00:00.000Z";
const projects = [];

for (const [category, rows] of Object.entries(films)) {
  rows.forEach(([id, platform, title, thumbnail], index) => {
    const videoUrl =
      platform === "youtube"
        ? `https://www.youtube.com/watch?v=${id}`
        : `https://vimeo.com/${id}`;
    projects.push({
      id: `catalog-${platform}-${id}`,
      title,
      video_url: videoUrl,
      video_platform: platform,
      video_id: id,
      category: [category],
      thumbnail_url: thumbnail,
      display_order: index + 1,
      status: "published",
      created_at: stamp,
      updated_at: stamp,
    });
  });
}

writeFileSync(
  new URL("../src/lib/projects/catalog.json", import.meta.url),
  JSON.stringify(projects, null, 2) + "\n",
);

const sqlValues = projects
  .map((project) => {
    const quote = (value) => `'${String(value).replaceAll("'", "''")}'`;
    return `  (${quote(project.title)}, ${quote(project.video_url)}, ${quote(project.video_platform)}, ${quote(project.video_id)}, array[${quote(project.category[0])}]::text[], ${quote(project.thumbnail_url)}, ${project.display_order}, 'published')`;
  })
  .join(",\n");

const seed = `-- Initial catalogue taken from https://chasingbutterflies.in/
-- Titles come from YouTube and Vimeo oEmbed. Categories follow the section
-- each film appears in on the current website. Duplicate embeds on that site
-- are stored once. Safe to run more than once.

insert into public.projects (
  title,
  video_url,
  video_platform,
  video_id,
  category,
  thumbnail_url,
  display_order,
  status
)
values
${sqlValues}
on conflict (video_platform, video_id) do nothing;
`;

writeFileSync(new URL("../supabase/seed.sql", import.meta.url), seed);
console.log(`Wrote ${projects.length} projects`);
