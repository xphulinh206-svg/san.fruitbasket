import { useState, useEffect } from 'react';
import { Currency, Language, Hamper, CartItem, Review, CustomHamperConfig } from './types';
import { INITIAL_HAMPERS, INITIAL_REVIEWS } from './data/hampers';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TrustBar } from './components/TrustBar';
import { CollectionsGrid } from './components/CollectionsGrid';
import { HamperCatalog } from './components/HamperCatalog';
import { BespokeAtelier } from './components/BespokeAtelier';
import { DeliveryZones } from './components/DeliveryZones';
import { Testimonials } from './components/Testimonials';
import { CtaBanner } from './components/CtaBanner';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { SearchModal } from './components/SearchModal';
import { CorporateModal } from './components/CorporateModal';
import { FloatingConcierge } from './components/FloatingConcierge';

export default function App() {
  // Localization & Currency
  const [language, setLanguage] = useState<Language>('EN');
  const [currency, setCurrency] = useState<Currency>('VND');

  // Products & Reviews Data
  const [hampers] = useState<Hamper[]>(INITIAL_HAMPERS);
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [wishlist, setWishlist] = useState<string[]>(['sf-701', 'sf-809']);

  // Category filter
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Pre-populated cart with 3 items matching the initial '3' badge from the design
  const [cart, setCart] = useState<CartItem[]>([
    {
      id: 'cart-1',
      hamperId: 'sf-701',
      name: 'The Prestige Grand Harvest',
      sku: 'SF-701',
      priceVnd: 2850000,
      priceUsd: 112,
      image: INITIAL_HAMPERS[0].image,
      quantity: 1,
    },
    {
      id: 'cart-2',
      hamperId: 'sf-612',
      name: 'Botanical Meadow Rattan',
      sku: 'SF-612',
      priceVnd: 1980000,
      priceUsd: 78,
      image: INITIAL_HAMPERS[2].image,
      quantity: 1,
    },
    {
      id: 'cart-3',
      name: 'Bespoke Walnut Heirloom Chest',
      sku: 'SF-CUSTOM',
      priceVnd: 2450000,
      priceUsd: 96,
      image: INITIAL_HAMPERS[1].image,
      quantity: 1,
      customDetails: {
        vessel: 'Walnut Wood Chest',
        fruits: ['Shine Muscat', 'Tasmanian Cherries', 'Korean Singo Pear'],
        ribbon: 'Champagne Gold Satin',
        calligraphyMessage: 'Wishing you vibrant health and abundant prosperity in Saigon!',
      },
    },
  ]);

  // Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCorporateOpen, setIsCorporateOpen] = useState(false);
  const [detailHamper, setDetailHamper] = useState<Hamper | null>(null);

  // Cart total items count
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Keyboard shortcut ⌘K for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Cart Handlers
  const handleAddToCart = (hamper: Hamper, quantity: number = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.hamperId === hamper.id);
      if (existing) {
        return prev.map((item) =>
          item.hamperId === hamper.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          id: `item-${Date.now()}`,
          hamperId: hamper.id,
          name: language === 'VN' ? hamper.nameVn : hamper.name,
          sku: hamper.sku,
          priceVnd: hamper.priceVnd,
          priceUsd: hamper.priceUsd,
          image: hamper.image,
          quantity,
        },
      ];
    });
  };

  const handleAddCustomHamper = (
    config: CustomHamperConfig,
    calculatedPriceVnd: number,
    calculatedPriceUsd: number
  ) => {
    const vesselName =
      config.vessel === 'rattan'
        ? 'Artisanal Rattan Picnic'
        : config.vessel === 'walnut'
        ? 'Laser-Engraved Walnut Wood'
        : 'Crystal Acrylic Keepsake';

    const newItem: CartItem = {
      id: `custom-${Date.now()}`,
      name: `Bespoke Atelier: ${vesselName}`,
      sku: 'SF-BESPOKE',
      priceVnd: calculatedPriceVnd,
      priceUsd: calculatedPriceUsd,
      image:
        config.vessel === 'walnut'
          ? INITIAL_HAMPERS[1].image
          : config.vessel === 'acrylic'
          ? INITIAL_HAMPERS[3].image
          : INITIAL_HAMPERS[0].image,
      quantity: 1,
      customDetails: {
        vessel: vesselName,
        fruits: config.coreFruits,
        ribbon: config.ribbon,
        addon: config.addon !== 'none' ? config.addon : undefined,
        calligraphyMessage: config.calligraphyMessage,
      },
    };

    setCart((prev) => [newItem, ...prev]);
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(id);
    } else {
      setCart((prev) =>
        prev.map((item) => (item.id === id ? { ...item, quantity: newQty } : item))
      );
    }
  };

  const handleRemoveItem = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleToggleWishlist = (hamperId: string) => {
    setWishlist((prev) =>
      prev.includes(hamperId)
        ? prev.filter((id) => id !== hamperId)
        : [...prev, hamperId]
    );
  };

  const handleCustomizeHamper = (hamper: Hamper) => {
    const el = document.getElementById('bespoke-atelier');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectCategory = (cat: string) => {
    setSelectedCategory(cat);
    const elem = document.getElementById('order-catalog');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#f6fbf5] text-[#181d1a] flex flex-col font-sans selection:bg-[#ffdf9b] selection:text-[#251a00]">
      {/* Fixed Sticky Header */}
      <Header
        language={language}
        setLanguage={setLanguage}
        currency={currency}
        setCurrency={setCurrency}
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenCorporate={() => setIsCorporateOpen(true)}
        onSelectCategory={handleSelectCategory}
      />

      {/* Main Content Sections */}
      <main className="flex-1 w-full">
        {/* Hero Section */}
        <Hero
          language={language}
          currency={currency}
          onExploreCollections={() => {
            const el = document.getElementById('collections');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenCorporate={() => setIsCorporateOpen(true)}
          onQuickViewHamper={(h) => setDetailHamper(h)}
          featuredHamper={hampers[0]}
        />

        {/* 4 Pillars Trust Bar */}
        <TrustBar language={language} />

        {/* Curated Portfolios Bento Grid */}
        <CollectionsGrid
          language={language}
          currency={currency}
          onSelectCategory={handleSelectCategory}
          onOpenCorporate={() => setIsCorporateOpen(true)}
          onOpenCustomizer={() => {
            const el = document.getElementById('bespoke-atelier');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Best-Selling Hampers with Filters & Quick Order */}
        <HamperCatalog
          language={language}
          currency={currency}
          hampers={hampers}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          onAddToCart={(h) => handleAddToCart(h, 1)}
          onCustomizeHamper={handleCustomizeHamper}
          onQuickViewHamper={(h) => setDetailHamper(h)}
          wishlist={wishlist}
          onToggleWishlist={handleToggleWishlist}
        />

        {/* Bespoke Atelier Custom Hamper Designer */}
        <BespokeAtelier
          language={language}
          currency={currency}
          onAddCustomHamperToCart={handleAddCustomHamper}
        />

        {/* HCMC Delivery Coverage & Interactive District Calculator */}
        <DeliveryZones language={language} currency={currency} />

        {/* Testimonials & Reviews */}
        <Testimonials
          language={language}
          reviews={reviews}
          onAddReview={(newRev) => setReviews([newRev, ...reviews])}
        />

        {/* VIP Atelier Call To Action Banner */}
        <CtaBanner
          language={language}
          onOpenSommelierHotline={() => setIsCorporateOpen(true)}
        />
      </main>

      {/* Footer */}
      <Footer
        language={language}
        onOpenCorporate={() => setIsCorporateOpen(true)}
        onOpenCategory={handleSelectCategory}
      />

      {/* Floating Concierge Speed Dial & Live Chat */}
      <FloatingConcierge language={language} />

      {/* Slide-over Shopping Basket & Checkout Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        language={language}
        currency={currency}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Hamper Quick View / Detail Modal */}
      <ProductDetailModal
        hamper={detailHamper}
        onClose={() => setDetailHamper(null)}
        language={language}
        currency={currency}
        onAddToCart={(h, qty) => handleAddToCart(h, qty)}
        onCustomize={handleCustomizeHamper}
      />

      {/* Live Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        language={language}
        currency={currency}
        hampers={hampers}
        onSelectHamper={(h) => setDetailHamper(h)}
        onAddToCart={(h) => handleAddToCart(h, 1)}
      />

      {/* Corporate B2B & Diplomatic Inquiry Modal */}
      <CorporateModal
        isOpen={isCorporateOpen}
        onClose={() => setIsCorporateOpen(false)}
        language={language}
      />
    </div>
  );
}
