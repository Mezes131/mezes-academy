import type { MessageTree } from "./fr";

export const messagesEn: MessageTree = {
  nav: {
    home: "Home",
    catalog: "Catalog",
    howItWorks: "How it works",
    continue: "Continue",
    signIn: "Sign in",
    signInShort: "Sign in",
    pathBadge: "path",
    register: "Sign up",
    createAccount: "Create an account",
    createMyAccount: "Create my account",
    signOut: "Sign out",
    myProfile: "My profile",
    preferences: "Preferences",
  },
  bottomNav: {
    method: "Method",
    account: "Account",
    course: "Course",
    myCourse: "Course",
    modules: "Modules",
    progress: "Progress",
    bookmarks: "Saved",
    search: "Search",
  },
  courseBar: {
    search: "Search…",
    openSidebar: "Open sidebar",
    closeSidebar: "Close sidebar",
    progress: "Progress",
    bookmarks: "Saved",
    finalProject: "Final project",
  },
  language: {
    label: "Language",
    fr: "FR",
    en: "EN",
  },
  translation: {
    inProgress: "Translation in progress",
  },
  common: {
    loading: "Loading…",
    modules: "modules",
    access: "Open",
    close: "Close",
    confirm: "Confirm",
    cancel: "Cancel",
    save: "Save",
    previous: "Previous",
    next: "Next",
    details: "Details",
    seeAllDetails: "See all details",
    processing: "Working…",
    redirecting: "Redirecting…",
    reloadPage: "Reload page",
    backToTop: "Back to top",
    mobileNav: "Mobile navigation",
    lessons: "lessons",
    phases: "phases",
    project: "project",
  },
  theme: {
    toLight: "Switch to light theme",
    toDark: "Switch to dark theme",
  },
  landing: {
    heroEyebrow: "Mezes Academy",
    heroTitleLine1: "Learn to build",
    heroTitleLine2: "solutions that hold up.",
    heroBody:
      "Whether you want to lock in your React skills or learn to build with AI without getting burned, we walk with you step by step. You read a concept, practice it in the browser, validate it, and pick up later right where you left off.",
    ctaReact: "React track",
    ctaReactContinue: "Continue React",
    ctaSvc: "Secure Vibe Coding",
    ctaSvcContinue: "Continue Secure Vibe Coding",
    ctaCatalog: "Browse tracks",
    catalogEyebrow: "Catalog",
    catalogTitle: "Pick where you want to start.",
    catalogBody:
      "{count} tracks are live already, more are on the way. Each one takes you by the hand: a clear idea, an exercise right away, and you always know where you stand.",
    statusFeatured: "Featured",
    statusOnline: "Live",
    statusSoon: "Soon",
    statusPlanned: "Planned",
    methodEyebrow: "Method",
    methodTitle: "How we move forward, for real.",
    methodBody:
      "No endless monologues. You get an idea, you put it into practice, you check that it holds. Then you move on.",
    step1Title: "Understand",
    step1Body:
      "Short lessons with examples you can relate to. Whether you code by hand or with AI, you know why it works.",
    step2Title: "Build",
    step2Body:
      "You practice in the browser: a real exercise, a real result. React as craft, vibe coding as a way to ship without getting lost.",
    step3Title: "Validate",
    step3Body:
      "A quiz to lock it in, progress that remembers you. Close the tab, come back tomorrow, pick up exactly where you left off.",
    promise1Title: "Real work, not theater",
    promise1Body:
      "We help you ship something useful: a solid front end, an AI product you can explain, choices you stand behind.",
    promise2Title: "Reviewed before it reaches you",
    promise2Body:
      "Every lesson has been through the wringer. We tell you why, not just what to click.",
    promise3Title: "Comfortable to read, anywhere",
    promise3Body:
      "Light or dark, phone or big screen: you stay focused on the lesson, not the UI.",
    promise4Title: "Your progress is yours",
    promise4Body:
      "It stays on your device, and syncs when you sign in. You can export it. No ads, no tracking.",
    ctaTitle: "Shall we?",
    ctaBody:
      "React and Secure Vibe Coding are waiting. Create an account if you want your progress synced, or start locally right away: nothing gets lost in the browser.",
    ctaOpenReact: "Let's go with React",
    ctaOpenSvc: "Try Secure Vibe Coding",
  },
  footer: {
    blurb:
      "We help you build things that hold up: solid React, vibe coding without nasty surprises, at your pace.",
    tracks: "Tracks",
    resources: "Resources",
    academy: "Academy",
    reactTrack: "React from zero to expert",
    svcTrack: "Secure Vibe Coding",
    howItWorks: "How it works",
    myProgress: "My progress",
    myBookmarks: "My bookmarks",
    search: "Search",
    about: "About",
    contact: "Contact",
    terms: "Terms",
    privacy: "Privacy",
    legalNotice: "Legal notice",
    soon: "Soon",
    planned: "Planned",
  },
  academy: {
    disclaimer:
      "These pages are for information only. They are not legal advice.",
    doc: {
      toc: "Contents",
      updatedLabel: "Updated",
      briefTitle: "The short version",
      helpTitle: "Something unclear?",
      helpBody:
        "Write to us: we reply within 48 working hours, and we rewrite the passage if the wording is confusing.",
      helpCta: "Write to us",
      alsoTitle: "Read next",
    },
    about: {
      name: "Mezes Academy",
      title: "You only know it once you've typed it.",
      lead: "Here a lesson does not end on a Next button. It ends in an editor, with your code running and a test that either passes or breaks.",
      thesisLabel: "Why this site exists",
      thesisTitle: "Solid solutions, even when you're vibe coding.",
      thesisLead:
        "The point is not to learn how to code. It is to learn how to build: readable, safe, something you can stand behind when it breaks.",
      thesisBody:
        "AI is fast. It does not own the outcome. Here you train to judge the result and make it solid.",
      thesisBefore: "Before",
      thesisAfter: "After",
      thesisFile: "App.tsx",
      thesisTour: "React · Intro",
      thesisLesson1: "JSX",
      thesisLesson2: "Render",
      thesisLesson3: "Quiz",
      thesisLessonKicker1: "5 min · reading",
      thesisLesson1Title: "A component is a function.",
      thesisLesson1Body:
        "You describe the screen. React updates it. No querySelector, no innerHTML.",
      thesisLesson1Code: "function Hello() {\n  return <h1>Hi</h1>\n}",
      thesisLessonKicker2: "Video · 3:12",
      thesisLesson2Title: "Why React redraws.",
      thesisLesson2Meta: "1:24 / 3:12",
      thesisLesson2Overlay: "The render cycle",
      thesisLesson2Code: "setState(n + 1)\n→ React compares\n→ the DOM moves",
      thesisQuizKicker: "Quiz · 1 question",
      thesisQuizQ: "When does React update the screen?",
      thesisQuizA: "When you touch the DOM yourself",
      thesisQuizB: "When state changes",
      thesisQuizC: "On every click, always",
      thesisQuizOk: "Correct",
      thesisQuizWhy: "State changes, React re-renders. That's it.",
      thesisEmpty: "// the file is empty",
      thesisPassed: "Passed",
      thesisPreview: "Preview",
      thesisDiffAria: "The same file, before and after",
      methodKicker: "Method",
      methodTitle: "One lesson, end to end",
      methodBody:
        "Read. Practice. Validate. Always in that order. What changes is what you build, not how you work.",
      methodWindowAria: "Lesson window: read, practice, validate",
      methodReadKicker: "08 · useState",
      methodReadTitle: "State is the component's memory.",
      methodReadBody:
        "Props come from the parent. State is private. Every time it changes, React re-renders on its own.",
      methodReadTip:
        "Never mutate: state.push(item) is forbidden. Always a new value: setState([...state, item]).",
      methodReadCode:
        "const [todos, setTodos] = useState([])\n\nconst addTodo = () => {\n  setTodos([...todos, { id: Date.now(), text: input }])\n}",
      methodPracticeKicker: "Exercise · Your first JSX list",
      methodPracticeHint: "A <ul>, one <li> per fruit, a stable key.",
      methodPracticeCode:
        "export default function App() {\n  const fruits = [\"Mango\", \"Papaya\", \"Avocado\"]\n  return (\n    <ul>\n      {fruits.map((f) => (\n        <li key={f}>{f}</li>\n      ))}\n    </ul>\n  )\n}",
      methodPracticeFruit1: "Mango",
      methodPracticeFruit2: "Papaya",
      methodPracticeFruit3: "Avocado",
      methodPracticeCheck1: "<ul> present",
      methodPracticeCheck2: "map + 3 <li>",
      methodPracticeCheck3: "key on each <li>",
      methodQuizKicker: "Quiz · JSX basics",
      methodQuizQ: "In JSX, which attribute sets a CSS class?",
      methodQuizA: "class",
      methodQuizB: "className",
      methodQuizC: "css",
      methodQuizWhy:
        "class is reserved. Use className. Same idea: for becomes htmlFor.",
      methodQuizBadge: "Quiz passed · 70% min.",
      step1Title: "Read",
      step1Body:
        "One concept, one rule, one snippet. Here: state is private, never mutate it, React re-renders when it changes.",
      step2Title: "Practice",
      step2Body:
        "The exercise sits under the lesson, in the browser. Example: a JSX list with map and a key per item.",
      step3Title: "Validate",
      step3Body:
        "A module quiz (class vs className, read-only props). The lesson ticks when you can redo it, not when you finish reading.",
      seoTitle: "Mezes Academy: solid solutions, even when you're vibe coding",
      seoDesc:
        "A lesson in three beats: read, practice in the browser, validate with a quiz. Build solid solutions, even when vibe coding.",
      tracksLabel: "Open now",
      tracksTitle: "Where to start.",
      svcTitle: "Secure Vibe Coding",
      svcBody:
        "AI writes fast and leaves you the bill. You learn to review its code before production does it for you.",
      svcCta: "Start this track",
      reactTitle: "React from zero to expert",
      reactBody:
        "From hooks to the day you understand why your component renders three times. Exercises throughout.",
      reactCta: "Open React",
      imgReadAlt: "Lesson window: a short text and a code excerpt.",
      imgPracticeAlt: "In-browser exercise: editor and preview side by side.",
      imgValidateAlt: "Validated lesson: green badge and a quiz score.",
      imgSvcAlt: "Evening desk, terminal open on a code review.",
      imgReactAlt: "Frontend craft desk, editor and interface preview.",
    },
    contact: {
      title: "Contact",
      lead: "A question about a track, an account, or a lesson: write to us. We reply within 48 hours, in French or English.",
      compose: "Your message",
      subject: "Subject",
      name: "Name",
      emailLabel: "Email",
      message: "Message",
      send: "Send",
      successTitle: "Message sent.",
      successBody: "We have your request. Reply within 48 working hours.",
      successAgain: "Write another message",
      errorSummary: "Fix these points before sending.",
      errorName: "Enter your name.",
      errorEmail: "Enter a valid email.",
      errorMessage: "Write a slightly clearer message (a few sentences).",
      location: "Yaoundé, CM",
      hours: "Monday to Friday. Reply within 48 working hours.",
      faqTitle: "Before you write",
      faqDelayQ: "How fast do you reply?",
      faqDelayA:
        "Within 48 working hours, in French or English. If a lesson is blocked, say so in the message: we will tell you if we can go faster.",
      faqIncludeQ: "What should I include?",
      faqIncludeA:
        "Your track, the module if you have one, and what you already tried. For an account, the sign-in email is enough.",
      faqPaidQ: "Is the first exchange paid?",
      faqPaidA:
        "No. Help for learners and enrollment questions are free and without obligation.",
      subjectTrack: "Enrollment and choosing a track",
      subjectAccount: "Account and sign-in",
      subjectEmail: "Other",
      subjectLesson: "Help with a lesson or exercise",
      email: "contact@mezescorp.com",
      seoTitle: "Contact | Mezes Academy",
      seoDesc:
        "Contact Mezes Academy: enrollment, courses, account, teaching help. Reply within 48 working hours.",
    },
    terms: {
      eyebrow: "Rules of use",
      title: "Terms of use",
      lead: "What you can do on Mezes Academy, what we commit to, and what we do not promise.",
      updated: "19 August 2026",
      readTime: "6 min read",
      brief1:
        "Access to published tracks is free; an account only exists to sync your progress.",
      brief2:
        "Lessons belong to Mezes Corporation, but the code snippets are yours to reuse in your projects.",
      brief3:
        "No recognized diploma, no job guarantee: we teach you to build, not to collect badges.",
      seoTitle: "Terms of use | Mezes Academy",
      seoDesc:
        "Mezes Academy terms of use: course access, accounts, acceptable use, intellectual property, liability and governing law.",
      scopeTitle: "Scope and acceptance",
      scopeP1:
        "Mezes Academy is a learning platform published by Mezes Corporation. It offers tracks (React, Secure Vibe Coding, and more to come) made of written lessons, quizzes and exercises that run straight in the browser.",
      scopeP2:
        "By using the site you accept these terms. If something feels unacceptable, do not use the service and write to us: several sentences on this page already come from learner feedback.",
      whoTitle: "Who can use the service",
      whoP1:
        "The site is open to anyone who wants to learn to code, with no minimum level required. If you are under 16, use Mezes Academy with the consent of a parent or guardian, who remains responsible for the account.",
      whoP2:
        "You can browse most of the content without an account. Creating one stays optional.",
      accountTitle: "Account and security",
      accountP1:
        "An account is created with an email address and a password, or through Google sign-in. You are responsible for keeping your credentials private and for actions taken from your account.",
      accountB1: "One account per person: credentials are not shared.",
      accountB2: "Tell us quickly if you think your account is compromised.",
      accountB3:
        "You can ask for your account and progress to be deleted at any time.",
      accountP2:
        "We will never ask for your password by email, direct message or phone. If you receive such a request, report it to contact@mezescorp.com.",
      accessTitle: "Content access and changes",
      accessP1:
        "Access to published tracks is free today. If a paid offering appears, it will be announced clearly and will not apply retroactively to content already open to your account.",
      accessP2:
        "The tracks are alive: we add modules, rewrite passages, fix mistakes and may remove content that became wrong. We aim for continuous availability without being able to guarantee it: maintenance, a host outage or a network cut can interrupt the service.",
      useTitle: "Acceptable use",
      useP1:
        "The service is here for learning: read, copy snippets to practice, take notes, share a link to a lesson. The following uses, however, are not allowed.",
      useB1:
        "Scraping the site automatically (mass crawling, bots) or loading it heavily enough to degrade the service.",
      useB2:
        "Republishing or reselling lessons, quizzes and exercises, in whole or in part, without written permission.",
      useB3:
        "Bypassing authentication, probing the site for flaws, or trying to reach other learners' data.",
      useB4:
        "Sending illegal, hateful or misleading content through free-text fields: name, contact message, avatar.",
      useP2:
        "Tempted to run a security test? Write to us first: we prefer responsible disclosure over a surprise in production.",
      ipTitle: "Intellectual property",
      ipP1:
        "Texts, illustrations, quizzes, exercises, the Mezes Academy brand and the site's visual identity belong to Mezes Corporation or its partners. You get a personal, non-exclusive, non-transferable right to use them to learn.",
      ipP2:
        "The code snippets shown in the lessons are meant to be reused: put them in your personal or professional projects, no attribution required. The teaching texts themselves may not be republished as they are.",
      aiTitle: "Code samples and AI assistants",
      aiP1:
        "Several tracks discuss AI assistants and deliberately show imperfect code, so you learn to fix it. These samples are educational: they are neither an audit nor a security guarantee for your own project.",
      aiP2:
        "Before shipping to production, have your code reviewed by someone competent. The technical decisions you make remain yours.",
      noPromiseTitle: "What we do not promise",
      noPromiseP1: "To be blunt, here is what Mezes Academy is not.",
      noPromiseB1:
        "No diploma, official certification or academic equivalence.",
      noPromiseB2: "No guarantee of a job, a contract or an income.",
      noPromiseB3: "No guarantee of an error-free or uninterrupted service.",
      noPromiseP2:
        "The service is provided as is. We fix reported mistakes as fast as we can, but content can age faster than its update.",
      liabilityTitle: "Liability",
      liabilityP1:
        "Mezes Corporation cannot be held liable for indirect damages tied to using the site: loss of local data, lost profit, technical decisions taken on the basis of a lesson. Our liability is limited to what applicable law allows.",
      liabilityP2:
        "Progress stored locally depends on your browser: clearing the site data erases it. An account remains the safest way to lose nothing.",
      endTitle: "Suspension and ending use",
      endP1:
        "You can stop using the service whenever you want and ask for your account to be deleted by email.",
      endP2:
        "On our side, we can suspend an account for clear abuse: attacks, fraud, resale of content, harassment. Except in an emergency or a legal obligation, we warn you first and explain why.",
      changesTitle: "Changes to these terms",
      changesP1:
        "These terms evolve with the service. The update date at the top of the page marks the latest version. For an important change we announce it on the site and, if you have an account, by email.",
      changesP2:
        "Continuing to use the service after a change means you accept the new version.",
      lawTitle: "Governing law and disputes",
      lawP1:
        "These terms are governed by Cameroonian law. If we disagree, we start by looking for an amicable solution: write to contact@mezescorp.com describing the problem.",
      lawP2:
        "Failing an agreement, the dispute falls to the competent courts of Yaoundé, without prejudice to consumer protection rules applicable in your country of residence.",
    },
    privacy: {
      eyebrow: "Personal data",
      title: "Privacy",
      lead: "What we collect, why, where it is stored, and how to take control of it.",
      updated: "19 August 2026",
      readTime: "5 min read",
      brief1: "No ads, no data resale, no cross-site tracking.",
      brief2: "Without an account, your progress never leaves your browser.",
      brief3:
        "One email is enough to access, correct or delete your data.",
      seoTitle: "Privacy | Mezes Academy",
      seoDesc:
        "Mezes Academy privacy policy: data collected, purposes, processors, retention, security and how to exercise your rights.",
      controllerTitle: "Who processes your data",
      controllerP1:
        "The data controller is Mezes Corporation, publisher of Mezes Academy, reachable at contact@mezescorp.com. We process the minimum needed to run a course site: nothing for advertising.",
      controllerP2:
        "This page describes what the site technically does. If you spot a gap between this text and the service's behaviour, report it: it is a bug to fix, not a hidden policy.",
      dataTitle: "What we collect",
      dataP1: "Depending on whether you have an account:",
      dataB1:
        "Account: email address, password hashed by our authentication provider, first name or nickname if you fill it in, avatar if you upload one.",
      dataB2:
        "Google sign-in: the email address and name Google passes on, nothing more.",
      dataB3:
        "Progress: modules read, quiz answers, completed exercises, bookmarks.",
      dataB4: "Preferences: light or dark theme, interface language.",
      dataB5:
        "Technical: server logs (IP address, timestamp, page requested, browser), for security and debugging.",
      dataP2:
        "We do not collect your precise location, your contacts, or sensitive data. No form on the site asks for payment details.",
      whyTitle: "Why, and on what basis",
      whyP1: "Every piece of data serves a precise purpose.",
      whyB1:
        "Running the service (account, sign-in, progress sync): performance of the contract between us.",
      whyB2:
        "Security and abuse prevention (technical logs, rate limiting): legitimate interest.",
      whyB3:
        "Answering your messages: the information you write yourself in a contact email.",
      whyP2:
        "No automated decision has a legal effect on you, and we do no advertising profiling.",
      storageTitle: "Local storage and cookies",
      storageP1:
        "The site uses no advertising cookie and no third-party tracker. What is stored in your browser stays minimal: a session token if you are signed in, your progress if you are not, your theme and your language.",
      storageP2:
        "You can wipe everything by clearing the site data in your browser settings. Without an account this also deletes your local progress: there is no copy elsewhere.",
      processorsTitle: "Processors and hosting",
      processorsP1:
        "Running the site takes a few providers, limited to what they need to see.",
      processorsB1:
        "Supabase: authentication, progress database and avatar storage.",
      processorsB2: "Google: only if you choose Google sign-in.",
      processorsB3:
        "Host: a private server (VPS) operated for Mezes Corporation, serving the pages and keeping technical logs.",
      processorsP2:
        "None of these providers is allowed to reuse your data for their own purposes.",
      transfersTitle: "Transfers outside Cameroon",
      transfersP1:
        "Our technical providers may host data outside Cameroon, notably in Europe or the United States. In that case we rely on their contractual commitments to keep an equivalent level of protection.",
      retentionTitle: "How long we keep it",
      retentionP1: "Nothing is kept just in case.",
      retentionB1: "Account and progress: as long as your account exists.",
      retentionB2:
        "Inactive account: possible deletion after 36 months without sign-in, following a warning email.",
      retentionB3: "Technical logs: 12 months at most.",
      retentionB4:
        "Email exchanges: 24 months, to keep the history of a request.",
      rightsTitle: "Your rights",
      rightsP1:
        "You can ask to access your data, correct it, delete it, get an exportable copy, or object to a processing. Write to contact@mezescorp.com from your account address: we answer within 30 days, usually much sooner.",
      rightsP2:
        "If you live in the European Union, the GDPR applies to these requests and you can contact your national supervisory authority. From Cameroon, you can refer the matter to the competent data protection authority.",
      securityTitle: "Security",
      securityP1:
        "The site is served over HTTPS, passwords are hashed by our authentication provider, and database access is restricted to people who need it. Sessions expire and can be revoked.",
      securityP2:
        "No system is bulletproof. In case of a data breach likely to affect you, we tell you and describe what happened, what we did, and what you can do.",
      minorsTitle: "Minors",
      minorsP1:
        "The service is not designed for children. Under 16, creating an account requires the consent of a parent or guardian. At a legal guardian's request, we delete the account and the associated data.",
      changesTitle: "Changes to this page",
      changesP1:
        "This policy follows the site's evolution. The update date at the top of the page is the reference. For a significant change (a new purpose, a new provider), we announce it before it takes effect.",
    },
    legal: {
      eyebrow: "Legal information",
      title: "Legal notice",
      lead: "Who publishes this site, who hosts it, who to write to, and under which law.",
      updated: "19 August 2026",
      readTime: "3 min read",
      brief1: "Publisher: Mezes Corporation, Yaoundé, Cameroon.",
      brief2: "One address for every request: contact@mezescorp.com.",
      brief3:
        "Hosted on a private server (VPS), with authentication and database at Supabase.",
      seoTitle: "Legal notice | Mezes Academy",
      seoDesc:
        "Mezes Academy legal notice: publisher, contact, hosting, intellectual property, reporting, accessibility and governing law.",
      publisherTitle: "Site publisher",
      publisherP1:
        "Mezes Academy is a service published by Mezes Corporation, based in Yaoundé, Cameroon.",
      publisherP2:
        "Responsible for publication: the management of Mezes Corporation, reachable at contact@mezescorp.com.",
      contactTitle: "Contact",
      contactP1:
        "For any teaching, technical or legal question, one address: contact@mezescorp.com. Reply within 48 working hours, Monday to Friday, in French or English.",
      contactP2:
        "The form on the Contact page simply prepares that email in your mail client; the page itself stores nothing.",
      hostingTitle: "Hosting",
      hostingP1:
        "The site is served from a virtual private server (VPS) operated on behalf of Mezes Corporation. Authentication, the progress database and avatar storage are handled by Supabase.",
      hostingP2:
        "The host's precise details are provided on written request to contact@mezescorp.com, in particular as part of a report.",
      ipTitle: "Intellectual property",
      ipP1:
        "The site structure, lesson texts, quizzes, exercises, illustrations, and the Mezes Academy brand and logo are protected. Any reproduction, adaptation or distribution without written permission is prohibited, apart from personal learning use and short quotations linking back to the source.",
      ipP2:
        "The code snippets in the lessons are free to reuse in your projects. Third-party fonts, libraries and tools used by the site remain under their own licences.",
      contentTitle: "Content reliability",
      contentP1:
        "The tracks are written carefully, reviewed and fixed continuously. Even so, an inaccuracy or a piece of outdated content can remain: the JavaScript ecosystem moves fast.",
      contentP2:
        "Nothing on this site is professional advice (legal, financial or security) tailored to your context. Report a mistake to contact@mezescorp.com: fixes come before new features.",
      linksTitle: "External links",
      linksP1:
        "The site links to third-party documentation and tools. Those links are offered as resources: we control neither their content nor their privacy policies, and cannot answer for them.",
      reportTitle: "Reporting content or abuse",
      reportP1:
        "Copyright infringement, inappropriate content, a security flaw: write to contact@mezescorp.com with the URL involved and a factual description. We acknowledge receipt within 48 working hours and remove clearly unlawful content without delay.",
      reportP2:
        "For a security flaw, give us a reasonable delay before publishing anything: responsible disclosure protects the learners.",
      a11yTitle: "Accessibility",
      a11yP1:
        "The site targets WCAG 2.2 level AA: contrast held in both themes, keyboard navigation, respect for the reduced-motion preference, explicit labels. Full conformance is not reached everywhere yet.",
      a11yP2:
        "If a page blocks you (screen reader, zoom, contrast), describe the situation by email: this feedback is treated as a priority bug.",
      dataTitle: "Personal data and cookies",
      dataP1:
        "The detail of what we collect, why, and how to exercise your rights lives on the Privacy page. In short: no ads, no third-party tracker, and local storage limited to your session, your progress and your preferences.",
      lawTitle: "Governing law",
      lawP1:
        "This site and its use are governed by Cameroonian law. Failing an amicable agreement, the competent courts of Yaoundé have jurisdiction, without prejudice to the rights your country of residence grants you as a consumer.",
    },
  },
  auth: {
    welcomeBack: "Welcome back",
    onYourPath: "to your path.",
    createAccount: "Create your account",
    buildForReal: "and build for real.",
    syncBody:
      "With an account, your progress follows you everywhere: modules read, quizzes and exercises stay up to date on laptop or phone.",
    benefitSaveTitle: "Nothing gets lost",
    benefitSaveBody:
      "Close the page, come back later: we put you right back where you left off.",
    benefitDataTitle: "Your data stays yours",
    benefitDataBody:
      "Secure sign-in. You only see your own progress, nobody else.",
    benefitDevicesTitle: "On every screen",
    benefitDevicesBody:
      "Laptop, tablet, or phone: the same path, the same progress.",
    backHome: "Back to home",
    modeAria: "Authentication mode",
    fullName: "Full name",
    fullNamePlaceholder: "e.g. Ada Lovelace",
    email: "Email",
    emailPlaceholder: "you@email.com",
    password: "Password",
    passwordPlaceholderMin: "6 characters min.",
    showPassword: "Show",
    hidePassword: "Hide",
    showPasswordAria: "Show password",
    hidePasswordAria: "Hide password",
    newHere: "New here?",
    alreadyRegistered: "Already registered?",
    orWithEmail: "or with your email",
    legal:
      "By continuing, you agree to use the platform responsibly. Your data is never shared with third parties.",
    accountCreated:
      "Account created. If email confirmation is enabled, open the link you received, then sign in.",
    preparingSpace: "Preparing your space…",
    checkingSession: "Checking your session and syncing your progress.",
    slowTitle: "This is taking longer than usual",
    slowBody:
      "Check your connection, then reload the page. If it keeps happening, try again in a moment.",
    unavailableTitle: "Service temporarily unavailable",
    unavailableBody:
      "Authentication is not available yet. An admin still needs to finish backend setup. Try again in a few minutes.",
    signOutTitle: "Sign out?",
    signOutBody:
      "You'll need to sign back in with {email} to sync your progress.",
    signOutConfirm: "Sign out",
    staySignedIn: "Stay signed in",
    errInvalidLogin: "Incorrect email or password.",
    errEmailNotConfirmed:
      "Your email is not confirmed yet. Check your inbox.",
    errAlreadyRegistered:
      "An account already exists with this email. Try signing in.",
    errPasswordShort: "Password must be at least 6 characters.",
    errRateLimit: "Too many attempts. Try again in a few minutes.",
    errProviderDisabled:
      "This sign-in method is not enabled yet. Try again later.",
    forgotPassword: "Forgot password?",
    forgotTitle: "Reset your password",
    forgotBody:
      "Enter your account email. We'll tell you right away if it's recognized, then send a reset link.",
    forgotSubmit: "Send reset link",
    forgotSent: "Email sent. Check your inbox (and spam) to reset your password.",
    forgotUnknownEmail: "No account is associated with this email.",
    forgotOAuthOnly:
      "This account signs in with Google, not a password. Use the OAuth button on the sign-in page.",
    backToSignIn: "Back to sign in",
    resetTitle: "New password",
    resetBody: "Choose a new password for your account.",
    resetSubmit: "Save password",
    resetSuccess: "Password updated. You can sign in.",
    resetInvalid: "This reset link is invalid or has expired.",
    resetRequestAgain: "Request a new link",
    errRecovery:
      "Could not reset the password. Try again or request a new link.",
    errEmailSend:
      "Email sending failed (SMTP / provider). Check Auth → SMTP in Supabase, or try again later.",
  },
  account: {
    backToCourse: "Back to the track",
    title: "My account",
    subtitle: "Customize your profile, preferences, and security settings.",
    tabOverview: "Overview",
    tabPreferences: "Preferences",
    tabSecurity: "Account & security",
    keyStats: "My key stats",
    progress: "Progress",
    modulesRead: "Modules read",
    quizzesPassed: "Quizzes passed",
    exercisesSolved: "Exercises solved",
    nextMilestone: "Next milestone",
    byPhase: "By phase",
    completeProfile: "Complete your profile",
    checklistName: "Full name",
    checklistNameHint: "Used on your end-of-track certificate.",
    checklistUsername: "Public username",
    checklistUsernameHint:
      "It will later power the project gallery and your shareable profile.",
    checklistBio: "Bio",
    checklistBioHint: "A line that makes people want to know you.",
    checklistLinks: "Public links",
    checklistLinksHint: "It enriches your portfolio once you finish the track.",
    milestoneProfileTitle: "Complete your profile",
    milestoneProfileBody:
      "Add your name and public username: they'll be used for your certificate and to showcase your profile later.",
    milestoneDoneTitle: "Well done, track complete!",
    milestoneDoneBody:
      "You can now aim for the final project phase to lock in your skills in a real pro setup.",
    milestoneKeepGoing:
      "Keep the pace: finish a few more modules to stay close to your next milestones.",
    languageDesc: "Change the interface language.",
    themeTitle: "Theme",
    themeDesc: "Dark by default. You can switch to light here.",
    visibilityTitle: "Visibility",
    visibilityDesc:
      "Your profile may appear in the future student project gallery.",
    publicHint:
      "Your username, bio, and final project may appear in the gallery. Off by default.",
    notificationsTitle: "Notifications",
    notificationsDesc:
      "Coming soon: gentle reminders so you don't break your study streak.",
    publicOn: "Profile set to public.",
    publicOff: "Profile set to private.",
    passwordTitle: "Password",
    passwordDesc: "Pick a strong password, different from your other accounts.",
    currentPassword: "Current password",
    newPassword: "New password",
    passwordMinPlaceholder: "6 characters minimum",
    updating: "Saving…",
    updatePassword: "Update",
    dangerTitle: "Danger zone",
    dangerDesc: "Irreversible actions. Think twice before continuing.",
    deleteAccount: "Request deletion",
    deleteConfirm:
      "An admin will handle your request manually. Your progress stays for 30 days before permanent deletion.",
    deleteMailSubject: "Account deletion request",
    deleteMailBody:
      "Hello,\n\nI request deletion of my account linked to {email}.\n\nThank you.",
    passwordUpdated: "Password updated.",
    passwordMinError: "The new password must be at least 6 characters.",
    passwordSameError: "The new password must differ from the current one.",
    passwordWeakError:
      "This password is too weak. Use at least 6 characters.",
    saved: "Saved.",
    bioPlaceholder: "A line that describes you…",
    usernameRule: "3 to 30 characters: letters, digits, or _.",
    publicBadge: "Public profile",
    privateBadge: "Private",
    completeness: "Completeness",
    completenessGood: "Solid start, keep filling your profile.",
    completenessLow: "Complete your profile to unlock what comes next.",
    avatarUpdated: "Profile photo updated.",
    avatarRemoved: "Photo removed.",
    avatarRemoveConfirm:
      "Remove your profile photo? Your initials will show instead.",
    changePhoto: "Change",
    addPhoto: "Add a photo",
    removePhoto: "Remove",
    website: "Website",
    addPublicLinks: "Add public links",
    publicLinks: "Public links",
    invalidUrl: "Invalid URL for {label}.",
    inlineMultilineHint: "Enter = new line · 240 characters max",
    inlineHint: "Enter to save · Esc to cancel",
    editAria: "edit {label}",
    addName: "Add your name",
    addBio: "Add a bio",
    addField: "Add {label}",
    themeLight: "Light",
    themeDark: "Dark",
    emailSectionTitle: "Email",
    emailSectionDesc: "You sign in with this address.",
    emailChangeHint:
      "To change your email, contact {email}. This will be automated soon.",
    emailChangeSubject: "Email change",
    confirmPassword: "Confirm password",
    passwordMismatch: "The two passwords do not match.",
    passwordSessionsNote: "You'll be signed out of other active sessions.",
    edit: "edit",
    addUsername: "Choose a username",
    namePlaceholder: "e.g. Ada Lovelace",
  },
  learn: {
    markRead: "Mark done",
    markedRead: "Module marked as read",
    addBookmark: "Add to bookmarks",
    removeBookmark: "Remove from bookmarks",
    read: "Read",
    quizScore: "Quiz: {score}",
    exercisesDone: "Exercises done: {done}/{total}",
    endQuiz: "End-of-module quiz",
    quizRule:
      "Pass mark: at least 70% correct. You can retry as many times as you want.",
    practiceExercises: "Practice exercise(s)",
    gateQuiz: "Pass the quiz first (70% minimum) to unlock what follows.",
    gateExercise: "Finish the exercise first to mark the module as read.",
    courseVideo: "Course video",
    openVideo: "Open video",
    quizPassed: "Passed",
    quizRetry: "Review",
    multiAnswer: "(multiple answers possible)",
    correctAnswer: "Correct answer",
    wrongAnswer: "Incorrect answer",
    correctLabel: "Correct: ",
    rememberLabel: "Remember: ",
    submitAnswers: "Submit my answers",
    quizPassedMsg: "Quiz passed: {n}/{m}.",
    quizFailedMsg:
      "Review needed: you need at least 70%. You scored {n}/{m}. You can retry.",
    redoQuiz: "Retry quiz",
    showHint: "Show a hint",
    nextHint: "Still stuck? Next hint",
    solutionShownBanner:
      "Solution shown: the exercise will be marked as « Seen », not solved.",
    resetStarter: "Reset to starter",
    seeSolution: "See solution",
    revealSolution: "Reveal solution (marks the exercise as « Seen »)",
    unlockSolution: "Make at least {n} attempts to unlock the solution",
    solutionLocked: "Solution locked ({n} attempt{s})",
    resetExercise: "Reset this exercise's state",
    restartZero: "Start over",
    iFinished: "I've finished this exercise",
    running: "Running…",
    runAndCheck: "Run + Check",
    runManual: "Run",
    localValidation: "Local validation",
    alreadyValidated: " (already passed)",
    statusSolved: "Solved",
    statusSeen: "Solution seen",
    statusInProgress: "In progress",
    showConsole: "▸ Show console",
    hideSolution: "Hide solution",
    solutionReadonly: "Solution (read-only)",
    pasteDisabled:
      "Paste is disabled here. Type the code yourself to learn.",
    testsOk: "{n} test(s) OK",
    testsFail: "{n} failure(s)",
  },
  progress: {
    title: "My progress",
    where: "Where do you stand?",
    acrossTracks:
      "{n} tracks counted on the platform. Each bar reflects your validated steps (modules, quizzes, exercises).",
    global: "Overall progress",
    steps: "{done} / {total} steps",
    modulesRead: "Modules read",
    quizzesPassed: "Quizzes passed",
    exercisesSolved: "Exercises solved",
    exercisesSeen: "Exercises seen",
    challenges: "Challenges",
    byPhase: "By phase",
    byTrack: "By track",
    openTrack: "Open",
    notStarted: "not started yet",
    browseCatalog: "Browse all tracks in the catalog",
    backup: "Backup",
    backupSignedIn:
      "Your progress is saved on your account and syncs automatically. You can also export a JSON as a local backup.",
    backupGuest:
      "Your progress is saved in the browser. Export it as JSON for a safety copy or to restore on another device.",
    exportJson: "Export (JSON)",
    import: "Import",
    resetAll: "Reset all",
    importOk: "Progress imported successfully!",
    importBad: "Invalid file: {error}",
    resetConfirm:
      "Reset all progress? This cannot be undone (your exported file remains valid).",
  },
  search: {
    title: "Search",
    subtitle: "Find a precise concept",
    placeholder: "Search a lesson, a concept…",
    clearAria: "Clear search",
    minChars: "Type at least 2 characters.",
    empty: "No results.",
    emptyFor: "No results for",
    results: "{n} result(s)",
    matchModuleTitle: "Module title",
    matchSubtitle: "Subtitle",
    matchLesson: "Lesson",
    matchContent: "Content",
    matchSection: "Section",
    matchCallout: "Callout",
    matchRemember: "Key takeaway",
    matchCode: "Code sample",
    matchQuiz: "Quiz",
    matchExercise: "Exercise",
  },
  bookmarks: {
    title: "Bookmarks",
    subtitle: "Your saved modules",
    empty: "No bookmarks yet. Add some from a module.",
    remove: "Remove from bookmarks",
  },
  course: {
    continueCourse: "Continue the course",
    startCourse: "Start the course",
    continueWhere: "Continue where you left off",
    startPath: "Start the track",
    resume: "Resume",
    open: "Open",
    lastActivity: "Last activity",
    pathInPhases: "The track in {n} phases",
    shortcuts: "Shortcuts",
    shortcutProgress: "Progress",
    shortcutProgressDesc: "Detailed stats, export / import JSON",
    shortcutBookmarks: "Bookmarks",
    shortcutBookmarksDesc: "{n} bookmarked module{s}",
    shortcutSearch: "Search",
    shortcutSearchDesc: "Find a precise concept",
    shortcutFinal: "Final project",
    shortcutFinalDesc: "Capstone gate + tutorial phase",
    globalProgress: "Overall progress",
    modulesRead: "Modules read",
    exercisesDone: "Exercises done",
    validated: " · passed",
    redo: " · retry to pass",
    justNow: "Just now",
    minutesAgo: "{n} min ago",
    hoursAgo: "{n} h ago",
    daysAgo: "{n} d ago",
    phaseProgress: "Phase progress",
    phaseSteps: "{done} / {total} steps",
    phaseChallenge: "Phase final challenge",
    phaseChallengeHint: "3 random exercises · no solution · hints allowed",
    bestScore: "(best: {score})",
    scaffoldTitle: "Content in progress",
    scaffoldBody:
      "This phase is still being written. You can explore the structure while you wait.",
    backToPhase: "Back to phase",
    randomExercises: "3 random exercises",
    challengeReady:
      "All challenge exercises are passed. You can save this result.",
    challengePending:
      "Pass each exercise (green run) to unlock saving the challenge.",
    finalProject: "Final project",
    unlocked: "Unlocked",
    locked: "Locked",
    modulesCheck: "Modules read",
    quizzesCheck: "Quizzes passed (>= 70%)",
    exercisesCheck: "Exercises solved (no reveal)",
    syllabusTitle: "Full syllabus",
    syllabusPriority: "Writing priority",
    reactSyllabusDesc:
      "The full detailed program: phases, modules, lessons, goals, quizzes, synthesis exercises, and projects.",
    reactHeroLine1: "Your React track,",
    reactHeroLine2: "from first JSX to expert architecture.",
    reactHeroBody:
      "{phases} progressive phases, {modules} modules, dozens of live exercises. Every idea is explained, practiced, then validated. Your progress is saved: pick up anytime where you left off.",
    svcEyebrow: "Secure Vibe Coding track",
    svcHeroBefore: "From prompt to",
    svcHeroAccent: "production product",
    svcHeroAfter: "without the debt or the flaws.",
    svcHeroBody:
      "Every idea is explained, checked, then validated. Your progress is saved: pick up anytime where you left off.",
    svcSyllabusDesc:
      "Prompt → Audit → Ship applied end to end: from phase 4, projects feed the same product that becomes the certifying capstone.",
    pathCompleteEyebrow: "Track complete",
    pathCompleteTitle: "Well done, you've completed every available module!",
    pathCompleteBody:
      "The React Pro Path capstone is now available: open the final project gate to move into production mode.",
    svcModulesDoneEyebrow: "Playable modules done",
    svcModulesDoneTitle: "Well done, you've finished the modules written so far!",
    svcModulesDoneBody:
      "More phases arrive as we write them. You can review the syllabus or dig deeper into audits already done.",
    gateBoth:
      "Pass the quiz first (70% minimum) and finish the exercise to mark the module as read.",
    solutionRetryHint: "You can hide the solution and retry anytime.",
    runManual: "Manual run",
    noValidator:
      "No validator is configured on this exercise. The Run button counts as an attempt to unlock the solution.",
    bookmarksIntro: "Modules you've bookmarked to come back to easily.",
    challengeTitle: "Final challenge: {label}",
    challengeIntro:
      "Final review mode: no solution button, hints only.",
    challengeSaved: "Score saved. Well done, challenge passed.",
    challengeSubmit: "Save challenge",
    challengeProgress: "{done} / {total} exercises passed",
    challengeNoExercises: "No eligible exercises for this challenge.",
    capstoneIntro:
      "The final project unlocks only after you fully complete the React track. The Pro Transition tutorial phase is part of the prerequisites.",
    capstonePhases: "{n} phases to complete",
    capstoneSteps: "{done}/{total} steps validated",
    tutorialTitle: "Tutorial phase (Sprint 2)",
    tutorialBody:
      "Prepare your move to real tools: VS Code, Git/GitHub, and deployment. Complete this phase before the capstone studio.",
    openTutorial: "Open the Pro Transition phase",
    studioLocked: "Capstone Studio locked",
    studioUnlockHint:
      "Finish the remaining items on the React track to unlock the final project.",
    openStudio: "Open Capstone Studio",
    syllabusPhaseProject: "Phase project",
    syllabusLesson: "Lesson {n}",
    syllabusValidation: "Validation",
    syllabusQuizCount: "{n} quiz(zes)",
    syllabusExerciseCount: "{n} exercise(s)",
    rightsReserved: "All rights reserved.",
  },
  sync: {
    synced: "Synced",
    allSynced: "Everything is synced",
    pulling: "Fetching your progress from your account.",
    merging:
      "Your local data is being uploaded to your account once. You can keep working.",
    saving: "Your latest actions are being saved.",
    lastSaved: "Last saved: {when}.",
    upToDate: "Your data is up to date on your account.",
    offline:
      "The backend is unreachable right now. Your progress stays saved locally.",
    error:
      "Something went wrong. Retry, or contact support if it keeps happening.",
    justNow: "just now",
    secondsAgo: "{n}s ago",
    savedPulse: "Saved",
    retry: "Retry",
    pillHydrating: "Loading",
    pillMigrating: "Migrating",
    pillSyncing: "Sync",
    pillOffline: "Offline",
    pillError: "Error",
    pillLocal: "Local",
    titleHydrating: "Loading your progress",
    titleMigrating: "Migrating your progress ({n} item{s})",
    titleSyncing: "Syncing in progress",
    titleMigrated: "Progress migrated and synced ({n} item{s})",
    titleOffline: "Offline mode",
    titleError: "Sync error",
    titleLocal: "Local backup",
    bodyLocal:
      "You're not signed in. Your progress stays on this device only.",
  },
  audit: {
    summaryOne:
      "You correctly spotted the only expected finding, with no false positives.",
    summaryMany:
      "You correctly spotted the {n} expected findings, with no false positives or misses.",
    tpOne: "1 correct finding",
    tpMany: "{n} correct findings",
    tpNone: "no correct findings yet",
    fpOne: "1 false positive",
    fpMany: "{n} false positives",
    fnOne: "1 miss",
    fnMany: "{n} misses",
    bilan: "Summary: {parts}.",
    seen: "correction seen",
    validated: "passed",
    findings: "Findings",
    severity: "Severity",
    choose: "Choose…",
    evidence: "Evidence (file, line, note)",
    showHint: "Show a hint ({n}/{total})",
    reportOk: "Report validated",
    reportBad: "Report incomplete or incorrect",
    score: "Score:",
    tpLegend: "Correct findings",
    tpLegendHint: "(the ones you correctly spotted)",
    fpLegend: "False positives",
    fpLegendHint: "(checked when they weren't the issue)",
    fnLegend: "Misses",
    fnLegendHint: "(important findings left unchecked)",
    correction: "Correction",
    submit: "Submit report",
    seeCorrection: "See correction",
    restart: "Start over",
    attempts: "{n} attempt{s}",
    sevLow: "Low",
    sevMedium: "Medium",
    sevHigh: "High",
    sevCritical: "Critical",
  },
};
