from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response
from django.utils import timezone

from .models import Assignment
from .serializers import AssignmentSerializer
from tickets.models import Ticket


class AssignmentViewSet(ModelViewSet):
    queryset = Assignment.objects.all()
    serializer_class = AssignmentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user

        # 👑 Admin → all assignments
        if user.is_staff:
            return Assignment.objects.all().order_by("-date_assigned")

        # 👤 Employee → only their assignments
        return Assignment.objects.filter(
            employee=user
        ).order_by("-date_assigned")

    @action(detail=True, methods=["post"])
    def return_asset(self, request, pk=None):
        assignment = self.get_object()

        if assignment.date_returned:
            return Response({"error": "Already returned"}, status=400)

        assignment.date_returned = timezone.now().date()
        assignment.save()

        # 🔁 AUTO-CLOSE related ticket
        Ticket.objects.filter(
            asset=assignment.asset,
            status__in=["OPEN", "IN_PROGRESS"]
        ).update(status="CLOSED")

        return Response({"message": "Asset returned successfully"})
