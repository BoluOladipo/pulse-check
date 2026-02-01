# EventPulse 🎫

A modern, professional event management platform for creating events, tracking attendance, and generating insightful analytics.

![EventPulse](https://img.shields.io/badge/EventPulse-Event%20Management-teal)
![React](https://img.shields.io/badge/React-18.3-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4-cyan)
![Supabase](https://img.shields.io/badge/Supabase-Backend-green)

## 🚀 Features

### For Event Organizers
- **Event Management** - Create, edit, and delete events with full CRUD operations
- **QR Code Generation** - Unique QR codes for each event for seamless check-ins
- **Real-time Attendance Tracking** - Monitor check-ins as they happen
- **Analytics Dashboard** - Visual charts and statistics for event performance
- **Excel Reports** - Export multi-sheet reports with attendee data, registration lists, and check-in status
- **Subscription Plans** - Free, Pro, and Enterprise tiers with Flutterwave payment integration

### For Attendees
- **Mobile-Optimized Check-in** - Scan QR code and fill a simple form to check in
- **No App Required** - Works directly in the browser
- **Instant Confirmation** - Real-time feedback on successful check-in

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| **React 18** | UI Framework |
| **TypeScript** | Type Safety |
| **Vite** | Build Tool & Dev Server |
| **Tailwind CSS** | Utility-First Styling |
| **Framer Motion** | Animations |
| **shadcn/ui** | UI Component Library |
| **Lucide Icons** | Icon System |
| **Recharts** | Data Visualization |
| **React Hook Form + Zod** | Form Handling & Validation |
| **qrcode.react** | QR Code Generation |
| **xlsx** | Excel Report Generation |

### Backend (Supabase)
| Service | Purpose |
|---------|---------|
| **PostgreSQL** | Database |
| **Row Level Security** | Data Protection |
| **Supabase Auth** | Authentication (Email Verification) |
| **Edge Functions** | Serverless API (Flutterwave Integration) |
| **Realtime** | Live Updates |

### Payments
| Provider | Purpose |
|----------|---------|
| **Flutterwave** | Payment Processing |

## 📁 Project Structure

```
eventpulse/
├── public/                     # Static assets
├── src/
│   ├── assets/                 # Images and media
│   ├── components/
│   │   ├── dashboard/          # Dashboard-specific components
│   │   │   ├── AttendanceChart.tsx
│   │   │   ├── AttendeesTable.tsx
│   │   │   ├── CreateEventModal.tsx
│   │   │   ├── EventsList.tsx
│   │   │   ├── QRCodeModal.tsx
│   │   │   └── StatsCards.tsx
│   │   ├── layout/             # Layout components
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── MainLayout.tsx
│   │   │   └── PageTransition.tsx
│   │   ├── sections/           # Landing page sections
│   │   │   ├── HeroSection.tsx
│   │   │   ├── FeaturesSection.tsx
│   │   │   ├── TestimonialsSection.tsx
│   │   │   └── CTASection.tsx
│   │   └── ui/                 # shadcn/ui components
│   ├── hooks/
│   │   ├── useAuth.tsx         # Authentication context
│   │   ├── useEvents.tsx       # Event management
│   │   ├── useAnalytics.tsx    # Analytics data
│   │   └── useSubscription.tsx # Subscription management
│   ├── integrations/
│   │   └── supabase/           # Supabase client & types
│   ├── pages/
│   │   ├── Index.tsx           # Landing page
│   │   ├── Dashboard.tsx       # Main dashboard
│   │   ├── EventDetails.tsx    # Single event view
│   │   ├── CheckIn.tsx         # Public check-in page
│   │   ├── Auth.tsx            # Login/Signup
│   │   ├── Pricing.tsx         # Subscription plans
│   │   ├── Features.tsx        # Features showcase
│   │   ├── About.tsx           # About page
│   │   ├── Contact.tsx         # Contact form
│   │   └── PaymentSuccess.tsx  # Post-payment confirmation
│   ├── types/                  # TypeScript interfaces
│   └── lib/                    # Utility functions
├── supabase/
│   ├── functions/
│   │   ├── flutterwave-init/   # Payment initialization
│   │   └── flutterwave-webhook/# Payment verification
│   └── config.toml             # Supabase configuration
└── README.md
```

## 🗄️ Database Schema

### Tables

#### `profiles`
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| user_id | UUID | Auth user reference |
| full_name | TEXT | User's full name |
| email | TEXT | User's email |
| avatar_url | TEXT | Profile picture URL |

#### `events`
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| organizer_id | UUID | Event creator |
| title | TEXT | Event name |
| description | TEXT | Event details |
| date | DATE | Event date |
| time | TIME | Event time |
| location | TEXT | Venue |
| max_attendees | INT | Capacity limit |
| current_attendees | INT | Current count |
| status | TEXT | upcoming/active/ended |
| qr_code | TEXT | QR code data |

#### `attendees`
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| event_id | UUID | Event reference |
| name | TEXT | Attendee name |
| email | TEXT | Attendee email |
| checked_in | BOOLEAN | Check-in status |
| check_in_time | TIMESTAMP | When checked in |
| registration_time | TIMESTAMP | When registered |

#### `subscriptions`
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| user_id | UUID | Subscriber |
| plan | TEXT | free/pro/enterprise |
| status | TEXT | active/pending/failed |
| expires_at | TIMESTAMP | Expiration date |
| flutterwave_tx_ref | TEXT | Transaction reference |

## 🔐 Security

- **Row Level Security (RLS)** - Users can only access their own data
- **Email Verification** - Required before login
- **Secure Payments** - Flutterwave handles all payment processing
- **JWT Authentication** - Secure session management

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or bun

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/eventpulse.git

# Navigate to project directory
cd eventpulse

# Install dependencies
npm install

# Start development server
npm run dev
```

### Environment Variables

Create a `.env` file with:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
```

### Edge Function Secrets (Supabase Dashboard)
- `FLUTTERWAVE_SECRET_KEY` - For payment processing

## 📱 Application Flow

```
1. Landing Page → User views features and pricing
2. Sign Up → Email verification required
3. Login → Access dashboard
4. Create Event → Fill event details
5. Generate QR Code → Share with attendees
6. Attendees Scan → Check-in via mobile browser
7. Track Analytics → Real-time dashboard updates
8. Export Reports → Download Excel summaries
```

## 💳 Subscription Tiers

| Feature | Free | Pro ($29/mo) | Enterprise ($99/mo) |
|---------|------|--------------|---------------------|
| Events | 3 | Unlimited | Unlimited |
| Attendees/Event | 50 | 500 | Unlimited |
| Analytics | Basic | Advanced | Advanced + API |
| Support | Community | Email | Priority |

## 👨‍💻 Author

**Bolu Oladipo** (BoluOladipoCodes)
- Email: boluemmanuel071@gmail.com
- Phone: 07075800632
- WhatsApp: +48 608 863 629

## 📄 License

This project is proprietary software developed for EventPulse.

---

<p align="center">
  Made with ❤️ using <a href="https://lovable.dev">Lovable</a>
</p>
