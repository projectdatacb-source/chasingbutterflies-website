-- Initial catalogue taken from https://chasingbutterflies.in/
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
  ('Tata Yodha - Water', 'https://vimeo.com/256747378', 'vimeo', '256747378', array['automobiles']::text[], 'https://i.vimeocdn.com/video/1146810761-3ebdae92603b0603814b0a062a2ceff06f96e890cb4c772ef99b6e13a7f81605-d_640?region=us', 1, 'published'),
  ('Tata Yodha - cylinder', 'https://vimeo.com/244630948', 'vimeo', '244630948', array['automobiles']::text[], 'https://i.vimeocdn.com/video/1146799302-5a04017d15985027e91b360686b6181fa536b722ff7ef6b8fd4db3532a623f50-d_640?region=us', 2, 'published'),
  ('Tata Yodha - veggies', 'https://vimeo.com/256747149', 'vimeo', '256747149', array['automobiles']::text[], 'https://i.vimeocdn.com/video/1146804319-d9f0f85a2b1c075e1077bb33c01c4a273f7b2f1beec5750644775ba5375c6bb2-d_640?region=us', 3, 'published'),
  ('Tata Ultra', 'https://vimeo.com/174507762', 'vimeo', '174507762', array['automobiles']::text[], 'https://i.vimeocdn.com/video/1154003453-d02b980d2a0dd8765d138f3b44851e772f109149a519bd19f8ca77279e9a86ea-d_640?region=us', 4, 'published'),
  ('ZIDD HAI VIKAS KI 210623', 'https://vimeo.com/906948189', 'vimeo', '906948189', array['automobiles']::text[], 'https://i.vimeocdn.com/video/1789032320-a5e0458f84a4c60c5ab0336ee2da5a30155a72036405436a12e3b7c4be85b140-d_295x166?region=us', 5, 'published'),
  ('TATA_SAFARI_OPT_(LINE)_171023', 'https://vimeo.com/906945014', 'vimeo', '906945014', array['automobiles']::text[], 'https://i.vimeocdn.com/video/1789025963-feaadb319bd89337777ea0e0052b64d9b78d7810a4a7fb8b6c818df05fea4671-d_295x166?region=us', 6, 'published'),
  ('Tata Yodha Monk', 'https://vimeo.com/744153914', 'vimeo', '744153914', array['automobiles']::text[], 'https://i.vimeocdn.com/video/1497094841-f5523212976c3d0b708e6166f6833dda31e72fa5f59da5c081e269357b475ec3-d_295x166?region=us', 7, 'published'),
  ('BALENO_90sec', 'https://vimeo.com/724787881', 'vimeo', '724787881', array['automobiles']::text[], 'https://i.vimeocdn.com/video/1459300123-4572eef81e678e1f21dd3b5acf9d60a9edc893969b26e14f98e69c40e0ad78df-d_295x166?region=us', 8, 'published'),
  ('Every Bad Moment #LooksGreat with the #realme15T', 'https://www.youtube.com/watch?v=KOJl7d9jB3g', 'youtube', 'KOJl7d9jB3g', array['gadgets']::text[], 'https://i.ytimg.com/vi/KOJl7d9jB3g/hqdefault.jpg', 1, 'published'),
  ('Samsung S4 Father & son', 'https://vimeo.com/91694433', 'vimeo', '91694433', array['gadgets']::text[], 'https://i.vimeocdn.com/video/471175933-9103fd396c7e42412a36e972b1d7a741e26a82072901f654e859bc52e9bcd255-d_640?region=us', 2, 'published'),
  ('Samsung S4 Wife', 'https://vimeo.com/91697599', 'vimeo', '91697599', array['gadgets']::text[], 'https://i.vimeocdn.com/video/471180146-796d5b458230792d0edf5ec3ae187cdd26a19f802d1d003dfbb787e77aedb9bc-d_640?region=us', 3, 'published'),
  ('Samsung Ativ Teaser', 'https://vimeo.com/91691078', 'vimeo', '91691078', array['gadgets']::text[], 'https://i.vimeocdn.com/video/471171978-69141aa467309e854d4e9812f75d12e04a75af0ccf80b5b680dff61927621e7a-d_295x166?region=us', 4, 'published'),
  ('Samsung S 4 Poster', 'https://vimeo.com/91695590', 'vimeo', '91695590', array['gadgets']::text[], 'https://i.vimeocdn.com/video/471177547-847fb3c8ad17589930520d21bcb447e46abba5e952b2c64dbb11d3fc69071529-d_640?region=us', 5, 'published'),
  ('Samsung 90sec', 'https://vimeo.com/569992802', 'vimeo', '569992802', array['gadgets']::text[], 'https://i.vimeocdn.com/video/1178655531-e03b3184ae5605ef19fc53b9322bb09a996360b5a054d71e31719c8d46fe7fe2-d_295x166?region=us', 6, 'published'),
  ('motorola signature: A statement', 'https://www.youtube.com/watch?v=n3WXIBFIMgU', 'youtube', 'n3WXIBFIMgU', array['cgi']::text[], 'https://i.ytimg.com/vi/n3WXIBFIMgU/hqdefault.jpg', 1, 'published'),
  ('Motorola Edge 70 Pro: Stunning night shots with Sony LYT 710 - starts ₹36,999* at Flipkart', 'https://www.youtube.com/watch?v=30CCP3x_E6U', 'youtube', '30CCP3x_E6U', array['cgi']::text[], 'https://i.ytimg.com/vi/30CCP3x_E6U/hqdefault.jpg', 2, 'published'),
  ('Say hello to the motorola edge 70 fusion 👋.', 'https://www.youtube.com/watch?v=gkNN-6bmB-o', 'youtube', 'gkNN-6bmB-o', array['cgi']::text[], 'https://i.ytimg.com/vi/gkNN-6bmB-o/hqdefault.jpg', 3, 'published'),
  ('moto sound flow with Sound by Bose 🔊', 'https://www.youtube.com/watch?v=CXyOxZ2Kw8w', 'youtube', 'CXyOxZ2Kw8w', array['cgi']::text[], 'https://i.ytimg.com/vi/CXyOxZ2Kw8w/hqdefault.jpg', 4, 'published'),
  ('motorola edge 70: Say hello to an ultrathin design and 50MP triple cameras', 'https://www.youtube.com/watch?v=rHw1lFXqP5Q', 'youtube', 'rHw1lFXqP5Q', array['cgi']::text[], 'https://i.ytimg.com/vi/rHw1lFXqP5Q/hqdefault.jpg', 5, 'published'),
  ('A8 Star Product Video', 'https://vimeo.com/304996642', 'vimeo', '304996642', array['cgi']::text[], 'https://i.vimeocdn.com/video/1178640085-a05bc16164c0aa1a9c0bbaf1b3c31f7ebd54a3ea269548d626c5a4e4613381d6-d_640?region=us', 6, 'published'),
  ('Motorola 30 Sec_H.264', 'https://vimeo.com/726993009', 'vimeo', '726993009', array['cgi']::text[], 'https://i.vimeocdn.com/video/1463565151-4133e62fd33fb071c560f29655e2c8307951470890b7366db47878c4acb3897a-d_295x166?region=us', 7, 'published'),
  ('Flute & Guitar_60Sec_v03', 'https://vimeo.com/949133115', 'vimeo', '949133115', array['cgi']::text[], 'https://i.vimeocdn.com/video/1856801712-ca2c5dd5a6bbf48cac13fee82cb5b94d734d79aadf2ace60890beaf3c63c4ea5-d_295x166?region=us', 8, 'published'),
  ('Samsung On Max - product video', 'https://vimeo.com/244629006', 'vimeo', '244629006', array['cgi']::text[], 'https://i.vimeocdn.com/video/1146839137-20c564da296fe78b340654cb860cbabf89db9c8204376e5ba13cedc6206cecca-d_640?region=us', 9, 'published'),
  ('Samsung_On7_Prime_01', 'https://vimeo.com/393420391', 'vimeo', '393420391', array['cgi']::text[], 'https://i.vimeocdn.com/video/1146842039-3a170e9e086856dcd98d99512c911dfcbd68e2143ca5ad2b335f4ad607bed0b7-d_295x166?region=us', 10, 'published'),
  ('Lal HIT', 'https://vimeo.com/727292167', 'vimeo', '727292167', array['fmcg']::text[], 'https://i.vimeocdn.com/video/1464115881-9f20f5784700362c92fd583b820ad38c10712b927597dc4a91e288dcc34c08c9-d_295x166?region=us', 1, 'published'),
  ('Borosil Steelers_Film 02_Edit_v7(MIXED-GRADED)_15102022', 'https://vimeo.com/767579257', 'vimeo', '767579257', array['fmcg']::text[], 'https://i.vimeocdn.com/video/1541114530-bc8544ecd770aa1e6c9fe95ee210e435053f2dad94344f770039392ac393c39f-d_295x166?region=us', 2, 'published'),
  ('Parle Kaccha Mango Bite', 'https://vimeo.com/747192657', 'vimeo', '747192657', array['fmcg']::text[], 'https://i.vimeocdn.com/video/1502753375-17f4773aaab5c018b174a1754b943c809d2342f43d08c348a6a810b32bec584c-d_295x166?region=us', 3, 'published'),
  ('Johnson n Johnson', 'https://vimeo.com/47511483', 'vimeo', '47511483', array['fmcg']::text[], 'https://i.vimeocdn.com/video/329563851-55b3da158ed34b7ef195de504894095c0981577d9d38ffba75904ce0c4c7b109-d_640?region=us', 4, 'published'),
  ('Bayer Confidor', 'https://vimeo.com/100185611', 'vimeo', '100185611', array['fmcg']::text[], 'https://i.vimeocdn.com/video/481590528-e33bb15261cac94bdb6b83c742c4e4f6d6fb3f179513f649d40fbdabde25c56e-d_640?region=us', 5, 'published'),
  ('SNAP_DEAL_MASTER_10_SEC_230615_SD', 'https://vimeo.com/141760456', 'vimeo', '141760456', array['fmcg']::text[], 'https://i.vimeocdn.com/video/538854100-a28860dfbac151d2b3520feb1dab7151550c17843acf6eeacf93a3ca13f96e5d-d_295x166?region=us', 6, 'published'),
  ('KMB AGENCY CUT', 'https://vimeo.com/174504635', 'vimeo', '174504635', array['fmcg']::text[], 'https://i.vimeocdn.com/video/581412152-9ea0d1774d0107b03691087f5881f61e2e2a1aca57ad99b651f250bc2ad47aaa-d_640?region=us', 7, 'published'),
  ('5 STAR - escape', 'https://vimeo.com/512832867', 'vimeo', '512832867', array['fmcg']::text[], 'https://i.vimeocdn.com/video/1146842812-18d14c2aa461700155140792fad69b1b7b33a44eae019c88deaccc5db7c111f0-d_295x166?region=us', 8, 'published'),
  ('MIA TANISHQ 60 SEC', 'https://vimeo.com/818834783', 'vimeo', '818834783', array['lifestyle']::text[], 'https://i.vimeocdn.com/video/1657421672-fefec3f3dc77451a5e359cbba3271e4f10e994d012e1a3bb03dae584bf08dec0-d_295x166?region=us', 1, 'published'),
  ('Amway Glister Herbal', 'https://vimeo.com/361264229', 'vimeo', '361264229', array['lifestyle']::text[], 'https://i.vimeocdn.com/video/1146812950-6feebe024f46466c411e7cfa2b213fd53f57368d7b06c517448bd12f415e8f6a-d_295x166?region=us', 2, 'published')
on conflict (video_platform, video_id) do nothing;
