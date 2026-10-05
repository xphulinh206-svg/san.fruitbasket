import { Hamper, DeliveryZoneInfo, Review } from '../types';

export const INITIAL_HAMPERS: Hamper[] = [
  {
    id: 'sf-701',
    sku: 'SF-701',
    name: 'The Prestige Grand Harvest',
    nameVn: 'Đại Mùa Vàng Prestige Grand Harvest',
    subtitle: 'Shine Muscat • Tasmanian Cherries • Korean Singo Pears',
    subtitleVn: 'Nho Mẫu Đơn Nhật • Cherry Tasmania Úc • Lê Nâu Hàn Quốc',
    description: 'Premium Shine Muscat, Korean Singo Pears, Envy Apples & fresh ranunculus with champagne gold silk ribbon in hand-woven botanical rattan.',
    descriptionVn: 'Nho mẫu đơn cao cấp, lê nâu Hàn Quốc mọng nước, táo Envy New Zealand và hoa mao lương trắng tinh khôi điểm nơ lụa vàng ánh kim sang trọng.',
    priceVnd: 2850000,
    priceUsd: 112,
    image: 'https://lh3.googleusercontent.com/aida/AEtjO1WwmzVdinuK2qAV8kntKpNF15CJDeOy0VzD26tVI7i4A1b6ZoVBhxKwN2P4AI4Hi9fi81Z_DE0RpJAJu889y_5aCx2_QO95KuS4r5SVLRC77SPukm_L16MXSWHVfnqbcJxXqBqvBy8oyzXg-cOyngsqlVaJbx4wYANvMlPtovKR4F9Xx2ljQcI_tOc-ArUG6UzUGw_kTB8juNQi_NdQhMG8yDOUnthdh40LCZ_cT9CqLMH1Lq0cPTbWj7zk',
    category: 'floral-baskets',
    origin: 'Japan & Korea',
    originVn: 'Nhật Bản & Hàn Quốc',
    isBestseller: true,
    isExpress2H: true,
    fruits: ['Shine Muscat Grapes (Okayama)', 'Korean Singo Pear', 'Envy Apples', 'Tasmanian Cherries'],
    vessel: 'Artisanal Hand-Plaited Rattan',
    pairing: 'Fresh Ranunculus & Waxflowers',
    dimensions: '38cm x 28cm x 34cm',
    rating: 4.95
  },
  {
    id: 'sf-809',
    sku: 'SF-809',
    name: 'The Diplomat Walnut Chest',
    nameVn: 'Rương Gỗ Óc Chó The Diplomat',
    subtitle: 'Direct auction GlobalG.A.P fruits in heirloom wood',
    subtitleVn: 'Trái cây đấu giá hạng nhất trong rương gỗ nguyên khối',
    description: 'Heirloom solid walnut chest laser-engraved with your company crest, holding crisp Envy apples, golden Singo pears, and rare winter plums.',
    descriptionVn: 'Hộp gỗ óc chó cao cấp khắc laser tên/logo doanh nghiệp, tuyển chọn táo Envy mọng giòn, lê nâu hoàng gia và mận đen nhập khẩu thượng hạng.',
    priceVnd: 3450000,
    priceUsd: 136,
    image: 'https://lh3.googleusercontent.com/aida/AEtjO1U4M_diLxagX8vJT3DlLse02dkrMb77eBVjWGa9C_mF05dkW2OiBhigpyd9dhQXIeesNLlXNhBZM_jcmW3foxLx7JrOZrzxFiVhZlW7gNkGBZ-ZYD3j3zmdLT-68i8IW6xNNnxoUcIPG8lbSzqNkiZUeNIHDLREXf1_yHDudtoL94eeAIg1bxJipcIJRCfQ5jO4YqHNStKVrAaflOTkTjcF6qg8J-CXFqxxpCMgeDVNAZZNoV47jIxx_-On',
    category: 'vip-wooden',
    origin: 'USA & Korea',
    originVn: 'Mỹ & Hàn Quốc',
    isExecutiveChoice: true,
    isExpress2H: true,
    fruits: ['Envy Apples (Grade 1)', 'Korean Singo Pears', 'Japanese Crown Melon slice', 'Californian Blueberries'],
    vessel: 'Handcrafted Solid American Walnut',
    pairing: 'Bespoke Laser Engraving & Gold Brass Clasp',
    dimensions: '42cm x 30cm x 18cm',
    rating: 5.0
  },
  {
    id: 'sf-612',
    sku: 'SF-612',
    name: 'Botanical Meadow Rattan',
    nameVn: 'Giỏ Mây Đồng Hoa Tự Nhiên',
    subtitle: 'Linen-lined picnic basket with organic garden blooms',
    subtitleVn: 'Giỏ mây lót vải đay cùng hoa thảo mộc tự nhiên',
    description: 'Linen-lined picnic basket loaded with Shine Muscat clusters, Tasmanian cherries, and fragrant waxflower blooms.',
    descriptionVn: 'Giỏ mây phong cách picnic Châu Âu lót vải thô mộc, trĩu nặng chùm nho mẫu đơn giòn ngọt, cherry cuống tươi xanh và hoa thanh liễu đồng nội.',
    priceVnd: 1980000,
    priceUsd: 78,
    image: 'https://lh3.googleusercontent.com/aida/AEtjO1UWGJ65VwNu_GyRlt2UYAMYXST5s4yOX9xnY2IlEMiMMUoNK6LtIm-Xvs_XR7Uou-CXas_MEIUxSrwcmGCcgg7EDctZxu_aHEk-hVZ_osIzUAsCx-mrSQa6eCDg7I7ddHlUOBo8ldRJv-CShfi7XgflNZt2aryU8ocT9a5Qu5MC-Uu-y1WdVF4G19az8wiu9U38I-0Ytm21ZknGgKT--U-kVymfpU7et6GkxiP6qAZBZXSn1LwiwtBduy-H',
    category: 'floral-baskets',
    origin: 'Australia & Japan',
    originVn: 'Úc & Nhật Bản',
    isBestseller: true,
    isExpress2H: true,
    fruits: ['Shine Muscat Grapes', 'Tasmanian Dark Cherries', 'South African Mandarins'],
    vessel: 'Hand-Woven Natural Reed & Rattan',
    pairing: 'Australian Waxflowers & Eucalyptus',
    dimensions: '35cm x 25cm x 30cm',
    rating: 4.88
  },
  {
    id: 'sf-505',
    sku: 'SF-505',
    name: 'Crystal Acrylic Keepsake Coffret',
    nameVn: 'Hộp Mica Pha Lê Crystal Keepsake',
    subtitle: 'Transparent modern showcase with Japanese Crown Melon',
    subtitleVn: 'Hộp trong suốt hiện đại phối dưa lưới Shizuoka Nhật',
    description: 'Sleek transparent acrylic coffret lined with imported Korean strawberries, Japanese Crown Melons, and delicate preserved botanicals.',
    descriptionVn: 'Hộp acrylic nguyên khối trong suốt như pha lê, nâng niu dưa lưới Shizuoka Nhật Bản ngọt thanh cùng dâu tây tuyết Hàn Quốc thơm dịu.',
    priceVnd: 2450000,
    priceUsd: 96,
    image: 'https://images.unsplash.com/photo-1577058189678-8319a4e23cf6?auto=format&fit=crop&w=800&q=80',
    category: 'crystal-acrylic',
    origin: 'Japan & Korea',
    originVn: 'Nhật Bản & Hàn Quốc',
    isBestseller: false,
    isExpress2H: true,
    fruits: ['Japanese Shizuoka Crown Melon', 'Korean Maehyang Strawberries', 'California Black Mission Figs'],
    vessel: 'Seamless 5mm High-Clarity Crystal Acrylic',
    pairing: 'Preserved White Hydrangeas & Gold Foil Seal',
    dimensions: '32cm x 32cm x 20cm',
    rating: 4.92
  },
  {
    id: 'sf-902',
    sku: 'SF-902',
    name: 'Champagne Étoile Celebration Hamper',
    nameVn: 'Giỏ Thượng Phẩm Champagne Étoile',
    subtitle: 'Moët & Chandon Impérial with French Gateau & Royal Cherries',
    subtitleVn: 'Moët & Chandon Impérial cùng bánh gateau Pháp & cherry hảo hạng',
    description: 'Infused with Moët & Chandon French Champagne, artisanal fruit preserves, and fresh gateaux handcrafted by our pastry atelier.',
    descriptionVn: 'Tuyệt tác kết hợp chai Champagne Moët & Chandon Impérial chính hãng, bánh kem hạt dẻ Pháp nướng tươi cùng quả anh đào sẫm màu Tasmania.',
    priceVnd: 4200000,
    priceUsd: 165,
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80',
    category: 'seasonal-wine',
    origin: 'France & New Zealand',
    originVn: 'Pháp & New Zealand',
    isExecutiveChoice: true,
    isExpress2H: true,
    fruits: ['Tasmanian Royal Cherries', 'New Zealand Kiwi Gold', 'Japanese Shine Muscat'],
    vessel: 'Double-Handle Antique Woven Picnic Basket',
    pairing: 'Moët & Chandon Brut 750ml & French Hazelnut Gateau',
    dimensions: '45cm x 32cm x 36cm',
    rating: 5.0
  },
  {
    id: 'sf-330',
    sku: 'SF-330',
    name: 'Jardin de Dalat Organic Botanica',
    nameVn: 'Vườn Hoa Quả Jardin de Dalat',
    subtitle: 'Sweet Dalat berries, organic avocados & fresh pastel roses',
    subtitleVn: 'Dâu tây Đà Lạt, bơ hữu cơ & hoa hồng phấn cao nguyên',
    description: 'A charming rustic arrangement featuring sweet Dalat strawberries, Hass avocados, imported seedless grapes, and pastel Ecuadorian garden roses.',
    descriptionVn: 'Thiết kế dịu dàng mang hương sắc Đà Lạt với dâu tây sạch, bơ béo ngậy, nho xanh không hạt nhập khẩu và hoa hồng Ohara tỏa ngát hương thơm.',
    priceVnd: 1650000,
    priceUsd: 65,
    image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=800&q=80',
    category: 'floral-baskets',
    origin: 'Vietnam & USA',
    originVn: 'Việt Nam & Mỹ',
    isBestseller: false,
    isExpress2H: true,
    fruits: ['Dalat Sweet Strawberries', 'Organic Hass Avocado', 'USA Autumn Crisp Green Grapes'],
    vessel: 'Handmade Bamboo & Rattan Basket',
    pairing: 'Pink Ohara Garden Roses & Silver Leaves',
    dimensions: '30cm x 22cm x 28cm',
    rating: 4.85
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'Alexander Miller',
    initials: 'AM',
    role: 'General Director',
    roleVn: 'Tổng Giám Đốc',
    location: 'Thao Dien (District 2)',
    content: "Ordering gifts in Vietnam as an expat can be daunting with language barriers, but SANFRUIT's concierge was completely fluent in English on WhatsApp. The Shine Muscat basket arrived in Thao Dien in under 2 hours, beautifully chilled!",
    contentVn: "Là người nước ngoài đặt quà ở Việt Nam từng gặp nhiều rào cản ngôn ngữ, nhưng chuyên viên của SANFRUIT giao tiếp tiếng Anh cực kỳ lưu loát qua WhatsApp. Giỏ nho mẫu đơn giao đến Thảo Điền chưa đầy 2 tiếng, hoa và quả được giữ lạnh tuyệt đối!",
    rating: 5,
    date: '2 days ago'
  },
  {
    id: 'rev-2',
    author: 'Le Nhat Linh',
    initials: 'LN',
    role: 'Chief of Staff',
    roleVn: 'Chánh Văn Phòng',
    location: 'Bitexco Financial Tower, D1',
    content: "We ordered 25 engraved walnut hampers for our multinational executive partners in District 1. Every single fruit was spotless and sweet, and the calligraphy card was an elegant bespoke touch that wowed our board.",
    contentVn: "Công ty chúng tôi đặt 25 rương gỗ óc chó khắc laser logo tặng lãnh đạo đối tác đa quốc gia ở Quận 1. Từng trái cây đều hoàn mỹ không tì vết, thiệp thư pháp viết tay sắc sảo khiến ban điều hành vô cùng ấn tượng.",
    rating: 5,
    date: '1 week ago'
  },
  {
    id: 'rev-3',
    author: 'Claire Henderson',
    initials: 'CH',
    role: 'Expat Resident',
    roleVn: 'Cư Dân Quốc Tế',
    location: 'Phu My Hung (District 7)',
    content: "Living in Phu My Hung, I regularly send fruit baskets to friends and clients. SANFRUIT is the only florist-fruit atelier in Saigon that combines Michelin-tier presentation with truly authentic imported cherries and Korean pears.",
    contentVn: "Sống tại Phú Mỹ Hưng, tôi thường xuyên gửi giỏ quà tặng người thân và khách VIP. SANFRUIT là thương hiệu duy nhất ở Sài Gòn kết hợp được độ sang trọng chuẩn Michelin với cherry cuống tươi giòn và lê Hàn Quốc nhập khẩu chính ngạch.",
    rating: 5,
    date: '2 weeks ago'
  }
];

