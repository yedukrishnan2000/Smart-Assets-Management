from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AssetViewSet

#dashboard_stats

router = DefaultRouter()
router.register("assets", AssetViewSet)

urlpatterns = [
    path("", include(router.urls)),
    # path("dashboard_stats/", dashboard_stats),
    
]
