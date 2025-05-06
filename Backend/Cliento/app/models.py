from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager


class ProfesionalManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("El email es obligatorio")
        email = self.normalize_email(email)
        profesional = self.model(email=email, **extra_fields)
        profesional.set_password(password)
        profesional.save()
        return profesional

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, password, **extra_fields)

class Profesional(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    nombre = models.CharField(max_length=100)
    apellido = models.CharField(max_length=100)
    matricula = models.CharField(max_length=100, unique=True)
    especialidades = models.ManyToManyField('Especialidad', related_name='profesionales', blank=True)

    terapeuta = models.BooleanField(default=False)
    psiquiatra = models.BooleanField(default=False)
    psicologo = models.BooleanField(default=False)

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = ProfesionalManager() ##Sobreescribimos el manager para que ProfesionalManager

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['nombre', 'apellido', 'matricula']



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
    
    