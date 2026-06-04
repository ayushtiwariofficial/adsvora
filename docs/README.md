# AdsVora - Premium Digital Marketing Agency Website

Complete full-stack implementation of a premium digital marketing agency website with modern UI, backend APIs, and admin dashboard.

## 📁 Project Structure

```
adsvora site/
├── frontend/                 # React TypeScript frontend
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   │   ├── common/      # Header, Footer, Button, Card, etc.
│   │   │   ├── pages/       # Page-specific components
│   │   │   └── sections/    # Home page sections
│   │   ├── pages/           # Page components
│   │   ├── admin/           # Admin dashboard
│   │   ├── services/        # API services
│   │   ├── hooks/           # Custom React hooks
│   │   ├── context/         # Context providers
│   │   ├── utils/           # Utility functions
│   │   ├── styles/          # Global styles
│   │   ├── App.tsx          # Main app with routing
│   │   └── main.tsx         # Entry point
│   ├── public/              # Static assets
│   ├── package.json         # Dependencies
│   ├── tsconfig.json        # TypeScript config
│   ├── vite.config.ts       # Vite config
│   ├── tailwind.config.js   # Tailwind config
│   └── index.html           # HTML template
│
├── backend/                 # Spring Boot backend
│   ├── src/main/java/com/adsvora/
│   │   ├── controller/      # REST controllers
│   │   ├── service/         # Business logic
│   │   ├── repository/      # Data access
│   │   ├── model/           # JPA entities
│   │   ├── dto/             # Data transfer objects
│   │   ├── security/        # JWT & security
│   │   ├── config/          # Spring configurations
│   │   └── AdsvoraApplication.java
│   ├── src/main/resources/
│   │   ├── application.properties
│   │   └── schema.sql
│   └── pom.xml              # Maven dependencies
│
└── docs/                    # Documentation

```

## 🚀 Quick Start

### Prerequisites

- **Frontend:**
  - Node.js 18+
  - npm or yarn

- **Backend:**
  - Java 17+
  - Maven 3.8+
  - MySQL 8.0+

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Start development server
npm run dev

# Build for production
npm run build
```

The frontend will be available at `http://localhost:3000`

### Backend Setup

```bash
cd backend

# 1. Create MySQL database
mysql -u root -p
CREATE DATABASE adsvora CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
EXIT;

# 2. Import schema
mysql -u root -p adsvora < src/main/resources/schema.sql

# 3. Configure database in application.properties
# Edit: backend/src/main/resources/application.properties
# Update: spring.datasource.username and spring.datasource.password

# 4. Run the application
mvn clean spring-boot:run

# Or build and run JAR
mvn clean package
java -jar target/adsvora-backend-1.0.0.jar
```

The backend API will be available at `http://localhost:8080/api`

## 📖 API Documentation

### Authentication Endpoints

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@adsvora.com",
  "password": "Admin@123"
}

Response:
{
  "token": "eyJhbGciOiJIUzUxMiJ9...",
  "user": {
    "id": 1,
    "email": "admin@adsvora.com",
    "name": "Admin User"
  }
}
```

### Blogs Endpoints

#### Get All Blogs (Paginated)
```http
GET /api/blogs?page=0&size=10
```

#### Get Blog by ID
```http
GET /api/blogs/{id}
```

#### Get Blog by Slug
```http
GET /api/blogs/slug/{slug}
```

#### Create Blog (Admin only)
```http
POST /api/blogs
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "Blog Title",
  "content": "Blog content here",
  "excerpt": "Short excerpt",
  "author": "John Doe",
  "category": "Marketing",
  "imageUrl": "https://..."
}
```

#### Update Blog (Admin only)
```http
PUT /api/blogs/{id}
Authorization: Bearer {token}
Content-Type: application/json
```

#### Delete Blog (Admin only)
```http
DELETE /api/blogs/{id}
Authorization: Bearer {token}
```

### Services Endpoints

#### Get All Services
```http
GET /api/services
```

#### Get Service by ID
```http
GET /api/services/{id}
```

#### Create Service (Admin only)
```http
POST /api/services
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Service Name",
  "description": "Service description",
  "icon": "🎯",
  "features": ["Feature 1", "Feature 2"],
  "imageUrl": "https://...",
  "order": 1
}
```

#### Update Service (Admin only)
```http
PUT /api/services/{id}
Authorization: Bearer {token}
```

#### Delete Service (Admin only)
```http
DELETE /api/services/{id}
Authorization: Bearer {token}
```

### Testimonials Endpoints

#### Get All Testimonials
```http
GET /api/testimonials
```

#### Get Featured Testimonials
```http
GET /api/testimonials/featured
```

#### Get Testimonial by ID
```http
GET /api/testimonials/{id}
```

#### Create Testimonial (Admin only)
```http
POST /api/testimonials
Authorization: Bearer {token}
Content-Type: application/json

