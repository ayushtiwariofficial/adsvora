# AdsVora Quick Reference Guide

## 🚀 Quick Start (5 minutes)

### Frontend
```bash
cd frontend
npm install
npm run dev
# Visit http://localhost:3000
```

### Backend
```bash
cd backend
# Create database: CREATE DATABASE adsvora;
# Import schema: mysql -u root adsvora < src/main/resources/schema.sql
mvn clean spring-boot:run
# API at http://localhost:8080/api
```

## 📁 File Structure Quick Reference

```
frontend/
├── src/
│   ├── components/common/        # Reusable UI components
│   ├── components/sections/      # Home page sections
│   ├── pages/                    # Page components
│   ├── admin/                    # Admin dashboard
│   ├── services/                 # API client layer
│   ├── App.tsx                   # Routing
│   └── main.tsx                  # Entry point

backend/
├── src/main/java/com/adsvora/
│   ├── controller/               # REST endpoints
│   ├── service/                  # Business logic
│   ├── model/                    # Database entities
│   ├── repository/               # Data access layer
│   ├── security/                 # JWT authentication
│   └── config/                   # Spring configurations
```

## 🔐 Admin Credentials

**Default Admin User**
- Email: `admin@adsvora.com`
- Password: `Admin@123`
- Access: `http://localhost:3000/admin`

**Change password in production!**

## 📋 API Endpoints Summary

### Authentication
| Method | Endpoint | Auth | Purpose |
|--------|----------|------|---------|
| POST | `/auth/login` | ❌ | User login |

### Blogs
| Method | Endpoint | Auth | Purpose |
|--------|----------|------|---------|
| GET | `/blogs` | ❌ | Get all blogs (paginated) |
| GET | `/blogs/{id}` | ❌ | Get blog by ID |
| GET | `/blogs/slug/{slug}` | ❌ | Get blog by slug |
| POST | `/blogs` | ✅ | Create blog |
| PUT | `/blogs/{id}` | ✅ | Update blog |
| DELETE | `/blogs/{id}` | ✅ | Delete blog |

### Services
| Method | Endpoint | Auth | Purpose |
|--------|----------|------|---------|
| GET | `/services` | ❌ | Get all services |
| GET | `/services/{id}` | ❌ | Get service by ID |
| POST | `/services` | ✅ | Create service |
| PUT | `/services/{id}` | ✅ | Update service |
| DELETE | `/services/{id}` | ✅ | Delete service |

### Testimonials
| Method | Endpoint | Auth | Purpose |
|--------|----------|------|---------|
| GET | `/testimonials` | ❌ | Get all testimonials |
| GET | `/testimonials/featured` | ❌ | Get featured only |
| GET | `/testimonials/{id}` | ❌ | Get by ID |
| POST | `/testimonials` | ✅ | Create testimonial |
| PUT | `/testimonials/{id}` | ✅ | Update testimonial |
| DELETE | `/testimonials/{id}` | ✅ | Delete testimonial |

### Contacts
| Method | Endpoint | Auth | Purpose |
|--------|----------|------|---------|
| POST | `/contacts` | ❌ | Submit contact form |

## 🎨 Available Pages

| Path | Purpose |
|------|---------|
| `/` | Home page |
| `/about` | About AdsVora |
| `/services` | Services listing |
| `/case-studies` | Project showcase |
| `/blog` | Blog listing |
| `/blog/:slug` | Blog post detail |
| `/contact` | Contact form |
| `/admin` | Admin dashboard |
| `/admin/login` | Admin login |

## 🛠️ Common Commands

### Frontend
```bash
npm run dev           # Start dev server (port 3000)
npm run build         # Build for production
npm run type-check    # Run TypeScript checker
npm install           # Install dependencies
```

### Backend
```bash
mvn spring-boot:run   # Run development server
mvn clean package     # Build JAR
mvn test              # Run tests
mvn clean             # Clean build directory
```

### Database
```bash
# Create database
mysql -u root -p
CREATE DATABASE adsvora CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

# Import schema
mysql -u root adsvora < schema.sql

# Connect to database
mysql -u root -p adsvora

# View tables
SHOW TABLES;

# View table structure
DESCRIBE blogs;
```

## 🔑 Configuration Files

### Frontend
- `.env` - Environment variables
- `vite.config.ts` - Build configuration
- `tailwind.config.js` - Styling
- `tsconfig.json` - TypeScript config

### Backend
- `application.properties` - Spring configuration
- `pom.xml` - Maven dependencies
- `schema.sql` - Database schema

## 🏗️ Architecture Layers

### Frontend
```
UI Components (React)
    ↓
Pages/Sections
    ↓
Services (API Calls)
    ↓
Context (State)
```

### Backend
```
REST Controllers
    ↓
Services (Business Logic)
    ↓
Repositories (Data Access)
    ↓
Database (MySQL)
```

## 📊 Database Tables

