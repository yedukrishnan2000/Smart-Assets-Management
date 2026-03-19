from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied
from rest_framework import status as drf_status

from .models import Ticket
from .serializers import TicketSerializer


class TicketViewSet(ModelViewSet):
    serializer_class = TicketSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user

        # 👑 Admin → all tickets
        if user.is_staff:
            return Ticket.objects.all().order_by("-created_at")

        # 👨 Technician → only assigned tickets
        if user.groups.filter(name="Technician").exists():
            return Ticket.objects.filter(
                assigned_technician=user
            ).order_by("-created_at")

        # 👤 Employee → only their tickets
        return Ticket.objects.filter(
            created_by=user
        ).order_by("-created_at")

    @action(detail=True, methods=["post"])
    def update_status(self, request, pk=None):
        ticket = self.get_object()
        user = request.user
        new_status = request.data.get("status")

        if ticket.assigned_technician != user:
            raise PermissionDenied("Only assigned technician can update ticket")

        ticket.status = new_status
        ticket.save()

        return Response(
            {"message": "Status updated"},
            status=drf_status.HTTP_200_OK
        )
