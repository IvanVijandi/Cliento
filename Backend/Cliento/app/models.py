from django.db import models
from django.contrib.auth.models import User 




class Profesional(models.Model):
    
    User = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profesional') ##Asociamos el perfil de profesinal con User de Django
    ##campo username y password ya vienen por defecto en User de Django. Usaremos username para albergar el email del profesional
    matricula = models.CharField(max_length=100, unique=True)
    nombre = models.CharField(max_length=100)
    apellido = models.CharField(max_length=100)

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.nombre} {self.apellido} ({self.matricula})"

   
class Consultorio(models.Model):
    id = models.AutoField(primary_key=True)
    direccion = models.CharField(max_length=200)
    telefono = models.CharField(max_length=20)
    profesionales = models.ManyToManyField(Profesional, related_name='consultorios')
    
class Paciente(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100)
    apellido = models.CharField(max_length=100)
    dni = models.CharField(max_length=20, unique=True)
    fecha_nacimiento = models.DateField()
    telefono = models.CharField(max_length=20)
    email = models.EmailField()
    direccion = models.CharField(max_length=200)
    altura = models.FloatField()
    peso = models.FloatField()
   

class Nota(models.Model):
    id = models.AutoField(primary_key=True)
    contenido = models.TextField()
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_actualizacion = models.DateTimeField(auto_now=True)
    consulta = models.ForeignKey('Consulta', on_delete=models.CASCADE, related_name='notas')
    
class Consulta(models.Model):
    id = models.AutoField(primary_key=True)
    fecha = models.DateTimeField()
    profesional = models.ForeignKey(Profesional, on_delete=models.CASCADE, related_name='consultas')
    consultorio = models.ForeignKey(Consultorio, on_delete=models.CASCADE, related_name='consultas')
    paciente = models.ForeignKey(Paciente, on_delete=models.CASCADE, related_name='consultas')
    virtual = models.BooleanField(default=False)
