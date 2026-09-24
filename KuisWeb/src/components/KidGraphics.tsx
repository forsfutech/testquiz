import React from 'react';

interface GraphicProps {
  name: string;
  className?: string;
}

export const PictureIllustration: React.FC<GraphicProps> = ({ name, className = 'w-48 h-48' }) => {
  switch (name) {
    case 'cat':
      return (
        <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="100" cy="100" r="95" fill="#FEF3C7" />
          {/* Ears */}
          <polygon points="50,45 30,105 75,90" fill="#F59E0B" stroke="#D97706" strokeWidth="4" strokeLinejoin="round" />
          <polygon points="52,55 38,98 70,88" fill="#FCD34D" />
          <polygon points="150,45 170,105 125,90" fill="#F59E0B" stroke="#D97706" strokeWidth="4" strokeLinejoin="round" />
          <polygon points="148,55 162,98 130,88" fill="#FCD34D" />
          {/* Head */}
          <circle cx="100" cy="115" r="62" fill="#F59E0B" stroke="#D97706" strokeWidth="4" />
          {/* Cheeks */}
          <ellipse cx="70" cy="130" rx="14" ry="10" fill="#FDE68A" />
          <ellipse cx="130" cy="130" rx="14" ry="10" fill="#FDE68A" />
          <circle cx="65" cy="130" r="7" fill="#F87171" opacity="0.6" />
          <circle cx="135" cy="130" r="7" fill="#F87171" opacity="0.6" />
          {/* Eyes */}
          <ellipse cx="78" cy="108" rx="8" ry="12" fill="#1E293B" />
          <circle cx="81" cy="104" r="3.5" fill="#FFFFFF" />
          <ellipse cx="122" cy="108" rx="8" ry="12" fill="#1E293B" />
          <circle cx="125" cy="104" r="3.5" fill="#FFFFFF" />
          {/* Nose & Mouth */}
          <polygon points="95,124 105,124 100,131" fill="#EF4444" stroke="#B91C1C" strokeWidth="1.5" />
          <path d="M100 131 C94 138 88 138 86 134" stroke="#78350F" strokeWidth="3.5" strokeLinecap="round" fill="none" />
          <path d="M100 131 C106 138 112 138 114 134" stroke="#78350F" strokeWidth="3.5" strokeLinecap="round" fill="none" />
          {/* Whiskers */}
          <line x1="50" y1="120" x2="25" y2="114" stroke="#78350F" strokeWidth="3" strokeLinecap="round" />
          <line x1="50" y1="127" x2="22" y2="128" stroke="#78350F" strokeWidth="3" strokeLinecap="round" />
          <line x1="150" y1="120" x2="175" y2="114" stroke="#78350F" strokeWidth="3" strokeLinecap="round" />
          <line x1="150" y1="127" x2="178" y2="128" stroke="#78350F" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );

    case 'apple':
      return (
        <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="100" cy="100" r="95" fill="#FEF2F2" />
          {/* Stem */}
          <path d="M98 60 C98 35 110 24 116 20" stroke="#78350F" strokeWidth="6" strokeLinecap="round" />
          {/* Leaf */}
          <path d="M104 42 C125 32 145 42 142 58 C124 64 108 52 104 42 Z" fill="#22C55E" stroke="#15803D" strokeWidth="3" strokeLinejoin="round" />
          {/* Apple Body */}
          <path d="M100 70 C70 42 35 65 35 110 C35 155 70 178 100 174 C130 178 165 155 165 110 C165 65 130 42 100 70 Z" fill="#EF4444" stroke="#B91C1C" strokeWidth="5" />
          {/* Highlight */}
          <ellipse cx="68" cy="95" rx="14" ry="24" transform="rotate(-25 68 95)" fill="#FCA5A5" opacity="0.6" />
          <circle cx="60" cy="80" r="5" fill="#FFFFFF" opacity="0.8" />
        </svg>
      );

    case 'car':
      return (
        <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="100" cy="100" r="95" fill="#EFF6FF" />
          {/* Car Body Top (Cabin) */}
          <path d="M50 110 L68 70 C72 62 80 58 90 58 L130 58 C140 58 148 64 152 74 L165 110 Z" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="4" />
          {/* Windows */}
          <path d="M72 72 L88 72 L88 102 L58 102 Z" fill="#BAE6FD" stroke="#0284C7" strokeWidth="2.5" />
          <path d="M96 72 L128 72 L145 102 L96 102 Z" fill="#BAE6FD" stroke="#0284C7" strokeWidth="2.5" />
          {/* Car Lower Body */}
          <rect x="25" y="105" width="150" height="42" rx="12" fill="#2563EB" stroke="#1D4ED8" strokeWidth="4" />
          {/* Headlights */}
          <rect x="165" y="114" width="10" height="14" rx="4" fill="#FBBF24" stroke="#D97706" strokeWidth="2" />
          <rect x="25" y="114" width="8" height="14" rx="3" fill="#EF4444" stroke="#B91C1C" strokeWidth="2" />
          {/* Wheels */}
          <circle cx="65" cy="148" r="20" fill="#1E293B" stroke="#0F172A" strokeWidth="4" />
          <circle cx="65" cy="148" r="8" fill="#E2E8F0" />
          <circle cx="138" cy="148" r="20" fill="#1E293B" stroke="#0F172A" strokeWidth="4" />
          <circle cx="138" cy="148" r="8" fill="#E2E8F0" />
          {/* Road line */}
          <line x1="15" y1="168" x2="185" y2="168" stroke="#94A3B8" strokeWidth="4" strokeLinecap="round" strokeDasharray="10 8" />
        </svg>
      );

    case 'star':
      return (
        <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="100" cy="100" r="95" fill="#FFFBEB" />
          {/* Star Shape */}
          <path d="M100 25 L122 74 L175 78 L134 114 L147 167 L100 138 L53 167 L66 114 L25 78 L78 74 Z" fill="#FBBF24" stroke="#D97706" strokeWidth="5" strokeLinejoin="round" />
          {/* Cheerful Face */}
          <circle cx="85" cy="98" r="6" fill="#78350F" />
          <circle cx="115" cy="98" r="6" fill="#78350F" />
          <circle cx="87" cy="96" r="2" fill="#FFFFFF" />
          <circle cx="117" cy="96" r="2" fill="#FFFFFF" />
          <ellipse cx="76" cy="108" rx="5" ry="3" fill="#F87171" opacity="0.7" />
          <ellipse cx="124" cy="108" rx="5" ry="3" fill="#F87171" opacity="0.7" />
          <path d="M92 110 Q100 120 108 110" stroke="#78350F" strokeWidth="3" strokeLinecap="round" fill="none" />
        </svg>
      );

    case 'fish':
      return (
        <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="100" cy="100" r="95" fill="#ECFEFF" />
          {/* Bubbles */}
          <circle cx="160" cy="60" r="7" fill="#A5F3FC" stroke="#06B6D4" strokeWidth="2" />
          <circle cx="172" cy="42" r="5" fill="#A5F3FC" stroke="#06B6D4" strokeWidth="2" />
          {/* Tail Fin */}
          <path d="M50 100 L20 65 Q35 100 20 135 Z" fill="#FB923C" stroke="#EA580C" strokeWidth="4" strokeLinejoin="round" />
          {/* Dorsal Fin */}
          <path d="M90 65 Q115 45 130 65 Z" fill="#FB923C" stroke="#EA580C" strokeWidth="3" />
          {/* Body */}
          <ellipse cx="105" cy="100" rx="55" ry="40" fill="#F97316" stroke="#C2410C" strokeWidth="4" />
          {/* White Stripes */}
          <path d="M85 64 Q95 100 85 136" stroke="#FFFFFF" strokeWidth="10" strokeLinecap="round" />
          <path d="M115 62 Q125 100 115 138" stroke="#FFFFFF" strokeWidth="10" strokeLinecap="round" />
          {/* Eye */}
          <circle cx="140" cy="92" r="8" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2" />
          <circle cx="142" cy="92" r="4.5" fill="#0F172A" />
          <circle cx="144" cy="90" r="1.5" fill="#FFFFFF" />
          {/* Smile */}
          <path d="M150 108 Q144 114 138 108" stroke="#7C2D12" strokeWidth="3" strokeLinecap="round" fill="none" />
        </svg>
      );

    default:
      return null;
  }
};

