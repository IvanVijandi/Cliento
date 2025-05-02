from django.urls import path,include
from rest_framework.routers import DefaultRouter
from .views import Especialidad, Consultorio, Paciente, Consulta, Trastorno, Droga, Ficha, Profesional
router = DefaultRouter()
router.register(r'profesional', Profesional, basename='profesional')
router.register(r'especialidad', Especialidad, basename='especialidad') 
router.register(r'consultorio', Consultorio, basename='consultorio')
router.register(r'paciente', Paciente, basename='paciente')
router.register(r'consulta', Consulta, basename='consulta')
router.register(r'trastorno', Trastorno, basename='trastorno')
router.register(r'droga', Droga, basename='droga')
router.register(r'ficha', Ficha, basename='ficha')

urlpatterns = [
    path('', include(router.urls)),
]



