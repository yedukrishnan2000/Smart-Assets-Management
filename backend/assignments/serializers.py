from rest_framework import serializers
from .models import Assignment


class AssignmentSerializer(serializers.ModelSerializer):
    asset_name = serializers.CharField(source="asset.name", read_only=True)
    employee_name = serializers.CharField(
        source="employee.username", read_only=True
    )

    class Meta:
        model = Assignment
        fields = [
            "id",
            "asset",
            "asset_name",
            "employee",
            "employee_name",
            "date_assigned",
            "date_returned",
        ]
