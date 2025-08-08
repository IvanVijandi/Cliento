from datetime import datetime
from django.contrib.auth.models import User
from .models import Profesional, Consultorio, Paciente, Consulta
def run():

    # Crear usuarios de Django primero
    user1 = User.objects.create_user(username="juan@gmail.com", email="juan@gmail.com", password="12345678")
    user2 = User.objects.create_user(username="ana@gmail.com", email="ana@gmail.com", password="12345678")

    # Crear profesionales (solo con los campos que existen en el modelo)
    profesional1 = Profesional.objects.create(
        User=user1, 
        nombre="Juan", 
        apellido="Pérez", 
        matricula="12345"
    )
    profesional2 = Profesional.objects.create(
        User=user2, 
        nombre="Ana", 
        apellido="Gómez", 
        matricula="67890"
    )

    # Crear consultorios
    consultorio1 = Consultorio.objects.create(direccion="Calle Falsa 123", telefono="123456789")
    consultorio2 = Consultorio.objects.create(direccion="Avenida Siempre Viva 742", telefono="987654321")

    # Asociar profesionales a consultorios
    consultorio1.profesionales.add(profesional1, profesional2)
    consultorio2.profesionales.add(profesional1)

    # Crear pacientes
    paciente1 = Paciente.objects.create(
        nombre="Pedro", apellido="López", dni="12345678", fecha_nacimiento="1990-01-01",
        telefono="123456789", email="pedro@example.com", direccion="Calle Falsa 123", altura=1.75, peso=70
    )
    paciente2 = Paciente.objects.create(
        nombre="María", apellido="Rodríguez", dni="87654321", fecha_nacimiento="1985-05-05",
        telefono="987654321", email="maria@example.com", direccion="Avenida Siempre Viva 742", altura=1.65, peso=60
    )

    # Crear consultas
    consulta1 = Consulta.objects.create(
        fecha=datetime.now(), profesional=profesional1, consultorio=consultorio1, paciente=paciente1, virtual=False
    )
    consulta2 = Consulta.objects.create(
        fecha=datetime.now(), profesional=profesional2, consultorio=consultorio2, paciente=paciente2, virtual=True
    )

    print("Datos de prueba creados exitosamente.")