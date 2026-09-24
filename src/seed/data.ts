import type { ServiceVisual } from '../collections/Services'

type Bi<T> = { fr: T; ar: T }

export type SeedService = {
  slug: string
  visual: ServiceVisual
  order: number
  featured: boolean
  title: Bi<string>
  shortName: Bi<string>
  tagline: Bi<string>
  excerpt: Bi<string>
  description: Bi<string[]>
  highlights: Bi<string[]>
  indications: Bi<string[]>
  duration: Bi<string>
  fasting: Bi<string>
  preparation: Bi<string[]>
}

export const services: SeedService[] = [
  {
    slug: 'scanner-multibarrette',
    visual: 'ct',
    order: 1,
    featured: true,
    title: { fr: 'Scanner multibarrette', ar: 'السكانير متعدد الشرائح' },
    shortName: { fr: 'Scanner', ar: 'السكانير' },
    tagline: {
      fr: 'Des coupes fines, rapides et précises du corps entier.',
      ar: 'مقاطع دقيقة وسريعة لكامل الجسم.',
    },
    excerpt: {
      fr: 'Le scanner multibarrette (tomodensitométrie) acquiert en quelques secondes des images en coupes fines, reconstruites en 2D et 3D pour un diagnostic précis.',
      ar: 'يلتقط السكانير متعدد الشرائح (التصوير المقطعي) في ثوانٍ معدودة صوراً مقطعية دقيقة يُعاد بناؤها ثنائياً وثلاثياً لتشخيص دقيق.',
    },
    description: {
      fr: [
        'Le scanner utilise un faisceau de rayons X qui tourne autour du patient. Grâce à sa technologie multibarrette, il acquiert plusieurs coupes à chaque rotation : l’examen est court et les images sont d’une grande finesse.',
        'Les images peuvent être reconstruites dans tous les plans de l’espace et en 3D, ce qui aide le médecin radiologue à analyser les os, les organes, les vaisseaux et les poumons.',
        '## Avec ou sans injection',
        'Selon l’indication, un produit de contraste iodé peut être injecté pour mieux visualiser les vaisseaux et certains organes. Le médecin radiologue vous en informe avant l’examen.',
      ],
      ar: [
        'يعتمد السكانير على حزمة من الأشعة السينية تدور حول المريض. وبفضل تقنية تعدد الشرائح، يلتقط الجهاز عدة مقاطع في كل دورة، فيكون الفحص قصيراً والصور عالية الدقة.',
        'يمكن إعادة بناء الصور في جميع المستويات وبالأبعاد الثلاثة، مما يساعد الطبيب المختص في الأشعة على دراسة العظام والأعضاء والأوعية الدموية والرئتين.',
        '## بحقن أو بدون حقن',
        'حسب دواعي الفحص، قد يتم حقن مادة تباين يودية لتوضيح الأوعية الدموية وبعض الأعضاء بشكل أفضل. يُعلمك الطبيب بذلك قبل الفحص.',
      ],
    },
    highlights: {
      fr: [
        'Acquisition en quelques secondes',
        'Reconstructions 2D / 3D',
        'Images numériques remises au patient',
      ],
      ar: [
        'التقاط الصور في ثوانٍ',
        'إعادة بناء ثنائية وثلاثية الأبعاد',
        'صور رقمية تُسلَّم للمريض',
      ],
    },
    indications: {
      fr: [
        'Thorax et poumons',
        'Abdomen et pelvis',
        'Crâne et sinus',
        'Rachis et articulations',
        'Angioscanner',
      ],
      ar: [
        'الصدر والرئتان',
        'البطن والحوض',
        'الجمجمة والجيوب الأنفية',
        'العمود الفقري والمفاصل',
        'تصوير الأوعية بالسكانير',
      ],
    },
    duration: { fr: '10 à 20 minutes', ar: 'من 10 إلى 20 دقيقة' },
    fasting: { fr: '4 h si injection', ar: '4 ساعات في حالة الحقن' },
    preparation: {
      fr: [
        'Apportez votre ordonnance et vos examens antérieurs.',
        'En cas d’injection : être à jeun et apporter un dosage récent de la créatinine.',
        'Signalez toute allergie, un diabète, une insuffisance rénale ou une grossesse.',
        'Retirez les objets métalliques de la zone examinée.',
      ],
      ar: [
        'أحضر الوصفة الطبية والفحوصات السابقة.',
        'في حالة الحقن: كن صائماً وأحضر تحليلاً حديثاً للكرياتينين.',
        'أعلم الفريق بأي حساسية أو سكري أو قصور كلوي أو حمل.',
        'انزع الأشياء المعدنية من المنطقة التي سيتم فحصها.',
      ],
    },
  },
  {
    slug: 'radiologie-generale',
    visual: 'xray',
    order: 2,
    featured: true,
    title: { fr: 'Radiologie générale numérisée', ar: 'الأشعة العامة الرقمية' },
    shortName: { fr: 'Radiographie', ar: 'الأشعة' },
    tagline: {
      fr: 'L’examen de première intention, en haute définition.',
      ar: 'فحص الخط الأول بدقة عالية.',
    },
    excerpt: {
      fr: 'Radiographies des os, du thorax et de l’abdomen avec capteurs numériques : images immédiates, haute définition et dose optimisée.',
      ar: 'صور إشعاعية للعظام والصدر والبطن بلواقط رقمية: صور فورية، دقة عالية وجرعة مُحسَّنة.',
    },
    description: {
      fr: [
        'La radiographie numérisée remplace le film traditionnel par un capteur numérique. Les images sont disponibles immédiatement, retravaillables et archivées.',
        'C’est souvent le premier examen demandé en cas de traumatisme, de douleur osseuse ou articulaire, ou pour un bilan thoracique.',
      ],
      ar: [
        'تعوّض الأشعة الرقمية الفيلم التقليدي بلاقط رقمي، فتكون الصور متوفرة فوراً وقابلة للمعالجة والأرشفة.',
        'غالباً ما تكون أول فحص يُطلب في حالة الإصابات أو آلام العظام والمفاصل أو لفحص الصدر.',
      ],
    },
    highlights: {
      fr: ['Images immédiates', 'Dose optimisée', 'Archivage numérique'],
      ar: ['صور فورية', 'جرعة مُحسَّنة', 'أرشفة رقمية'],
    },
    indications: {
      fr: ['Os et articulations', 'Thorax', 'Abdomen', 'Rachis', 'Sinus'],
      ar: ['العظام والمفاصل', 'الصدر', 'البطن', 'العمود الفقري', 'الجيوب الأنفية'],
    },
    duration: { fr: '5 à 10 minutes', ar: 'من 5 إلى 10 دقائق' },
    fasting: { fr: 'Non (sauf examens spécifiques)', ar: 'لا (إلا لبعض الفحوصات)' },
    preparation: {
      fr: [
        'Retirez bijoux et objets métalliques de la zone examinée.',
        'Signalez toute grossesse, même supposée.',
        'Apportez votre ordonnance.',
      ],
      ar: [
        'انزع المجوهرات والأشياء المعدنية من المنطقة المعنية.',
        'أعلمي الفريق بأي حمل، حتى وإن كان مُحتملاً.',
        'أحضر الوصفة الطبية.',
      ],
    },
  },
  {
    slug: 'cone-beam-dentaire',
    visual: 'dental',
    order: 3,
    featured: true,
    title: {
      fr: 'Radiologie dentaire Cone-Beam 3D',
      ar: 'أشعة الأسنان ثلاثية الأبعاد (Cone-Beam)',
    },
    shortName: { fr: 'Cone-Beam 3D', ar: 'Cone-Beam 3D' },
    tagline: {
      fr: 'Vos dents et vos mâchoires, en trois dimensions.',
      ar: 'أسنانك وفكّاك بالأبعاد الثلاثة.',
    },
    excerpt: {
      fr: 'Le Cone-Beam (CBCT) produit en quelques secondes une image 3D précise des dents, des mâchoires et des sinus : l’examen de référence pour l’implantologie et la chirurgie dentaire.',
      ar: 'يُنتج جهاز Cone-Beam (CBCT) في ثوانٍ صورة ثلاثية الأبعاد دقيقة للأسنان والفكين والجيوب الأنفية: الفحص المرجعي لزراعة الأسنان وجراحتها.',
    },
    description: {
      fr: [
        'Le Cone-Beam 3D utilise un faisceau conique de rayons X qui tourne une seule fois autour de la tête. Les images sont reconstruites en volume et peuvent être analysées coupe par coupe, dans tous les plans.',
        'Il permet de mesurer précisément l’épaisseur et la hauteur de l’os, de localiser les nerfs et les racines, et de préparer la pose d’implants ou l’extraction de dents incluses.',
        '## Radiographie panoramique',
        'La radiographie panoramique numérisée offre, elle, une vue d’ensemble des deux mâchoires en un seul cliché pour les bilans dentaires et orthodontiques.',
      ],
      ar: [
        'يستعمل جهاز Cone-Beam حزمة مخروطية من الأشعة السينية تدور دورة واحدة حول الرأس، ثم يُعاد بناء الصور بالحجم ويمكن دراستها مقطعاً بمقطع وفي جميع المستويات.',
        'يسمح بقياس سُمك العظم وارتفاعه بدقة، وتحديد موضع الأعصاب والجذور، والتحضير لزرع الأسنان أو قلع الأسنان المنطمرة.',
        '## الصورة البانورامية',
        'أما الصورة البانورامية الرقمية فتمنح نظرة شاملة للفكين في صورة واحدة لتقييم الأسنان وتقويمها.',
      ],
    },
    highlights: {
      fr: [
        'Image 3D en quelques secondes',
        'Dose réduite par rapport au scanner',
        'Images transmises à votre dentiste',
      ],
      ar: [
        'صورة ثلاثية الأبعاد في ثوانٍ',
        'جرعة أقل مقارنة بالسكانير',
        'صور تُرسل إلى طبيب أسنانك',
      ],
    },
    indications: {
      fr: [
        'Implantologie',
        'Dents incluses et dents de sagesse',
        'Bilan endodontique',
        'Orthodontie',
        'Sinus',
      ],
      ar: [
        'زراعة الأسنان',
        'الأسنان المنطمرة وأضراس العقل',
        'تقييم جذور الأسنان',
        'تقويم الأسنان',
        'الجيوب الأنفية',
      ],
    },
    duration: { fr: 'Environ 10 minutes', ar: 'حوالي 10 دقائق' },
    fasting: { fr: 'Non', ar: 'لا' },
    preparation: {
      fr: [
        'Retirez boucles d’oreilles, piercings, lunettes et prothèses amovibles.',
        'Signalez toute grossesse.',
        'Apportez la demande de votre dentiste et vos radiographies antérieures.',
      ],
      ar: [
        'انزع الأقراط والثقوب والنظارات وأطقم الأسنان المتحركة.',
        'أعلمي الفريق في حالة الحمل.',
        'أحضر طلب طبيب الأسنان وصورك الإشعاعية السابقة.',
      ],
    },
  },
  {
    slug: 'echographie-3d-4d',
    visual: 'ultrasound',
    order: 4,
    featured: true,
    title: {
      fr: 'Échographie morphologique 3D / 4D',
      ar: 'الإيكوغرافي المورفولوجي ثلاثي ورباعي الأبعاد',
    },
    shortName: { fr: 'Échographie', ar: 'الإيكوغرافي' },
    tagline: {
      fr: 'Des ultrasons, en temps réel et en volume.',
      ar: 'موجات فوق صوتية، في الوقت الحقيقي وبالحجم.',
    },
    excerpt: {
      fr: 'Examen indolore et sans irradiation, l’échographie morphologique 3D/4D permet d’explorer les organes en temps réel, et d’offrir aux futurs parents des images en volume.',
      ar: 'فحص غير مؤلم ودون إشعاع، يتيح الفحص بالصدى ثلاثي ورباعي الأبعاد دراسة الأعضاء في الوقت الحقيقي ومنح الوالدين صوراً مجسمة للجنين.',
    },
    description: {
      fr: [
        'L’échographie utilise des ultrasons, sans aucun rayonnement. Une sonde posée sur la peau avec un gel transmet des images en temps réel.',
        'La technologie 3D/4D reconstruit des images en volume (3D) et en mouvement (4D). Elle est particulièrement appréciée en échographie morphologique obstétricale.',
      ],
      ar: [
        'يعتمد الفحص بالصدى على الموجات فوق الصوتية دون أي إشعاع. يتم وضع مسبار على الجلد مع هلام فتظهر الصور في الوقت الحقيقي.',
        'تُعيد تقنية الأبعاد الثلاثة والأربعة بناء الصور بالحجم (3D) وبالحركة (4D)، وهي محبذة بشكل خاص في الفحص المورفولوجي للحمل.',
      ],
    },
    highlights: {
      fr: ['Sans irradiation', 'Images en volume et en mouvement', 'Adaptée à tous les âges'],
      ar: ['بدون إشعاع', 'صور مجسمة ومتحركة', 'مناسبة لجميع الأعمار'],
    },
    indications: {
      fr: [
        'Abdomen',
        'Pelvis',
        'Thyroïde',
        'Seins',
        'Obstétrique (morphologie fœtale)',
        'Parties molles',
      ],
      ar: [
        'البطن',
        'الحوض',
        'الغدة الدرقية',
        'الثدي',
        'متابعة الحمل (مورفولوجيا الجنين)',
        'الأنسجة الرخوة',
      ],
    },
    duration: { fr: '15 à 30 minutes', ar: 'من 15 إلى 30 دقيقة' },
    fasting: { fr: '6 h pour l’abdomen', ar: '6 ساعات لفحص البطن' },
    preparation: {
      fr: [
        'Échographie abdominale : être à jeun depuis 6 heures.',
        'Échographie pelvienne : vessie pleine (boire environ 1 litre d’eau une heure avant).',
        'Apportez vos examens antérieurs.',
      ],
      ar: [
        'فحص البطن: الصيام لمدة 6 ساعات.',
        'فحص الحوض: مثانة ممتلئة (اشرب حوالي لتر من الماء قبل ساعة).',
        'أحضر فحوصاتك السابقة.',
      ],
    },
  },
  {
    slug: 'doppler-couleur',
    visual: 'doppler',
    order: 5,
    featured: true,
    title: { fr: 'Échographie Doppler couleur', ar: 'الإيكو دوبلر الملون' },
    shortName: { fr: 'Doppler couleur', ar: 'الدوبلر الملون' },
    tagline: {
      fr: 'Visualiser la circulation du sang, en couleur.',
      ar: 'رؤية جريان الدم بالألوان.',
    },
    excerpt: {
      fr: 'L’écho-Doppler couleur étudie la circulation sanguine dans les artères et les veines : rétrécissements, obstructions, varices ou thromboses, sans douleur ni irradiation.',
      ar: 'يدرس الإيكو دوبلر الملون جريان الدم في الشرايين والأوردة: التضيقات والانسدادات والدوالي والجلطات، دون ألم أو إشعاع.',
    },
    description: {
      fr: [
        'L’effet Doppler mesure la vitesse et la direction du flux sanguin. Codé en couleur sur l’image échographique, il permet de repérer rétrécissements, obstructions, reflux veineux ou anomalies du flux.',
        'L’examen est réalisé avec une sonde posée sur la peau et un gel : il est indolore et n’utilise aucun rayonnement.',
      ],
      ar: [
        'يقيس تأثير دوبلر سرعة واتجاه تدفق الدم. وبفضل الترميز اللوني على صورة الإيكوغرافي، يمكن رصد التضيقات والانسدادات والارتجاع الوريدي أو أي خلل في التدفق.',
        'يُجرى الفحص بمسبار يوضع على الجلد مع هلام، وهو غير مؤلم ولا يستعمل أي إشعاع.',
      ],
    },
    highlights: {
      fr: ['Flux sanguin en couleur', 'Artères et veines', 'Indolore et sans irradiation'],
      ar: ['تدفق الدم بالألوان', 'الشرايين والأوردة', 'غير مؤلم ودون إشعاع'],
    },
    indications: {
      fr: [
        'Troncs supra-aortiques (carotides)',
        'Membres inférieurs (artères et veines)',
        'Varices et thromboses veineuses',
        'Artères rénales et digestives',
      ],
      ar: [
        'جذوع الشرايين فوق الأبهر (الشرايين السباتية)',
        'الأطراف السفلية (شرايين وأوردة)',
        'الدوالي وجلطات الأوردة',
        'الشرايين الكلوية والهضمية',
      ],
    },
    duration: { fr: '20 à 40 minutes', ar: 'من 20 إلى 40 دقيقة' },
    fasting: { fr: 'À jeun pour l’abdomen', ar: 'صيام لفحص البطن' },
    preparation: {
      fr: [
        'Doppler des artères digestives ou rénales : être à jeun.',
        'Portez des vêtements amples, faciles à retirer.',
        'Apportez vos examens et comptes-rendus antérieurs.',
      ],
      ar: [
        'دوبلر شرايين الجهاز الهضمي أو الكلى: الصيام قبل الفحص.',
        'ارتدِ ملابس فضفاضة يسهل نزعها.',
        'أحضر فحوصاتك وتقاريرك السابقة.',
      ],
    },
  },
  {
    slug: 'doppler-cardiaque',
    visual: 'cardiac',
    order: 6,
    featured: true,
    title: { fr: 'Échographie Doppler cardiaque', ar: 'الإيكو دوبلر القلبي' },
    shortName: { fr: 'Doppler cardiaque', ar: 'دوبلر القلب' },
    tagline: {
      fr: 'Le cœur en mouvement, en temps réel.',
      ar: 'القلب في حركته، في الوقت الحقيقي.',
    },
    excerpt: {
      fr: 'L’échographie Doppler cardiaque (échocardiographie) observe le cœur battant : taille des cavités, contraction, valves et flux sanguin, sans douleur ni irradiation.',
      ar: 'يراقب الإيكو دوبلر القلبي (تخطيط صدى القلب) القلب وهو ينبض: حجم التجاويف، الانقباض، الصمامات وتدفق الدم، دون ألم أو إشعاع.',
    },
    description: {
      fr: [
        'L’échocardiographie Doppler permet d’étudier en temps réel la morphologie et le fonctionnement du cœur : dimensions des cavités, épaisseur des parois, force de contraction et mouvement des valves.',
        'Le Doppler mesure la vitesse du sang à travers les valves et dans les cavités, ce qui aide à détecter un rétrécissement ou une fuite valvulaire.',
      ],
      ar: [
        'يسمح تخطيط صدى القلب بالدوبلر بدراسة شكل القلب وعمله في الوقت الحقيقي: أبعاد التجاويف، سُمك الجدران، قوة الانقباض وحركة الصمامات.',
        'يقيس الدوبلر سرعة الدم عبر الصمامات وداخل التجاويف، مما يساعد على الكشف عن تضيق أو ارتجاع في الصمامات.',
      ],
    },
    highlights: {
      fr: [
        'Le cœur observé en mouvement',
        'Étude des valves et des flux',
        'Indolore et sans irradiation',
      ],
      ar: ['مراقبة القلب وهو يتحرك', 'دراسة الصمامات والتدفقات', 'غير مؤلم ودون إشعاع'],
    },
    indications: {
      fr: [
        'Souffle cardiaque',
        'Hypertension artérielle',
        'Essoufflement, douleurs thoraciques',
        'Suivi d’une valvulopathie',
      ],
      ar: ['نفخة قلبية', 'ارتفاع ضغط الدم', 'ضيق التنفس وآلام الصدر', 'متابعة أمراض الصمامات'],
    },
    duration: { fr: '20 à 30 minutes', ar: 'من 20 إلى 30 دقيقة' },
    fasting: { fr: 'Non', ar: 'لا' },
    preparation: {
      fr: [
        'Aucune préparation particulière.',
        'Portez un haut facile à retirer.',
        'Apportez vos ECG, comptes-rendus et la liste de vos traitements.',
      ],
      ar: [
        'لا يتطلب أي تحضير خاص.',
        'ارتدِ قميصاً يسهل نزعه.',
        'أحضر تخطيطات القلب والتقارير وقائمة أدويتك.',
      ],
    },
  },
  {
    slug: 'mammographie',
    visual: 'mammo',
    order: 7,
    featured: true,
    title: { fr: 'Mammographie numérisée', ar: 'تصوير الثدي الرقمي' },
    shortName: { fr: 'Mammographie', ar: 'الماموغرافي' },
    tagline: {
      fr: 'Le dépistage, avec douceur et précision.',
      ar: 'الكشف المبكر بلطف ودقة.',
    },
    excerpt: {
      fr: 'La mammographie numérisée est l’examen de référence pour le dépistage et le diagnostic des anomalies du sein. Elle est souvent complétée par une échographie.',
      ar: 'تصوير الثدي الرقمي هو الفحص المرجعي للكشف المبكر وتشخيص أمراض الثدي، وغالباً ما يُستكمل بفحص بالصدى.',
    },
    description: {
      fr: [
        'La mammographie est une radiographie des seins réalisée avec une faible dose de rayons X. La numérisation permet d’optimiser les images et de les comparer facilement d’une année à l’autre.',
        'Une légère compression du sein, de quelques secondes, est nécessaire pour obtenir des images nettes. L’équipe veille à votre confort tout au long de l’examen.',
      ],
      ar: [
        'الماموغرافي هو تصوير إشعاعي للثدي بجرعة منخفضة من الأشعة السينية. تتيح الرقمنة تحسين جودة الصور ومقارنتها بسهولة من سنة إلى أخرى.',
        'يتطلب الفحص ضغطاً خفيفاً على الثدي لبضع ثوانٍ للحصول على صور واضحة، ويحرص الفريق على راحتك طوال الفحص.',
      ],
    },
    highlights: {
      fr: [
        'Faible dose',
        'Comparaison facilitée d’année en année',
        'Complément échographique sur place',
      ],
      ar: ['جرعة منخفضة', 'مقارنة سهلة بين السنوات', 'فحص بالصدى مكمّل في نفس المكان'],
    },
    indications: {
      fr: ['Dépistage', 'Bilan d’une anomalie palpée', 'Suivi'],
      ar: ['الكشف المبكر', 'تقييم كتلة محسوسة', 'المتابعة'],
    },
    duration: { fr: 'Environ 20 minutes', ar: 'حوالي 20 دقيقة' },
    fasting: { fr: 'Non', ar: 'لا' },
    preparation: {
      fr: [
        'Le jour de l’examen, n’appliquez ni déodorant, ni talc, ni crème sur les seins et les aisselles.',
        'Idéalement, programmez l’examen durant la première moitié du cycle.',
        'Apportez impérativement vos mammographies et échographies antérieures.',
      ],
      ar: [
        'يوم الفحص، لا تضعي مزيل العرق أو البودرة أو الكريم على الثديين والإبطين.',
        'يُفضَّل إجراء الفحص خلال النصف الأول من الدورة الشهرية.',
        'أحضري وجوباً صور الماموغرافي والإيكوغرافي السابقة.',
      ],
    },
  },
  {
    slug: 'densitometrie-osseuse',
    visual: 'dexa',
    order: 8,
    featured: true,
    title: { fr: 'Densitométrie osseuse', ar: 'قياس كثافة العظام' },
    shortName: { fr: 'Densitométrie', ar: 'كثافة العظام' },
    tagline: {
      fr: 'Mesurer la solidité de vos os.',
      ar: 'قياس صلابة عظامك.',
    },
    excerpt: {
      fr: 'La densitométrie osseuse mesure la densité minérale osseuse pour dépister et suivre l’ostéoporose. Un examen rapide, indolore et très faiblement irradiant.',
      ar: 'يقيس هذا الفحص الكثافة المعدنية للعظام للكشف عن هشاشة العظام ومتابعتها. فحص سريع وغير مؤلم وبإشعاع ضعيف جداً.',
    },
    description: {
      fr: [
        'L’examen mesure la densité des os, le plus souvent au niveau de la colonne lombaire et de la hanche. Les résultats sont comparés à des valeurs de référence (T-score, Z-score).',
        'Il est notamment recommandé après la ménopause, en cas de traitement prolongé par corticoïdes ou d’antécédent de fracture.',
      ],
      ar: [
        'يقيس الفحص كثافة العظام، غالباً على مستوى الفقرات القطنية والورك، وتُقارن النتائج بقيم مرجعية (T-score وZ-score).',
        'يُنصح به خاصة بعد سن اليأس، أو عند العلاج المطوَّل بالكورتيزون، أو في حالة سوابق الكسور.',
      ],
    },
    highlights: {
      fr: ['Rapide et indolore', 'Dose très faible', 'Suivi comparatif dans le temps'],
      ar: ['سريع وغير مؤلم', 'جرعة ضعيفة جداً', 'متابعة مقارنة عبر الزمن'],
    },
    indications: {
      fr: [
        'Dépistage de l’ostéoporose',
        'Suivi d’un traitement',
        'Ménopause',
        'Corticothérapie prolongée',
      ],
      ar: ['الكشف عن هشاشة العظام', 'متابعة العلاج', 'سن اليأس', 'العلاج المطوّل بالكورتيزون'],
    },
    duration: { fr: '10 à 15 minutes', ar: 'من 10 إلى 15 دقيقة' },
    fasting: { fr: 'Non', ar: 'لا' },
    preparation: {
      fr: [
        'Ne prenez pas de supplément de calcium dans les 24 heures précédant l’examen.',
        'Signalez un examen récent avec produit de contraste (baryte, iode) ou une grossesse.',
        'Portez des vêtements sans partie métallique.',
      ],
      ar: [
        'لا تتناول مكملات الكالسيوم خلال 24 ساعة قبل الفحص.',
        'أعلم الفريق بأي فحص حديث بمادة تباين (باريوم أو يود) أو في حالة الحمل.',
        'ارتدِ ملابس خالية من القطع المعدنية.',
      ],
    },
  },
  {
    slug: 'irm',
    visual: 'mri',
    order: 9,
    featured: true,
    title: { fr: 'IRM', ar: 'التصوير بالرنين المغناطيسي' },
    shortName: { fr: 'IRM', ar: 'الرنين المغناطيسي' },
    tagline: {
      fr: 'Une imagerie sans rayons X, d’une grande finesse pour les tissus mous.',
      ar: 'تصوير دون أشعة سينية، بدقة عالية للأنسجة الرخوة.',
    },
    excerpt: {
      fr: 'L’Imagerie par Résonance Magnétique utilise un champ magnétique et des ondes radio pour explorer le cerveau, la colonne, les articulations et les organes, sans irradiation.',
      ar: 'يستعمل التصوير بالرنين المغناطيسي حقلاً مغناطيسياً وموجات راديوية لفحص الدماغ والعمود الفقري والمفاصل والأعضاء، دون أي إشعاع.',
    },
    description: {
      fr: [
        'L’IRM ne produit aucun rayonnement ionisant. Elle offre un contraste exceptionnel entre les différents tissus, ce qui en fait l’examen de référence pour le système nerveux, les articulations et de nombreux organes.',
        'Pendant l’examen, vous êtes allongé(e) dans l’appareil et l’équipe reste en contact permanent avec vous. L’appareil émet des bruits réguliers : c’est normal, un casque ou des protections auditives vous sont proposés.',
        '## Sécurité',
        'Le champ magnétique étant permanent, certains dispositifs (pacemaker, implants, clips, éclats métalliques) doivent impérativement être signalés avant l’examen.',
      ],
      ar: [
        'لا يُصدر الرنين المغناطيسي أي إشعاع مؤيِّن، ويوفر تبايناً استثنائياً بين الأنسجة، مما يجعله الفحص المرجعي للجهاز العصبي والمفاصل والعديد من الأعضاء.',
        'أثناء الفحص تكون مستلقياً داخل الجهاز ويبقى الفريق على تواصل دائم معك. يُصدر الجهاز أصواتاً منتظمة وهذا أمر طبيعي، وتُقدَّم لك سماعات أو واقيات للأذن.',
        '## السلامة',
        'بما أن الحقل المغناطيسي دائم، يجب التصريح مسبقاً بأي جهاز مزروع (منظم ضربات القلب، غرسات، مشابك، شظايا معدنية).',
      ],
    },
    highlights: {
      fr: [
        'Aucune irradiation',
        'Contraste optimal des tissus mous',
        'Équipe à votre écoute pendant l’examen',
      ],
      ar: ['بدون أي إشعاع', 'تباين مثالي للأنسجة الرخوة', 'فريق يرافقك طيلة الفحص'],
    },
    indications: {
      fr: ['Cerveau et hypophyse', 'Rachis', 'Genou, épaule, hanche', 'Abdomen et pelvis', 'Sein'],
      ar: [
        'الدماغ والغدة النخامية',
        'العمود الفقري',
        'الركبة والكتف والورك',
        'البطن والحوض',
        'الثدي',
      ],
    },
    duration: { fr: '20 à 45 minutes', ar: 'من 20 إلى 45 دقيقة' },
    fasting: { fr: 'Selon l’examen', ar: 'حسب نوع الفحص' },
    preparation: {
      fr: [
        'Signalez impérativement tout pacemaker, implant, valve, clip ou éclat métallique.',
        'Retirez bijoux, montre, cartes bancaires, épingles et maquillage.',
        'Signalez une claustrophobie ou une grossesse.',
        'Apportez votre ordonnance et vos examens antérieurs.',
      ],
      ar: [
        'صرّح وجوباً بأي منظم لضربات القلب أو غرسة أو صمام أو مشبك أو شظية معدنية.',
        'انزع المجوهرات والساعة والبطاقات البنكية والدبابيس ومستحضرات التجميل.',
        'أعلم الفريق في حالة رهاب الأماكن المغلقة أو الحمل.',
        'أحضر الوصفة الطبية والفحوصات السابقة.',
      ],
    },
  },
]

