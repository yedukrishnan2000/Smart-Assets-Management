from django.db import models
from django.conf import settings
from django.utils import timezone

from assets.models import Asset
from tickets.models import Ticket


User = settings.AUTH_USER_MODEL


class Assignment(models.Model):
    asset = models.ForeignKey(
        Asset,
        on_delete=models.CASCADE,
        related_name="assignments"
    )

    employee = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="assignments"
    )

    date_assigned = models.DateField(auto_now_add=True)
    date_returned = models.DateField(null=True, blank=True)

    def __str__(self):
        return f"{self.asset} → {self.employee}"

    # 🔥 CORE LOGIC: return asset + close tickets
    def return_asset(self):
        """
        1. Mark asset as AVAILABLE
        2. Set return date
        3. Auto-close related OPEN / IN_PROGRESS tickets
        """

        # prevent double return
        if self.date_returned:
            return

        # 1️⃣ mark assignment returned
        self.date_returned = timezone.now().date()
        self.save()

        # 2️⃣ mark asset available
        self.asset.status = "AVAILABLE"
        self.asset.save()

        # 3️⃣ auto-close tickets linked to this asset
        Ticket.objects.filter(
            asset=self.asset,
            status__in=["OPEN", "IN_PROGRESS"]
        ).update(status="CLOSED")
