"""
Celery configuration for AI-based inventory management.
Used for background tasks like AI model training and forecasting.
"""

import os
from celery import Celery
from django.conf import settings

# Set the default Django settings module for the 'celery' program.
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'inventory_ai.settings')

app = Celery('inventory_ai')

# Using a string here means the worker doesn't have to serialize
# the configuration object to child processes.
app.config_from_object('django.conf:settings', namespace='CELERY')

# Load task modules from all registered Django apps.
app.autodiscover_tasks()

# Celery Beat Schedule for Periodic Tasks
app.conf.beat_schedule = {
    'update-forecasts-daily': {
        'task': 'apps.analytics.tasks.update_daily_forecasts',
        'schedule': 86400.0,  # Execute every 24 hours
    },
    'retrain-models-weekly': {
        'task': 'apps.analytics.tasks.retrain_models',
        'schedule': 604800.0,  # Execute every week
    },
    'generate-low-stock-alerts': {
        'task': 'apps.inventory.tasks.check_low_stock_alerts',
        'schedule': 3600.0,  # Execute every hour
    },
}

app.conf.timezone = 'Africa/Accra'

@app.task(bind=True)
def debug_task(self):
    print(f'Request: {self.request!r}')