/** Services from earlier versions of the seed, removed on re-seed. */
export const obsoleteServiceSlugs = [
  'doppler',
  'radiologie-interventionnelle',
  'radiologie-dentaire',
  'osteodensitometrie',
]

export const faqs: {
  category: 'general' | 'preparation' | 'appointments'
  q: Bi<string>
  a: Bi<string>
}[] = [
  {
    category: 'appointments',
    q: { fr: 'Comment prendre rendez-vous\u00a0?', ar: 'كيف أحجز موعداً؟' },
    a: {
      fr: 'Par téléphone au 72 519 040 ou au 56 606 633, ou via le formulaire en ligne : notre secrétariat vous rappelle pour confirmer la date et vous donner les consignes de préparation.',
      ar: 'عبر الهاتف على الرقم 72 519 040 أو 56 606 633، أو عبر الاستمارة على الموقع: تتصل بك الكتابة لتأكيد الموعد وإعطائك تعليمات التحضير.',
    },
  },
  {
    category: 'general',
    q: { fr: 'Que dois-je apporter le jour de l’examen\u00a0?', ar: 'ماذا يجب أن أحضر يوم الفحص؟' },
    a: {
      fr: 'Votre ordonnance, votre pièce d’identité, votre carte de soins le cas échéant, ainsi que vos examens et comptes-rendus antérieurs en rapport avec la zone examinée.',
      ar: 'الوصفة الطبية، بطاقة التعريف، بطاقة العلاج إن وُجدت، إضافة إلى الفحوصات والتقارير السابقة المتعلقة بالمنطقة المعنية.',
    },
  },
  {
    category: 'preparation',
    q: { fr: 'Dois-je être à jeun\u00a0?', ar: 'هل يجب أن أكون صائماً؟' },
    a: {
      fr: 'Cela dépend de l’examen : un scanner avec injection ou une échographie abdominale nécessitent d’être à jeun. Les consignes précises vous sont communiquées lors de la prise de rendez-vous et figurent sur chaque page d’examen.',
      ar: 'يختلف ذلك حسب الفحص: يتطلب السكانير بالحقن أو فحص البطن بالصدى الصيام. تُقدَّم لك التعليمات الدقيقة عند حجز الموعد، وهي مذكورة أيضاً في صفحة كل فحص.',
    },
  },
  {
    category: 'preparation',
    q: {
      fr: 'Je suis enceinte (ou je pourrais l’être) : que faire\u00a0?',
      ar: 'أنا حامل (أو قد أكون كذلك): ماذا أفعل؟',
    },
    a: {
      fr: 'Signalez-le systématiquement avant tout examen. Certains examens irradiants peuvent être reportés ou remplacés par une échographie ou une IRM.',
      ar: 'صرّحي بذلك دائماً قبل أي فحص. يمكن تأجيل بعض الفحوصات الإشعاعية أو تعويضها بالإيكوغرافي أو الرنين المغناطيسي.',
    },
  },
  {
    category: 'general',
    q: { fr: 'Quand vais-je recevoir mes résultats\u00a0?', ar: 'متى أتسلم نتائجي؟' },
    a: {
      fr: 'Les images et le compte-rendu du médecin radiologue vous sont remis dans les meilleurs délais. Le secrétariat vous indique le délai lors de votre passage.',
      ar: 'تُسلَّم لك الصور وتقرير الطبيب في أقرب الآجال، وتُعلمك الكتابة بالمدة عند قدومك.',
    },
  },
  {
    category: 'general',
    q: {
      fr: 'Les examens sont-ils pris en charge\u00a0?',
      ar: 'هل تُغطّى الفحوصات من قبل التأمين؟',
    },
    a: {
      fr: 'Renseignez-vous auprès de notre secrétariat concernant la prise en charge par la CNAM ou votre assurance selon l’examen prescrit.',
      ar: 'استفسر لدى الكتابة عن التكفل من قبل الكنام (CNAM) أو شركة التأمين حسب الفحص الموصوف.',
    },
  },
]

