# Integration & Deployment Guide

## Full Stack Integration

Complete guide to integrate frontend and backend, and deploy to production.

## Local Integration Setup

### 1. Ensure Both Services are Running

#### Terminal 1: Frontend
```bash
cd frontend
npm install
npm run dev
```
Frontend available at: `http://localhost:3000`

#### Terminal 2: Backend
```bash
cd backend
mvn clean spring-boot:run
```
Backend available at: `http://localhost:8080/api`

### 2. Verify Configuration

**Frontend `.env`:**
```env
VITE_API_URL=http://localhost:8080/api
VITE_APP_NAME=AdsVora
```

**Backend `application.properties`:**
```properties
server.port=8080
server.servlet.context-path=/api
spring.datasource.url=jdbc:mysql://localhost:3306/adsvora
spring.datasource.username=root
```

### 3. Test Integration

#### Test Public Endpoints
```bash
# Get services (no auth needed)
curl http://localhost:8080/api/services

# Get blogs (paginated)
curl "http://localhost:8080/api/blogs?page=0&size=10"
```

#### Test Admin Flow
```bash
# Login
TOKEN=$(curl -s -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@adsvora.com",
    "password": "Admin@123"
  }' | jq -r '.token')

echo $TOKEN

# Create blog (using token)
curl -X POST http://localhost:8080/api/blogs \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "title": "Test Blog",
    "content": "Test content",
    "excerpt": "Test excerpt",
    "author": "Admin",
    "category": "Marketing",
    "imageUrl": "https://example.com/image.jpg"
  }'
```

### 4. Test Frontend Components

1. Navigate to `http://localhost:3000`
2. Verify all pages load correctly
3. Test admin dashboard: `http://localhost:3000/admin`
4. Create/edit/delete content via admin panel

## Data Synchronization

### Add Sample Data

#### Create Services
```bash
TOKEN="your_token_here"

curl -X POST http://localhost:8080/api/services \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "name": "Digital Strategy",
    "description": "Comprehensive market analysis and strategy development",
    "icon": "🎯",
    "features": ["Market research", "Competitor analysis", "Strategy planning"],
    "imageUrl": "https://example.com/digital-strategy.jpg",
    "order": 1
  }'
```

#### Create Blog Post
```bash
curl -X POST http://localhost:8080/api/blogs \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "title": "Getting Started with Digital Marketing",
    "content": "<h2>Introduction</h2><p>Digital marketing is...</p>",
    "excerpt": "Learn the basics of digital marketing",
    "author": "John Doe",
    "category": "Digital Marketing",
    "imageUrl": "https://example.com/blog.jpg"
  }'
```

#### Create Testimonial
```bash
curl -X POST http://localhost:8080/api/testimonials \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "clientName": "Jane Smith",
    "clientTitle": "Marketing Director",
    "clientCompany": "Tech Corp",
    "content": "AdsVora transformed our digital presence. Highly recommended!",
    "rating": 5,
    "imageUrl": "https://example.com/jane.jpg",
    "featured": true
  }'
```

## Production Deployment

### Frontend Deployment

#### Option 1: Vercel (Recommended for Next.js-like experience)

```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Deploy
cd frontend
vercel

# 3. Set environment variables in Vercel dashboard
# VITE_API_URL=https://api.adsvora.com/api
```

#### Option 2: Netlify

```bash
# 1. Build
npm run build

# 2. Deploy via Netlify dashboard
# - Connect Git repository
# - Build command: npm run build
# - Publish directory: dist

# 3. Set environment variables
# - VITE_API_URL=https://api.adsvora.com/api
```

#### Option 3: AWS S3 + CloudFront

```bash
# 1. Build
npm run build

# 2. Create S3 bucket
aws s3 mb s3://adsvora-frontend --region us-east-1

# 3. Deploy
aws s3 sync dist/ s3://adsvora-frontend --delete

# 4. Create CloudFront distribution
aws cloudfront create-distribution \
  --origin-domain-name adsvora-frontend.s3.amazonaws.com \
  --default-root-object index.html

# 5. Set environment variable in build
echo "VITE_API_URL=https://api.adsvora.com/api" > .env
npm run build
aws s3 sync dist/ s3://adsvora-frontend --delete
```

