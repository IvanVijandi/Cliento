from rest_framework import viewsets
from rest_framework.response import Response
from .models import Profesional, Consultorio, Paciente, Consulta, Nota
from .serializers import ProfesionalSerializer, ConsultorioSerializer, PacienteSerializer, ConsultaSerializer, NotaSerializer
from django.contrib.auth import authenticate, login , logout
from django.contrib.auth.models import User 
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated


##Clases de Vista viewsets | son como los controladores de Django pero para API REST
##Ya nos da PUT/DELETE/GET/POST

##VISTAS PARA LOS MODELOS
class ProfesionalView(viewsets.ModelViewSet):
    queryset = Profesional.objects.all()
    serializer_class = ProfesionalSerializer
    permission_classes = [IsAuthenticated]

class ConsultorioView(viewsets.ModelViewSet):
    queryset = Consultorio.objects.all()
    serializer_class = ConsultorioSerializer
    permission_classes = [IsAuthenticated]

class PacienteView(viewsets.ModelViewSet):
    queryset = Paciente.objects.all()
    serializer_class = PacienteSerializer
    permission_classes = [IsAuthenticated]

class ConsultaView(viewsets.ModelViewSet):
    queryset = Consulta.objects.all()
    serializer_class = ConsultaSerializer
    permission_classes = [IsAuthenticated]


class NotaView(viewsets.ModelViewSet):
    queryset = Nota.objects.all()
    serializer_class = NotaSerializer
    permission_classes = [IsAuthenticated]


##VISTA DE AUTENTICACION
class RegisterView(APIView):
    def post(self, request):
        data = request.data
        email = data.get('email') 
        password = data.get('password')
        name = data.get('name')
        apellido = data.get('apellido')
        matricula = data.get('matricula')

        if not email or not password or not apellido or not matricula:
            return Response({"error": "Todos los campos son obligatorios"}, status=400)
        
        if User.objects.filter(username=email).exists():
            return Response({"error": "El email ya está en uso"}, status=400)
        
        

        user = User.objects.create_user(
            username=email,
            password=password,
        )

        if Profesional.objects.filter(matricula = matricula).exists():
            return Response({"error": "La matrícula ya está en uso"}, status=400)
        
        Profesional.objects.create(user=user, matricula=matricula, nombre=name, apellido=apellido)

        
        return Response({"message": "Usuario creado exitosamente"}, status=201)
    


class LoginView(APIView):
    def post(self, request):
        data = request.data
        email = data.get('email')
        password = data.get('password')

        if not email or not password :
            return Response({"error": "Email y contraseña son obligatorios"}, status=400)

        user = authenticate(request, username=email, password=password)

        if user is None:
            return Response({"error": "Credenciales inválidas"}, status=401)
        
        if user.is_active:
            login(request, user) ##Establece cookie con la sesion del usuario
            return Response({"message": "Inicio de sesión exitoso"}, status=200)

        return Response({"message": "Inicio de sesión exitoso"}, status=200)
    
class LogoutView(APIView):
    def post(self, request):
        logout(request)  
        return Response({"message": "Sesión cerrada exitosamente"}, status=200)
    

class verifySession(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        user = request.user
        return Response({"message": "Sesión activa", "user": user.username}, status=200)