export const posts: {
  slug: string
  date: string
  title: Bi<string>
  excerpt: Bi<string>
  body: Bi<string[]>
}[] = [
  {
    slug: 'bien-preparer-son-irm',
    date: '2026-09-01T09:00:00.000Z',
    title: {
      fr: 'Bien préparer son IRM : le guide pratique',
      ar: 'كيف تستعد للرنين المغناطيسي: دليل عملي',
    },
    excerpt: {
      fr: 'Objets métalliques, implants, claustrophobie… Tout ce qu’il faut savoir pour que votre IRM se déroule sereinement.',
      ar: 'الأشياء المعدنية، الغرسات، رهاب الأماكن المغلقة… كل ما يجب معرفته ليمر فحص الرنين المغناطيسي بهدوء.',
    },
    body: {
      fr: [
        'L’IRM est un examen sans rayons X, mais son puissant champ magnétique impose quelques précautions simples.',
        '## Avant l’examen',
        '- Signalez tout pacemaker, valve cardiaque, implant, clip chirurgical ou éclat métallique.',
        '- Laissez bijoux, montre et cartes bancaires dans le casier prévu à cet effet.',
        '- Évitez le maquillage, certains pigments pouvant contenir du métal.',
        '## Pendant l’examen',
        'Vous êtes allongé(e) et devez rester immobile. L’appareil est bruyant : des protections auditives vous sont proposées. Vous disposez d’une poire d’appel et l’équipe vous voit et vous entend en permanence.',
        '## Vous êtes claustrophobe\u00a0?',
        'Parlez-en lors de la prise de rendez-vous : l’équipe prendra le temps de vous accompagner.',
      ],
      ar: [
        'الرنين المغناطيسي فحص دون أشعة سينية، لكن حقله المغناطيسي القوي يفرض بعض الاحتياطات البسيطة.',
        '## قبل الفحص',
        '- صرّح بأي منظم لضربات القلب أو صمام قلبي أو غرسة أو مشبك جراحي أو شظية معدنية.',
        '- اترك المجوهرات والساعة والبطاقات البنكية في الخزانة المخصصة لذلك.',
        '- تجنّب مستحضرات التجميل، فقد تحتوي بعض الأصباغ على معادن.',
        '## أثناء الفحص',
        'تكون مستلقياً ويجب أن تبقى دون حراك. الجهاز يُصدر أصواتاً، لذا تُقدَّم لك واقيات للأذن. يوجد زر نداء بين يديك، والفريق يراك ويسمعك طوال الوقت.',
        '## هل تعاني من رهاب الأماكن المغلقة؟',
        'أخبرنا بذلك عند حجز الموعد، وسيأخذ الفريق الوقت اللازم لمرافقتك.',
      ],
    },
  },
  {
    slug: 'osteodensitometrie-qui-est-concerne',
    date: '2026-08-15T09:00:00.000Z',
    title: {
      fr: 'Densitométrie osseuse : qui est concerné\u00a0?',
      ar: 'قياس كثافة العظام: من المعني؟',
    },
    excerpt: {
      fr: 'L’ostéoporose est silencieuse jusqu’à la fracture. Un examen de 10 minutes permet de la dépister.',
      ar: 'هشاشة العظام صامتة حتى حدوث الكسر. فحص لا يتجاوز 10 دقائق يسمح بالكشف عنها.',
    },
    body: {
      fr: [
        'L’ostéoporose fragilise les os sans provoquer de symptômes. La densitométrie osseuse mesure la densité osseuse et permet d’agir avant la fracture.',
        '## Situations fréquentes où l’examen est prescrit',
        '- Femmes ménopausées, en particulier avec des facteurs de risque.',
        '- Traitement prolongé par corticoïdes.',
        '- Antécédent de fracture après un traumatisme minime.',
        '- Suivi d’un traitement contre l’ostéoporose.',
        'Seul votre médecin peut juger de l’indication : parlez-lui-en.',
      ],
      ar: [
        'تُضعف هشاشة العظام العظامَ دون أعراض. يقيس فحص كثافة العظام هذه الكثافة ويسمح بالتدخل قبل حدوث الكسر.',
        '## حالات شائعة يُوصف فيها الفحص',
        '- النساء بعد سن اليأس، خاصة مع وجود عوامل خطر.',
        '- العلاج المطوّل بالكورتيزون.',
        '- سوابق كسر إثر صدمة بسيطة.',
        '- متابعة علاج هشاشة العظام.',
        'طبيبك وحده يقرر ضرورة الفحص، فتحدّث معه.',
      ],
    },
  },
]