| Table | Purpose | Key Fields |
|-------|---------|-----------|
| users | Admin accounts | id, email, password |
| blogs | Blog posts | id, title, slug, content |
| services | Services offered | id, name, slug, description |
| testimonials | Client feedback | id, clientName, content, rating |
| contacts | Contact form submissions | id, name, email, message |
| service_features | Service features (list) | service_id, feature |

## 🔐 Security

### JWT Token
- Generated on successful login
- Expires after: 24 hours (configurable)
- Sent in: `Authorization: Bearer <token>` header

### Password Hashing
- Algorithm: BCrypt
- Salt rounds: 10

### CORS
- Enabled for: All origins (configure in production)
- Methods: GET, POST, PUT, DELETE
- Headers: Content-Type, Authorization

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🎯 Key Technologies

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Axios** - HTTP client
- **React Router** - Navigation

### Backend
- **Spring Boot 3.1** - Framework
- **Spring Security** - Authentication
- **Spring Data JPA** - ORM
- **JWT** - Token-based auth
- **MySQL** - Database
- **Maven** - Build tool

## 🚨 Troubleshooting

### Frontend Issues

**Port 3000 already in use**
```bash
# Kill process
lsof -ti:3000 | xargs kill -9
```

**Module not found**
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

**API connection failed**
- Check backend is running on port 8080
- Verify VITE_API_URL in .env
- Check browser console for CORS errors

### Backend Issues

**Database connection failed**
- Verify MySQL running
- Check credentials in application.properties
- Ensure database exists

**Port 8080 already in use**
```bash
# Find and kill process
lsof -i :8080
kill -9 <PID>
```

**JWT token invalid**
- Verify jwt.secret is same in config
- Check token hasn't expired
- Verify Authorization header format

### Database Issues

**Schema import failed**
```bash
# Use MySQL directly
mysql -u root -p adsvora < schema.sql
```

**Cannot connect to database**
```bash
# Test connection
mysql -u root -p -h localhost -e "SELECT 1"
```

## 📚 Documentation Files

- `README.md` - Project overview
- `FRONTEND_SETUP.md` - Frontend detailed guide
- `BACKEND_SETUP.md` - Backend detailed guide
- `DEPLOYMENT_GUIDE.md` - Production deployment

## 🔄 Development Workflow

1. **Create Feature Branch**
   ```bash
   git checkout -b feature/new-feature
   ```

2. **Make Changes**
   - Frontend: Create components, add pages
   - Backend: Add endpoints, services

3. **Test Locally**
   - Run dev servers
   - Test functionality
   - Check console for errors

4. **Commit & Push**
   ```bash
   git add .
   git commit -m "Add new feature"
   git push origin feature/new-feature
   ```

5. **Create Pull Request**
   - Describe changes
   - Request review

6. **Deploy**
   - Merge to main
   - CI/CD pipeline triggers
   - Automatic deployment

## 💾 Data Persistence

### Create Blog Post
```tsx
import { blogService } from '@services/blogService'

await blogService.create({
  title: "My Post",
  content: "Content",
  excerpt: "Short",
  author: "Me",
  category: "Tech",
  imageUrl: "url"
})
```

### Fetch Data
```tsx
const response = await blogService.getAll(0, 10)
console.log(response.data.content)
```

### Update Data
```tsx
await blogService.update(id, {
  title: "Updated Title",
  content: "Updated content"
})
```

### Delete Data
```tsx
await blogService.delete(id)
```

## 🎨 Component Usage

### Button
```tsx
import { Button } from '@components/common/Button'

<Button variant="primary" size="lg">
  Click me
</Button>
```

### Card
```tsx
import { Card } from '@components/common/Card'

<Card>
  Content here
</Card>
```

### Section
```tsx
import { Section } from '@components/common/Section'

<Section title="Title" subtitle="Subtitle">
  Content
</Section>
```

## 🌍 Environment Variables

### Frontend (.env)
```env
VITE_API_URL=http://localhost:8080/api
VITE_APP_NAME=AdsVora
```

### Backend (application.properties)
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/adsvora
spring.datasource.username=root
spring.datasource.password=your_password
jwt.secret=your-secret-key
jwt.expiration=86400000
```

## 📞 Support & Help

- Check documentation files in `/docs`
- Review comments in source code
- Check error messages in console/logs
- Verify configuration files
- Test with cURL or Postman

## ✅ Deployment Checklist

- [ ] Update env variables for production
- [ ] Change JWT secret
- [ ] Set up database backups
- [ ] Configure SSL/HTTPS
- [ ] Enable security headers
- [ ] Set up monitoring
- [ ] Configure CDN
- [ ] Test all functionality
- [ ] Set up CI/CD pipeline
- [ ] Document deployment steps

## 🎓 Learning Resources

- [React Documentation](https://react.dev)
- [Spring Boot Guides](https://spring.io/guides)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript](https://www.typescriptlang.org/docs)
- [MySQL](https://dev.mysql.com/doc)

---

**Last Updated**: 2024
**Version**: 1.0.0
**Status**: Production Ready