#### Option 4: DigitalOcean App Platform

1. Connect Git repository
2. Configure build: `npm install && npm run build`
3. Set environment variables
4. Deploy

### Backend Deployment

#### Option 1: AWS EC2 + RDS

```bash
# 1. Create EC2 instance (Ubuntu 22.04)
# 2. SSH into instance
ssh -i key.pem ubuntu@your-ip

# 3. Install Java 17
sudo apt update
sudo apt install openjdk-17-jdk

# 4. Install MySQL
sudo apt install mysql-server

# 5. Clone repository
git clone https://github.com/yourusername/adsvora.git
cd adsvora/backend

# 6. Build and run
mvn clean package
java -jar target/adsvora-backend-1.0.0.jar \
  --spring.datasource.url=jdbc:mysql://your-rds-endpoint:3306/adsvora \
  --spring.datasource.username=admin \
  --spring.datasource.password=your_password \
  --jwt.secret=your-production-secret-key
```

#### Option 2: Heroku

```bash
# 1. Install Heroku CLI
curl https://cli-assets.heroku.com/install.sh | sh

# 2. Login
heroku login

# 3. Create app
heroku create adsvora-backend

# 4. Add MySQL addon
heroku addons:create cleardb:ignite

# 5. Set environment variables
heroku config:set JWT_SECRET=your-secret-key

# 6. Deploy
git push heroku main

# 7. View logs
heroku logs --tail
```

#### Option 3: Docker on AWS ECS/Fargate

```bash
# 1. Create Dockerfile (already shown in backend setup)

# 2. Build image
docker build -t adsvora-backend .

# 3. Push to ECR
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 123456789.dkr.ecr.us-east-1.amazonaws.com
docker tag adsvora-backend:latest 123456789.dkr.ecr.us-east-1.amazonaws.com/adsvora-backend:latest
docker push 123456789.dkr.ecr.us-east-1.amazonaws.com/adsvora-backend:latest

# 4. Create ECS task definition and service
# - Use AWS console or CLI
# - Configure RDS database
# - Set environment variables
```

#### Option 4: DigitalOcean App Platform

```bash
# 1. Create App Platform app
doctl apps create --spec app.yaml

# 2. Configure MySQL via DigitalOcean Managed Database
# 3. Set environment variables
# 4. Deploy via Git push
```

#### Option 5: Traditional VPS (DigitalOcean/Linode)

```bash
# 1. SSH into server
ssh root@your-vps-ip

# 2. Install dependencies
apt update && apt upgrade -y
apt install openjdk-17-jdk maven mysql-server

# 3. Clone and build
git clone https://github.com/yourusername/adsvora.git
cd adsvora/backend
mvn clean package

# 4. Run with systemd
sudo nano /etc/systemd/system/adsvora.service
```

Create service file:
```ini
[Unit]
Description=AdsVora Backend
After=network.target

[Service]
Type=simple
User=adsvora
WorkingDirectory=/home/adsvora/adsvora/backend
ExecStart=/usr/bin/java -jar target/adsvora-backend-1.0.0.jar
Restart=always

[Install]
WantedBy=multi-user.target
```

Then:
```bash
sudo systemctl start adsvora
sudo systemctl enable adsvora
sudo systemctl status adsvora
```

### Database Deployment

#### AWS RDS Setup

```bash
# 1. Create RDS MySQL instance
aws rds create-db-instance \
  --db-instance-identifier adsvora-db \
  --db-instance-class db.t3.micro \
  --engine mysql \
  --master-username admin \
  --master-user-password your_password \
  --allocated-storage 20

# 2. Get endpoint
aws rds describe-db-instances \
  --db-instance-identifier adsvora-db \
  --query 'DBInstances[0].Endpoint.Address'

# 3. Import schema
mysql -h your-rds-endpoint -u admin -p adsvora < schema.sql
```

#### DigitalOcean Managed Database

```bash
# 1. Create via console
# 2. Get connection string
# 3. Import schema
mysql -h host -u user -p database < schema.sql
```

## Environment Configuration

### Frontend Production (.env)

```env
VITE_API_URL=https://api.adsvora.com/api
VITE_APP_NAME=AdsVora
```

### Backend Production (application.properties)

