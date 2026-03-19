from django.contrib import admin
from django.urls import path, include, re_path
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView

from assets.views import AssetViewSet, dashboard_stats
from inventory.views import InventoryViewSet
from assignments.views import AssignmentViewSet
from tickets.views import TicketViewSet
from accounts.views import UserViewSet, CustomTokenView, current_user
from accounts.password_views import ChangePasswordView
from .views import FrontendAppView


router = DefaultRouter()
router.register('assets', AssetViewSet)
router.register('inventory', InventoryViewSet)
router.register('assignments', AssignmentViewSet)
router.register("tickets", TicketViewSet, basename="tickets")
router.register('users', UserViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),

    # API routes
    path('api/', include(router.urls)),

    # JWT auth routes
    path("api/login/", CustomTokenView.as_view()),
    path('api/refresh/', TokenRefreshView.as_view()),
    path("api/dashboard/", dashboard_stats),
    path("api/me/", current_user),
    path("api/change-password/", ChangePasswordView.as_view()),

    # React catch-all route
    re_path(r'^.*$', FrontendAppView.as_view()),
]