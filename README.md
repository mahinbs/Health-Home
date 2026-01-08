# Health@Home - Healthcare Management Application

A modern, premium healthcare management application built with React, TypeScript, and Tailwind CSS. Manage your health consultations, medications, homecare services, and pharmacy orders all in one place.

## 🚀 Features

### Core Functionality
- **Doctor Consultations**: Book video/voice consultations with specialists
- **Homecare Services**: Schedule professional homecare services
- **Pharmacy & Medical Equipment**: Order medicines and medical devices
- **Health Records**: Digital health locker for prescriptions and reports
- **Medication Reminders**: Track and manage your medications
- **Health Metrics**: Monitor heart rate, blood pressure, weight, and BMI
- **Rewards System**: Earn health credits and achievements
- **Payment History**: Track all your healthcare transactions

### Key Features
- 🛒 **Shopping Cart**: Add items to cart with real-time updates
- 💳 **Payment Integration**: Secure payment flow with multiple payment methods
- 📱 **Fully Responsive**: Optimized for mobile and desktop devices
- 🎨 **Premium UI**: Beautiful gradient design with smooth animations
- 🔔 **Notifications**: Stay updated with medication reminders
- 📊 **Health Tracking**: Monitor vital signs and health metrics
- 🏆 **Rewards Program**: Earn points for healthy activities

## 🛠️ Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router
- **Icons**: Remix Icon
- **State Management**: React Context API

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Health-Home
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

5. Preview production build:
```bash
npm run preview
```

## 📁 Project Structure

```
Health-Home/
├── src/
│   ├── components/
│   │   ├── base/          # Base components (Button, Card)
│   │   └── feature/       # Feature components (Navigation)
│   ├── contexts/          # React Context providers
│   ├── i18n/              # Internationalization
│   ├── pages/             # Page components
│   │   ├── home/          # Home page and components
│   │   ├── consult/       # Doctor consultation page
│   │   ├── homecare/      # Homecare services page
│   │   ├── pharmacy/      # Pharmacy page
│   │   ├── profile/       # Profile page
│   │   ├── cart/          # Shopping cart page
│   │   ├── records/       # Health records page
│   │   └── ...            # Other pages
│   ├── router/             # Routing configuration
│   └── App.tsx            # Main app component
├── public/                # Static assets
└── package.json           # Dependencies and scripts
```

## 🎨 Design System

### Color Palette
- **Primary Gradient**: Pink to Rose (`from-pink-500 to-rose-500`)
- **Background**: Soft gradient (`from-[#FFE9E4] to-[#E4F7E9]`)
- **Accent Colors**: Pink, Rose, Emerald, Teal

### Components
- **Cards**: White with backdrop blur and subtle shadows
- **Buttons**: Gradient backgrounds with hover effects
- **Modals**: Slide-up animations with proper padding
- **Navigation**: Fixed top and bottom navigation bars

## 📱 Pages

### Main Pages
- **Home** (`/`): Dashboard with health metrics, reminders, and quick access
- **Consult** (`/consult`): Book doctor consultations
- **Homecare** (`/homecare`): Schedule homecare services
- **Pharmacy** (`/pharmacy`): Browse and order medicines/equipment
- **Profile** (`/profile`): User profile and settings

### Profile Options
- **My Consultations** (`/my-consultations`): View past and upcoming appointments
- **My Homecare Requests** (`/my-homecare-requests`): Track homecare services
- **My Rewards** (`/my-rewards`): Health credits and achievements
- **My Health Locker** (`/records`): Prescriptions, reports, and records
- **Payment History** (`/payment-history`): Transaction history
- **Help & Support** (`/help-support`): FAQs and support options

### Other Pages
- **Cart** (`/cart`): Shopping cart and checkout
- **Payment Success** (`/payment-success`): Payment confirmation
- **Homecare Booking Success** (`/homecare-booking-success`): Booking confirmation

## 🎯 Key Features Explained

### Shopping Cart System
- Add items to cart from pharmacy page
- Real-time cart count in header
- Quantity management
- Secure payment flow

### Health Tracking
- Monitor vital signs (Heart Rate, Blood Pressure, Weight, BMI)
- Medication reminders with completion tracking
- Health metrics with detailed history

### Booking System
- Doctor consultations with specialty filtering
- Homecare services with caregiver selection
- Appointment management and rescheduling

## 🎭 Animations

The application includes smooth, premium animations:
- **Fade In**: Modal overlays
- **Slide Up**: Bottom sheets and modals
- **Scale In**: Cards and components
- **Bounce Subtle**: Success indicators
- **Staggered Animations**: Sequential card appearances

## 📱 Responsive Design

- Mobile-first approach
- Responsive breakpoints using Tailwind's `sm:` prefix
- Touch-friendly button sizes
- Optimized spacing for all screen sizes
- Proper padding to avoid navigation overlap

## 🔧 Development

### Available Scripts
- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build
- `npm run lint`: Run linter

### Code Style
- TypeScript for type safety
- Functional components with hooks
- Consistent naming conventions
- Modular component structure

## 🚀 Deployment

Build the project for production:
```bash
npm run build
```

The `dist` folder will contain the production-ready files that can be deployed to any static hosting service.

## 📝 License

This project is private and proprietary.

## 👥 Contributing

This is a private project. For contributions or questions, please contact the project maintainer.

## 📞 Support

For support, visit the Help & Support page in the application or contact:
- Email: support@healthhome.com
- Phone: +1-800-123-4567

---

Built with ❤️ for better healthcare management