export const DELIVERY_ZONES: DeliveryZoneInfo[] = [
  {
    id: 'inner-core',
    zoneTitle: 'Inner Core & Business',
    zoneTitleVn: 'Khu Trung Tâm & Doanh Nghiệp',
    eta: '1 - 2 Hours',
    etaVn: '1 - 2 Giờ',
    districts: ['District 1', 'District 3', 'Binh Thanh', 'Phu Nhuan'],
    description: 'District 1, District 3, Binh Thanh, and Phu Nhuan. Immediate dispatch for executive boardrooms, embassies, and luxury hotels.',
    descriptionVn: 'Quận 1, Quận 3, Bình Thạnh, Phú Nhuận. Điều phối xe chuyên dụng hỏa tốc đến các văn phòng hội đồng quản trị, đại sứ quán và khách sạn 5 sao.',
    perk: 'Free delivery on hampers over 2,000,000₫',
    perkVn: 'Miễn phí giao hàng cho đơn từ 2.000.000₫',
    baseFeeVnd: 50000,
    freeShippingThresholdVnd: 2000000
  },
  {
    id: 'expat-enclaves',
    zoneTitle: 'Expat Enclaves',
    zoneTitleVn: 'Khu Đô Thị Quốc Tế & Biệt Thự',
    eta: '2 - 3 Hours',
    etaVn: '2 - 3 Giờ',
    districts: ['District 2 (Thao Dien, An Phu)', 'District 7 (Phu My Hung)'],
    description: 'District 2 (Thao Dien, An Phu) & District 7 (Phu My Hung). Direct residential drop-off with concierge greeting.',
    descriptionVn: 'Quận 2 (Thảo Điền, An Phú) & Quận 7 (Phú Mỹ Hưng). Giao tận cửa biệt thự, căn hộ cao cấp với phong thái phục vụ chuẩn mực ân cần.',
    perk: 'Villa & high-rise apartment direct handover',
    perkVn: 'Giao trực tiếp lễ tân hoặc tận cửa căn hộ / biệt thự',
    baseFeeVnd: 70000,
    freeShippingThresholdVnd: 2000000
  },
  {
    id: 'greater-hcmc',
    zoneTitle: 'Greater HCMC & Thu Duc',
    zoneTitleVn: 'Ngoại Thành & TP. Thủ Đức',
    eta: 'Same-Day (Custom Slot)',
    etaVn: 'Trong Ngày (Hẹn Giờ Chuẩn)',
    districts: ['District 4', 'District 5', 'District 10', 'Go Vap', 'Tan Binh', 'Thu Duc City'],
    description: 'District 4, 5, 10, Go Vap, Tan Binh, and Thu Duc City. Scheduled time slots booked online or through WhatsApp.',
    descriptionVn: 'Quận 4, 5, 10, Gò Vấp, Tân Bình và TP. Thủ Đức. Đặt lịch giao theo khung giờ chính xác qua website hoặc WhatsApp / Zalo.',
    perk: 'Precision time-slot appointments available',
    perkVn: 'Hỗ trợ đặt lịch chính xác theo từng khung giờ hẹn',
    baseFeeVnd: 90000,
    freeShippingThresholdVnd: 2500000
  }
];

