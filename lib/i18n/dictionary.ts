// Bilingual content dictionary for We Can Ltd.
// All site copy lives here so the EN/BG toggle swaps a single source of truth.

export type Locale = 'en' | 'bg';

export const LOCALES: Locale[] = ['en', 'bg'];
export const DEFAULT_LOCALE: Locale = 'en';

type ValueProp = { num: string; title: string; body: string };
type Category = { title: string; body: string };
type ProcessStep = { num: string; title: string; body: string };
type Stat = { value: string; target: number; suffix: string; label: string };
type CanSize = { size: string; variant: string; use: string };
type Capability = { title: string; body: string };

export interface Dictionary {
  nav: {
    home: string;
    privateLabel: string;
    contact: string;
    cta: string;
  };
  footer: {
    wordmarkTagline: string;
    linksHeading: string;
    exploreHeading: string;
    contactHeading: string;
    rights: string;
    designedBy: string;
    capabilities: string;
    process: string;
    sustainability: string;
  };
  home: {
    hero: {
      label: string;
      headline: string[];
      subhead: string;
      ctaPrimary: string;
      ctaSecondary: string;
    };
    quote: {
      text: string;
      attribution: string;
    };
    why: {
      label: string;
      headline: string;
      items: ValueProp[];
    };
    capacity: {
      label: string;
      headline: string;
      stats: Stat[];
    };
    categories: {
      label: string;
      headline: string;
      items: Category[];
    };
    process: {
      label: string;
      headline: string;
      steps: ProcessStep[];
    };
    closing: {
      label: string;
      headline: string;
      body: string;
      cta: string;
    };
  };
  privateLabel: {
    hero: {
      label: string;
      headline: string;
      subhead: string;
    };
    step1: {
      label: string;
      headline: string;
      items: Category[];
    };
    step2: {
      label: string;
      headline: string;
      sizes: CanSize[];
    };
    step3: {
      label: string;
      headline: string;
      litho: {
        title: string;
        body: string;
        techHeading: string;
        tech: string[];
        minHeading: string;
        min: string[];
      };
      sleeve: {
        title: string;
        body: string;
        minHeading: string;
        min: string[];
      };
    };
    step4: {
      label: string;
      headline: string;
      capsHeading: string;
      caps: string[];
      tabsHeading: string;
      tabs: string[];
    };
    capacity: {
      label: string;
      headline: string;
      stats: Stat[];
      footer: string;
    };
    line: {
      label: string;
      headline: string;
      items: Capability[];
    };
    closing: {
      label: string;
      headline: string;
      body: string;
      cta: string;
    };
  };
  contact: {
    label: string;
    headline: string;
    body: string;
    infoHeading: string;
    address: string;
    addressValue: string;
    email: string;
    emailValue: string;
    phone: string;
    phoneValue: string;
    form: {
      sectionCompany: string;
      sectionProject: string;
      sectionMore: string;
      company: string;
      contactPerson: string;
      email: string;
      phone: string;
      country: string;
      beverageType: string;
      beverageOptions: { value: string; label: string }[];
      canSizes: string;
      canSizeOptions: string[];
      decoration: string;
      decorationOptions: string[];
      quantity: string;
      quantityHint: string;
      timeline: string;
      timelineHint: string;
      description: string;
      descriptionPlaceholder: string;
      optional: string;
      submit: string;
      submitting: string;
      successTitle: string;
      successBody: string;
      errorRequired: string;
      errorEmail: string;
      errorSend: string;
      selectPlaceholder: string;
    };
  };
}

