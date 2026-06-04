# Backend Setup & Development Guide

## Prerequisites

- **Java**: 17 or higher
- **Maven**: 3.8 or higher
- **MySQL**: 8.0 or higher
- **Git**: For version control
- **IDE**: IntelliJ IDEA or VS Code (with Java extensions)

## Installation & Setup

### 1. Database Setup

#### Create Database
```sql
mysql -u root -p
CREATE DATABASE adsvora CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
EXIT;
```

#### Import Schema
```bash
mysql -u root -p adsvora < backend/src/main/resources/schema.sql
```

This creates all necessary tables and inserts default admin user.

#### Verify Database
```sql
mysql -u root -p adsvora
SELECT * FROM users;
SELECT TABLE_NAME FROM information_schema.TABLES WHERE TABLE_SCHEMA = 'adsvora';
```

### 2. Configure Application

Edit `backend/src/main/resources/application.properties`:

```properties
# Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/adsvora?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
spring.datasource.username=root
spring.datasource.password=your_password

# JPA Configuration
spring.jpa.hibernate.ddl-auto=update

# JWT Configuration (change in production!)
jwt.secret=your-super-secret-key-change-this-in-production-environment-with-a-long-random-string
jwt.expiration=86400000

# Server
server.port=8080
```

### 3. Build & Run

#### Option 1: Maven
```bash
cd backend

# Build
mvn clean install

# Run
mvn spring-boot:run
```

#### Option 2: IDE
1. Open project in IntelliJ or VS Code
2. Configure SDK: Java 17
3. Run `AdsvoraApplication.java`

#### Option 3: JAR
```bash
mvn clean package
java -jar target/adsvora-backend-1.0.0.jar
```

### 4. Verify Installation

```bash
# Test health endpoint
curl http://localhost:8080/api/

# Test login
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@adsvora.com",
    "password": "Admin@123"
  }'
```

## Project Structure

### Controllers (`src/main/java/com/adsvora/controller/`)

RESTful endpoints:

- **AuthController** - Authentication
  - `POST /auth/login` - User login

- **BlogController** - Blog management
  - `GET /blogs` - Get all blogs (paginated)
  - `GET /blogs/{id}` - Get blog by ID
  - `GET /blogs/slug/{slug}` - Get blog by slug
  - `POST /blogs` - Create blog (admin)
  - `PUT /blogs/{id}` - Update blog (admin)
  - `DELETE /blogs/{id}` - Delete blog (admin)

- **ServiceController** - Service management
  - `GET /services` - Get all services
  - `GET /services/{id}` - Get service by ID
  - `POST /services` - Create service (admin)
  - `PUT /services/{id}` - Update service (admin)
  - `DELETE /services/{id}` - Delete service (admin)

- **TestimonialController** - Testimonial management
  - `GET /testimonials` - Get all
  - `GET /testimonials/featured` - Get featured
  - `GET /testimonials/{id}` - Get by ID
  - `POST /testimonials` - Create (admin)
  - `PUT /testimonials/{id}` - Update (admin)
  - `DELETE /testimonials/{id}` - Delete (admin)

- **ContactController** - Contact form
  - `POST /contacts` - Submit contact form

### Services (`src/main/java/com/adsvora/service/`)

Business logic layer:

- **AuthService** - Authentication logic
- **BlogService** - Blog CRUD operations
- **ServiceService** - Service CRUD operations
- **TestimonialService** - Testimonial CRUD operations
- **ContactService** - Contact form handling

### Repositories (`src/main/java/com/adsvora/repository/`)

Data access layer (Spring Data JPA):

```java
public interface BlogRepository extends JpaRepository<Blog, Long> {
    Optional<Blog> findBySlug(String slug);
    Page<Blog> findAll(Pageable pageable);
}
```

### Models (`src/main/java/com/adsvora/model/`)

JPA Entity classes:

- **User** - User/admin accounts
- **Blog** - Blog posts
- **Service** - Services offered
- **Testimonial** - Client testimonials
- **Contact** - Contact form submissions

### Security (`src/main/java/com/adsvora/security/`)

JWT authentication:

- **JwtTokenProvider** - Token generation and validation
- **JwtAuthenticationFilter** - Request authentication filter