export const home = {
  fr: {
    hero: {
      eyebrow: 'Menzel Bourguiba · Bizerte',
      title: 'L’imagerie médicale de pointe,',
      highlight: 'au plus près de vous.',
      subtitle:
        'Scanner multibarrette, IRM, Cone-Beam dentaire 3D, échographie 3D/4D, Doppler couleur et cardiaque, mammographie, densitométrie osseuse et radiologie numérisée : tous vos examens réunis en un seul centre, sous la direction du Dr Riadh Ayari.',
      primaryLabel: 'Prendre rendez-vous',
      secondaryLabel: 'Découvrir nos examens',
    },
    stats: [
      { value: 9, suffix: '', label: 'techniques d’imagerie' },
      { value: 100, suffix: '%', label: 'imagerie numérique' },
      { value: 4, suffix: 'D', label: 'échographie en volume' },
      { value: 1, suffix: '', label: 'seul lieu pour tous vos examens' },
    ],
    services: {
      eyebrow: 'Nos examens',
      title: 'Un plateau technique complet',
      text: 'Du dépistage au diagnostic, chaque modalité est pensée pour la précision et le confort du patient.',
    },
    xray: {
      title: 'Voir au-delà de la surface.',
      text: 'L’imagerie révèle ce que l’œil ne peut voir. Notre rôle : produire l’image la plus juste, pour que votre médecin prenne la meilleure décision.',
      hint: 'Déplacez le curseur pour « scanner »',
    },
    why: {
      title: 'Pourquoi choisir le CIMS\u00a0?',
      items: [
        {
          icon: 'sparkle',
          title: 'Équipements numériques',
          text: 'Des appareils modernes pour des images nettes à dose optimisée.',
        },
        {
          icon: 'doc',
          title: 'Compte-rendu médical',
          text: 'Chaque examen est interprété par le médecin radiologue.',
        },
        {
          icon: 'heart',
          title: 'Accueil humain',
          text: 'Une équipe attentive, qui prend le temps d’expliquer.',
        },
        {
          icon: 'pin',
          title: 'Au cœur de la ville',
          text: 'Avenue Mongi Slim, facilement accessible depuis toute la région de Bizerte.',
        },
      ],
    },
    journey: {
      title: 'Votre examen, en 4 étapes',
      steps: [
        {
          title: 'Rendez-vous',
          text: 'Appelez-nous ou envoyez une demande en ligne. Nous vous rappelons pour confirmer.',
        },
        {
          title: 'Préparation',
          text: 'Vous recevez les consignes adaptées à votre examen (jeûne, documents…).',
        },
        {
          title: 'Examen',
          text: 'Accueil, installation, acquisition des images : l’équipe vous accompagne.',
        },
        {
          title: 'Résultats',
          text: 'Images et compte-rendu du radiologue remis dans les meilleurs délais.',
        },
      ],
    },
    cta: {
      title: 'Un examen à programmer\u00a0?',
      text: 'Notre secrétariat vous répond et vous guide pour la préparation.',
    },
  },
  ar: {
    hero: {
      eyebrow: 'منزل بورقيبة · بنزرت',
      title: 'أحدث تقنيات التصوير الطبي،',
      highlight: 'على مقربة منك.',
      subtitle:
        'السكانير متعدد الشرائح، الرنين المغناطيسي، أشعة الأسنان Cone-Beam ثلاثية الأبعاد، الإيكوغرافي ثلاثي ورباعي الأبعاد، الدوبلر الملون والقلبي، الماموغرافي، قياس كثافة العظام والأشعة الرقمية: جميع فحوصاتك في مركز واحد، تحت إشراف الدكتور رياض العياري.',
      primaryLabel: 'احجز موعداً',
      secondaryLabel: 'اكتشف فحوصاتنا',
    },
    stats: [
      { value: 9, suffix: '', label: 'تقنيات تصوير' },
      { value: 100, suffix: '%', label: 'تصوير رقمي' },
      { value: 4, suffix: 'D', label: 'إيكوغرافي بالحجم' },
      { value: 1, suffix: '', label: 'مكان واحد لكل فحوصاتك' },
    ],
    services: {
      eyebrow: 'فحوصاتنا',
      title: 'تجهيزات تقنية متكاملة',
      text: 'من الكشف المبكر إلى التشخيص، كل تقنية مصممة من أجل الدقة وراحة المريض.',
    },
    xray: {
      title: 'نرى أبعد من السطح.',
      text: 'يكشف التصوير الطبي ما لا تراه العين. دورنا: إنتاج الصورة الأدق، ليتخذ طبيبك القرار الأفضل.',
      hint: 'حرّك المؤشر «للمسح»',
    },
    why: {
      title: 'لماذا تختار CIMS؟',
      items: [
        { icon: 'sparkle', title: 'تجهيزات رقمية', text: 'أجهزة حديثة لصور واضحة بجرعة مُحسَّنة.' },
        { icon: 'doc', title: 'تقرير طبي', text: 'كل فحص يُفسَّر من قبل الطبيب المختص في الأشعة.' },
        { icon: 'heart', title: 'استقبال إنساني', text: 'فريق منتبه يأخذ الوقت الكافي للشرح.' },
        {
          icon: 'pin',
          title: 'في قلب المدينة',
          text: 'شارع المنجي سليم، يسهل الوصول إليه من كامل جهة بنزرت.',
        },
      ],
    },
    journey: {
      title: 'فحصك في 4 مراحل',
      steps: [
        { title: 'الموعد', text: 'اتصل بنا أو أرسل طلباً عبر الموقع، وسنتصل بك للتأكيد.' },
        { title: 'التحضير', text: 'تتلقى التعليمات الخاصة بفحصك (الصيام، الوثائق…).' },
        { title: 'الفحص', text: 'الاستقبال، التهيئة، التقاط الصور: الفريق يرافقك.' },
        { title: 'النتائج', text: 'تُسلَّم الصور وتقرير الطبيب في أقرب الآجال.' },
      ],
    },
    cta: {
      title: 'هل لديك فحص لبرمجته؟',
      text: 'تجيبك الكتابة وترشدك في التحضير.',
    },
  },
}

