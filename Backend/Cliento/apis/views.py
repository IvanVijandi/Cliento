from rest_framework import viewsets
from rest_framework.response import Response
from .models import Profesional, Especialidad, Consultorio, Paciente, Consulta, Trastorno, Droga, Ficha
from .serializers import ProfesionalSerializer, EspecialidadSerializer, ConsultorioSerializer, PacienteSerializer, ConsultaSerializer, TrastornoSerializer, DrogaSerializer, FichaSerializer
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from rest_framework import status   

##Clases de Vista viewsets | son como los controladores de Django pero para API REST
##Ya nos da PUT/DELETE/GET/POST

##VISTAS PARA LOS MODELOS

class Profesional(viewsets.ModelViewSet):
    queryset = Profesional.objects.all() ##url base
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

class LoginView(viewsets.ViewSet):
    def post(self, request):
        email = request.data.get('email')
        contrasena = request.data.get('contrasena')

        # Validar que se proporcionen las credenciales
        if not email or not contrasena:
            return Response(
                {"error": "Se deben proporcionar el correo y la contraseña."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Autenticar al usuario
        profesional = authenticate(username=email, password=contrasena)
        if profesional is None:
            return Response(
                {"error": "Credenciales incorrectas."},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        # Generar o recuperar el token del usuario
        token, created = Token.objects.get_or_create(user=profesional)

        # Devolver el token y los datos del usuario
        return Response(
            {
                "token": token.key,
                "user": {
                    "id": profesional.id,
                    "email": profesional.email,
                    "nombre": profesional.nombre,
                    "apellido": profesional.apellido,
                },
            },
            status=status.HTTP_200_OK,
        )