```properties
# Security
jwt.secret=your-long-random-secret-key-min-32-characters
jwt.expiration=86400000

# Database
spring.datasource.url=jdbc:mysql://db-host:3306/adsvora
spring.datasource.username=admin
spring.datasource.password=secure_password
spring.jpa.hibernate.ddl-auto=update

# Server
server.port=8080
server.servlet.context-path=/api
server.compression.enabled=true

# Logging
logging.level.root=WARN
logging.level.com.adsvora=INFO

# CORS
cors.allowed-origins=https://adsvora.com,https://www.adsvora.com

# Production flags
spring.profiles.active=prod
```

## SSL/HTTPS Setup

### Using Let's Encrypt with Nginx

```bash
# 1. Install Nginx
sudo apt install nginx certbot python3-certbot-nginx

# 2. Configure Nginx
sudo nano /etc/nginx/sites-available/adsvora
```

Configuration:
```nginx
server {
    listen 80;
    server_name api.adsvora.com;

    location / {
        proxy_pass http://localhost:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

```bash
# 3. Get SSL certificate
sudo certbot --nginx -d api.adsvora.com

# 4. Auto-renewal
sudo systemctl enable certbot.timer
sudo systemctl start certbot.timer
```

## Performance Optimization

### Frontend

1. **Code Splitting**: Automatic with Vite
2. **Image Optimization**: Use WebP format
3. **Caching**: Set appropriate headers
4. **CDN**: Use CloudFront or Cloudflare
5. **Minification**: Vite handles automatically

### Backend

1. **Connection Pooling**: HikariCP (configured)
2. **Database Indexes**: Already in schema
3. **Caching**: Add Redis for sessions
4. **Compression**: Enable gzip
5. **Monitoring**: Use New Relic or DataDog

### Database

1. **Indexes**: Configured in schema
2. **Query Optimization**: Use EXPLAIN
3. **Backups**: Automated via cloud provider
4. **Replication**: Set up master-slave

## Monitoring & Logging

### Application Monitoring

**New Relic:**
```bash
# Add dependency
mvn dependency:copy -Dartifact=com.newrelic.agent.java:newrelic-agent:7.9.0

# Configure
java -javaagent:newrelic/newrelic.jar -Dnewrelic.config.file=newrelic.yml \
  -jar target/adsvora-backend-1.0.0.jar
```

**DataDog:**
```bash
# Add to application.properties
management.endpoints.web.exposure.include=metrics,health
management.metrics.export.datadog.enabled=true
```

### Log Aggregation

**ELK Stack (Elasticsearch, Logstash, Kibana):**

1. Send logs from backend
2. Parse with Logstash
3. Visualize in Kibana

**CloudWatch:**

```java
// Spring Boot automatically sends logs to CloudWatch if running on AWS
```

## Backup & Recovery

### Database Backups

```bash
# Manual backup
mysqldump -h host -u user -p database > backup.sql

# Automated via cron
0 2 * * * mysqldump -u root -p'password' adsvora > /backups/adsvora_$(date +\%Y\%m\%d).sql

# Restore
mysql -u root -p adsvora < backup.sql
```

### File Backups

```bash
# Backup application files
tar -czf adsvora-backup-$(date +%Y%m%d).tar.gz /home/adsvora/adsvora

# Upload to S3
aws s3 cp adsvora-backup-*.tar.gz s3://adsvora-backups/
```

## CI/CD Pipeline

### GitHub Actions Workflow

```yaml
name: Deploy AdsVora

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v2
    
    - name: Set up JDK 17
      uses: actions/setup-java@v2
      with:
        java-version: '17'
    
    - name: Build Backend
      run: |
        cd backend
        mvn clean package -DskipTests
    
    - name: Set up Node
      uses: actions/setup-node@v2
      with:
        node-version: '18'
    
    - name: Build Frontend
      run: |
        cd frontend
        npm install
        npm run build
    
    - name: Deploy to Vercel (Frontend)
      uses: vercel/action@v1
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
        vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
    
    - name: Deploy to Heroku (Backend)
      run: |
        git remote add heroku https://git.heroku.com/adsvora-backend.git
        git push heroku main
      env:
        HEROKU_API_KEY: ${{ secrets.HEROKU_API_KEY }}
