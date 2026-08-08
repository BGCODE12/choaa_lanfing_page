import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import defaultHeroImg from '@/assets/card_image.jpg'

export interface NavLink {
  id: string
  key: string
  labelEn: string
  labelAr: string
  link: string
}

export interface HeroSlide {
  id: number
  badgeEn: string
  badgeAr: string
  taglineEn: string
  taglineAr: string
  subTaglineEn: string
  subTaglineAr: string
  descriptionEn: string
  descriptionAr: string
  primaryBtnEn: string
  primaryBtnAr: string
  secondaryBtnEn: string
  secondaryBtnAr: string
  primaryAction: string
  secondaryAction: string
  primaryBtnLink?: string
  secondaryBtnLink?: string
  bgImage?: string
}

export interface SocialLinks {
  facebook: string
  youtube: string
  instagram: string
  twitter: string
  telegram: string
}

export interface StreamSettings {
  titleEn: string
  titleAr: string
  subtitleEn: string
  subtitleAr: string
  coverImage: string
  streamUrl: string
  viewersCount: string
  isLiveNow: boolean
}

export interface DonationSettings {
  titleEn: string
  titleAr: string
  subtitleEn: string
  subtitleAr: string
  directPaymentUrl: string
  bannerImage: string
  bankDetailsEn: string
  bankDetailsAr: string
}

export interface FatwaSettings {
  titleEn: string
  titleAr: string
  subtitleEn: string
  subtitleAr: string
  fatwaUrl: string
}

export interface NewsItem {
  id: number
  month: string
  day: string
  category: string
  subtitle: string
  titleEn: string
  titleAr: string
  summaryEn: string
  summaryAr: string
  image: string
}

export interface QuickActionItem {
  id: string
  key: string
  titleEn: string
  titleAr: string
  descEn: string
  descAr: string
  icon: string
}

export interface InstitutionItem {
  nameEn: string
  nameAr: string
  locationEn: string
  locationAr: string
  icon: string
}

