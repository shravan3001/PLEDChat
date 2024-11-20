from django.db.models import Count
from drf_spectacular.utils import extend_schema
from rest_framework import viewsets
from rest_framework.exceptions import AuthenticationFailed, ValidationError
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import Category, Server
from .schema import server_list_docs
from .serializer import CategorySerializer, ServerSerializer


class CategoryViewSet(viewsets.ViewSet):
    query_set = Category.objects.all()

    @extend_schema(responses=CategorySerializer)
    def list(self, request):
        serializer = CategorySerializer(self.query_set, many=True)
        return Response(serializer.data)


class ServerListViewSet(viewsets.ViewSet):

    query_set = Server.objects.all()
    # permission_classes = [IsAuthenticated]

    @server_list_docs
    def list(self, request):
        """This method retrieves a query_set of servers based on the query parameters provided in the request object.
            The following query parameters are supported:\n
                - category: Filters servers by category name
                - qty: Limits the number of servers returned
                - by_user: Filters servers by user ID, only returning servers user is a member of.
                - by_serverid: Filters servers by server ID.
                - with_num_members: Annotates each server with the number of members it has

        Args:\n
            request (_type_): _description_

        Raises:\n
            AuthenticationFailed: _description_
            AuthenticationFailed: _description_
            ValidationError: _description_
            ValidationError: _description_

        Returns:\n
            _type_: _description_
        """
        category = request.query_params.get("category")
        qty = request.query_params.get("qty")
        by_user = request.query_params.get("by_user") == "true"
        by_serverid = request.query_params.get("by_serverid")
        with_num_members = request.query_params.get("with_num_members") == "true"

        if category:
            self.query_set = self.query_set.filter(category__name=category)

        if by_user:
            if by_user and request.user.is_authenticated:
                user_id = request.user.id
                self.query_set = self.query_set.filter(member=user_id)
            else:
                raise AuthenticationFailed()

        if with_num_members:
            self.query_set = self.query_set.annotate(num_members=Count("member"))

        if by_serverid:
            # if by_user and request.user.is_authenticated:
            #     user_id = request.user.id
            #     self.query_set = self.query_set.filter(member=user_id)
            # else:
            #     raise AuthenticationFailed()
            try:
                self.query_set = self.query_set.filter(id=by_serverid)
                if not self.query_set.exists():
                    raise ValidationError(detail=f"Server with id {by_serverid} not found!")
            except ValueError:
                raise ValidationError(detail=f"Server with id {by_serverid} not found!")
            pass

        if qty:
            self.query_set = self.query_set[: int(qty)]

        serializer = ServerSerializer(self.query_set, many=True, context={"num_members": with_num_members})
        return Response(serializer.data)
