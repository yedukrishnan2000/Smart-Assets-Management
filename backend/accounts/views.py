from django.contrib.auth import get_user_model
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .serializers import UserSerializer

User = get_user_model()


# 👑 ADMIN → manage users
class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated, IsAdminUser]


# 🔐 CUSTOM JWT LOGIN RESPONSE
class CustomTokenSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        user = self.user

        data["user"] = {
            "id": user.id,
            "username": user.username,
            "is_staff": user.is_staff,
            "groups": list(user.groups.values_list("name", flat=True)),
        }

        return data


class CustomTokenView(TokenObtainPairView):
    serializer_class = CustomTokenSerializer


# 👤 CURRENT LOGGED-IN USER
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def current_user(request):
    user = request.user

    return Response({
        "id": user.id,
        "username": user.username,
        "is_staff": user.is_staff,
        "groups": list(user.groups.values_list("name", flat=True)),
    })
