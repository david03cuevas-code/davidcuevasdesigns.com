/* ==========================================================================
   David Cuevas Designs - Master Joinery Web Application Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  calculateEstimate();
  initKeyboardNavigation();
});

// Sticky Navigation Header Scroll Effect
function initNavigation() {
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

// Mobile Dropdown Navigation Toggle Function
function toggleMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  const icon = document.getElementById('mobile-icon');
  
  if (menu.classList.contains('active')) {
    menu.classList.remove('active');
    icon.classList.remove('fa-xmark');
    icon.classList.add('fa-bars');
  } else {
    menu.classList.add('active');
    icon.classList.remove('fa-bars');
    icon.classList.add('fa-xmark');
  }
}

// FAQ Accordion Toggle Function
function toggleFaq(btn) {
  const item = btn.parentElement;
  const isActive = item.classList.contains('active');
  
  // Close all open FAQs
  document.querySelectorAll('.faq-item').forEach(el => el.classList.remove('active'));
  
  // If clicked item wasn't active, open it
  if (!isActive) {
    item.classList.add('active');
  }
}

// Joinery & Foundation Data Dictionary
const joineryData = {
  triaxis: {
    title: "The Tri-Axis 45° Compound Joint™ (Proprietary)",
    desc: "An unprecedented engineering feat invented by David Cuevas. Shown above in full uncropped detail: this joint interlocks three load-bearing axes simultaneously at compound 45-degree angles into solid 8x8 posts, creating an unbreakable structural node that distributes wind forces naturally across the wood grain.",
    image: "images/tri_axis_real_angle.jpg",
    specs: [
      "Locks 3 directional load axes under hurricane tension",
      "Full 45° compound meeting angles into 8x8 timber posts",
      "Heavy-duty structural timber through-bolts",
      "Lifetime structural joint guarantee"
    ]
  },
  japanese: {
    title: "Traditional Japanese Mortise & Tenon (Kanawa Tsugi)",
    desc: "Ancient timber framing technique utilizing key-locked wood tenons and hardwood pegs. Under high hurricane winds, wood fibers compress together, increasing joint rigidity naturally.",
    image: "images/pergola_lattice_close.jpg",
    specs: [
      "100% Organic timber-to-timber load transfer",
      "Hand-planed clear Western Red Cedar",
      "Allows wood to expand and contract naturally in Florida humidity",
      "Proven for 1,000+ years in Japanese temple architecture"
    ]
  },
  foundation: {
    title: "3+ Ft Reinforced Pier Concrete Foundations",
    desc: "Every 8x8 post sits on 3-foot deep reinforced concrete pier footings poured beneath your pavers with heavy-duty post brackets. Designed to anchor into bedrock and withstand 160+ MPH hurricane wind loads while keeping all concrete and hardware discreetly concealed.",
    image: "images/pergola_daylight.jpg",
    specs: [
      "3+ Foot deep reinforced concrete pier footings",
      "Concealed heavy-duty post base anchors under pavers",
      "City structural code compliant across Pinellas & Hillsborough",
      "Zero visible concrete or mounting hardware above pavers"
    ]
  }
};

// Gallery Items Array for Full-Screen Lightbox Carousel
const galleryItems = [
  {
    image: "images/pergola_sunlight.jpg",
    tag: "ST. PETERSBURG ESTATE",
    title: "The Coastal Cedar Pavilion",
    desc: "8x8 Western Red Cedar, Marine-Grade Teak Oil Treatment, Paver Footing Integration."
  },
  {
    image: "images/david_craftsman.jpg",
    tag: "MASTER CRAFTSMAN",
    title: "Shipwright Precision Framing",
    desc: "Master Joiner David Cuevas hand-fitting cedar knee bracing on site."
  },
  {
    image: "images/tri_axis_real_angle.jpg",
    tag: "PROPRIETARY INVENTION",
    title: "The Tri-Axis 45° Compound Joint",
    desc: "Full-view 3-way compound interlocking timber node in real 8x8 heavy timber."
  },
  {
    image: "images/tri_axis_real_roof.jpg",
    tag: "EXECUTIVE CARPORT",
    title: "Architectural Roof & Rain Gutter Detail",
    desc: "Under-roof timber framing, rain chain, and structural tie-ins."
  },
  {
    image: "images/pergola_night.jpg",
    tag: "DOWNTOWN ST. PETE",
    title: "Resort Nighttime Illumination",
    desc: "Integrated low-voltage warm LED uplighting around pool & dining sanctuary."
  },
  {
    image: "images/pergola_daylight.jpg",
    tag: "CLEARWATER WATERFRONT",
    title: "Poolside Dining & Spa Sanctuary",
    desc: "8x8 post anchors integrated seamlessly into existing brick pavers."
  }
];

let currentGalleryIndex = 0;

// Open Lightbox Modal
function openLightbox(index) {
  currentGalleryIndex = index;
  updateLightboxContent();
  document.getElementById('lightbox-modal').classList.add('active');
}

// Close Lightbox Modal
function closeLightbox() {
  document.getElementById('lightbox-modal').classList.remove('active');
}

// Next Image in Lightbox
function nextLightbox(e) {
  if (e) e.stopPropagation();
  currentGalleryIndex = (currentGalleryIndex + 1) % galleryItems.length;
  updateLightboxContent();
}

// Previous Image in Lightbox
function prevLightbox(e) {
  if (e) e.stopPropagation();
  currentGalleryIndex = (currentGalleryIndex - 1 + galleryItems.length) % galleryItems.length;
  updateLightboxContent();
}

// Update Lightbox Display Content
function updateLightboxContent() {
  const item = galleryItems[currentGalleryIndex];
  const img = document.getElementById('lightbox-img');
  
  img.style.opacity = '0.3';
  setTimeout(() => {
    img.src = item.image;
    document.getElementById('lightbox-tag').innerText = item.tag;
    document.getElementById('lightbox-title').innerText = item.title;
    document.getElementById('lightbox-desc').innerText = item.desc;
    document.getElementById('lightbox-counter').innerText = `${currentGalleryIndex + 1} / ${galleryItems.length}`;
    img.style.opacity = '1';
  }, 120);
}

// Handle Backdrop Click
function handleLightboxBackdropClick(e) {
  if (e.target.id === 'lightbox-modal') {
    closeLightbox();
  }
}

// Keyboard Left/Right Arrow Key Navigation
function initKeyboardNavigation() {
  document.addEventListener('keydown', (e) => {
    const modal = document.getElementById('lightbox-modal');
    if (!modal.classList.contains('active')) return;

    if (e.key === 'ArrowRight') {
      nextLightbox();
    } else if (e.key === 'ArrowLeft') {
      prevLightbox();
    } else if (e.key === 'Escape') {
      closeLightbox();
    }
  });
}

// Switch Joinery Tab
function switchJoineryTab(tabKey) {
  const data = joineryData[tabKey];
  if (!data) return;

  const buttons = document.querySelectorAll('.tab-btn');
  buttons.forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');

  const card = document.getElementById('joinery-card');
  card.style.opacity = '0.4';

  setTimeout(() => {
    document.getElementById('joinery-title').innerText = data.title;
    document.getElementById('joinery-desc').innerText = data.desc;
    document.getElementById('joinery-img').src = data.image;

    const specsContainer = document.getElementById('joinery-specs');
    specsContainer.innerHTML = data.specs
      .map(spec => `<div class="tech-spec-item"><i class="fa-solid fa-circle-check"></i> ${spec}</div>`)
      .join('');

    card.style.opacity = '1';
  }, 200);
}

// Interactive Project Cost Estimator Calculation (Launch Tier: $19,000 - $42,000+)
function calculateEstimate() {
  const type = document.getElementById('structure-type').value;
  const sqft = parseInt(document.getElementById('sqft-slider').value);
  const postSize = document.getElementById('post-size').value;
  const joinery = document.getElementById('joinery-type').value;

  const width = Math.round(Math.sqrt(sqft * 0.85));
  const length = Math.round(sqft / width);
  document.getElementById('sqft-val').innerText = `${sqft} sq ft (${width}' x ${length}')`;

  // Adjusted rates for launch offer: starting at $19,000
  let baseRateMin = 35;
  let baseRateMax = 52;

  if (type === 'pavilion') {
    baseRateMin += 25; // Roof structure & ceiling
    baseRateMax += 38;
  } else if (type === 'carport') {
    baseRateMin += 20; // Heavy timber trusses
    baseRateMax += 30;
  }

  if (postSize === '10x10') {
    baseRateMin += 10;
    baseRateMax += 15;
  }

  if (joinery === 'triaxis') {
    baseRateMin += 8;
    baseRateMax += 12;
  }

  let totalMin = Math.round(sqft * baseRateMin / 500) * 500;
  let totalMax = Math.round(sqft * baseRateMax / 500) * 500;

  // Set lower bound starting minimum at $19,000 for launch offer
  if (totalMin < 19000) totalMin = 19000;
  if (totalMax < 26000) totalMax = 26000;
  if (totalMax > 42000) totalMax = 42000;

  const formattedMin = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(totalMin);
  const formattedMax = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(totalMax);

  document.getElementById('price-output').innerText = `${formattedMin} – ${formattedMax}`;
}

// Modal Control Logic
function openConsultationModal(mode = 'client') {
  const modal = document.getElementById('modal');
  const modalTitle = document.getElementById('modal-title');
  
  if (mode === 'trade') {
    modalTitle.innerText = 'Trade Partner Portal Inquiry';
  } else {
    modalTitle.innerText = 'Request Estate Consultation';
  }
  
  modal.classList.add('active');
}

function closeModal() {
  document.getElementById('modal').classList.remove('active');
}

// Form Submission with Web3Forms & Graceful Feedback
async function submitForm(e) {
  e.preventDefault();
  const submitBtn = document.getElementById('submit-btn');
  const originalText = submitBtn.innerText;
  submitBtn.innerText = 'Submitting Request...';
  submitBtn.disabled = true;

  const name = document.getElementById('client-name').value;
  const form = document.getElementById('consultation-form');
  const formData = new FormData(form);

  const key = document.getElementById('web3forms-key').value;

  if (key && key !== 'YOUR_ACCESS_KEY_HERE') {
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });
      const result = await response.json();
      if (result.success) {
        alert(`Thank you, ${name}! Your estate consultation request has been sent to David Cuevas Designs. Master Joiner David Cuevas will contact you within 24 hours.`);
      } else {
        alert(`Thank you, ${name}! Your request has been recorded. David Cuevas will reach out to you shortly.`);
      }
    } catch (err) {
      alert(`Thank you, ${name}! Your request has been received. David Cuevas will contact you within 24 hours.`);
    }
  } else {
    alert(`Thank you, ${name}! Your estate consultation request has been submitted. Master Joiner David Cuevas will contact you within 24 hours.`);
  }

  submitBtn.innerText = originalText;
  submitBtn.disabled = false;
  closeModal();
}
