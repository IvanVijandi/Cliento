from django.urls import path,include
from rest_framework.routers import DefaultRouter
##Vistas de modelos
from .views import Consultorio, Paciente, Consulta, Nota, Profesional
##Vistas de autenticacion
from .views import LoginView, RegisterView, LogoutView, verifySession


router = DefaultRouter()
router.register(r'profesional', Profesional, basename='profesional')
router.register(r'consultorio', Consultorio, basename='consultorio')
router.register(r'paciente', Paciente, basename='paciente')
router.register(r'consulta', Consulta, basename='consulta')
router.register(r'nota', Nota, basename='nota')

urlpatterns = [
    path('', include(router.urls)),
    path('login/', LoginView.as_view(), name='login'),
    path('register/', RegisterView.as_view(), name='register'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('verify-session/', verifySession.as_view(), name='verify_session'),
]



