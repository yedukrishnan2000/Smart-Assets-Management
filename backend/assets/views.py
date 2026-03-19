from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

from .models import Asset
from .serializers import AssetSerializer
from assignments.models import Assignment
from tickets.models import Ticket   # ✅ ADD THIS LINE
from django.db.models import Count, Q


class AssetViewSet(ModelViewSet):
    queryset = Asset.objects.all()
    serializer_class = AssetSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user

        # 👑 Admin → all assets
        if user.is_staff:
            return Asset.objects.all()

        # 👨 Employee → only assets currently assigned
        return Asset.objects.filter(
            assignments__employee=user,
            assignments__date_returned__isnull=True
        ).distinct()


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def dashboard_stats(request):
    user = request.user

    # 👑 ADMIN
    if user.is_staff:
        open_tickets = Ticket.objects.filter(status="OPEN").count()

    # 🧑‍🔧 TECHNICIAN
    elif user.groups.filter(name="Technician").exists():
        open_tickets = Ticket.objects.filter(
            assigned_technician=user,
            status="OPEN"
        ).count()

    # 👨 EMPLOYEE
    else:
        open_tickets = Ticket.objects.filter(
            created_by=user,
            status="OPEN"
        ).count()

    return Response({
        "total_assets": Asset.objects.count(),
        "assigned_assets": Assignment.objects.filter(date_returned__isnull=True).count(),
        "open_tickets": open_tickets,
    })

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def inventory_view(request):
    inventory = (
        Asset.objects
        .values("asset_type")
        .annotate(
            quantity=Count("id"),
            available=Count("id", filter=Q(status="AVAILABLE"))
        )
    )
    return Response(inventory)
