# SP-Home-Rental Mobile App Documentation

## Overview
SP-Home-Rental is a comprehensive home rental application built with Expo/React Native that allows users to search, view, and apply for rental properties across the US, with support for both smart homes and traditional properties.

## Features
- **Home Listing Screen**: Property cards with thumbnail images, basic details, and smart home indicators. Includes search functionality by location/zipcode with filters.
- **Property Detail View**: Gallery carousel for multiple interior/exterior photos, floor plan viewer, and detailed information about amenities and smart features.
- **Application Process**: Multi-step lease application form with document upload capability, integrated payment system for application fees, and status tracking.
- **Tenant Dashboard**: Rent payment functionality, maintenance request submission, and rent history ledger.
- **User Profile**: Google OAuth integration for easy signup/login, profile photo management, and communication preferences.

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)
- Expo CLI

### Installation
1. Clone the repository:
```
git clone https://github.com/yourusername/sp-home-rental.git
cd sp-home-rental
```

2. Install dependencies:
```
npm install
```

3. Start the development server:
```
npm start
```

4. Run on a device or simulator:
   - Scan the QR code with Expo Go (Android) or the Camera app (iOS)
   - Press 'a' to run on Android emulator
   - Press 'i' to run on iOS simulator
   - Press 'w' to run in web browser

## Project Structure
```
sp-home-rental/
├── App.js                  # Main application entry point
├── assets/                 # Static assets like images and fonts
├── src/
│   ├── components/         # Reusable UI components
│   ├── screens/            # Screen components
│   ├── navigation/         # Navigation configuration
│   ├── services/           # API and other services
│   ├── utils/              # Utility functions
│   ├── hooks/              # Custom React hooks
│   └── assets/             # Component-specific assets
├── package.json            # Project dependencies and scripts
└── app.json                # Expo configuration
```

## Key Components

### Navigation
The app uses React Navigation with a combination of stack and tab navigators:
- Stack Navigator for the authentication flow and detailed screens
- Bottom Tab Navigator for the main app sections (Home, Application, Dashboard, Profile)

### Screens
1. **LoginScreen**: Handles user authentication with Google OAuth and email options
2. **HomeScreen**: Displays property listings with search and filter functionality
3. **PropertyDetailScreen**: Shows detailed property information with image gallery
4. **ApplicationScreen**: Multi-step application process with document upload
5. **TenantDashboardScreen**: Dashboard for approved tenants with payment and maintenance features
6. **ProfileScreen**: User profile management and communication preferences

### Components
- **PropertyCard**: Displays property information in a card format
- **ImageCarousel**: Handles image galleries for property photos
- **StepIndicator**: Shows progress in multi-step forms
- **DocumentUpload**: Handles document upload functionality
- **DashboardCard**: Container for dashboard sections

## Implementation Notes

### Authentication
The app uses Google OAuth for authentication. In a production environment, you would need to:
1. Create a Google Developer account
2. Set up OAuth credentials
3. Configure the Expo app with your Google Client ID

### Property Data
The app currently uses mock data for properties. In a production environment, you would:
1. Connect to a backend API for property listings
2. Implement proper data fetching and caching
3. Add pagination for large datasets

### Payment Processing
The payment system is currently simulated. In a production environment, you would:
1. Integrate with a payment processor like Stripe
2. Implement secure payment handling
3. Add receipt generation and payment confirmation

## Customization
- **Theme**: Update the color scheme in the component styles
- **Branding**: Replace the logo and app name in the LoginScreen
- **Features**: Add or remove features by modifying the navigation and screens

## Troubleshooting
- If you encounter issues with dependencies, try running `npm install` again
- For Expo-specific issues, refer to the [Expo documentation](https://docs.expo.dev/)
- For React Navigation issues, check the [React Navigation documentation](https://reactnavigation.org/docs/getting-started)

## License
This project is licensed under the MIT License - see the LICENSE file for details.