export const settings = {
  phoneOffice: '+216 72 519 040',
  phoneMobile: '+216 56 606 633',
  whatsapp: '21656606633',
  email: 'cimsradiologie@yahoo.fr',
  mapQuery: 'CIMS Radiologie, 15 Avenue Mongi Slim, 7050 Menzel Bourguiba, Tunisie',
  facebook: 'https://www.facebook.com/CIMSradiologie/',
  fr: {
    siteName: 'CIMS Radiologie',
    tagline: 'Centre d’Imagerie Médicale Mongi Slim — Radiologie diagnostique & interventionnelle',
    seoDescription:
      'CIMS Radiologie, centre d’imagerie médicale à Menzel Bourguiba (Bizerte) : scanner multibarrette, IRM, Cone-Beam dentaire 3D, échographie 3D/4D, Doppler couleur et cardiaque, mammographie numérisée, densitométrie osseuse, radiologie générale numérisée. Dr Riadh Ayari.',
    address: '15 Avenue Mongi Slim\n7050 Menzel Bourguiba, Bizerte\nTunisie',
    hours: [
      { days: 'Lundi – Vendredi', time: '08:00 – 18:00' },
      { days: 'Samedi', time: '08:00 – 13:00' },
    ],
    hoursNote: 'Horaires indicatifs — appelez-nous pour confirmer.',
  },
  ar: {
    siteName: 'CIMS للأشعة',
    tagline: 'مركز التصوير الطبي منجي سليم — الأشعة التشخيصية والتداخلية',
    seoDescription:
      'مركز CIMS للتصوير الطبي بمنزل بورقيبة (بنزرت): السكانير متعدد الشرائح، الرنين المغناطيسي، أشعة الأسنان Cone-Beam، الإيكوغرافي ثلاثي ورباعي الأبعاد، الدوبلر الملون والقلبي، الماموغرافي، قياس كثافة العظام، الأشعة العامة الرقمية. الدكتور رياض العياري.',
    address: '15 شارع المنجي سليم\n7050 منزل بورقيبة، بنزرت\nتونس',
    hours: [
      { days: 'الاثنين – الجمعة', time: '08:00 – 18:00' },
      { days: 'السبت', time: '08:00 – 13:00' },
    ],
    hoursNote: 'أوقات تقريبية — اتصل بنا للتأكيد.',
  },
}

