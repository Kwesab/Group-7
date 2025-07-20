# 🤖 InventoryAI - AI-Powered Inventory Management System

A comprehensive, production-ready inventory management system powered by AI forecasting models (ARIMA/LSTM) with automated purchase order generation and Paystack payment integration.

![InventoryAI Dashboard](https://img.shields.io/badge/AI-Powered-blue?style=for-the-badge)
![Django](https://img.shields.io/badge/Django-4.2.7-green?style=for-the-badge)
![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-blue?style=for-the-badge)
![Paystack](https://img.shields.io/badge/Paystack-Payments-orange?style=for-the-badge)

## 🌟 Features

### 🎯 Core Functionality

- **Real-time Inventory Tracking** - Monitor stock levels, locations, and movements
- **AI-Powered Demand Forecasting** - ARIMA and LSTM models for accurate predictions
- **Automated Purchase Orders** - Smart reordering based on AI recommendations
- **Payment Processing** - Integrated Paystack for secure payments in Ghana Cedis (₵)
- **Advanced Analytics** - Sales trends, performance metrics, and insights
- **Multi-user Support** - Role-based access control and user management

### 🤖 AI & Machine Learning

- **Time Series Forecasting** - ARIMA models for seasonal patterns
- **Deep Learning** - LSTM neural networks for complex demand patterns
- **Pattern Recognition** - Automatic detection of sales trends and cycles
- **Smart Recommendations** - AI-generated suggestions for inventory optimization
- **Continuous Learning** - Models retrain automatically with new data

### 💳 Payment & Financial

- **Paystack Integration** - Secure payment processing for Ghana
- **Multi-currency Support** - Primary support for Ghana Cedis (₵)
- **Financial Tracking** - Revenue, costs, and profitability analysis
- **Automated Invoicing** - Generate and track purchase orders

### 🎨 User Experience

- **Modern UI/UX** - Beautiful, responsive design with dark/light modes
- **Real-time Updates** - Live notifications and status updates
- **Mobile Responsive** - Works seamlessly on all devices
- **Dashboard Analytics** - Comprehensive overview with key metrics

## 🏗️ Architecture

```
┌─────────���───────┐    ┌─────────────────┐    ┌─────────────────┐
│   React Frontend │    │  Django Backend │    │   PostgreSQL    │
│                 │◄──►│                 │◄──►│    Database     │
│ • Modern UI     │    │ • REST APIs     │    │ • Data Storage  │
│ • TypeScript    │    │ • AI Models     │    │ • Analytics     │
│ • TailwindCSS   │    │ • Celery Tasks  │    │ • Audit Trails  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│    Paystack     │    │ AI/ML Models    │    │  Redis/Celery   │
│                 │    │                 │    │                 │
│ • Payments      │    │ • TensorFlow    │    │ • Background    │
│ • Webhooks      │    │ • Scikit-learn  │    │   Tasks         │
│ • Ghana Cedis   │    │ • Statsmodels   │    │ • Caching       │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🚀 Quick Start

### Prerequisites

- **Python 3.9+**
- **Node.js 18+**
- **PostgreSQL 13+**
- **Redis** (for Celery)

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/inventory-ai.git
cd inventory-ai
```

### 2. Backend Setup (Django)

```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\\Scripts\\activate

# Install dependencies
cd backend
pip install -r requirements.txt

# Environment configuration
cp .env.example .env
# Edit .env with your database and API keys

# Database setup
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser

# Start development server
python manage.py runserver
```

### 3. Frontend Setup (React)

```bash
# Install dependencies
cd ../  # Back to project root
npm install

# Start development server
npm run dev
```

### 4. Background Tasks (Celery)

```bash
# Terminal 1: Start Redis
redis-server

# Terminal 2: Start Celery Worker
cd backend
celery -A inventory_ai worker --loglevel=info

# Terminal 3: Start Celery Beat (for scheduled tasks)
celery -A inventory_ai beat --loglevel=info
```

## 📊 Data Model

### Core Entities

#### Products & Inventory

```python
Product
├── Basic Info (name, SKU, description)
├── Pricing (cost, selling price, margins)
├── Stock Levels (current, min, max, reorder point)
├── Physical Attributes (weight, dimensions)
├── Location Tracking (warehouse location)
└── AI Metrics (demand patterns, forecasts)
```

#### Orders & Transactions

```python
PurchaseOrder
├── Supplier Information
├── Order Items & Quantities
├── Financial Details
├── Delivery Tracking
└── Payment Status

SaleOrder
├── Customer Information
├── Order Items & Pricing
├── Fulfillment Status
└── Revenue Tracking
```

#### Analytics & AI

```python
ForecastModel
├── Model Type (ARIMA, LSTM)
├── Performance Metrics
├── Training Configuration
└── Model Files

SalesForecast
├── Predicted Demand
├── Confidence Intervals
├── Actual vs Predicted
└── Accuracy Tracking
```

## ��� AI/ML Pipeline

### 1. Data Collection

- Historical sales data
- Stock movement patterns
- Seasonal trends
- External factors (holidays, promotions)

### 2. Feature Engineering

- Time-based features (day, week, month, season)
- Lag features (previous sales periods)
- Rolling statistics (moving averages, trends)
- External variables (holidays, marketing events)

### 3. Model Training

```python
# ARIMA for Seasonal Patterns
ARIMA(p, d, q) × (P, D, Q)s
- Autoregressive (AR)
- Integrated (I)
- Moving Average (MA)
- Seasonal components

# LSTM for Complex Patterns
LSTM Neural Network
- Sequence-to-sequence modeling
- Long-term dependency capture
- Multi-variate input support
- Dropout for regularization
```

### 4. Prediction & Recommendations

- Daily/weekly/monthly forecasts
- Confidence intervals
- Reorder point optimization
- Purchase quantity suggestions

## 🔧 API Documentation

### Authentication

```bash
# Token-based authentication
POST /api/v1/auth/login/
Content-Type: application/json

{
    \"username\": \"your_username\",
    \"password\": \"your_password\"
}

# Response
{
    \"token\": \"your_auth_token\",
    \"user\": {...}
}
```

### Inventory Management

```bash
# Get all products
GET /api/v1/inventory/products/
Authorization: Token your_auth_token

# Create new product
POST /api/v1/inventory/products/
{
    \"name\": \"iPhone 15 Pro\",
    \"sku\": \"APL-IP15P-128\",
    \"category\": 1,
    \"price\": \"999.99\",
    \"cost\": \"750.00\",
    \"current_stock\": 50,
    \"min_stock_level\": 10
}

# Get stock alerts
GET /api/v1/inventory/alerts/
```

### Purchase Orders

```bash
# Create purchase order
POST /api/v1/orders/purchase-orders/
{
    \"supplier\": 1,
    \"items\": [
        {
            \"product\": 1,
            \"quantity\": 100,
            \"unit_price\": \"750.00\"
        }
    ]
}

# Process payment
POST /api/v1/payments/process-payment/
{
    \"order_id\": \"uuid\",
    \"payment_method\": \"paystack\",
    \"amount\": \"75000.00\"
}
```

### Analytics & Forecasting

```bash
# Get sales forecast
GET /api/v1/analytics/forecast/?product_id=1&days=30

# Get AI recommendations
GET /api/v1/analytics/recommendations/

# Trigger model retraining
POST /api/v1/analytics/retrain-models/
```

## 💳 Paystack Integration

### Configuration

```python
# settings.py
PAYSTACK_PUBLIC_KEY = 'pk_live_6dbb3b43909b00e3373eeb1b25f7870c4f59c13b'
PAYSTACK_SECRET_KEY = 'sk_live_5165175049097497bef479df321b0e684f9fd7bb'
```

### Payment Flow

1. **Frontend**: User initiates payment for purchase order
2. **Paystack**: Secure payment processing in Ghana Cedis
3. **Webhook**: Payment confirmation received
4. **Backend**: Order status updated, stock movement recorded
5. **AI**: Payment data incorporated into forecasting models

## 🛠️ Development

### Project Structure

```
inventory-ai/
├── frontend/
│   ├── client/           # React application
│   ├── components/       # Reusable UI components
│   ├── pages/           # Route components
│   └── hooks/           # Custom React hooks
├── backend/
│   ├── apps/
│   │   ├── inventory/   # Inventory management
│   │   ├── orders/      # Purchase/Sale orders
│   │   ├── analytics/   # AI models & analytics
│   │   ├── payments/    # Payment processing
│   │   └── users/       # User management
│   ├── ai_models/       # Trained ML models
│   └── static/          # Static files
└── docs/                # Documentation
```

### Testing

```bash
# Backend tests
cd backend
python manage.py test

# Frontend tests
npm test

# AI model tests
python -m pytest apps/analytics/tests/
```

### Code Quality

```bash
# Python formatting
black .
flake8 .

# JavaScript/TypeScript
npm run lint
npm run typecheck
```

## 🚀 Deployment

### Docker Deployment

```bash
# Build and run with Docker Compose
docker-compose up -d

# Scale services
docker-compose up -d --scale web=3
```

### Production Checklist

- [ ] Environment variables configured
- [ ] Database migrations applied
- [ ] Static files collected
- [ ] SSL certificates installed
- [ ] Backup strategy implemented
- [ ] Monitoring and logging configured
- [ ] AI models trained and deployed

## 📈 Performance & Scaling

### Database Optimization

- Proper indexing on frequently queried fields
- Query optimization with select_related/prefetch_related
- Database connection pooling
- Read replicas for analytics queries

### Caching Strategy

- Redis for session and API response caching
- Model-level caching for frequently accessed data
- CDN for static assets

### AI Model Performance

- Model versioning and A/B testing
- Batch prediction for efficiency
- Model serving with TensorFlow Serving
- Auto-scaling based on prediction load

## 🔒 Security

### Data Protection

- Encrypted database connections
- Secure API authentication (Token/JWT)
- Input validation and sanitization
- Rate limiting on API endpoints

### Payment Security

- PCI DSS compliance through Paystack
- Secure webhook verification
- Encrypted sensitive data storage
- Audit logging for financial transactions

## 📞 Support & Contributing

### Getting Help

- 📖 [Documentation](./docs/)
- 🐛 [Issue Tracker](https://github.com/your-username/inventory-ai/issues)
- 💬 [Discussions](https://github.com/your-username/inventory-ai/discussions)

### Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

### Development Guidelines

- Follow PEP 8 for Python code
- Use TypeScript for frontend development
- Write comprehensive tests
- Document new features
- Follow semantic versioning

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Walmart Sales Dataset** - Training data for AI models
- **Paystack** - Payment processing for Ghana
- **Django & React Communities** - Amazing frameworks and support
- **TensorFlow & Scikit-learn** - Machine learning libraries

---

**Built with ❤️ for modern inventory management in Ghana** 🇬🇭

_For detailed technical documentation, see the [docs/](./docs/) directory._