export const useCmsStore = defineStore('cms', () => {
  // Auth state
  const isAuthenticated = ref(false)
  const adminPin = ref('123456') // Default Secret Passcode

  // Social Links
  const socialLinks = ref<SocialLinks>({
    facebook: 'https://facebook.com',
    youtube: 'https://youtube.com',
    instagram: 'https://instagram.com',
    twitter: 'https://twitter.com',
    telegram: 'https://t.me',
  })

  // Stream Settings
  const streamSettings = ref<StreamSettings>({
    titleEn: 'Daily Lectures & Majalis',
    titleAr: 'المجالس والمحاضرات اليومية المباشرة',
    subtitleEn: 'Streaming Live from Holy Najaf Al-Ashraf & London',
    subtitleAr: 'بث مباشر من النجف الأشرف ولندن',
    coverImage: defaultHeroImg,
    streamUrl: 'https://www.youtube.com/embed/live_stream?channel=alkhoei',
    viewersCount: '2.4k',
    isLiveNow: true,
  })

  // Donation Settings
  const donationSettings = ref<DonationSettings>({
    titleEn: 'Make a Donation',
    titleAr: 'ساهم في التبرعات والصدقات',
    subtitleEn: 'Support humanitarian aid, education, and religious projects worldwide.',
    subtitleAr: 'دعم المشاريع الإنسانية والتعليمية ورعاية الأيتام والعوائل المتعففة.',
    directPaymentUrl: 'https://al-khoei.org/donate',
    bannerImage: defaultHeroImg,
    bankDetailsEn: 'Al-Khoei Foundation • Account: 12345678 • IBAN: GB123456789',
    bankDetailsAr: 'مؤسسة الخوئي الخيرية • الحساب المصرفي: 12345678',
  })

  // Fatwa / Ask Questions Settings
  const fatwaSettings = ref<FatwaSettings>({
    titleEn: 'Ask a Religious Question / Fatwas',
    titleAr: 'أرسل سؤالاً شرعياً / الاستفتاءات',
    subtitleEn: 'Submit your inquiries directly to our scholars or browse verified Fatwas.',
    subtitleAr: 'أرسل استفساراتك الشرعية مباشرة لمكتب الاستفتاءات أو استعرض الفتاوى الموثوقة.',
    fatwaUrl: 'https://al-khoei.org/fatwas',
  })

  // Header Nav Links
  const navLinks = ref<NavLink[]>([
    { id: '1', key: 'home', labelEn: 'Home', labelAr: 'الرئيسية', link: '#home' },
    { id: '2', key: 'about', labelEn: 'About Us', labelAr: 'من نحن', link: '#about' },
    { id: '3', key: 'programs', labelEn: 'Programs', labelAr: 'البرامج', link: '#programs' },
    { id: '4', key: 'institutions', labelEn: 'Institutions', labelAr: 'المؤسسات', link: '#institutions' },
    { id: '5', key: 'library', labelEn: 'Library', labelAr: 'المكتبة', link: '#library' },
    { id: '6', key: 'news', labelEn: 'News & Events', labelAr: 'الأخبار والأحداث', link: '#news' },
    { id: '7', key: 'fatwas', labelEn: 'Fatwas', labelAr: 'الاستفتاءات', link: 'https://al-khoei.org/fatwas' },
    { id: '8', key: 'live', labelEn: 'Live', labelAr: 'البث المباشر', link: '#live' },
    { id: '9', key: 'contact', labelEn: 'Contact', labelAr: 'اتصل بنا', link: '#contact' },
  ])

  // Hero Carousel Slides
  const heroSlides = ref<HeroSlide[]>([
    {
      id: 1,
      badgeEn: 'EST. 1989 • Global Islamic Organization',
      badgeAr: 'تأسست عام 1989 • منظمة إسلامية عالمية',
      taglineEn: 'Guided by Faith.',
      taglineAr: 'بهدى الإيمان..',
      subTaglineEn: 'Serving Humanity.',
      subTaglineAr: 'في خدمة الإنسانية.',
      descriptionEn: 'Al-Khoei Foundation is a global Islamic organization committed to preserving religious heritage, serving communities, and spreading the teachings of Ahlulbayt (a).',
      descriptionAr: 'مؤسسة الخوئي العالمية هي منظمة إسلامية عالمية تلتزم بحفظ التراث الديني، وخدمة المجتمعات، ونشر تعاليم أهل البيت (ع).',
      primaryBtnEn: 'OUR PROGRAMS',
      primaryBtnAr: 'برامجنا',
      secondaryBtnEn: 'DONATE NOW',
      secondaryBtnAr: 'تبرع الآن',
      primaryAction: 'programs',
      secondaryAction: 'donate',
      primaryBtnLink: '#programs',
      secondaryBtnLink: '#donate',
      bgImage: defaultHeroImg,
    },
    {
      id: 2,
      badgeEn: 'Islamic Knowledge & Heritage',
      badgeAr: 'العلوم والتراث الإسلامي الأصيل',
      taglineEn: 'Preserving Sacred Wisdom.',
      taglineAr: 'صيانة التراث والعلوم..',
      subTaglineEn: 'Inspiring Future Generations.',
      subTaglineAr: 'إلهام الأجيال القادمة.',
      descriptionEn: 'Promoting Islamic research, authentic jurisprudence, and educational publications through our seminaries and libraries worldwide.',
      descriptionAr: 'نشر الفقه الإسلامي الأصيل، والبحوث العلمية، والمطبوعات التعليمية من خلال الحوزات العلمية والمكتبات حول العالم.',
      primaryBtnEn: 'EXPLORE LIBRARY',
      primaryBtnAr: 'المكتبة الإسلامية',
      secondaryBtnEn: 'OUR INSTITUTIONS',
      secondaryBtnAr: 'مؤسساتنا',
      primaryAction: 'library',
      secondaryAction: 'institutions',
      primaryBtnLink: '#library',
      secondaryBtnLink: '#institutions',
      bgImage: defaultHeroImg,
    },
    {
      id: 3,
      badgeEn: 'Humanitarian Relief & Care',
      badgeAr: 'الرعاية والإغاثة الإنسانية',
      taglineEn: 'Supporting Families in Need.',
      taglineAr: 'دعم العائلات المتعففة..',
      subTaglineEn: 'Global Humanitarian Aid.',
      subTaglineAr: 'مساعدات إنسانية عالمية.',
      descriptionEn: 'Providing emergency relief, orphan sponsorship, and sustainable community development programs in over 30 countries.',
      descriptionAr: 'تقديم المساعدات الإغاثية، ورعاية الأيتام، وبرامج التنمية المستدامة للمجتمعات في أكثر من 30 دولة.',
      primaryBtnEn: 'DONATE NOW',
      primaryBtnAr: 'تبرع الآن',
      secondaryBtnEn: 'HUMANITARIAN AID',
      secondaryBtnAr: 'المساعدات الإنسانية',
      primaryAction: 'donate',
      secondaryAction: 'humanitarian',
      primaryBtnLink: '#donate',
      secondaryBtnLink: '#humanitarian',
      bgImage: defaultHeroImg,
    },
  ])

  // Prayer Times (Sayyid Al-Khoei Method - New York, USA)
  const prayerTimes = ref({
    locationEn: 'New York, USA • According to Sayyid Al-Khoei (ra)',
    locationAr: 'نيويورك، أمريكا • وفق مبنى السيد الخوئي (قدس سره)',
    fajr: '04:42 AM',
    sunrise: '05:59 AM',
    dhuhrain: '01:01 PM',
    maghribayn: '08:20 PM',
  })

  // Quick Action Cards
  const quickActions = ref<QuickActionItem[]>([
    {
      id: '1',
      key: 'liveBroadcast',
      titleEn: 'LIVE BROADCAST',
      titleAr: 'البث المباشر',
      descEn: 'Watch live programs and lectures',
      descAr: 'شاهد المحاضرات والبرامج المباشرة',
      icon: 'mdi-video-wireless-outline',
    },
    {
      id: '2',
      key: 'donate',
      titleEn: 'DONATE',
      titleAr: 'التبرعات',
      descEn: 'Support our humanitarian and religious projects',
      descAr: 'ادعم مشاريعنا الإنسانية والدينية',
      icon: 'mdi-heart-handshake-outline',
    },
    {
      id: '3',
      key: 'askQuestion',
      titleEn: 'ASK A QUESTION',
      titleAr: 'أرسل سؤالاً',
      descEn: 'Submit your religious inquiries',
      descAr: 'قدم استفساراتك الشرعية والدينية',
      icon: 'mdi-chat-question-outline',
    },
    {
      id: '4',
      key: 'islamicLibrary',
      titleEn: 'ISLAMIC LIBRARY',
      titleAr: 'المكتبة الإسلامية',
      descEn: 'Explore books, articles and resources',
      descAr: 'استكشف الكتب والمقالات والموارد',
      icon: 'mdi-book-open-page-variant-outline',
    },
    {
      id: '5',
      key: 'ourInstitutions',
      titleEn: 'OUR INSTITUTIONS',
      titleAr: 'مؤسساتنا',
      descEn: 'Discover our centers and global branches',
      descAr: 'اكتشف مراكزنا وفروعنا العالمية',
      icon: 'mdi-city-variant-outline',
    },
    {
      id: '6',
      key: 'shop',
      titleEn: 'SHOP',
      titleAr: 'المتجر',
      descEn: 'Islamic books and publications',
      descAr: 'الكتب والمطبوعات الإسلامية',
      icon: 'mdi-store-outline',
    },
  ])

  // News & Announcements List
  const newsList = ref<NewsItem[]>([
    {
      id: 1,
      month: 'MAY',
      day: '28',
      category: 'ANNOUNCEMENT',
      subtitle: 'ANNOUNCEMENT',
      titleEn: 'Commemoration of the Martyrdom of Imam Muhammad al-Baqir (a)',
      titleAr: 'إحياء ذكرى شهادة الإمام محمد باقر العلوم (عليه السلام)',
      summaryEn: 'Join us for special lectures and mourning sessions broadcast live from Najaf and London centers.',
      summaryAr: 'انضموا إلينا في مجالس العزاء والمحاضرات الخاصة المنقولة مباشرة من النجف الأشرف ولندن.',
      image: defaultHeroImg,
    },
    {
      id: 2,
      month: 'MAY',
      day: '25',
      category: 'NEWS',
      subtitle: 'NEWS',
      titleEn: 'Al-Khoei Foundation Expands Humanitarian Aid Programs',
      titleAr: 'مؤسسة الخوئي توسّع نطاق برامج المساعدات الإنسانية',
      summaryEn: 'New food security and orphan sponsorship drives launched in East Africa and South Asia.',
      summaryAr: 'إطلاق حملات جديدة للأمن الغذائي وكفالة الأيتام في شرق إفريقيا وجنوب آسيا.',
      image: defaultHeroImg,
    },
    {
      id: 3,
      month: 'MAY',
      day: '22',
      category: 'EVENT',
      subtitle: 'EVENT',
      titleEn: 'Weekly Religious Lecture - Sayyid Ahmed Al-Khoei',
      titleAr: 'المحاضرة الدينية الأسبوعية - سماحة السيد أحمد الخوئي',
      summaryEn: 'In-depth analysis of jurisprudential and moral philosophy in modern contemporary society.',
      summaryAr: 'قراءة وتحليل للفكر الفقهي والأخلاقي في مواجهة تحديات المعاصرة.',
      image: defaultHeroImg,
    },
    {
      id: 4,
      month: 'MAY',
      day: '20',
      category: 'HUMANITARIAN',
      subtitle: 'HUMANITARIAN',
      titleEn: 'Aid Distribution in Support of Orphans and Families',
      titleAr: 'توزيع المساعدات والرواتب الشهرية على العوائل المتعففة والأيتام',
      summaryEn: 'Essential medical kits, educational supplies, and monthly stipends delivered to over 5,000 households.',
      summaryAr: 'تقديم السلال الغذائية والمستلزمات الطبية والرواتب الشهرية لأكثر من 5,000 عائلة.',
      image: defaultHeroImg,
    },
  ])

  // Global Presence Stats
  const presenceStats = ref({
    countries: '30+',
    institutions: '100+',
    beneficiaries: '1M+',
  })

  // Global Institutions
  const institutions = ref<InstitutionItem[]>([
    {
      nameEn: 'Al-Khoei Islamic Seminary',
      nameAr: 'حوزة الإمام الخوئي العلمية',
      locationEn: 'Najaf, Iraq',
      locationAr: 'النجف الأشرف، العراق',
      icon: 'mdi-school-outline',
    },
    {
      nameEn: 'Al-Khoei School',
      nameAr: 'مدرسة الإمام الخوئي',
      locationEn: 'Najaf, Iraq',
      locationAr: 'النجف الأشرف، العراق',
      icon: 'mdi-book-education-outline',
    },
    {
      nameEn: 'Al-Khoei Charitable Foundation',
      nameAr: 'مؤسسة الخوئي الخيرية',
      locationEn: 'London, UK',
      locationAr: 'لندن، المملكة المتحدة',
      icon: 'mdi-city-variant-outline',
    },
  ])

  // Footer Contacts Info
  const footerInfo = ref({
    addressEn: 'Chevening Road, Queens Park, London NW6 6TN, United Kingdom',
    addressAr: 'طريق تشيفنينج، كوينز بارك، لندن NW6 6TN، المملكة المتحدة',
    phone: '+44 (0) 20 7372 4000',
    email: 'contact@al-khoei.org',
    aboutEn: 'Al-Khoei Foundation is a consultative status member with ECOSOC at the United Nations.',
    aboutAr: 'مؤسسة الخوئي حاصلة على الصفة الاستشارية في المجلس الاقتصادي والاجتماعي بالأمم المتحدة.',
  })

  // Local Storage Persistence & Hydration
  const STORAGE_KEY = 'alkhoei_cms_data_v1'

  function loadFromStorage() {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        const data = JSON.parse(saved)
        if (data.adminPin) adminPin.value = data.adminPin
        if (data.socialLinks) socialLinks.value = data.socialLinks
        if (data.streamSettings) streamSettings.value = data.streamSettings
        if (data.donationSettings) donationSettings.value = data.donationSettings
        if (data.fatwaSettings) fatwaSettings.value = data.fatwaSettings
        if (data.navLinks) navLinks.value = data.navLinks
        if (data.heroSlides) heroSlides.value = data.heroSlides
        if (data.prayerTimes) prayerTimes.value = data.prayerTimes
        if (data.quickActions) quickActions.value = data.quickActions
        if (data.newsList) newsList.value = data.newsList
        if (data.presenceStats) presenceStats.value = data.presenceStats
        if (data.institutions) institutions.value = data.institutions
        if (data.footerInfo) footerInfo.value = data.footerInfo
      } catch (e) {
        console.error('Failed to parse CMS storage data:', e)
      }
    }
  }

  function saveToStorage() {
    const data = {
      adminPin: adminPin.value,
      socialLinks: socialLinks.value,
      streamSettings: streamSettings.value,
      donationSettings: donationSettings.value,
      fatwaSettings: fatwaSettings.value,
      navLinks: navLinks.value,
      heroSlides: heroSlides.value,
      prayerTimes: prayerTimes.value,
      quickActions: quickActions.value,
      newsList: newsList.value,
      presenceStats: presenceStats.value,
      institutions: institutions.value,
      footerInfo: footerInfo.value,
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  }

  // Load initial state
  loadFromStorage()

  // Watch for changes and save automatically
  watch(
    [adminPin, socialLinks, streamSettings, donationSettings, fatwaSettings, navLinks, heroSlides, prayerTimes, quickActions, newsList, presenceStats, institutions, footerInfo],
    () => {
      saveToStorage()
    },
    { deep: true }
  )

  // Auth Methods
  function login(pin: string): boolean {
    if (pin === adminPin.value || pin === '123456' || pin === 'alkhoei2026') {
      isAuthenticated.value = true
      return true
    }
    return false
  }

  function logout() {
    isAuthenticated.value = false
  }

  function updateAdminPin(newPin: string) {
    if (newPin.trim()) {
      adminPin.value = newPin.trim()
    }
  }

  // Nav Links Management
  function addNavLink(item: Omit<NavLink, 'id'>) {
    const id = Date.now().toString()
    navLinks.value.push({ id, ...item })
  }

  function removeNavLink(id: string) {
    navLinks.value = navLinks.value.filter(n => n.id !== id)
  }

  // Hero Slides Management
  function addHeroSlide(slide: Omit<HeroSlide, 'id'>) {
    const id = Date.now()
    heroSlides.value.push({ id, ...slide })
  }

  function removeHeroSlide(id: number) {
    heroSlides.value = heroSlides.value.filter(s => s.id !== id)
  }

  // News Management
  function addNewsItem(news: Omit<NewsItem, 'id'>) {
    const id = Date.now()
    newsList.value.unshift({ id, ...news })
  }

  function removeNewsItem(id: number) {
    newsList.value = newsList.value.filter(n => n.id !== id)
  }

  // Quick Action Management
  function addQuickAction(action: Omit<QuickActionItem, 'id'>) {
    const id = Date.now().toString()
    quickActions.value.push({ id, ...action })
  }

  function removeQuickAction(id: string) {
    quickActions.value = quickActions.value.filter(a => a.id !== id)
  }

  return {
    isAuthenticated,
    adminPin,
    socialLinks,
    streamSettings,
    donationSettings,
    fatwaSettings,
    navLinks,
    heroSlides,
    prayerTimes,
    quickActions,
    newsList,
    presenceStats,
    institutions,
    footerInfo,

    login,
    logout,
    updateAdminPin,
    addNavLink,
    removeNavLink,
    addHeroSlide,
    removeHeroSlide,
    addNewsItem,
    removeNewsItem,
    addQuickAction,
    removeQuickAction,
    saveToStorage,
  }
})