export const navigation = {
  header: [
    { href: '/', fr: 'Accueil', ar: 'الرئيسية' },
    { href: '/services', fr: 'Examens', ar: 'الفحوصات' },
    { href: '/centre', fr: 'Le centre', ar: 'المركز' },
    { href: '/patients', fr: 'Espace patients', ar: 'فضاء المرضى' },
    { href: '/actualites', fr: 'Actualités', ar: 'الأخبار' },
    { href: '/contact', fr: 'Contact', ar: 'اتصل بنا' },
  ],
  footer: [
    { href: '/patients', fr: 'Préparer son examen', ar: 'التحضير للفحص' },
    { href: '/contact', fr: 'Demande de rendez-vous', ar: 'طلب موعد' },
    { href: '/mentions-legales', fr: 'Mentions légales', ar: 'البيانات القانونية' },
  ],
}

export const team = [
  {
    isLead: true,
    order: 1,
    fr: {
      name: 'Dr Riadh Ayari',
      role: 'Médecin radiologue — Directeur du centre',
      bio: 'Le Dr Riadh Ayari dirige le Centre d’Imagerie Médicale Mongi Slim. Avec son équipe, il met à la disposition des patients et des médecins de la région de Bizerte un plateau d’imagerie complet : scanner multibarrette, IRM, Cone-Beam dentaire 3D, échographie 3D/4D, Doppler couleur et cardiaque, mammographie, densitométrie osseuse et radiologie numérisée.',
    },
    ar: {
      name: 'الدكتور رياض العياري',
      role: 'طبيب مختص في الأشعة — مدير المركز',
      bio: 'يُدير الدكتور رياض العياري مركز التصوير الطبي منجي سليم. ويضع مع فريقه على ذمة المرضى والأطباء بجهة بنزرت منصة تصوير متكاملة: السكانير متعدد الشرائح، الرنين المغناطيسي، أشعة الأسنان Cone-Beam، الإيكوغرافي، الدوبلر الملون والقلبي، الماموغرافي، قياس كثافة العظام والأشعة الرقمية.',
    },
  },
]

