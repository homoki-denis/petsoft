# PetSoft - Pet Daycare Management System

PetSoft is a modern web application designed to help pet daycare businesses manage their operations efficiently. Built with cutting-edge technologies, it provides a seamless experience for tracking and managing pets under care.

## 🚀 Features

- User authentication (Login/Signup)
- Pet management system
- Track pet details including:
  - Name
  - Owner information
  - Age
  - Notes
  - Images
- Modern, responsive UI

## 🛠️ Technologies Used

### Frontend

- **Next.js 15.3.3** - React framework for production
- **React 19** - UI library
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Unstyled, accessible components
- **React Hook Form** - Form handling
- **Zod** - Schema validation
- **Sonner** - Toast notifications

### Backend

- **Prisma** - Next-generation ORM
- **SQLite** - Database (can be easily switched to other databases)

### Development Tools

- **ESLint** - Code linting
- **TypeScript** - Static type checking
- **Turbopack** - Fast development server

## 🏗️ Project Structure

```
petsoft/
├── src/
│   ├── app/            # Next.js app directory
│   │   ├── (app)/      # Main Routes
│   │   ├── (auth)/      # Authentication routes
│   │   └── (marketing)/ # Marketing pages
│   └── components/      # Reusable components
├── prisma/              # Database schema and migrations
├── public/             # Static assets
└── generated/          # Generated Prisma client
```

## 🚀 Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up your environment variables:
   ```bash
   DATABASE_URL="file:./dev.db"
   ```
4. Run database migrations:
   ```bash
   npx prisma migrate dev
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```

## 🔧 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 📝 License

This project is private and proprietary.

## 💡 Future Improvements

- Add more pet management features
- Implement user roles and permissions
- Add appointment scheduling
- Integrate payment processing
- Add reporting and analytics