export const ComputerIconIllustration: React.FC<GraphicProps> = ({ name, className = 'w-48 h-48' }) => {
  switch (name) {
    case 'folder':
      return (
        <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="100" cy="100" r="95" fill="#FEFCE8" />
          {/* Back Tab */}
          <path d="M35 75 C35 68 40 62 47 62 L85 62 L100 76 L153 76 C160 76 165 81 165 88 L165 140 C165 147 160 152 153 152 L47 152 C40 152 35 147 35 140 Z" fill="#CA8A04" />
          {/* File papers inside */}
          <rect x="52" y="70" width="96" height="60" rx="6" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="2" />
          <line x1="64" y1="84" x2="110" y2="84" stroke="#94A3B8" strokeWidth="3" strokeLinecap="round" />
          <line x1="64" y1="94" x2="134" y2="94" stroke="#CBD5E1" strokeWidth="3" strokeLinecap="round" />
          {/* Front Folder Leaf */}
          <path d="M35 96 C35 88 40 82 48 82 L152 82 C160 82 165 88 165 96 L160 144 C160 151 154 156 147 156 L43 156 C36 156 30 151 30 144 Z" fill="#FACC15" stroke="#EAB308" strokeWidth="4" />
        </svg>
      );

    case 'printer':
      return (
        <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="100" cy="100" r="95" fill="#F1F5F9" />
          {/* Top Paper In */}
          <rect x="65" y="38" width="70" height="50" rx="4" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="3" />
          <line x1="78" y1="52" x2="122" y2="52" stroke="#94A3B8" strokeWidth="3" strokeLinecap="round" />
          <line x1="78" y1="62" x2="114" y2="62" stroke="#CBD5E1" strokeWidth="3" strokeLinecap="round" />
          {/* Main Printer Body */}
          <rect x="35" y="80" width="130" height="65" rx="12" fill="#334155" stroke="#1E293B" strokeWidth="4" />
          {/* Paper output tray slot */}
          <rect x="55" y="112" width="90" height="12" rx="3" fill="#0F172A" />
          {/* Power light and button */}
          <circle cx="145" cy="98" r="4.5" fill="#22C55E" />
          <circle cx="130" cy="98" r="4.5" fill="#38BDF8" />
          {/* Bottom Printed Document */}
          <rect x="62" y="118" width="76" height="52" rx="4" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="3" />
          <line x1="74" y1="132" x2="126" y2="132" stroke="#3B82F6" strokeWidth="3.5" strokeLinecap="round" />
          <line x1="74" y1="142" x2="120" y2="142" stroke="#10B981" strokeWidth="3.5" strokeLinecap="round" />
          <line x1="74" y1="152" x2="108" y2="152" stroke="#F59E0B" strokeWidth="3.5" strokeLinecap="round" />
        </svg>
      );

    case 'save_disk':
      return (
        <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="100" cy="100" r="95" fill="#EFF6FF" />
          {/* Floppy Base */}
          <path d="M42 42 L138 42 L158 62 L158 158 L42 158 Z" fill="#2563EB" stroke="#1D4ED8" strokeWidth="4" strokeLinejoin="round" />
          {/* Metal Slider Top */}
          <rect x="68" y="42" width="64" height="42" rx="3" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="2" />
          <rect x="80" y="48" width="14" height="26" rx="2" fill="#475569" />
          {/* White Label Bottom */}
          <rect x="58" y="100" width="84" height="58" rx="4" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="2" />
          <line x1="68" y1="115" x2="132" y2="115" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" />
          <line x1="68" y1="127" x2="132" y2="127" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="68" y1="139" x2="118" y2="139" stroke="#CBD5E1" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );

    case 'recycle_bin':
      return (
        <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="100" cy="100" r="95" fill="#F0FDF4" />
          {/* Bin Lid */}
          <rect x="60" y="48" width="80" height="12" rx="4" fill="#059669" stroke="#047857" strokeWidth="3" />
          <rect x="88" y="38" width="24" height="10" rx="3" fill="#059669" stroke="#047857" strokeWidth="2" />
          {/* Bin Body */}
          <path d="M68 62 L78 152 C79 157 84 162 90 162 L110 162 C116 162 121 157 122 152 L132 62 Z" fill="#10B981" stroke="#047857" strokeWidth="4" strokeLinejoin="round" />
          {/* Recycle Arrows Symbol */}
          <path d="M100 85 L112 105 L88 105 Z" fill="#FFFFFF" />
          <path d="M92 110 L108 110 L100 126 Z" fill="#FFFFFF" />
          <circle cx="100" cy="112" r="16" stroke="#FFFFFF" strokeWidth="3.5" strokeDasharray="14 10" fill="none" />
        </svg>
      );

    case 'volume':
      return (
        <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="100" cy="100" r="95" fill="#F0F9FF" />
          {/* Speaker Base */}
          <path d="M50 82 L72 82 L102 55 C107 51 114 55 114 62 L114 138 C114 145 107 149 102 145 L72 118 L50 118 C46 118 42 114 42 110 L42 90 C42 86 46 82 50 82 Z" fill="#0284C7" stroke="#0369A1" strokeWidth="4" strokeLinejoin="round" />
          {/* Sound waves */}
          <path d="M130 82 C138 92 138 108 130 118" stroke="#0EA5E9" strokeWidth="6" strokeLinecap="round" fill="none" />
          <path d="M148 68 C162 84 162 116 148 132" stroke="#38BDF8" strokeWidth="6" strokeLinecap="round" fill="none" />
          <path d="M166 54 C186 78 186 122 166 146" stroke="#7DD3FC" strokeWidth="5" strokeLinecap="round" fill="none" />
        </svg>
      );

    case 'power':
      return (
        <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="100" cy="100" r="95" fill="#FEF2F2" />
          {/* Power Button Outer Circle */}
          <circle cx="100" cy="100" r="65" fill="#DC2626" stroke="#991B1B" strokeWidth="4" />
          {/* Power Symbol Arc */}
          <path d="M80 68 C62 80 54 104 64 124 C74 144 98 152 118 144 C138 136 146 112 138 92 C134 82 126 74 120 68" stroke="#FFFFFF" strokeWidth="10" strokeLinecap="round" fill="none" />
          {/* Vertical line */}
          <line x1="100" y1="50" x2="100" y2="95" stroke="#FFFFFF" strokeWidth="10" strokeLinecap="round" />
        </svg>
      );

    case 'wifi':
      return (
        <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="100" cy="100" r="95" fill="#FAF5FF" />
          {/* Wave 3 */}
          <path d="M45 75 C75 45 125 45 155 75" stroke="#9333EA" strokeWidth="10" strokeLinecap="round" fill="none" />
          {/* Wave 2 */}
          <path d="M65 100 C85 80 115 80 135 100" stroke="#A855F7" strokeWidth="10" strokeLinecap="round" fill="none" />
          {/* Wave 1 */}
          <path d="M85 125 C93 117 107 117 115 125" stroke="#C084FC" strokeWidth="10" strokeLinecap="round" fill="none" />
          {/* Center Dot */}
          <circle cx="100" cy="150" r="10" fill="#7E22CE" />
        </svg>
      );

    case 'browser':
      return (
        <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="100" cy="100" r="95" fill="#EFF6FF" />
          {/* Browser Window Frame */}
          <rect x="35" y="45" width="130" height="110" rx="10" fill="#FFFFFF" stroke="#3B82F6" strokeWidth="4" />
          {/* Header Bar */}
          <path d="M35 55 C35 49 39 45 45 45 L155 45 C161 45 165 49 165 55 L165 72 L35 72 Z" fill="#DBEAFE" />
          {/* 3 Dots */}
          <circle cx="48" cy="58" r="4.5" fill="#EF4444" />
          <circle cx="60" cy="58" r="4.5" fill="#FBBF24" />
          <circle cx="72" cy="58" r="4.5" fill="#22C55E" />
          {/* Address Bar */}
          <rect x="85" y="52" width="70" height="12" rx="4" fill="#FFFFFF" stroke="#93C5FD" strokeWidth="1.5" />
          {/* Content Graphic (Internet Globe) */}
          <circle cx="100" cy="112" r="30" fill="#60A5FA" stroke="#2563EB" strokeWidth="3" />
          <ellipse cx="100" cy="112" rx="14" ry="30" stroke="#FFFFFF" strokeWidth="2.5" fill="none" />
          <line x1="70" y1="112" x2="130" y2="112" stroke="#FFFFFF" strokeWidth="2.5" />
        </svg>
      );

    case 'paint':
      return (
        <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="100" cy="100" r="95" fill="#FFF7ED" />
          {/* Palette */}
          <path d="M50 110 C40 85 60 50 100 50 C145 50 165 80 155 120 C148 148 120 155 100 150 C85 146 80 135 68 135 C55 135 55 122 50 110 Z" fill="#FDE68A" stroke="#D97706" strokeWidth="4" />
          {/* Thumb hole */}
          <circle cx="85" cy="125" r="9" fill="#FFF7ED" stroke="#D97706" strokeWidth="3" />
          {/* Color spots */}
          <circle cx="75" cy="78" r="8" fill="#EF4444" />
          <circle cx="102" cy="68" r="8" fill="#3B82F6" />
          <circle cx="132" cy="80" r="8" fill="#10B981" />
          <circle cx="140" cy="110" r="8" fill="#A855F7" />
          {/* Brush */}
          <path d="M125 155 L165 95 C168 90 174 90 178 94 C182 98 182 104 178 108 L140 168 Z" fill="#78350F" stroke="#451A03" strokeWidth="2.5" />
          <path d="M125 155 L116 168 C114 172 116 178 122 176 L134 164 Z" fill="#3B82F6" />
        </svg>
      );

    case 'mouse':
      return (
        <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="100" cy="100" r="95" fill="#F8FAFC" />
          {/* Wire */}
          <path d="M100 48 C100 28 85 24 85 14" stroke="#64748B" strokeWidth="4" strokeLinecap="round" fill="none" />
          {/* Mouse Body */}
          <rect x="62" y="48" width="76" height="114" rx="38" fill="#475569" stroke="#1E293B" strokeWidth="4" />
          {/* Left/Right Button Divider */}
          <line x1="100" y1="48" x2="100" y2="92" stroke="#1E293B" strokeWidth="3" />
          <line x1="62" y1="92" x2="138" y2="92" stroke="#1E293B" strokeWidth="3" />
          {/* Scroll Wheel */}
          <rect x="94" y="62" width="12" height="22" rx="6" fill="#38BDF8" stroke="#0284C7" strokeWidth="2" />
        </svg>
      );

    case 'keyboard':
      return (
        <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="100" cy="100" r="95" fill="#F1F5F9" />
          {/* Keyboard Frame */}
          <rect x="30" y="65" width="140" height="80" rx="10" fill="#334155" stroke="#1E293B" strokeWidth="4" />
          {/* Keys Row 1 */}
          <rect x="42" y="76" width="14" height="12" rx="2" fill="#E2E8F0" />
          <rect x="60" y="76" width="14" height="12" rx="2" fill="#E2E8F0" />
          <rect x="78" y="76" width="14" height="12" rx="2" fill="#E2E8F0" />
          <rect x="96" y="76" width="14" height="12" rx="2" fill="#E2E8F0" />
          <rect x="114" y="76" width="14" height="12" rx="2" fill="#E2E8F0" />
          <rect x="132" y="76" width="26" height="12" rx="2" fill="#F87171" />
          {/* Keys Row 2 */}
          <rect x="42" y="93" width="18" height="12" rx="2" fill="#93C5FD" />
          <rect x="64" y="93" width="14" height="12" rx="2" fill="#E2E8F0" />
          <rect x="82" y="93" width="14" height="12" rx="2" fill="#E2E8F0" />
          <rect x="100" y="93" width="14" height="12" rx="2" fill="#E2E8F0" />
          <rect x="118" y="93" width="14" height="12" rx="2" fill="#E2E8F0" />
          <rect x="136" y="93" width="22" height="12" rx="2" fill="#6EE7B7" />
          {/* Keys Row 3 (Spacebar) */}
          <rect x="42" y="110" width="22" height="12" rx="2" fill="#CBD5E1" />
          <rect x="68" y="110" width="64" height="12" rx="3" fill="#60A5FA" />
          <rect x="136" y="110" width="22" height="12" rx="2" fill="#CBD5E1" />
        </svg>
      );

    case 'headphone':
      return (
        <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="100" cy="100" r="95" fill="#FDF4FF" />
          {/* Headband */}
          <path d="M50 110 C50 65 72 45 100 45 C128 45 150 65 150 110" stroke="#A855F7" strokeWidth="9" strokeLinecap="round" fill="none" />
          {/* Top Cushion */}
          <path d="M78 48 C88 44 112 44 122 48" stroke="#7E22CE" strokeWidth="14" strokeLinecap="round" fill="none" />
          {/* Left Earcup */}
          <rect x="36" y="100" width="24" height="42" rx="10" fill="#9333EA" stroke="#6B21A8" strokeWidth="3" />
          <rect x="30" y="106" width="10" height="30" rx="5" fill="#3B0764" />
          {/* Right Earcup */}
          <rect x="140" y="100" width="24" height="42" rx="10" fill="#9333EA" stroke="#6B21A8" strokeWidth="3" />
          <rect x="160" y="106" width="10" height="30" rx="5" fill="#3B0764" />
        </svg>
      );

    case 'search':
      return (
        <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="100" cy="100" r="95" fill="#F0FDF4" />
          {/* Magnifying Glass Lens */}
          <circle cx="88" cy="85" r="42" fill="#BAE6FD" stroke="#0284C7" strokeWidth="8" />
          {/* Glass reflection */}
          <path d="M68 62 C74 56 84 54 94 56" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" fill="none" />
          {/* Handle */}
          <path d="M120 116 L154 150 C158 154 158 160 154 164 L148 170 C144 174 138 174 134 170 L100 136" stroke="#0F172A" strokeWidth="12" strokeLinecap="round" />
          <line x1="120" y1="116" x2="132" y2="128" stroke="#F59E0B" strokeWidth="8" strokeLinecap="round" />
        </svg>
      );

    case 'monitor':
      return (
        <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="100" cy="100" r="95" fill="#F8FAFC" />
          {/* Screen Outer */}
          <rect x="35" y="42" width="130" height="92" rx="8" fill="#1E293B" stroke="#0F172A" strokeWidth="4" />
          {/* Screen Display Area */}
          <rect x="42" y="48" width="116" height="76" rx="4" fill="#38BDF8" />
          {/* Desktop wallpaper scene inside screen */}
          <path d="M42 98 L72 82 L100 96 L130 76 L158 100 L158 124 L42 124 Z" fill="#22C55E" />
          <circle cx="68" cy="68" r="8" fill="#FBBF24" />
          {/* Stand stem */}
          <rect x="92" y="134" width="16" height="22" fill="#64748B" stroke="#334155" strokeWidth="2" />
          {/* Stand base */}
          <ellipse cx="100" cy="158" rx="35" ry="8" fill="#475569" stroke="#1E293B" strokeWidth="3" />
        </svg>
      );

    default:
      return null;
  }
};

