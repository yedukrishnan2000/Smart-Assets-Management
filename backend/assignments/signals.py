from django.db.models.signals import post_save
from django.dispatch import receiver

from assignments.models import Assignment
from tickets.models import Ticket


@receiver(post_save, sender=Assignment)
def close_tickets_on_return(sender, instance, **kwargs):
    if instance.date_returned:
        Ticket.objects.filter(
            asset=instance.asset,
            status__in=["OPEN", "IN_PROGRESS"]
        ).update(status="CLOSED")
