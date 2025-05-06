from rest_framework import viewsets
from rest_framework.response import Response
from .models import Profesional, Especialidad, Consultorio, Paciente, Consulta, Trastorno, Droga, Ficha
from .serializers import ProfesionalSerializer, EspecialidadSerializer, ConsultorioSerializer, PacienteSerializer, ConsultaSerializer, TrastornoSerializer, DrogaSerializer, FichaSerializer
from django.contrib.auth import authenticate
from rest_framework.views import APIView

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

class LoginView(APIView):
    def post(self,request):
        email = request.data.get('email')
        password = request.data.get('password')
            
        user = authenticate(request, email=email, password=password)
            
        if user is not None:
            return Response({' Usuario  encontrado'})
        else:
            return Response({'error': 'Invalid credentials'})


  