export const legalPage = {
  slug: 'mentions-legales',
  fr: {
    title: 'Mentions légales',
    intro: 'Informations légales relatives au site du CIMS Radiologie.',
    body: [
      '## Éditeur',
      'CIMS Radiologie — Centre d’Imagerie Médicale Mongi Slim, 15 Avenue Mongi Slim, 7050 Menzel Bourguiba, Tunisie. Tél. : +216 72 519 040 — E-mail : cimsradiologie@yahoo.fr.',
      '## Contenu médical',
      'Les informations publiées sur ce site sont données à titre informatif et ne remplacent pas l’avis de votre médecin. Suivez toujours les consignes remises par le centre lors de la prise de rendez-vous.',
      '## Données personnelles',
      'Les informations transmises via le formulaire de contact sont utilisées uniquement pour traiter votre demande de rendez-vous et ne sont jamais cédées à des tiers.',
    ],
  },
  ar: {
    title: 'البيانات القانونية',
    intro: 'معلومات قانونية تخص موقع مركز CIMS للأشعة.',
    body: [
      '## الناشر',
      'مركز CIMS للأشعة — مركز التصوير الطبي منجي سليم، 15 شارع المنجي سليم، 7050 منزل بورقيبة، تونس. الهاتف: 040 519 72 216+ — البريد: cimsradiologie@yahoo.fr.',
      '## المحتوى الطبي',
      'المعلومات المنشورة في هذا الموقع هي للإعلام فقط ولا تعوّض رأي طبيبك. اتبع دائماً التعليمات المقدَّمة من المركز عند حجز الموعد.',
      '## المعطيات الشخصية',
      'تُستعمل المعلومات المُرسلة عبر استمارة الاتصال فقط لمعالجة طلب موعدك، ولا تُحال أبداً إلى أي طرف آخر.',
    ],
  },
}

