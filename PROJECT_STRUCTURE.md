# RoomSync Project Structure

## Backend Structure
```
backend/
├── config/          # Database and app configuration
├── controllers/     # Route handlers and business logic
├── middlewares/     # Authentication and validation middleware
├── routes/          # API route definitions
├── models/          # Database models (to be added)
├── validators/      # Input validation schemas (to be added)
├── helpers/         # Utility functions (to be added)
├── constants/       # Application constants (to be added)
├── uploads/         # File upload storage
├── utils/           # JWT and other utilities
├── .env            # Environment variables
├── index.js        # Main server file
└── package.json    # Dependencies
```

## Frontend Structure
```
frontend/
├── public/
│   └── images/      # Static images and assets
├── src/
│   ├── components/
│   │   ├── layout/     # Navigation and layout components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Navbar.css
│   │   │   ├── Footer.jsx
│   │   │   ├── DashboardNavbar.jsx
│   │   │   ├── OwnerNavbar.jsx
│   │   │   └── UserNavbar.jsx
│   │   ├── common/     # Reusable page components
│   │   │   ├── AboutUs.jsx
│   │   │   └── ContactUs.jsx
│   │   └── ui/         # Reusable UI components
│   │       └── PropertyCard.jsx
│   ├── pages/          # Page components
│   │   ├── Auth/
│   │   ├── Dashboard/
│   │   │   ├── Admin/
│   │   │   ├── Owner/
│   │   │   └── User/
│   │   ├── Home.jsx
│   │   └── LoginModal.jsx
│   ├── services/       # API service functions
│   ├── context/        # React context providers
│   ├── routes/         # Route protection and configuration
│   ├── hooks/          # Custom React hooks (created)
│   ├── utils/          # Utility functions and constants
│   ├── styles/         # CSS files organized by component
│   ├── assets/         # Images and static assets
│   ├── types/          # TypeScript type definitions (created)
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── package.json
└── vite.config.js
```

## Key Improvements Made

### 1. Component Organization
- **Layout Components**: Moved all navigation and layout components to `components/layout/`
- **Common Components**: Moved reusable page components to `components/common/`
- **UI Components**: Moved reusable UI elements to `components/ui/`

### 2. Style Organization
- **Centralized CSS**: Moved all CSS files to `styles/` folder
- **Component-specific**: Each component's CSS is clearly named and organized

### 3. Utility Organization
- **Constants**: Moved API constants to `utils/constants.js`
- **Services**: Kept API services organized by functionality
- **Context**: Authentication and state management in dedicated folder

### 4. Future Enhancements Ready
- **Hooks**: Created folder for custom React hooks
- **Types**: Created folder for TypeScript definitions
- **Backend Models**: Created folders for database models and validators

### 5. Import Path Updates
- Updated all import statements to reflect new folder structure
- Maintained relative path consistency
- Improved code maintainability

## Benefits of This Structure

1. **Scalability**: Easy to add new components in appropriate folders
2. **Maintainability**: Clear separation of concerns
3. **Developer Experience**: Intuitive file organization
4. **Code Reusability**: Components are logically grouped
5. **Performance**: Better tree-shaking and code splitting potential