export const AvatarIcon: React.FC<{ id: string; className?: string }> = ({ id, className = 'w-12 h-12' }) => {
  switch (id) {
    case 'lion':
      return (
        <div className={`${className} rounded-2xl bg-amber-100 flex items-center justify-center text-2xl shadow-sm border border-amber-200`}>
          🦁
        </div>
      );
    case 'rabbit':
      return (
        <div className={`${className} rounded-2xl bg-pink-100 flex items-center justify-center text-2xl shadow-sm border border-pink-200`}>
          🐰
        </div>
      );
    case 'robot':
      return (
        <div className={`${className} rounded-2xl bg-blue-100 flex items-center justify-center text-2xl shadow-sm border border-blue-200`}>
          🤖
        </div>
      );
    case 'cat':
      return (
        <div className={`${className} rounded-2xl bg-orange-100 flex items-center justify-center text-2xl shadow-sm border border-orange-200`}>
          🐱
        </div>
      );
    case 'owl':
      return (
        <div className={`${className} rounded-2xl bg-emerald-100 flex items-center justify-center text-2xl shadow-sm border border-emerald-200`}>
          🦉
        </div>
      );
    case 'bear':
      return (
        <div className={`${className} rounded-2xl bg-purple-100 flex items-center justify-center text-2xl shadow-sm border border-purple-200`}>
          🐻
        </div>
      );
    default:
      return (
        <div className={`${className} rounded-2xl bg-amber-100 flex items-center justify-center text-2xl shadow-sm border border-amber-200`}>
          ⭐
        </div>
      );
  }
};
