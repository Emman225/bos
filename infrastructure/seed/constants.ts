import { Product } from '../../domain/entities/Product';
import { Category } from '../../domain/entities/Category';

export const CATEGORIES: Category[] = [
  {
    id: 'test',
    name: 'Test & Mesure',
    description: 'OTDR haute précision, soudeuses par fusion et certificateurs de câblage.',
    icon: 'query_stats',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'fibre',
    name: 'Fibre Optique',
    description: 'Câbles à ruban, jarretières blindées et accessoires FTTH premium.',
    icon: 'settings_input_component',
    image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'networks',
    name: 'Télécom & Réseaux',
    description: 'Switches industriels, routeurs core et infrastructure active sécurisée.',
    icon: 'lan',
    image: 'https://images.unsplash.com/photo-1562408590-e32931084e23?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'solar',
    name: 'Énergie Solaire',
    description: 'Systèmes hybrides pour l\'alimentation autonome des sites isolés.',
    icon: 'solar_power',
    image: 'https://images.unsplash.com/photo-1508514177221-188b171f2bb3?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'calib',
    name: 'Calibrage',
    description: 'Calibration certifiée et maintenance préventive en environnement contrôlé.',
    icon: 'architecture',
    image: 'https://images.unsplash.com/photo-1516110833967-0b5716ca1387?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'raccord',
    name: 'Raccordement',
    description: 'Outillage professionnel, consommables et connecteurs pour le raccordement fibre.',
    icon: 'cable',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'info',
    name: 'Informatique',
    description: 'Accessoires IT, câblage structuré, adaptateurs et équipements bureautiques.',
    icon: 'computer',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=1200'
  }
];

