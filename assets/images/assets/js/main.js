/* BlixToys static 3D-image showcase — no WebGL or 3D runtime required. */
(() => {
  const tabs=[...document.querySelectorAll('.showcase-tab')];
  const ui={
    kicker:document.getElementById('showcase-kicker'),
    title:document.getElementById('showcase-title'),
    description:document.getElementById('showcase-description'),
    detail:document.getElementById('showcase-detail'),
    list:document.getElementById('showcase-list'),
    label:document.getElementById('showcase-model-label'),
    link:document.getElementById('showcase-link'),
    image:document.getElementById('showcase-render')
  };
  if(!tabs.length || !ui.image) return;
  const content={
    design:{
      kicker:'01 / PRODUCT DESIGN',title:'Ideas take shape<br>before they take off.',
      description:'We turn product ideas into tangible consumer experiences through purposeful design, thoughtful details and playful creativity.',
      detail:'From the first sketch to a refined product direction, every decision considers the little details that make a toy intuitive, engaging and right for its intended user.',
      list:['Concept development & visual styling','Industrial design & ergonomics','CMF & brand alignment','3D CAD & design verification','Rapid prototyping and mockups'],
      label:'01 / 3D PRODUCT CONCEPT',link:'capabilities.html',image:'ride-on-3d-concept.webp',alt:'3D concept render of an orange and cream ride-on toy'
    },
    engineering:{
      kicker:'02 / PRODUCT ENGINEERING',title:'Thoughtful details.<br>Made to work.',
      description:'We connect creative intent with practical product engineering and development thinking.',
      detail:'Product form, function, materials and assembly are considered together to help turn promising concepts into practical product solutions.',
      list:['Product architecture & detailing','Material and component consideration','Ergonomic and functional refinement','Design for manufacturability','Prototype review & iteration'],
      label:'02 / ENGINEERING CONCEPT',link:'capabilities.html',image:'engineering-3d-concept.webp',alt:'Exploded 3D view of the ride-on toy body, chassis, seat and wheel assembly'
    },
    manufacturing:{
      kicker:'03 / MANUFACTURING',title:'From product vision<br>to production thinking.',
      description:'A considered approach helps bridge the gap between a finished design and repeatable production.',
      detail:'Manufacturing planning considers the product, process and quality expectations together.',
      list:['Production process planning','Moulding and assembly considerations','Process flow & repeatability','Inspection checkpoints','Production readiness review'],
      label:'03 / MANUFACTURING CONCEPT',link:'manufacturing.html',image:'manufacturing-3d-concept.webp',alt:'3D render of an orange and white industrial injection moulding machine'
    },
    licenses:{
      kicker:'04 / QUALITY & LICENSES',title:'Confidence built<br>into every detail.',
      description:'Quality and product compliance begin with understanding the requirements that apply to each product.',
      detail:'Relevant standards, testing pathways and documentation depend on the product and market. We present verified records transparently.',
      list:['Applicable product standards','Safety and quality documentation','Testing and inspection records','Certification and licence tracking','Validity and scope visibility'],
      label:'04 / QUALITY CONCEPT',link:'index.html#safety-quality',image:'licenses-3d-concept.webp',alt:'3D concept render of a framed certificate of compliance and quality seal'
    }
  };

  let imageRequest = 0;
  function activateShowcase(tab) {
    const d = content[tab.dataset.showcase];
    if (!d) return;

    tabs.forEach(t => {
      const active = t === tab;
      t.classList.toggle('active', active);
      t.setAttribute('aria-selected', String(active));
    });

    ui.kicker.textContent = d.kicker;
    ui.title.innerHTML = d.title;
    ui.description.textContent = d.description;
    ui.detail.textContent = d.detail;
    ui.list.innerHTML = d.list.map(item => `<li>${item}</li>`).join('');
    if (ui.label) ui.label.textContent = d.label;
    ui.link.href = d.link;

    // Load the selected tab's own image before swapping it into the showcase.
    // A request counter prevents a slow previous image from replacing a newer tab.
    const requestId = ++imageRequest;
    const imageUrl = new URL(`assets/images/${d.image}?v=20261112`, document.baseURI).href;
    const preload = new Image();

    ui.image.classList.add('is-changing');
    preload.onload = () => {
      if (requestId !== imageRequest) return;
      ui.image.src = imageUrl;
      ui.image.alt = d.alt;
      ui.image.classList.remove('is-changing');
    };
    preload.onerror = () => {
      if (requestId !== imageRequest) return;
      console.error(`[BlixToys] Could not load ${d.image}. Check that it exists in assets/images/.`);
      ui.image.classList.remove('is-changing');
    };
    preload.src = imageUrl;
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => activateShowcase(tab));
  });

  // Ensure the initially selected tab and its matching image are synchronised.
  const initialTab = tabs.find(tab => tab.classList.contains('active')) || tabs[0];
  if (initialTab) activateShowcase(initialTab);

})();
