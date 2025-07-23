from rest_framework import viewsets
from rest_framework.response import Response
from .models import Profesional, Especialidad, Consultorio, Paciente, Consulta, Trastorno, Droga, Ficha
from .serializers import ProfesionalSerializer, EspecialidadSerializer, ConsultorioSerializer, PacienteSerializer, ConsultaSerializer, TrastornoSerializer, DrogaSerializer, FichaSerializer
from django.contrib.auth import authenticate
from django.contrib.auth.models import User 
from rest_framework.views import APIView


##Clases de Vista viewsets | son como los controladores de Django pero para API REST
##Ya nos da PUT/DELETE/GET/POST

##VISTAS PARA LOS MODELOS
class Profesional(viewsets.ModelViewSet):
    queryset = Profesional.objects.all()
    serializer_class = ProfesionalSerializer

class Especialidad(viewsets.ModelViewSet):
    queryset = Especialidad.objects.all()
    serializer_class = EspecialidadSerializer

class Consultorio(viewsets.ModelViewSet):
    queryset = Consultorio.objects.all()
    serializer_class = ConsultorioSerializer

class Paciente(viewsets.ModelViewSet):
    queryset = Paciente.objects.all()
    serializer_class = PacienteSerializer

class Consulta(viewsets.ModelViewSet):
    queryset = Consulta.objects.all()
    serializer_class = ConsultaSerializer

class Trastorno(viewsets.ModelViewSet):
    queryset = Trastorno.objects.all()
    serializer_class = TrastornoSerializer

class Droga(viewsets.ModelViewSet):
    queryset = Droga.objects.all()
    serializer_class = DrogaSerializer

class Ficha(viewsets.ModelViewSet):
    queryset = Ficha.objects.all()
    serializer_class = FichaSerializer  


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

        return Response({"message": "Inicio de sesión exitoso"}, status=200)