### DTOs (`src/main/java/com/adsvora/dto/`)

Data Transfer Objects:

- **LoginRequest** / **LoginResponse** - Authentication
- **UserDto** - User data
- **BlogDto** - Blog data
- **ServiceDto** - Service data

## Configuration

### SecurityConfig

```java
@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf().disable()
           .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
           ...
    }
}
```

Secures endpoints:
- Public: Auth, Blogs, Services, Testimonials, Contacts
- Protected: Admin endpoints (create/update/delete)

### CORS Configuration

```java
registry.addMapping("/api/**")
    .allowedOrigins("*")
    .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
    .maxAge(3600);
```

Enables frontend communication from `http://localhost:3000`

## Database Schema

### Users Table
```sql
CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Blogs Table
```sql
CREATE TABLE blogs (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    content LONGTEXT NOT NULL,
    excerpt TEXT NOT NULL,
    image_url VARCHAR(500),
    author VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    published_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX (slug),
    INDEX (category),
    INDEX (published_at)
);
```

### Services Table
```sql
CREATE TABLE services (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT NOT NULL,
    icon VARCHAR(100) NOT NULL,
    image_url VARCHAR(500),
    order INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX (slug),
    INDEX (order)
);
```

### Service Features Table
```sql
CREATE TABLE service_features (
    service_id BIGINT NOT NULL,
    feature VARCHAR(255) NOT NULL,
    FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE
);
```

### Testimonials Table
```sql
CREATE TABLE testimonials (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    client_name VARCHAR(255) NOT NULL,
    client_title VARCHAR(255) NOT NULL,
    client_company VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    image_url VARCHAR(500),
    featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX (featured)
);
```

### Contacts Table
```sql
CREATE TABLE contacts (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    company VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX (email),
    INDEX (created_at)
);
```

## API Examples

### Authentication

#### Login
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@adsvora.com",
    "password": "Admin@123"
  }'
```

Response:
```json
{
  "token": "eyJhbGciOiJIUzUxMiJ9...",
  "user": {
    "id": 1,
    "email": "admin@adsvora.com",
    "name": "Admin User"
  }
}
```

### Blogs

#### Get All Blogs
```bash
curl http://localhost:8080/api/blogs?page=0&size=10
```

#### Get Blog by Slug
```bash
curl http://localhost:8080/api/blogs/slug/my-blog-post
```

#### Create Blog (Admin)
```bash
curl -X POST http://localhost:8080/api/blogs \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "title": "New Blog Post",
    "content": "Blog content",
    "excerpt": "Short excerpt",
    "author": "John Doe",
    "category": "Marketing",
    "imageUrl": "https://example.com/image.jpg"
  }'
```

#### Update Blog
```bash
curl -X PUT http://localhost:8080/api/blogs/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "title": "Updated Title",
    ...
  }'
```

#### Delete Blog
```bash
curl -X DELETE http://localhost:8080/api/blogs/1 \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Services

#### Get All Services
```bash
curl http://localhost:8080/api/services
```

#### Create Service (Admin)
```bash
curl -X POST http://localhost:8080/api/services \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "name": "Digital Marketing",
    "description": "Service description",
    "icon": "🎯",
    "features": ["Feature 1", "Feature 2"],
    "imageUrl": "https://example.com/image.jpg",
    "order": 1
  }'
```

### Testimonials

#### Get Featured Testimonials
```bash
curl http://localhost:8080/api/testimonials/featured
```

#### Create Testimonial (Admin)
```bash
curl -X POST http://localhost:8080/api/testimonials \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "clientName": "John Smith",
    "clientTitle": "CEO",
    "clientCompany": "Tech Corp",
    "content": "Great service!",
    "rating": 5,
    "imageUrl": "https://example.com/image.jpg",
    "featured": true
  }'
```

### Contact

#### Submit Contact Form
```bash
curl -X POST http://localhost:8080/api/contacts \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1 (555) 123-4567",
    "company": "Company Name",
    "message": "Contact message"
  }'