{
  "clientName": "John Smith",
  "clientTitle": "CEO",
  "clientCompany": "Tech Corp",
  "content": "Great service!",
  "rating": 5,
  "imageUrl": "https://...",
  "featured": true
}
```

#### Update Testimonial (Admin only)
```http
PUT /api/testimonials/{id}
Authorization: Bearer {token}
```

#### Delete Testimonial (Admin only)
```http
DELETE /api/testimonials/{id}
Authorization: Bearer {token}
```

### Contacts Endpoints

#### Submit Contact Form
```http
POST /api/contacts
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1 (555) 123-4567",
  "company": "Company Name",
  "message": "Contact message here"
}
```

## 🔐 Admin Dashboard

Access the admin dashboard at `http://localhost:3000/admin`

### Login Credentials (Default)
- **Email:** admin@adsvora.com
- **Password:** Admin@123

### Admin Features
- ✅ Manage Blogs (CRUD)
- ✅ Manage Services (CRUD)
- ✅ Manage Testimonials (CRUD)
- ✅ View Contact Submissions
- ✅ JWT Authentication

## 🎨 Frontend Pages

1. **Home** (`/`) - Landing page with hero, services, testimonials
2. **About** (`/about`) - Company information and values
3. **Services** (`/services`) - Detailed service offerings
4. **Case Studies** (`/case-studies`) - Project showcase
5. **Blog** (`/blog`) - Blog listing with pagination
6. **Blog Detail** (`/blog/:slug`) - Individual blog post
7. **Contact** (`/contact`) - Contact form
8. **Admin** (`/admin`) - Admin dashboard (protected)

## 🎯 Key Features

### Frontend
- ✅ Modern, minimal UI with gradient branding
- ✅ Fully responsive design
- ✅ Smooth animations (Framer Motion)
- ✅ SEO optimized (Helmet meta tags)
- ✅ Type-safe with TypeScript
- ✅ Component-based architecture
- ✅ Reusable utility components
- ✅ Context-based state management

### Backend
- ✅ RESTful API design
- ✅ JWT authentication
- ✅ Role-based access control
- ✅ Data validation
- ✅ Database relationships
- ✅ Pagination support
- ✅ CORS enabled
- ✅ Error handling

### Database
- ✅ MySQL 8.0+
- ✅ Proper indexing
- ✅ Foreign key relationships
- ✅ Timestamps (created_at, updated_at)
- ✅ Data validation constraints

## 🔧 Configuration

### Frontend Environment Variables (.env)
```
VITE_API_URL=http://localhost:8080/api
VITE_APP_NAME=AdsVora
```

### Backend Configuration (application.properties)
```properties
# Database
spring.datasource.url=jdbc:mysql://localhost:3306/adsvora
spring.datasource.username=root
spring.datasource.password=your_password

# JWT
jwt.secret=your-super-secret-key-change-this-in-production
jwt.expiration=86400000

# Server
server.port=8080
```

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: sm(640px), md(768px), lg(1024px), xl(1280px)
- Tailwind CSS utility classes
- Optimized images and assets

## 🚀 Deployment

### Frontend (Vercel, Netlify, AWS S3)
```bash
npm run build
# Deploy the dist/ folder
```

### Backend (Heroku, AWS, DigitalOcean)
```bash
mvn clean package
java -jar target/adsvora-backend-1.0.0.jar
```

## 🛡️ Security Features

- ✅ JWT token-based authentication
- ✅ Password encryption (BCrypt)
- ✅ CORS protection
- ✅ SQL injection prevention (Parameterized queries)
- ✅ XSS protection
- ✅ Input validation

## 📚 Technology Stack

### Frontend
- React 18
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- React Router
- Axios
- React Helmet

### Backend
- Spring Boot 3.1
- Spring Security
- Spring Data JPA
- JWT (jsonwebtoken)
- Maven
- MySQL

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License.

## ✨ Next Steps

1. Replace placeholder images with actual assets
2. Update social media links
3. Customize color scheme in tailwind.config.js
4. Add email service integration (SendGrid, AWS SES)
5. Implement image upload functionality
6. Add analytics tracking
7. Set up CI/CD pipeline
8. Deploy to production

## 📞 Support

For issues or questions, please create an issue in the repository.

---

**Built with ❤️ by AdsVora Development Team**