export const PRODUCTS: Product[] = [
  // --- TEST & MESURE ---
  {
    id: 'viavi-otdr-100',
    name: 'VIAVI SmartOTDR Pro Série 100A',
    category: 'Test & Mesure',
    brand: 'VIAVI Solutions',
    ref: 'VIAVI-S100A-SM',
    image: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&q=80&w=1000',
    images: [
      'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=1000'
    ],
    description: 'Instrument de test compact intégrant OTDR, Wattmètre, Source Laser et Localisateur de Défauts.',
    features: ['Plage dynamique 37/35dB', 'Tests auto-bidirectionnels', 'Connectivité Cloud', 'Autonomie 12h+'],
    stock: true,
    isNew: true
  },
  {
    id: 'fujikura-90s-plus',
    name: 'Soudeuse Fujikura 90S+ Core Alignment',
    category: 'Test & Mesure',
    brand: 'Fujikura',
    ref: 'FUJI-90S-PLUS-KIT',
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=1000',
    images: [
      'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?auto=format&fit=crop&q=80&w=1000'
    ],
    description: 'Alignement coeur à coeur assistée par IA pour des soudures parfaites.',
    features: ['Soudure en 6s', 'Protection IP52', 'Cliveuse Bluetooth', 'Four rapide'],
    stock: true
  },
  {
    id: 'viavi-fbp-kit',
    name: 'Kit Inspection Fibre P5000i Pro',
    category: 'Test & Mesure',
    brand: 'VIAVI Solutions',
    ref: 'VIAVI-FBP-P5000I',
    image: 'https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?auto=format&fit=crop&q=80&w=1000',
    images: [
      'https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=1000'
    ],
    description: 'Microscope d\'inspection automatique pour garantir la propreté des connecteurs.',
    features: ['Analyse Pass/Fail auto', 'Double grossissement', 'Compatible Smartphone', 'Certification CE'],
    stock: true
  },
  {
    id: 'fluke-versiv-pro',
    name: 'Certificateur Fluke Versiv DSX-8000',
    category: 'Test & Mesure',
    brand: 'Fluke Networks',
    ref: 'FLK-DSX-8000',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=1000',
    images: [
      'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&q=80&w=1000'
    ],
    description: 'Système de certification de câblage cuivre et fibre le plus rapide au monde.',
    features: ['Cat 8 certifié', 'Temps de test 8s', 'Gestion ProjX', 'Export LinkWare'],
    stock: false
  },

  // --- FIBRE OPTIQUE ---
  {
    id: 'odf-1u-24',
    name: 'Tiroir Optique 1U 24 Ports LC-Duplex',
    category: 'Fibre Optique',
    brand: 'BOS-CI Premium',
    ref: 'BOS-ODF-1U-24LC',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=1000',
    images: [
      'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?auto=format&fit=crop&q=80&w=1000'
    ],
    description: 'Châssis haute densité pour data centers et centraux télécoms.',
    features: ['Gestion de fibre intégrée', 'Acier laminé à froid', 'Connecteurs Grade A', 'Kit de montage inclus'],
    stock: true
  },
  {
    id: 'patch-armored-5m',
    name: 'Jarretière Optique Blindée 5m LC-SC',
    category: 'Fibre Optique',
    brand: 'BOS-CI Premium',
    ref: 'BOS-PC-ARM-5M',
    image: 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?auto=format&fit=crop&q=80&w=1000',
    images: [
      'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1601597110547-78516f198ce4?auto=format&fit=crop&q=80&w=1000'
    ],
    description: 'Cordon de brassage ultra-résistant avec gaine métallique flexible.',
    features: ['Protection anti-rongeur', 'Faible perte d\'insertion', 'Rayon de courbure minimal', 'LSZH Jacket'],
    stock: true,
    isNew: true
  },
  {
    id: 'cable-drop-ftth',
    name: 'Câble Drop FTTH 2 Fibres G657A2',
    category: 'Fibre Optique',
    brand: 'BOS-CI Premium',
    ref: 'BOS-CABLE-DROP-2F',
    image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&q=80&w=1000',
    images: [
      'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=1000'
    ],
    description: 'Câble plat pour déploiement final chez l\'abonné.',
    features: ['Membres de force FRP', 'Facile à dénuder', 'Protection UV', 'Conditionnement 1km'],
    stock: true
  },
  {
    id: 'splice-closure-48f',
    name: 'Boîtier d\'Épissure Horizontal 48 Fibres',
    category: 'Fibre Optique',
    brand: 'BOS-CI Premium',
    ref: 'BOS-GJS-H001',
    image: 'https://images.unsplash.com/photo-1601597110547-78516f198ce4?auto=format&fit=crop&q=80&w=1000',
    images: [
      'https://images.unsplash.com/photo-1601597110547-78516f198ce4?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?auto=format&fit=crop&q=80&w=1000'
    ],
    description: 'Protection hermétique pour épissures en aérien ou souterrain.',
    features: ['Étanchéité IP68', '4 entrées de câbles', 'Visserie Inox', 'Système de scellage mécanique'],
    stock: true
  },

  // --- RESEAUX IT ---
  {
    id: 'cisco-ie4k',
    name: 'Switch Industriel Cisco IE-4000',
    category: 'Télécom & Réseaux',
    brand: 'Cisco Systems',
    ref: 'CISCO-IE-4000-8GT',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000',
    images: [
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=1000'
    ],
    description: 'Commutateur durci pour environnements industriels critiques.',
    features: ['PoE+ haute puissance', 'Layer 3 complet', 'Température -40C/+75C', 'Redondance PROFINET'],
    stock: false
  },
  {
    id: 'fortinet-rugged-60f',
    name: 'FortiGate Rugged 60F Security Appliance',
    category: 'Télécom & Réseaux',
    brand: 'Fortinet',
    ref: 'FTNT-RGD-60F',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1000',
    images: [
      'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1562408590-e32931084e23?auto=format&fit=crop&q=80&w=1000'
    ],
    description: 'Pare-feu de nouvelle génération conçu pour les sites distants et l\'énergie.',
    features: ['SD-WAN sécurisé', 'Refroidissement passif', 'Protection OT/IoT', 'Double alimentation DC'],
    stock: true,
    isNew: true
  },
  {
    id: 'ubnt-edge-router',
    name: 'EdgeRouter Infinity 8-Port SFP+',
    category: 'Télécom & Réseaux',
    brand: 'Ubiquiti',
    ref: 'UBNT-ER-8-INF',
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=1000',
    images: [
      'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=1000'
    ],
    description: 'Routeur haute performance 10G pour coeurs de réseaux locaux.',
    features: ['Capacité 80 Gbps', '8 ports SFP+ 10G', 'Écran OLED diagnostic', 'Rackable 1U'],
    stock: true
  },
  {
    id: 'rack-cabinet-42u',
    name: 'Armoire Rack 42U Premium 800x1000',
    category: 'Télécom & Réseaux',
    brand: 'BOS-CI Infrastructure',
    ref: 'BOS-RACK-42U-P',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=1000',
    images: [
      'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1562408590-e32931084e23?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000'
    ],
    description: 'Baie serveur haute performance avec gestion intelligente des câbles.',
    features: ['Porte perforée 80%', 'Charge statique 1500kg', 'Unités de ventilation', 'Finition Noir ESD'],
    stock: true
  },

  // --- ENERGIE SOLAIRE ---
  {
    id: 'bos-solar-10k',
    name: 'Centrale Solaire Télécom 10kWh Elite',
    category: 'Énergie Solaire',
    brand: 'BOS-CI Energy',
    ref: 'BOS-SOLAR-T10K',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=1000',
    images: [
      'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1508514177221-188b171f2bb3?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1592833159155-c62df1b65634?auto=format&fit=crop&q=80&w=1000'
    ],
    description: 'Kit complet de stockage LiFePO4 avec monitoring Victron.',
    features: ['Batterie 48V 200Ah', 'Panneaux 450Wp x 8', 'Supervision Cloud', 'Garantie 5 ans'],
    stock: true,
    isNew: true
  },
  {
    id: 'victron-multi-5k',
    name: 'Onduleur Victron MultiPlus-II 5kVA',
    category: 'Énergie Solaire',
    brand: 'Victron Energy',
    ref: 'VIC-MP-II-48/5000',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=1000',
    images: [
      'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1592833159155-c62df1b65634?auto=format&fit=crop&q=80&w=1000'
    ],
    description: 'Convertisseur/chargeur hybride avec fonction PowerControl.',
    features: ['Onde sinusoïdale pure', 'Temps transfert <20ms', 'Monitoring VRM', 'Support Lithium'],
    stock: true
  },
  {
    id: 'pylontech-us5000',
    name: 'Batterie Lithium Pylontech US5000',
    category: 'Énergie Solaire',
    brand: 'Pylontech',
    ref: 'PYL-US5000-4.8K',
    image: 'https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&q=80&w=1000',
    images: [
      'https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1508514177221-188b171f2bb3?auto=format&fit=crop&q=80&w=1000'
    ],
    description: 'Module de stockage LFP 4.8kWh haute densité pour sites isolés.',
    features: ['6000 cycles à 95% DoD', 'BMS intelligent intégré', 'Modulaire/Empilable', 'Certifié Télécom'],
    stock: true
  },
  {
    id: 'victron-mppt-250',
    name: 'Régulateur MPPT SmartSolar 250/100',
    category: 'Énergie Solaire',
    brand: 'Victron Energy',
    ref: 'VIC-SCC-250/100',
    image: 'https://images.unsplash.com/photo-1592833159155-c62df1b65634?auto=format&fit=crop&q=80&w=1000',
    images: [
      'https://images.unsplash.com/photo-1592833159155-c62df1b65634?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=1000'
    ],
    description: 'Contrôleur de charge ultra-rapide avec Bluetooth intégré.',
    features: ['Tension PV max 250V', 'Courant de charge 100A', 'Protection surchauffe', 'Algorithme BatteryLife'],
    stock: true
  },

  // --- LABORATOIRE ---
  {
    id: 'calib-bench-otdr',
    name: 'Banc de Calibration OTDR Professionnel',
    category: 'Calibrage',
    brand: 'Calibrage BOS-CI',
    ref: 'LABO-CAL-OTDR-1',
    image: 'https://images.unsplash.com/photo-1516110833967-0b5716ca1387?auto=format&fit=crop&q=80&w=1000',
    images: [
      'https://images.unsplash.com/photo-1516110833967-0b5716ca1387?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&q=80&w=1000'
    ],
    description: 'Service de calibration certifié pour réflectomètres de toutes marques.',
    features: ['Certificat ISO 17025', 'Nettoyage interne optique', 'Mise à jour logiciel', 'Délai 48h'],
    stock: true
  },
  {
    id: 'cleaning-station-pro',
    name: 'Station de Nettoyage Optique Pro-Clean',
    category: 'Calibrage',
    brand: 'BOS-CI Lab',
    ref: 'LABO-CLEAN-ST',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=1000',
    images: [
      'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1516110833967-0b5716ca1387?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=1000'
    ],
    description: 'Unité complète pour le dégraissage et le polissage des ferrules.',
    features: ['Aspiration HEPA', 'Solution dégraissante neutre', 'Microscope de contrôle', 'Design ESD'],
    stock: true
  },
  {
    id: 'power-meter-cal-kit',
    name: 'Kit de Calibration Wattmètre de Précision',
    category: 'Calibrage',
    brand: 'VIAVI / BOS-CI',
    ref: 'LABO-WATT-KIT',
    image: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&q=80&w=1000',
    images: [
      'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1516110833967-0b5716ca1387?auto=format&fit=crop&q=80&w=1000'
    ],
    description: 'Sources étalons pour la vérification des wattmètres sur site.',
    features: ['Stabilité +/- 0.05dB', 'Longueurs d\'onde 1310/1550', 'Connecteurs interchangeables', 'Boîtier durci'],
    stock: true,
    isNew: true
  },
  {
    id: 'service-fusion-maint',
    name: 'Maintenance Expert Soudeuse Fujikura',
    category: 'Calibrage',
    brand: 'BOS-CI Lab / Fujikura',
    ref: 'LABO-FUJI-MAINT',
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=1000',
    images: [
      'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=1000'
    ],
    description: 'Révision complète et calibration du moteur d\'alignement.',
    features: ['Remplacement électrodes', 'Nettoyage prismes', 'Calibration arc', 'Test de perte réel'],
    stock: true
  },

  // --- RACCORDEMENT ---
  {
    id: 'kit-outillage-ftth',
    name: 'Kit Outillage FTTH Professionnel',
    category: 'Raccordement',
    brand: 'BOS-CI Pro',
    ref: 'BOS-KIT-FTTH-01',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&q=80&w=1000',
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1601597110547-78516f198ce4?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?auto=format&fit=crop&q=80&w=1000'
    ],
    description: 'Mallette complète d\'outillage pour technicien raccordement fibre optique terrain.',
    features: ['Dénudeuse multi-calibres', 'Pince à sertir', 'Stylo laser rouge', 'Sacoche renforcée IP54'],
    stock: true,
    isNew: true
  },
  {
    id: 'cliveuse-precision',
    name: 'Cliveuse Fibre Haute Précision CT-50',
    category: 'Raccordement',
    brand: 'Fujikura',
    ref: 'FUJI-CT-50',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=1000',
    images: [
      'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=1000'
    ],
    description: 'Cliveuse automatique pour fibres simples et rubans jusqu\'à 16 fibres.',
    features: ['60 000 clivages/lame', 'Angle <0.5°', 'Collecteur de chutes', 'Compatible toutes fibres'],
    stock: true
  },
  {
    id: 'connecteurs-prepolis',
    name: 'Connecteurs Pré-Polis SC/APC Pack 100',
    category: 'Raccordement',
    brand: 'BOS-CI Premium',
    ref: 'BOS-CON-SCAPC-100',
    image: 'https://images.unsplash.com/photo-1601597110547-78516f198ce4?auto=format&fit=crop&q=80&w=1000',
    images: [
      'https://images.unsplash.com/photo-1601597110547-78516f198ce4?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&q=80&w=1000'
    ],
    description: 'Connecteurs à pré-polissage rapide pour terminaison terrain FTTH.',
    features: ['Perte d\'insertion <0.3dB', 'Installation sans colle', 'Compatible G657A2', 'Certifié Telcordia'],
    stock: true
  },
  {
    id: 'consommables-soudure',
    name: 'Kit Consommables Soudure 500 Fibres',
    category: 'Raccordement',
    brand: 'BOS-CI Pro',
    ref: 'BOS-CONS-500F',
    image: 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?auto=format&fit=crop&q=80&w=1000',
    images: [
      'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1601597110547-78516f198ce4?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&q=80&w=1000'
    ],
    description: 'Ensemble complet de protection d\'épissure et consommables pour chantier fibre.',
    features: ['500 protections thermorétractables', 'Lingettes IPA', 'Électrodes de rechange', 'Gel d\'indice'],
    stock: true
  },

  // --- INFORMATIQUE ---
  {
    id: 'cable-cat6a-305m',
    name: 'Câble Ethernet Cat6A F/UTP 305m',
    category: 'Informatique',
    brand: 'BOS-CI Infrastructure',
    ref: 'BOS-CAT6A-305',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=1000',
    images: [
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1000'
    ],
    description: 'Câble cuivre blindé catégorie 6A pour réseaux 10 Gigabit haut débit.',
    features: ['Bande passante 500 MHz', 'AWG 23 cuivre pur', 'Gaine LSZH', 'Certifié Fluke'],
    stock: true,
    isNew: true
  },
  {
    id: 'switch-poe-24p',
    name: 'Switch PoE+ Manageable 24 Ports Gigabit',
    category: 'Informatique',
    brand: 'Cisco Systems',
    ref: 'CISCO-SG350-24P',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000',
    images: [
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1562408590-e32931084e23?auto=format&fit=crop&q=80&w=1000'
    ],
    description: 'Commutateur réseau manageable avec alimentation PoE+ 195W pour PME.',
    features: ['24 ports Gigabit PoE+', '4 ports SFP combo', 'VLAN / QoS / ACL', 'Interface web intuitive'],
    stock: true
  },
  {
    id: 'adaptateur-sfp-10g',
    name: 'Module SFP+ 10G Multimode LC Duplex',
    category: 'Informatique',
    brand: 'BOS-CI Premium',
    ref: 'BOS-SFP-10G-MM',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1000',
    images: [
      'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=1000'
    ],
    description: 'Transceiver optique 10 Gigabit compatible multi-constructeur.',
    features: ['850nm multimode', 'Portée 300m OM3', 'Compatible Cisco/Juniper/HP', 'DDM monitoring'],
    stock: true
  },
  {
    id: 'station-accueil-usb',
    name: 'Station d\'Accueil USB-C Triple Écran',
    category: 'Informatique',
    brand: 'BOS-CI Premium',
    ref: 'BOS-DOCK-USBC-3',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=1000',
    images: [
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1562408590-e32931084e23?auto=format&fit=crop&q=80&w=1000'
    ],
    description: 'Station de travail universelle USB-C avec triple sortie vidéo pour professionnels.',
    features: ['3x 4K @ 60Hz', 'Ethernet Gigabit RJ45', 'Charge PD 100W', '10 ports USB-A/C'],
    stock: true
  }
];
