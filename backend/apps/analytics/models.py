"""
Analytics and AI Forecasting Models
"""

from django.db import models
from django.contrib.auth.models import User
import uuid


class ForecastModel(models.Model):
    """AI model configurations and metadata"""
    MODEL_TYPES = [
        ('ARIMA', 'ARIMA Time Series'),
        ('LSTM', 'LSTM Neural Network'),
        ('PROPHET', 'Facebook Prophet'),
        ('LINEAR', 'Linear Regression'),
    ]

    STATUS_CHOICES = [
        ('TRAINING', 'Training'),
        ('ACTIVE', 'Active'),
        ('INACTIVE', 'Inactive'),
        ('ERROR', 'Error'),
    ]

    name = models.CharField(max_length=100)
    model_type = models.CharField(max_length=20, choices=MODEL_TYPES)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='TRAINING')
    
    # Model performance metrics
    accuracy_score = models.DecimalField(max_digits=5, decimal_places=4, null=True, blank=True)
    mae_score = models.DecimalField(max_digits=10, decimal_places=4, null=True, blank=True)  # Mean Absolute Error
    rmse_score = models.DecimalField(max_digits=10, decimal_places=4, null=True, blank=True)  # Root Mean Square Error
    
    # Model configuration
    hyperparameters = models.JSONField(default=dict, blank=True)
    training_data_start = models.DateTimeField(null=True, blank=True)
    training_data_end = models.DateTimeField(null=True, blank=True)
    
    # File paths
    model_file_path = models.CharField(max_length=500, blank=True)
    scaler_file_path = models.CharField(max_length=500, blank=True)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    last_training_date = models.DateTimeField(null=True, blank=True)
    
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.name} ({self.model_type})"


class SalesForecast(models.Model):
    """Generated sales forecasts for products"""
    product = models.ForeignKey('inventory.Product', on_delete=models.CASCADE, related_name='forecasts')
    model = models.ForeignKey(ForecastModel, on_delete=models.CASCADE)
    
    # Forecast data
    forecast_date = models.DateField()
    predicted_sales = models.PositiveIntegerField()
    confidence_lower = models.DecimalField(max_digits=10, decimal_places=2)
    confidence_upper = models.DecimalField(max_digits=10, decimal_places=2)
    confidence_level = models.DecimalField(max_digits=5, decimal_places=2, default=95.0)  # Percentage
    
    # Actual data for comparison
    actual_sales = models.PositiveIntegerField(null=True, blank=True)
    
    # Metadata
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ['product', 'model', 'forecast_date']
        ordering = ['forecast_date']
        indexes = [
            models.Index(fields=['product', 'forecast_date']),
            models.Index(fields=['model', 'forecast_date']),
        ]

    def __str__(self):
        return f"{self.product.name} - {self.forecast_date} - {self.predicted_sales}"

    @property
    def accuracy_percentage(self):
        """Calculate forecast accuracy if actual data is available"""
        if self.actual_sales is not None:
            if self.predicted_sales == 0:
                return 0
            error = abs(self.actual_sales - self.predicted_sales)
            accuracy = max(0, 100 - (error / max(self.predicted_sales, self.actual_sales) * 100))
            return round(accuracy, 2)
        return None


class DemandPattern(models.Model):
    """Identified demand patterns for products"""
    PATTERN_TYPES = [
        ('SEASONAL', 'Seasonal'),
        ('TRENDING', 'Trending'),
        ('CYCLICAL', 'Cyclical'),
        ('RANDOM', 'Random'),
    ]

    product = models.ForeignKey('inventory.Product', on_delete=models.CASCADE, related_name='demand_patterns')
    pattern_type = models.CharField(max_length=20, choices=PATTERN_TYPES)
    confidence_score = models.DecimalField(max_digits=5, decimal_places=4)
    
    # Pattern specific data
    pattern_data = models.JSONField(default=dict)  # Store pattern-specific parameters
    
    # Analysis period
    analysis_start_date = models.DateField()
    analysis_end_date = models.DateField()
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-confidence_score']

    def __str__(self):
        return f"{self.product.name} - {self.pattern_type} ({self.confidence_score})"


class SalesMetrics(models.Model):
    """Daily sales metrics for analysis and forecasting"""
    product = models.ForeignKey('inventory.Product', on_delete=models.CASCADE, related_name='sales_metrics')
    date = models.DateField()
    
    # Sales data
    quantity_sold = models.PositiveIntegerField(default=0)
    revenue = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    
    # Stock data
    opening_stock = models.PositiveIntegerField(default=0)
    closing_stock = models.PositiveIntegerField(default=0)
    stock_in = models.PositiveIntegerField(default=0)
    stock_out = models.PositiveIntegerField(default=0)
    
    # External factors (for advanced modeling)
    day_of_week = models.PositiveSmallIntegerField()  # 1=Monday, 7=Sunday
    is_holiday = models.BooleanField(default=False)
    is_weekend = models.BooleanField(default=False)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ['product', 'date']
        ordering = ['date']
        indexes = [
            models.Index(fields=['product', 'date']),
            models.Index(fields=['date']),
        ]

    def __str__(self):
        return f"{self.product.name} - {self.date} - {self.quantity_sold} sold"


class AIRecommendation(models.Model):
    """AI-generated recommendations for inventory management"""
    RECOMMENDATION_TYPES = [
        ('REORDER', 'Reorder Product'),
        ('OVERSTOCK', 'Reduce Stock'),
        ('PRICE_ADJUST', 'Price Adjustment'),
        ('DISCONTINUE', 'Discontinue Product'),
        ('PROMOTE', 'Promote Product'),
    ]

    PRIORITY_LEVELS = [
        ('LOW', 'Low'),
        ('MEDIUM', 'Medium'),
        ('HIGH', 'High'),
        ('CRITICAL', 'Critical'),
    ]

    product = models.ForeignKey('inventory.Product', on_delete=models.CASCADE, related_name='ai_recommendations')
    recommendation_type = models.CharField(max_length=20, choices=RECOMMENDATION_TYPES)
    priority = models.CharField(max_length=10, choices=PRIORITY_LEVELS)
    
    title = models.CharField(max_length=200)
    description = models.TextField()
    
    # Recommendation data
    suggested_quantity = models.PositiveIntegerField(null=True, blank=True)
    suggested_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    estimated_impact = models.TextField(blank=True)
    
    # Confidence and validation
    confidence_score = models.DecimalField(max_digits=5, decimal_places=4)
    is_implemented = models.BooleanField(default=False)
    implementation_date = models.DateTimeField(null=True, blank=True)
    implementation_notes = models.TextField(blank=True)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        ordering = ['-priority', '-confidence_score', '-created_at']

    def __str__(self):
        return f"{self.product.name} - {self.recommendation_type} - {self.priority}"
