from django.contrib import admin
from .models import Asset

@admin.register(Asset)
class AssetAdmin(admin.ModelAdmin):
    list_display = ('name', 'asset_type', 'status')
    list_filter = ('status', 'asset_type')
    search_fields = ('name', 'serial_number')
 