```

## JWT Authentication

### Token Structure

JWT tokens contain:
- Header: Algorithm (HS512)
- Payload: Email, issued at, expiration
- Signature: HMAC-SHA512

### Token Usage

Add to request header:
```
Authorization: Bearer eyJhbGciOiJIUzUxMiJ9...
```

### Token Validation

Tokens are validated on each request:
- Signature verification
- Expiration check
- Email extraction for authorization

## Error Handling

### Common Response Codes

- `200` - OK
- `201` - Created
- `204` - No Content
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `409` - Conflict
- `500` - Server Error

### Error Response Format

```json
{
  "timestamp": "2024-01-01T12:00:00",
  "status": 400,
  "error": "Bad Request",
  "message": "Invalid input",
  "path": "/api/blogs"
}
```

## Logging

### Configuration

Edit `application.properties`:
```properties
logging.level.root=INFO
logging.level.com.adsvora=DEBUG
logging.pattern.console=%d{yyyy-MM-dd HH:mm:ss} - %msg%n
```

### View Logs

```bash
tail -f logs/application.log
```

## Testing

### Manual Testing with cURL

Provided in API Examples section above.

### Using Postman

1. Import API collection from backend folder
2. Set base URL: `http://localhost:8080/api`
3. Set JWT token in Authorization header
4. Test endpoints

### Unit Tests

```bash
mvn test
```

## Deployment

### Production Build
```bash
mvn clean package
java -jar target/adsvora-backend-1.0.0.jar --spring.profiles.active=prod
```

### Environment Variables

```bash
export DB_URL=jdbc:mysql://prod-db:3306/adsvora
export DB_USER=admin
export DB_PASSWORD=secure_password
export JWT_SECRET=production-secret-key
export SERVER_PORT=8080
```

### Docker Deployment

Create `Dockerfile`:
```dockerfile
FROM openjdk:17-jdk-slim
COPY target/adsvora-backend-1.0.0.jar app.jar
ENTRYPOINT ["java","-jar","/app.jar"]
```

Build and run:
```bash
docker build -t adsvora-backend .
docker run -p 8080:8080 \
  -e SPRING_DATASOURCE_URL=jdbc:mysql://mysql:3306/adsvora \
  -e SPRING_DATASOURCE_USERNAME=root \
  -e SPRING_DATASOURCE_PASSWORD=password \
  adsvora-backend
```

## Troubleshooting

### Database Connection Error
```
Error: Communication link failure
```
- Verify MySQL is running
- Check database credentials
- Ensure database exists

### Port 8080 Already in Use
```bash
# Find process on port 8080
lsof -i :8080
# Kill process
kill -9 <PID>
```

### JWT Token Invalid
- Verify secret key matches frontend
- Check token expiration
- Ensure Authorization header format: `Bearer <token>`

### CORS Error
- Check SecurityConfig CORS settings
- Ensure frontend URL is in allowedOrigins
- Verify HTTP method is allowed

## Performance Optimization

### Database Indexing
- Indexes on frequently queried columns
- Composite indexes for common filters
- Check with `EXPLAIN` queries

### Caching
- Consider implementing Redis for caching
- Cache frequently accessed blog posts
- Cache service list

### Connection Pooling
- Configured in application.properties
- Default: 10 connections
- Tune based on load testing

## Security Best Practices

1. **Change JWT Secret**: Update in application.properties
2. **Use HTTPS**: Enable SSL in production
3. **Password Policy**: Implement strong password requirements
4. **Input Validation**: All inputs validated before processing
5. **Rate Limiting**: Consider implementing rate limits
6. **CORS**: Restrict to known domains in production

## Useful Commands

```bash
# View database
mysql -u root -p adsvora
SHOW TABLES;
DESCRIBE blogs;

# Check Java version
java -version

# Check Maven version
mvn -version

# Build without tests
mvn clean package -DskipTests

# View dependencies
mvn dependency:tree

# Update dependencies
mvn versions:display-dependency-updates
```

## Additional Resources

- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [Spring Data JPA](https://spring.io/projects/spring-data-jpa)
- [Spring Security](https://spring.io/projects/spring-security)
- [JWT (jsonwebtoken)](https://github.com/jwtk/jjwt)
- [MySQL Documentation](https://dev.mysql.com/doc)
