from django.shortcuts import render
from drf_spectacular.utils import extend_schema
from rest_framework import permissions, viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import Account
from .schema import server_list_docs
from .serializers import AccountSerializer


# Create your views here.
class AccountViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    @server_list_docs
    def list(self, request):
        user_id = request.query_params.get("user_id")
        query_set = Account.objects.all().get(id=user_id)
        serializer = AccountSerializer(query_set)
        return Response(serializer.data)