export const dictionary: Record<Locale, Dictionary> = {
  en: {
    nav: {
      home: 'Home',
      privateLabel: 'Private Label',
      contact: 'Contact',
      cta: 'Request Offer',
    },
    footer: {
      wordmarkTagline: 'Bulgarian beverage canning. Built for ambitious brands.',
      linksHeading: 'Navigate',
      exploreHeading: 'Explore',
      contactHeading: 'Contact',
      rights: '© 2026 We Can Ltd. All rights reserved.',
      designedBy: 'Designed by Vladimir Panev',
      capabilities: 'Capabilities',
      process: 'Process',
      sustainability: 'Sustainability',
    },
    home: {
      hero: {
        label: 'Bulgarian Beverage Canning',
        headline: ['Your beverage.', 'Your brand.', 'Our cans.'],
        subhead:
          'Flexible aluminum can production for energy, functional, sports, and soft drinks. From 15,000-can short runs to full-scale series.',
        ctaPrimary: 'Request a Private Label Offer',
        ctaSecondary: 'Explore capabilities',
      },
      quote: {
        text:
          'For every brand that won’t compromise on quality — or on flexibility.',
        attribution: '— We Can Ltd., Bulgaria',
      },
      why: {
        label: 'Why We Can',
        headline: 'Built for brands that need more than a co-packer.',
        items: [
          {
            num: '01',
            title: 'Flexible Minimum Orders',
            body:
              'From 15,000 cans for shrink sleeve runs. Designed for emerging brands, limited editions, and seasonal launches — not just for global giants.',
          },
          {
            num: '02',
            title: 'EU & Bulgarian Standards',
            body:
              'Modern facility built to the highest technological and hygienic standards. Fully compliant with Bulgarian and European legislation.',
          },
          {
            num: '03',
            title: 'Sustainable Production',
            body:
              'Powered by green energy and built around sustainable resource use. Aluminum is 100% recyclable — a packaging choice that matches the future of beverage.',
          },
          {
            num: '04',
            title: 'Competitive Pricing',
            body:
              'Among the most competitive prices on the market — without hidden fees, with full transparency from offer to delivery.',
          },
        ],
      },
      capacity: {
        label: 'Production Capacity',
        headline: 'Scale that meets ambition.',
        stats: [
          { value: '22M', target: 22, suffix: 'M', label: 'Cans/year · 250ml Slim' },
          { value: '154M', target: 154, suffix: 'M', label: 'Cans/year · 330ml Sleek' },
          { value: '154M', target: 154, suffix: 'M', label: 'Cans/year · 330/500ml Standard' },
          { value: '3', target: 3, suffix: '', label: 'High-tech filling lines' },
        ],
      },
      categories: {
        label: 'Beverage Categories',
        headline: 'From everyday to high-performance.',
        items: [
          {
            title: 'Energy Drinks',
            body:
              'Premium energy drinks with added-value formulations — caffeine, taurine, B-vitamins, functional botanicals.',
          },
          {
            title: 'Functional Beverages',
            body:
              'Health-forward drinks with specific functional benefits — adaptogens, electrolytes, nootropics, vitamins.',
          },
          {
            title: 'Sports Drinks',
            body:
              'Hydration and recovery beverages, formulated for active consumers and performance brands.',
          },
          {
            title: 'Soft Drinks',
            body:
              'Carbonated or still soft drinks — classic flavors or fully custom formulations to your specification.',
          },
        ],
      },
      process: {
        label: 'From Concept to Can',
        headline: 'A clear path from your brief to your first delivery.',
        steps: [
          {
            num: '01',
            title: 'Brief & Consultation',
            body:
              'Share your concept, target market, and volume needs. We’ll guide you through formulation, packaging, and timeline options.',
          },
          {
            num: '02',
            title: 'Formulation & Sampling',
            body:
              'We develop your recipe in collaboration with you and produce samples for tasting and validation.',
          },
          {
            num: '03',
            title: 'Design & Print Setup',
            body:
              'We work with your designs to finalize artwork for litho, shrink sleeve, or other decoration methods.',
          },
          {
            num: '04',
            title: 'Production & Delivery',
            body:
              'Your beverage is filled, packaged, and prepared for shipment under your brand.',
          },
        ],
      },
      closing: {
        label: 'Ready to Launch?',
        headline: 'Let’s build your brand together.',
        body:
          'Request a personalized offer based on your beverage concept, volume, and packaging preferences. We respond within 2 business days.',
        cta: 'Request Your Offer',
      },
    },
    privateLabel: {
      hero: {
        label: 'Private Label',
        headline: 'Build your beverage brand, your way.',
        subhead:
          'Customize every aspect — from beverage type to can size to decoration. Designed for brands that need flexibility without compromise.',
      },
      step1: {
        label: 'Step 01',
        headline: 'Start with the drink.',
        items: [
          {
            title: 'Energy Drinks (with added value)',
            body:
              'Premium energy beverages with caffeine, taurine, vitamins, or functional botanicals. Carbonated formulations.',
          },
          {
            title: 'Functional, Sports & Soft Drinks',
            body:
              'Carbonated or still — including isotonic sports drinks, vitamin waters, adaptogenic beverages, soft drinks, and more.',
          },
        ],
      },
      step2: {
        label: 'Step 02',
        headline: 'Choose your format.',
        sizes: [
          { size: '250ml', variant: 'Slim', use: 'Energy drinks, premium positioning' },
          { size: '330ml', variant: 'Sleek', use: 'Modern brands, sleek design appeal' },
          { size: '330ml', variant: 'Standard', use: 'Classic format, versatile' },
          { size: '500ml', variant: 'Standard', use: 'Sports drinks, value-size positioning' },
        ],
      },
      step3: {
        label: 'Step 03',
        headline: 'Two paths to your design.',
        litho: {
          title: 'Litho — Direct Can Printing',
          body:
            '8-color standard printing directly on the can. Premium feel, ideal for established brands and larger volumes.',
          techHeading: 'Available technologies',
          tech: [
            '8-color standard litho',
            'Dynamark® — variable print in a single production cycle',
            'Eyeris® — High Definition Digital Print',
            'Special finishing effects',
          ],
          minHeading: 'Minimum order',
          min: [
            '150,000 cans + can manufacturer surcharge',
            '250,000 cans',
          ],
        },
        sleeve: {
          title: 'Shrink Sleeve Label',
          body:
            'Digitally printed shrink sleeve label wrapped around the can. Perfect for short runs, limited editions, and emerging brands.',
          minHeading: 'Minimum order options',
          min: ['15,000 cans', '30,000 cans', '45,000 cans', '60,000 cans'],
        },
      },
      step4: {
        label: 'Step 04',
        headline: 'Down to the smallest detail.',
        capsHeading: 'Caps (under-tab personalization)',
        caps: [
          'Standard silver',
          'Gold or black (on request)',
          'Embossed or printed',
        ],
        tabsHeading: 'Tabs (pull-tabs)',
        tabs: [
          'Standard silver',
          'Black, blue, green, red, or clear lacquer',
          'Other colors on request',
          'Punched tab',
          'Discreet punched tab',
          'Laser-engraved tab',
          'Laser-engraved promotional tab',
          'Under-tab code',
        ],
      },
      capacity: {
        label: 'Production Capacity',
        headline: 'Built for scale.',
        stats: [
          { value: '22M', target: 22, suffix: 'M', label: 'Cans/year · 250ml Slim' },
          { value: '154M', target: 154, suffix: 'M', label: 'Cans/year · 330ml Sleek' },
          { value: '154M', target: 154, suffix: 'M', label: 'Cans/year · 330 & 500ml Standard' },
          { value: '3', target: 3, suffix: '', label: 'High-tech filling lines' },
        ],
        footer:
          'Total annual capacity: over 330 million cans across all formats.',
      },
      line: {
        label: 'Bottling Line Capabilities',
        headline: 'The technology behind your beverage.',
        items: [
          {
            title: 'Proprietary Low-Mineralization Water Source',
            body: 'Direct from source, ideal foundation for clean-label beverages.',
          },
          {
            title: 'Micro-Filtration Station',
            body: 'Multi-stage water filtration ensuring purity at every level.',
          },
          {
            title: 'Reverse Osmosis (up to 10 μS)',
            body: 'Water purity up to 10 microsiemens — pharmaceutical-grade clean.',
          },
          {
            title: 'Dual Syrup Mixing Stations with Auto-Dosing',
            body: 'Precise ingredient ratios for consistent flavor across every batch.',
          },
          {
            title: 'CO₂ Intermix Station',
            body: 'Controlled carbonation dosing for perfect fizz, every time.',
          },
          {
            title: '3 High-Tech Filling Lines',
            body: 'Parallel capacity across formats — speed without compromise.',
          },
          {
            title: 'Tunnel & Flash Pasteurization',
            body: 'Beverage safety without compromising flavor or quality.',
          },
          {
            title: 'Shrink Sleeve Capability for Short Runs',
            body: 'Premium-look labels for limited editions and emerging brands.',
          },
          {
            title: 'Fully Automated SIP System',
            body: 'Sanitization-in-Place ensures consistent hygiene at every fill.',
          },
        ],
      },
      closing: {
        label: 'Ready to Start?',
        headline: 'Ready to start your private label journey?',
        body:
          'Request a personalized offer based on your beverage concept, volume, and packaging preferences. We respond within 2 business days.',
        cta: 'Request Your Private Label Offer',
      },
    },
    contact: {
      label: 'Get in Touch',
      headline: 'Request your Private Label offer.',
      body:
        'Tell us about your beverage concept, volume needs, and timeline. Our team will respond with a personalized offer within 2 business days.',
      infoHeading: 'Direct contact',
      address: 'Address',
      addressValue: 'Bulgaria — full address provided on request',
      email: 'Email',
      emailValue: 'hello@wecan.bg',
      phone: 'Phone',
      phoneValue: '+359 — available on request',
      form: {
        sectionCompany: 'Company & Contact',
        sectionProject: 'Project Details',
        sectionMore: 'Tell Us More',
        company: 'Company name',
        contactPerson: 'Contact person',
        email: 'Email',
        phone: 'Phone',
        country: 'Country',
        beverageType: 'Beverage type',
        beverageOptions: [
          { value: 'energy', label: 'Energy' },
          { value: 'functional', label: 'Functional' },
          { value: 'sports', label: 'Sports' },
          { value: 'soft', label: 'Soft' },
          { value: 'other', label: 'Other' },
        ],
        canSizes: 'Can size(s)',
        canSizeOptions: ['250ml Slim', '330ml Sleek', '330ml Standard', '500ml Standard'],
        decoration: 'Decoration preference',
        decorationOptions: ['Litho', 'Shrink Sleeve', 'Not sure yet'],
        quantity: 'Estimated order quantity',
        quantityHint: 'e.g., 50,000 cans',
        timeline: 'Timeline',
        timelineHint: 'e.g., 3–6 months',
        description: 'Project description',
        descriptionPlaceholder:
          'Tell us about your brand, concept, and any specific requirements.',
        optional: 'optional',
        submit: 'Submit Request',
        submitting: 'Sending…',
        successTitle: 'Thank you. We’ll respond within 2 business days. 🥤',
        successBody: 'Your request has been sent to our team.',
        errorRequired: 'Please fill in all required fields.',
        errorEmail: 'Please enter a valid email address.',
        errorSend: 'Something went wrong. Please try again or email us directly.',
        selectPlaceholder: 'Select…',
      },
    },
  },
  bg: {
    nav: {
      home: 'Начало',
      privateLabel: 'Частни марки',
      contact: 'Контакт',
      cta: 'Заявка',
    },
    footer: {
      wordmarkTagline: 'Българско бутилиране в кенове. За амбициозни брандове.',
      linksHeading: 'Навигация',
      exploreHeading: 'Разгледайте',
      contactHeading: 'Контакт',
      rights: '© 2026 We Can Ltd. Всички права запазени.',
      designedBy: 'Designed by Vladimir Panev',
      capabilities: 'Възможности',
      process: 'Процес',
      sustainability: 'Устойчивост',
    },
    home: {
      hero: {
        label: 'Българско бутилиране в кенове',
        headline: ['Вашата напитка.', 'Вашият бранд.', 'Нашите кенове.'],
        subhead:
          'Гъвкаво производство в алуминиеви кенове за енергийни, функционални, спортни и безалкохолни напитки. От 15,000 кена кратки серии до пълни производствени серии.',
        ctaPrimary: 'Заявете оферта',
        ctaSecondary: 'Вижте възможностите',
      },
      quote: {
        text:
          'За всеки бранд, който не прави компромис с качеството — или с гъвкавостта.',
        attribution: '— We Can Ltd., България',
      },
      why: {
        label: 'Защо We Can',
        headline: 'Създаден за брандове, които искат повече от обикновен производител.',
        items: [
          {
            num: '01',
            title: 'Гъвкави минимални поръчки',
            body:
              'От 15,000 кена за shrink sleeve серии. Подходящо за нови брандове, лимитирани издания и сезонни кампании — не само за големи производители.',
          },
          {
            num: '02',
            title: 'ЕС и български стандарти',
            body:
              'Модерно оборудван завод по най-високи технологични и хигиенни стандарти. Пълно съответствие с българското и европейското законодателство.',
          },
          {
            num: '03',
            title: 'Устойчиво производство',
            body:
              'Зелена енергия и устойчиво използване на ресурси. Алуминият е 100% рециклируем — опаковка, която отговаря на бъдещето на индустрията.',
          },
          {
            num: '04',
            title: 'Конкурентни цени',
            body:
              'Сред най-конкурентните цени на пазара — без скрити такси, с пълна прозрачност от оферта до доставка.',
          },
        ],
      },
      capacity: {
        label: 'Производствен капацитет',
        headline: 'Капацитет, който отговаря на амбицията.',
        stats: [
          { value: '22M', target: 22, suffix: 'M', label: 'Кена/год · 250ml Slim' },
          { value: '154M', target: 154, suffix: 'M', label: 'Кена/год · 330ml Sleek' },
          { value: '154M', target: 154, suffix: 'M', label: 'Кена/год · 330/500ml Standard' },
          { value: '3', target: 3, suffix: '', label: 'Високотехнологични линии' },
        ],
      },
      categories: {
        label: 'Категории напитки',
        headline: 'От ежедневни до високоефективни.',
        items: [
          {
            title: 'Енергийни напитки',
            body:
              'Премиум енергийни напитки с „добавена стойност“ — кофеин, таурин, B-витамини, функционални растителни съставки.',
          },
          {
            title: 'Функционални напитки',
            body:
              'Напитки със специфични функционални ползи — адаптогени, електролити, ноотропици, витамини.',
          },
          {
            title: 'Спортни напитки',
            body:
              'Напитки за хидратация и възстановяване, разработени за активни потребители и спортни брандове.',
          },
          {
            title: 'Безалкохолни напитки',
            body:
              'Газирани или негазирани безалкохолни напитки — класически вкусове или напълно персонализирани формули.',
          },
        ],
      },
      process: {
        label: 'От идея до кен',
        headline: 'Ясен път от вашата идея до първата доставка.',
        steps: [
          {
            num: '01',
            title: 'Бриф и консултация',
            body:
              'Споделете концепцията, целевия пазар и обема. Ще ви насочим през формулацията, опаковката и сроковете.',
          },
          {
            num: '02',
            title: 'Формулация и мостри',
            body:
              'Разработваме вашата рецепта съвместно с вас и произвеждаме мостри за дегустация и валидиране.',
          },
          {
            num: '03',
            title: 'Дизайн и подготовка за печат',
            body:
              'Работим с вашите дизайни, за да финализираме артуърка за литография, shrink sleeve или други методи на декорация.',
          },
          {
            num: '04',
            title: 'Производство и доставка',
            body:
              'Вашата напитка се бутилира, опакова и подготвя за изпращане под вашия бранд.',
          },
        ],
      },
      closing: {
        label: 'Готови за старт?',
        headline: 'Нека създадем вашия бранд заедно.',
        body:
          'Заявете персонализирана оферта на база вашата концепция, обем и предпочитания. Отговаряме в рамките на 2 работни дни.',
        cta: 'Заявете оферта',
      },
    },
    privateLabel: {
      hero: {
        label: 'Частни марки',
        headline: 'Изградете вашия бранд за напитки, по вашия начин.',
        subhead:
          'Персонализирайте всеки елемент — от типа напитка до размера на кена и декорацията. За брандове, които искат гъвкавост без компромиси.',
      },
      step1: {
        label: 'Стъпка 01',
        headline: 'Започнете с напитката.',
        items: [
          {
            title: 'Енергийни напитки (с добавена стойност)',
            body:
              'Премиум енергийни напитки с кофеин, таурин, витамини или функционални растителни съставки. Газирани формули.',
          },
          {
            title: 'Функционални, спортни и безалкохолни напитки',
            body:
              'Газирани или негазирани — включително изотонични спортни напитки, витаминни води, адаптогенни напитки, безалкохолни и други.',
          },
        ],
      },
      step2: {
        label: 'Стъпка 02',
        headline: 'Изберете формата.',
        sizes: [
          { size: '250ml', variant: 'Slim', use: 'Енергийни напитки, премиум позициониране' },
          { size: '330ml', variant: 'Sleek', use: 'Модерни брандове, sleek дизайн' },
          { size: '330ml', variant: 'Standard', use: 'Класически формат, универсален' },
          { size: '500ml', variant: 'Standard', use: 'Спортни напитки, голям обем' },
        ],
      },
      step3: {
        label: 'Стъпка 03',
        headline: 'Два начина за вашия дизайн.',
        litho: {
          title: 'Литография — директен печат върху кена',
          body:
            '8-цветен стандартен печат директно върху кена. Премиум усещане, идеален за големи серии.',
          techHeading: 'Налични технологии',
          tech: [
            '8-цветен стандартен литографски печат',
            'Dynamark® — променлив печат в един цикъл',
            'Eyeris® — High Definition дигитален печат',
            'Специални довършителни ефекти',
          ],
          minHeading: 'Минимална поръчка',
          min: [
            '150,000 кена + такса от производителя на кена',
            '250,000 кена',
          ],
        },
        sleeve: {
          title: 'Shrink Sleeve етикет',
          body:
            'Дигитално отпечатан shrink sleeve етикет около кена. Идеален за кратки серии, лимитирани издания и нови брандове.',
          minHeading: 'Опции за минимална поръчка',
          min: ['15,000 кена', '30,000 кена', '45,000 кена', '60,000 кена'],
        },
      },
      step4: {
        label: 'Стъпка 04',
        headline: 'До най-малкия детайл.',
        capsHeading: 'Капачки (персонализация под езичето)',
        caps: [
          'Стандартен сребрист',
          'Златен или черен (при запитване)',
          'Релефни или с печат',
        ],
        tabsHeading: 'Езичета (pull-tabs)',
        tabs: [
          'Стандартен сребрист',
          'Черен, син, зелен, червен или прозрачен лак',
          'Други цветове при запитване',
          'Изрязано езиче',
          'Дискретно изрязано езиче',
          'Лазерно гравирано езиче',
          'Лазерно гравирано промо езиче',
          'Код под езичето',
        ],
      },
      capacity: {
        label: 'Производствен капацитет',
        headline: 'Изграден за мащаб.',
        stats: [
          { value: '22M', target: 22, suffix: 'M', label: 'Кена/год · 250ml Slim' },
          { value: '154M', target: 154, suffix: 'M', label: 'Кена/год · 330ml Sleek' },
          { value: '154M', target: 154, suffix: 'M', label: 'Кена/год · 330 & 500ml Standard' },
          { value: '3', target: 3, suffix: '', label: 'Високотехнологични линии' },
        ],
        footer:
          'Общ годишен капацитет: над 330 милиона кена във всички формати.',
      },
      line: {
        label: 'Възможности на линията',
        headline: 'Технологията зад вашата напитка.',
        items: [
          {
            title: 'Собствен извор с ниска минерализация',
            body: 'Директно от източника, идеална основа за clean-label напитки.',
          },
          {
            title: 'Станция за микрофилтрация',
            body: 'Многостепенна филтрация на водата, гарантираща чистота на всяко ниво.',
          },
          {
            title: 'Reverse Osmosis (до 10 μS)',
            body: 'Чистота на водата до 10 микросименса — фармацевтична чистота.',
          },
          {
            title: 'Две станции за смесване с авто-дозиране',
            body: 'Прецизни съотношения за постоянен вкус във всяка партида.',
          },
          {
            title: 'CO₂ intermix станция',
            body: 'Контролирано дозиране на карбонизация за перфектна газираност всеки път.',
          },
          {
            title: '3 високотехнологични линии',
            body: 'Паралелен капацитет във всички формати — скорост без компромис.',
          },
          {
            title: 'Tunnel и Flash пастьоризация',
            body: 'Безопасност на напитката без компромис с вкуса или качеството.',
          },
          {
            title: 'Shrink sleeve за кратки серии',
            body: 'Премиум етикети за лимитирани издания и нови брандове.',
          },
          {
            title: 'Напълно автоматизирана SIP система',
            body: 'Sanitization-in-Place осигурява постоянна хигиена при всяко пълнене.',
          },
        ],
      },
      closing: {
        label: 'Готови за старт?',
        headline: 'Готови да започнем вашата частна марка?',
        body:
          'Заявете персонализирана оферта на база вашата концепция, обем и предпочитания. Отговаряме в рамките на 2 работни дни.',
        cta: 'Заявете вашата оферта',
      },
    },
    contact: {
      label: 'Свържете се',
      headline: 'Заявете вашата Private Label оферта.',
      body:
        'Разкажете ни за вашата концепция, обем и срокове. Нашият екип ще ви върне персонализирана оферта в рамките на 2 работни дни.',
      infoHeading: 'Директен контакт',
      address: 'Адрес',
      addressValue: 'България — пълен адрес при запитване',
      email: 'Имейл',
      emailValue: 'hello@wecan.bg',
      phone: 'Телефон',
      phoneValue: '+359 — при запитване',
      form: {
        sectionCompany: 'Компания и контакт',
        sectionProject: 'Детайли за проекта',
        sectionMore: 'Разкажете ни повече',
        company: 'Име на компанията',
        contactPerson: 'Лице за контакт',
        email: 'Имейл',
        phone: 'Телефон',
        country: 'Държава',
        beverageType: 'Тип напитка',
        beverageOptions: [
          { value: 'energy', label: 'Енергийна' },
          { value: 'functional', label: 'Функционална' },
          { value: 'sports', label: 'Спортна' },
          { value: 'soft', label: 'Безалкохолна' },
          { value: 'other', label: 'Друга' },
        ],
        canSizes: 'Размер(и) на кенове',
        canSizeOptions: ['250ml Slim', '330ml Sleek', '330ml Standard', '500ml Standard'],
        decoration: 'Предпочитан тип декорация',
        decorationOptions: ['Литография', 'Shrink Sleeve', 'Все още не съм сигурен'],
        quantity: 'Очаквано количество',
        quantityHint: 'напр. 50,000 кена',
        timeline: 'Желан срок',
        timelineHint: 'напр. 3–6 месеца',
        description: 'Опишете проекта',
        descriptionPlaceholder:
          'Разкажете ни за вашия бранд, концепция и специфични изисквания.',
        optional: 'по желание',
        submit: 'Изпратете запитване',
        submitting: 'Изпращане…',
        successTitle: 'Благодарим ви. Ще се свържем в рамките на 2 работни дни. 🥤',
        successBody: 'Вашето запитване беше изпратено до нашия екип.',
        errorRequired: 'Моля, попълнете всички задължителни полета.',
        errorEmail: 'Моля, въведете валиден имейл адрес.',
        errorSend: 'Нещо се обърка. Опитайте отново или ни пишете директно.',
        selectPlaceholder: 'Изберете…',
      },
    },
  },
};