export const centrePage = {
  slug: 'centre',
  fr: {
    title: 'Le Centre d’Imagerie Médicale Mongi Slim',
    intro:
      'Radiologie diagnostique et interventionnelle au cœur de Menzel Bourguiba, sous la direction du Dr Riadh Ayari.',
    body: [
      'Situé au 15 avenue Mongi Slim, le CIMS réunit en un même lieu l’ensemble des techniques d’imagerie médicale : scanner multibarrette, radiologie générale numérisée, radiologie dentaire Cone-Beam 3D, échographie morphologique 3D/4D, échographie Doppler couleur et Doppler cardiaque, mammographie numérisée, densitométrie osseuse et IRM.',
      'Notre ambition est simple : offrir aux patients de Menzel Bourguiba et de toute la région de Bizerte un accès de proximité à une imagerie de qualité, et aux médecins prescripteurs des examens fiables accompagnés d’un compte-rendu précis.',
    ],
  },
  ar: {
    title: 'مركز التصوير الطبي منجي سليم',
    intro: 'الأشعة التشخيصية والتداخلية في قلب منزل بورقيبة، تحت إشراف الدكتور رياض العياري.',
    body: [
      'يقع مركز CIMS في 15 شارع المنجي سليم، ويجمع في مكان واحد كل تقنيات التصوير الطبي: السكانير متعدد الشرائح، الأشعة العامة الرقمية، أشعة الأسنان Cone-Beam ثلاثية الأبعاد، الإيكوغرافي المورفولوجي ثلاثي ورباعي الأبعاد، الإيكو دوبلر الملون ودوبلر القلب، تصوير الثدي الرقمي، قياس كثافة العظام والرنين المغناطيسي.',
      'طموحنا بسيط: أن نوفر لمرضى منزل بورقيبة وكامل جهة بنزرت تصويراً طبياً عالي الجودة قريباً منهم، وأن نقدم للأطباء فحوصات موثوقة مرفقة بتقارير دقيقة.',
    ],
  },
}
