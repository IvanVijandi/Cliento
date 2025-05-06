from datetime import datetime
from .models import Profesional, Especialidad, Consultorio, Paciente, Consulta, Trastorno, Droga, Ficha

def run():
    # Crear especialidades
    especialidad1 = Especialidad.objects.create(nombre="Psicología", descripcion="Especialidad en psicología clínica")
    especialidad2 = Especialidad.objects.create(nombre="Psiquiatría", descripcion="Especialidad en psiquiatría")

    # Crear profesionales
    profesional1 = Profesional.objects.create_user(nombre="Juan",email="juan@gmail.com",password="12345678", apellido="Pérez", matricula="12345", terapeuta=True)
    profesional2 = Profesional.objects.create_user(nombre="Ana",email="Ana@gmail.com",password="12345678", apellido="Gómez", matricula="67890", psiquiatra=True)

    # Asociar especialidades a profesionales
    profesional1.especialidades.add(especialidad1)
    profesional2.especialidades.add(especialidad2)

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

    # Crear trastornos
    trastorno1 = Trastorno.objects.create(nombre="Ansiedad", descripcion="Trastorno de ansiedad generalizada", paciente=paciente1)
    trastorno2 = Trastorno.objects.create(nombre="Depresión", descripcion="Trastorno depresivo mayor", paciente=paciente2)

    # Crear drogas
    droga1 = Droga.objects.create(nombre="Paracetamol", descripcion="Analgésico", fabricante="Laboratorio X", paciente=paciente1)
    droga2 = Droga.objects.create(nombre="Ibuprofeno", descripcion="Antiinflamatorio", fabricante="Laboratorio Y", paciente=paciente2)

    # Crear fichas
    ficha1 = Ficha.objects.create(paciente=paciente1)
    ficha2 = Ficha.objects.create(paciente=paciente2)

    print("Datos de prueba creados exitosamente.")