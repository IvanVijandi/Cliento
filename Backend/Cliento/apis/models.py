from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser, PermissionsMixin


class Profesional(models.Model):
    id = models.AutoField(primary_key=True)
    email = models.EmailField(unique=True)
    contrasena = models.CharField(max_length=100)
    nombre = models.CharField(max_length=100)
    apellido = models.CharField(max_length=100)
    matricula = models.CharField(max_length=100, unique=True)
    especialidades = models.ManyToManyField('Especialidad', related_name='profesionales')
    #Campos booleanos
    terapeuta = models.BooleanField(default=False)
    psiquiatra = models.BooleanField(default=False)
    psicologo = models.BooleanField(default=False)

class Especialidad(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField()
   
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
    contrasena = models.CharField(max_length=100)
    direccion = models.CharField(max_length=200)
    altura = models.FloatField()
    peso = models.FloatField()
   

class Consulta(models.Model):
    id = models.AutoField(primary_key=True)
    fecha = models.DateTimeField()
    profesional = models.ForeignKey(Profesional, on_delete=models.CASCADE, related_name='consultas')
    consultorio = models.ForeignKey(Consultorio, on_delete=models.CASCADE, related_name='consultas')
    paciente = models.ForeignKey(Paciente, on_delete=models.CASCADE, related_name='consultas')
    virtual = models.BooleanField(default=False)
    
class Trastorno(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField()
    paciente = models.ForeignKey(Paciente, on_delete=models.CASCADE, related_name='trastornos')

class Droga(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField()
    fabricante = models.CharField(max_length=100)
    paciente = models.ForeignKey(Paciente, on_delete=models.CASCADE, related_name='drogas')

##Ficha a ver!
class Ficha(models.Model):
    id = models.AutoField(primary_key=True)
    paciente = models.OneToOneField(Paciente, on_delete=models.CASCADE, related_name='ficha')
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_actualizacion = models.DateTimeField(auto_now=True)
    
    