export const CORE_FRUITS_LIST = [
  { id: 'muscat', name: 'Shine Muscat', nameVn: 'Nho Mẫu Đơn Nhật', price: 400000 },
  { id: 'cherries', name: 'Tasmanian Cherries', nameVn: 'Cherry Đen Tasmania', price: 350000 },
  { id: 'singo', name: 'Korean Singo Pear', nameVn: 'Lê Nâu Hàn Quốc', price: 180000 },
  { id: 'melon', name: 'Japanese Melon', nameVn: 'Dưa Lưới Hoàng Gia', price: 320000 },
  { id: 'strawberries', name: 'Korean Strawberries', nameVn: 'Dâu Hàn Tuyết Mọng', price: 260000 },
  { id: 'envy', name: 'Envy Apples NZ', nameVn: 'Táo Envy Giòn Ngọt', price: 200000 }
];

export const RIBBON_OPTIONS = [
  { id: 'gold', name: 'Champagne Gold Satin (Signature)', nameVn: 'Lụa Vàng Ánh Kim Champagne (Chữ Ký)', color: '#d4af37' },
  { id: 'emerald', name: 'Forest Emerald Velvet', nameVn: 'Nhung Xanh Lục Bảo Sang Trọng', color: '#113d32' },
  { id: 'ivory', name: 'Pearl Ivory Silk', nameVn: 'Lụa Tơ Tằm Trắng Ngà Tinh Khôi', color: '#f5f5dc' },
  { id: 'burgundy', name: 'Burgundy Festive Grosgrain', nameVn: 'Ruy Băng Đỏ Rượu Vang Quý Tộc', color: '#631f0e' }
];

export const ADDON_OPTIONS = [
  { id: 'none', name: 'None (Pure Fruit Basket)', nameVn: 'Không kèm (Thuần Giỏ Trái Cây)', priceVnd: 0, priceUsd: 0 },
  { id: 'gateau', name: 'Artisanal French Gateau (+450,000₫)', nameVn: 'Bánh Kem Pháp Tươi Artisanal (+450.000₫)', priceVnd: 450000, priceUsd: 18 },
  { id: 'bordeaux', name: 'Bordeaux Grand Cru Wine (+980,000₫)', nameVn: 'Vang Đỏ Bordeaux Grand Cru (+980.000₫)', priceVnd: 980000, priceUsd: 38 },
  { id: 'champagne', name: 'Moët & Chandon Impérial (+1,850,000₫)', nameVn: 'Champagne Moët & Chandon (+1.850.000₫)', priceVnd: 1850000, priceUsd: 73 }
];