```

## Rollback Procedure

### If Something Goes Wrong

#### Backend Rollback
```bash
# Kill current process
pkill -f adsvora-backend

# Restore previous version
git checkout previous-tag
mvn clean package
java -jar target/adsvora-backend-1.0.0.jar
```

#### Frontend Rollback
```bash
# Vercel: Click "Rollback" in deployment history
# Netlify: Click "Rollback to production" in deploy log
# S3: Restore previous objects from version history
```

#### Database Rollback
```bash
# Restore from backup
mysql -u root -p adsvora < backup-date.sql
```

## Domain & DNS Setup

### AWS Route 53

```bash
# Create hosted zone for adsvora.com
aws route53 create-hosted-zone \
  --name adsvora.com \
  --caller-reference $(date +%s)

# Create DNS records
aws route53 change-resource-record-sets \
  --hosted-zone-id Z123... \
  --change-batch '{
    "Changes": [{
      "Action": "CREATE",
      "ResourceRecordSet": {
        "Name": "adsvora.com",
        "Type": "A",
        "TTL": 300,
        "ResourceRecords": [{"Value": "your-frontend-ip"}]
      }
    }]
  }'
```

### Cloudflare

1. Add domain to Cloudflare
2. Update nameservers at registrar
3. Configure DNS records
4. Enable SSL/TLS

## Email Setup

### SendGrid Integration

```bash
# Backend
# 1. Add dependency: spring-boot-starter-mail
# 2. Configure in application.properties
spring.mail.host=smtp.sendgrid.net
spring.mail.port=587
spring.mail.username=apikey
spring.mail.password=your-sendgrid-api-key

# 3. Send email
JavaMailSender mailSender;
SimpleMailMessage message = new SimpleMailMessage();
message.setTo("recipient@example.com");
message.setSubject("Contact Form Submission");
message.setText("New contact from AdsVora website");
mailSender.send(message);
```

## Health Checks & Alerts

### Implement Health Endpoint

```java
@GetMapping("/health")
public ResponseEntity<Map<String, String>> health() {
    return ResponseEntity.ok(Map.of("status", "UP"));
}
```

### Set Up Alerts

- **Uptime Monitor**: UptimeRobot or Pingdom
- **Error Tracking**: Sentry or Rollbar
- **Performance**: New Relic or DataDog
- **Email Alerts**: SendGrid or AWS SNS

## Success Checklist

- [ ] Frontend builds and deploys successfully
- [ ] Backend builds and starts
- [ ] Database migrates without errors
- [ ] All API endpoints working
- [ ] Admin login works
- [ ] CRUD operations working
- [ ] HTTPS configured
- [ ] DNS pointing correctly
- [ ] Backups running automatically
- [ ] Monitoring alerts configured
- [ ] Performance optimized
- [ ] Security hardened

## Troubleshooting Deployment

### Common Issues

**CORS Error**
- Verify frontend URL in backend CORS config
- Check Origin header in request
- Restart backend after config change

**Database Connection Failed**
- Verify credentials and endpoint
- Check firewall rules
- Ensure database is running
- Test connection with mysql client

**JWT Token Invalid**
- Verify secret key matches both apps
- Check token expiration
- Ensure Authorization header format is correct

**Pages Not Updating**
- Clear browser cache
- Invalidate CDN cache
- Check frontend deployment status
- Verify API endpoint in .env

**Memory Issues**
- Increase JVM heap: `java -Xmx1g -jar app.jar`
- Check for memory leaks
- Enable garbage collection logging

## Post-Deployment

1. **Monitor Logs**: Check application and error logs
2. **Test Functionality**: Navigate website, test features
3. **Performance Test**: Load testing with Apache JMeter
4. **Security Scan**: OWASP ZAP or similar
5. **User Feedback**: Gather feedback and iterate

## Additional Resources

- [Spring Boot Deployment](https://spring.io/guides/gs/deploying-spring-boot-app-to-aws/)
- [Vercel Documentation](https://vercel.com/docs)
- [AWS Deployment Guide](https://aws.amazon.com/getting-started)
- [Docker & Container](https://docs.docker.com)
- [Kubernetes](https://kubernetes.io/docs)
