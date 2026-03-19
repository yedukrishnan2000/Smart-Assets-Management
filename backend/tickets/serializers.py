from rest_framework import serializers
from .models import Ticket


class TicketSerializer(serializers.ModelSerializer):
    asset_name = serializers.CharField(source="asset.name", read_only=True)
    technician_name = serializers.CharField(
        source="assigned_technician.username",
        read_only=True
    )
    created_by = serializers.ReadOnlyField(source="created_by.username")

    class Meta:
        model = Ticket
        fields = "__all__"
        read_only_fields = ["created_by"]

    def update(self, instance, validated_data):
        user = self.context["request"].user

        # 👑 Admin → assign technician
        if user.is_staff:
            instance.assigned_technician = validated_data.get(
                "assigned_technician",
                instance.assigned_technician
            )
            instance.save()
            return instance

        # 👨‍🔧 Technician → update status
        if instance.assigned_technician == user:
            instance.status = validated_data.get(
                "status",
                instance.status
            )
            instance.save()
            return instance

        raise serializers.ValidationError(
            "You are not allowed to update this ticket"
        )
