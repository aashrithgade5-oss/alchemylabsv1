# Graph Report - .  (2026-07-14)

## Corpus Check
- 196 files · ~75,892 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 883 nodes · 1228 edges · 87 communities (67 shown, 20 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 4 edges (avg confidence: 0.73)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Founders Circle Section
- Contact Page & Footer
- UI: Input/Separator/Sheet
- Breadcrumbs & Horizontal Scroll
- Toast UI Component
- Aashrith Portfolio Page
- Particle BG & Accordion UI
- Eva Portfolio Page
- Background Scene & Glass FX
- Hero Section Effects
- Home Atmosphere & Glass Panel
- Command Palette UI
- UI: Checkbox/HoverCard/Pagination
- Lazy Section Loader
- Alert Dialog UI
- Pillars Section & Reveal
- Form UI Component
- Device Performance Context
- Scroll Text Reveal
- Carousel UI Component
- Root Layout & Cookie Consent
- Closing Band & Magnetic CTA
- Home Page Composition
- Philosophy & Capabilities Sections
- Eyebrow Label & Lightbox
- Menubar UI Component
- FAQ Page & Scroll Scrub
- Site Footer & Navigation
- Product Cards & Payment Sheet
- Scroll Reveal Text Variants
- Chart UI Component
- App Providers & Lenis
- Context Menu UI
- Dropdown Menu UI
- Table UI Component
- SEO Head & Schema
- Spotlight Grid Effect
- Breadcrumb UI Component
- Drawer UI Component
- Navigation Menu UI
- Select UI Component
- Word Reveal & Stagger
- Page Atmosphere Context
- Founders Data
- Turn Sequence Animation
- Neural Background Effect
- Card UI Component
- Toggle UI Component
- Dynamic Glow Background
- Case Study Overlay
- Blog Post Page
- Animated Counter & Metric Card
- Glow Background Variant
- Glass Card Component
- Section Shell Wrapper
- Alert UI Component
- OTP Input UI
- Client Marquee
- FAQ Section Component
- Featured Work Section
- Page Scroll Tracker
- Marquee Row Component
- Avatar UI Component
- Badge UI Component
- Tabs UI Component
- 404 Not Found Page
- Floating Orbs Effect
- Fluid Background Effect
- Counter Component
- Still Break Section
- Molten Orb Effect
- Placeholder Component
- Journal Page
- Magnetic Tooltip
- NavLink Wrapper
- Page Transition
- Textarea UI Component
- Floating CTA Button
- Preloader Component
- Scroll Progress Bar

## God Nodes (most connected - your core abstractions)
1. `cn()` - 81 edges
2. `ScrollReveal()` - 10 edges
3. `SequentianBackground` - 9 edges
4. `BlueprintGrid` - 7 edges
5. `AmbientVideo()` - 7 edges
6. `useIsMobile()` - 7 edges
7. `NoiseTexture` - 6 edges
8. `buttonVariants` - 6 edges
9. `SEOHead()` - 5 edges
10. `KineticHeadline()` - 5 edges

## Surprising Connections (you probably didn't know these)
- `WordSwitcher()` --indirect_call--> `t()`  [INFERRED]
  src/components/furnace/home/ClosingBand.tsx → src/components/portfolio/PortfolioFooter.tsx
- `AlertDialogHeader()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/alert-dialog.tsx → src/lib/utils.ts
- `AlertDialogFooter()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/alert-dialog.tsx → src/lib/utils.ts
- `BreadcrumbSeparator()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/breadcrumb.tsx → src/lib/utils.ts
- `BreadcrumbEllipsis()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/breadcrumb.tsx → src/lib/utils.ts

## Import Cycles
- None detected.

## Communities (87 total, 20 thin omitted)

### Community 0 - "Founders Circle Section"
Cohesion: 0.05
Nodes (30): CINEMATIC_EASE, FounderPanel, founders, FoundersCTA, principles, PrinciplesSection, AboutProcessSection, processSteps (+22 more)

### Community 1 - "Contact Page & Footer"
Cohesion: 0.05
Nodes (28): Contact, pillarToService, serviceOptions, Footer, footerLinks, socialLinks, MagneticButton(), MagneticButtonProps (+20 more)

### Community 2 - "UI: Input/Separator/Sheet"
Cohesion: 0.05
Nodes (38): Input, Separator, SheetContent, SheetContentProps, SheetDescription, SheetFooter(), SheetHeader(), SheetOverlay (+30 more)

### Community 3 - "Breadcrumbs & Horizontal Scroll"
Cohesion: 0.09
Nodes (27): BreadcrumbItem, Breadcrumbs, BreadcrumbsProps, routeLabels, HorizontalScrollProps, projectIcons, Lightbox(), LightboxProps (+19 more)

### Community 4 - "Toast UI Component"
Cohesion: 0.12
Nodes (24): Toast, ToastAction, ToastActionElement, ToastClose, ToastDescription, ToastProps, ToastTitle, toastVariants (+16 more)

### Community 5 - "Aashrith Portfolio Page"
Cohesion: 0.07
Nodes (22): brandAlchemyPosts, CareerTimeline, caseStudyData, connectFooterLinks, creativeProjects, CreativeProjectsSection, creativePursuits, EASE (+14 more)

### Community 6 - "Particle BG & Accordion UI"
Cohesion: 0.09
Nodes (16): Particle, ParticleBackground, AccordionContent, AccordionItem, AccordionTrigger, PopoverContent, Progress, RadioGroup (+8 more)

### Community 7 - "Eva Portfolio Page"
Cohesion: 0.09
Nodes (19): PortfolioFooter, PortfolioFooterProps, CareerJourney, ClientShowcase, connectFooterLinks, CreativePhilosophy, EASE, evaGlass() (+11 more)

### Community 8 - "Background Scene & Glass FX"
Cohesion: 0.12
Nodes (16): BackgroundScene, BackgroundSceneProps, sceneConfigs, SceneMode, HyperLiquidGlass, HyperLiquidGlassProps, ParticleField, ThoughtLeadershipCard (+8 more)

### Community 9 - "Hero Section Effects"
Cohesion: 0.14
Nodes (15): CapacityTag(), MONTHS, DecodeText(), DecodeTextProps, BUILDS, ease, Hero(), WeBuild() (+7 more)

### Community 10 - "Home Atmosphere & Glass Panel"
Cohesion: 0.16
Nodes (10): GlassPanel(), GlassPanelProps, AmbientVideo(), HomeAtmosphere(), ease, pillars, ease, ContactPage() (+2 more)

### Community 11 - "Command Palette UI"
Cohesion: 0.12
Nodes (15): Command, CommandDialogProps, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator (+7 more)

### Community 12 - "UI: Checkbox/HoverCard/Pagination"
Cohesion: 0.17
Nodes (13): Checkbox, HoverCardContent, Pagination(), PaginationContent, PaginationEllipsis(), PaginationItem, PaginationLink(), PaginationLinkProps (+5 more)

### Community 13 - "Lazy Section Loader"
Cohesion: 0.14
Nodes (13): FounderCircles, YinYangHero, DefaultSkeleton, LazySection, LazySectionProps, SectionSkeleton, About, AboutProcessSection (+5 more)

### Community 14 - "Alert Dialog UI"
Cohesion: 0.15
Nodes (13): AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter(), AlertDialogHeader(), AlertDialogOverlay, AlertDialogTitle (+5 more)

### Community 15 - "Pillars Section & Reveal"
Cohesion: 0.18
Nodes (10): SmoothReveal(), Offer, Pillar, pillars, ease, kanji, PillarSection(), FAQ (+2 more)

### Community 16 - "Form UI Component"
Cohesion: 0.14
Nodes (11): FormControl, FormDescription, FormFieldContext, FormFieldContextValue, FormItem, FormItemContext, FormItemContextValue, FormLabel (+3 more)

### Community 17 - "Device Performance Context"
Cohesion: 0.20
Nodes (12): CalibrationState, defaults, PerformanceContext, PerformanceContextType, tierConfig, classifyTier(), detectGPU(), DeviceProfile (+4 more)

### Community 18 - "Scroll Text Reveal"
Cohesion: 0.14
Nodes (5): CharacterRevealProps, LineRevealProps, MaskRevealProps, ParagraphRevealProps, ScrollTextRevealProps

### Community 19 - "Carousel UI Component"
Cohesion: 0.14
Nodes (12): Carousel, CarouselApi, CarouselContent, CarouselContext, CarouselContextProps, CarouselItem, CarouselNext, CarouselOptions (+4 more)

### Community 20 - "Root Layout & Cookie Consent"
Cohesion: 0.19
Nodes (8): fraunces, metadata, CookieConsent, EASE_CINEMATIC, GrainOverlay(), LayoutTransition(), pageVariants, ScrollRestoration

### Community 21 - "Closing Band & Magnetic CTA"
Cohesion: 0.19
Nodes (8): WORDS, WordSwitcher(), MagneticCTA(), MagneticCTAProps, spring, Variant, variantClasses, ease

### Community 22 - "Home Page Composition"
Cohesion: 0.18
Nodes (9): ClosingBand, FeaturedWork, HomePage(), Intertext, Pillars, StillBreak, StudioMotion, TheFive (+1 more)

### Community 23 - "Philosophy & Capabilities Sections"
Cohesion: 0.23
Nodes (7): PhilosophySection, AnimatedCapabilities, capabilities, BlueprintGrid, BlueprintGridProps, NoiseTexture, NoiseTextureProps

### Community 24 - "Eyebrow Label & Lightbox"
Cohesion: 0.20
Nodes (9): colorClasses, EyebrowLabel, EyebrowLabelProps, LightboxItem, LightboxModal, LightboxModalProps, portfolioProjects, thoughtLeadershipEntries (+1 more)

### Community 25 - "Menubar UI Component"
Cohesion: 0.17
Nodes (11): Menubar, MenubarCheckboxItem, MenubarContent, MenubarItem, MenubarLabel, MenubarRadioItem, MenubarSeparator, MenubarShortcut() (+3 more)

### Community 26 - "FAQ Page & Scroll Scrub"
Cohesion: 0.24
Nodes (4): faqJsonLd, metadata, ScrollScrub(), faqs

### Community 27 - "Site Footer & Navigation"
Cohesion: 0.22
Nodes (8): FurnaceFooter(), nav, socials, ease, FurnaceNavigation(), navItems, portfolioRoutes, SiteChrome()

### Community 28 - "Product Cards & Payment Sheet"
Cohesion: 0.22
Nodes (5): cardFields, ease, PaymentSheet(), PaymentSheetProps, ease

### Community 29 - "Scroll Reveal Text Variants"
Cohesion: 0.18
Nodes (5): CharacterRevealProps, CharRevealProps, ScrollRevealTextProps, WordByWordRevealProps, WordRevealProps

### Community 30 - "Chart UI Component"
Cohesion: 0.18
Nodes (7): ChartConfig, ChartContainer, ChartContext, ChartContextProps, ChartLegendContent, ChartTooltipContent, THEMES

### Community 31 - "App Providers & Lenis"
Cohesion: 0.24
Nodes (7): LenisProvider(), Providers(), queryClient, Toaster(), ToasterProps, PageAtmosphereProvider(), PerformanceProvider

### Community 32 - "Context Menu UI"
Cohesion: 0.20
Nodes (9): ContextMenuCheckboxItem, ContextMenuContent, ContextMenuItem, ContextMenuLabel, ContextMenuRadioItem, ContextMenuSeparator, ContextMenuShortcut(), ContextMenuSubContent (+1 more)

### Community 33 - "Dropdown Menu UI"
Cohesion: 0.20
Nodes (9): DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuShortcut(), DropdownMenuSubContent (+1 more)

### Community 34 - "Table UI Component"
Cohesion: 0.22
Nodes (8): Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow

### Community 35 - "SEO Head & Schema"
Cohesion: 0.25
Nodes (3): defaultMeta, SEOHead(), SEOHeadProps

### Community 36 - "Spotlight Grid Effect"
Cohesion: 0.25
Nodes (4): SpotlightContainerProps, SpotlightContext, SpotlightContextType, SpotlightItemProps

### Community 37 - "Breadcrumb UI Component"
Cohesion: 0.25
Nodes (7): Breadcrumb, BreadcrumbEllipsis(), BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator()

### Community 38 - "Drawer UI Component"
Cohesion: 0.25
Nodes (6): DrawerContent, DrawerDescription, DrawerFooter(), DrawerHeader(), DrawerOverlay, DrawerTitle

### Community 39 - "Navigation Menu UI"
Cohesion: 0.25
Nodes (7): NavigationMenu, NavigationMenuContent, NavigationMenuIndicator, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle, NavigationMenuViewport

### Community 40 - "Select UI Component"
Cohesion: 0.25
Nodes (7): SelectContent, SelectItem, SelectLabel, SelectScrollDownButton, SelectScrollUpButton, SelectSeparator, SelectTrigger

### Community 41 - "Word Reveal & Stagger"
Cohesion: 0.25
Nodes (3): CharacterRevealProps, StaggerContainerProps, WordRevealProps

### Community 42 - "Page Atmosphere Context"
Cohesion: 0.25
Nodes (6): AtmosphereConfig, atmosphereConfigs, AtmosphericBackground, PageAtmosphereContext, PageAtmosphereContextType, PageAtmosphereProviderProps

### Community 43 - "Founders Data"
Cohesion: 0.25
Nodes (7): aashrithData, evaBrandCollaborations, evaData, FounderData, FounderExperience, FounderProject, FounderVenture

### Community 44 - "Turn Sequence Animation"
Cohesion: 0.38
Nodes (4): frameSrc(), LINES, ScrubSequence(), TurnSequence()

### Community 45 - "Neural Background Effect"
Cohesion: 0.29
Nodes (4): Config, NeuralBackground, NeuralBackgroundProps, Particle

### Community 46 - "Card UI Component"
Cohesion: 0.29
Nodes (6): Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle

### Community 47 - "Toggle UI Component"
Cohesion: 0.33
Nodes (5): ToggleGroup, ToggleGroupContext, ToggleGroupItem, Toggle, toggleVariants

### Community 48 - "Dynamic Glow Background"
Cohesion: 0.33
Nodes (5): DynamicGlowBg, DynamicGlowBgProps, glowImagePaths, GlowPosition, GlowVariant

### Community 49 - "Case Study Overlay"
Cohesion: 0.33
Nodes (5): accentMap, CaseStudyData, CaseStudyOverlay, CaseStudyOverlayProps, fallbackAccent

### Community 52 - "Glow Background Variant"
Cohesion: 0.40
Nodes (4): GlowBackground, GlowBackgroundProps, GlowVariant, variantStyles

### Community 53 - "Glass Card Component"
Cohesion: 0.40
Nodes (4): GlassCard, GlassCardProps, paddingClasses, variantStyles

### Community 54 - "Section Shell Wrapper"
Cohesion: 0.40
Nodes (4): maxWidthClasses, paddingClasses, SectionShell, SectionShellProps

### Community 55 - "Alert UI Component"
Cohesion: 0.40
Nodes (4): Alert, AlertDescription, AlertTitle, alertVariants

### Community 56 - "OTP Input UI"
Cohesion: 0.40
Nodes (4): InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot

### Community 58 - "FAQ Section Component"
Cohesion: 0.50
Nodes (3): FAQCard, faqs, FAQSection

### Community 61 - "Marquee Row Component"
Cohesion: 0.50
Nodes (3): MarqueeRow, MarqueeRowProps, speedDurations

### Community 62 - "Avatar UI Component"
Cohesion: 0.50
Nodes (3): Avatar, AvatarFallback, AvatarImage

### Community 63 - "Badge UI Component"
Cohesion: 0.67
Nodes (3): Badge(), BadgeProps, badgeVariants

### Community 64 - "Tabs UI Component"
Cohesion: 0.50
Nodes (3): TabsContent, TabsList, TabsTrigger

## Knowledge Gaps
- **443 isolated node(s):** `fraunces`, `metadata`, `metadata`, `faqJsonLd`, `AnimatedCounterProps` (+438 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **20 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `UI: Checkbox/HoverCard/Pagination` to `Founders Circle Section`, `UI: Input/Separator/Sheet`, `Toast UI Component`, `Particle BG & Accordion UI`, `Background Scene & Glass FX`, `Command Palette UI`, `Alert Dialog UI`, `Form UI Component`, `Carousel UI Component`, `Eyebrow Label & Lightbox`, `Menubar UI Component`, `Chart UI Component`, `Context Menu UI`, `Dropdown Menu UI`, `Table UI Component`, `Breadcrumb UI Component`, `Drawer UI Component`, `Navigation Menu UI`, `Select UI Component`, `Card UI Component`, `Toggle UI Component`, `Glass Card Component`, `Section Shell Wrapper`, `Alert UI Component`, `OTP Input UI`, `Marquee Row Component`, `Avatar UI Component`, `Badge UI Component`, `Tabs UI Component`, `NavLink Wrapper`, `Textarea UI Component`?**
  _High betweenness centrality (0.213) - this node is a cross-community bridge._
- **Why does `t()` connect `Hero Section Effects` to `Closing Band & Magnetic CTA`, `Eva Portfolio Page`?**
  _High betweenness centrality (0.143) - this node is a cross-community bridge._
- **Why does `Loader()` connect `Hero Section Effects` to `Home Page Composition`?**
  _High betweenness centrality (0.065) - this node is a cross-community bridge._
- **What connects `fraunces`, `metadata`, `metadata` to the rest of the system?**
  _443 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Founders Circle Section` be split into smaller, more focused modules?**
  _Cohesion score 0.05370101596516691 - nodes in this community are weakly interconnected._
- **Should `Contact Page & Footer` be split into smaller, more focused modules?**
  _Cohesion score 0.05314009661835749 - nodes in this community are weakly interconnected._
- **Should `UI: Input/Separator/Sheet` be split into smaller, more focused modules?**
  _Cohesion score 0.05179704016913319 - nodes in this community are weakly interconnected._