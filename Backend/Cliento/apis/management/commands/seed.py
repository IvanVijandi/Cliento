from django.core.management.base import BaseCommand
from apis.models import Profesional, Especialidad, Consultorio, Paciente, Consulta, Trastorno, Droga, Ficha
from faker import Faker
import random

class Command(BaseCommand):
    help = "Seed the database with initial data"

    def handle(self, *args, **kwargs):
        fake = Faker()

        # Crear Especialidades
        especialidades = []
        for nombre in ["Psicología Clínica", "Psiquiatría", "Terapia Familiar"]:
            especialidad = Especialidad.objects.create(
                nombre=nombre,
                descripcion=fake.text(max_nb_chars=200)
            )
            especialidades.append(especialidad)
        self.stdout.write(self.style.SUCCESS(f"Se crearon {len(especialidades)} especialidades."))

        # Crear Profesionales
        profesionales = []
        for _ in range(5):
            profesional = Profesional.objects.create(
                email=fake.email(),
                contrasena=fake.password(),
                nombre=fake.first_name(),
                apellido=fake.last_name(),
                matricula=fake.unique.bothify(text="MAT-####"),
                terapeuta=random.choice([True, False]),
                psiquiatra=random.choice([True, False]),
                psicologo=random.choice([True, False]),
            )
            profesional.especialidades.set(random.sample(especialidades, k=random.randint(1, len(especialidades))))
            profesionales.append(profesional)
        self.stdout.write(self.style.SUCCESS(f"Se crearon {len(profesionales)} profesionales."))

        # Crear Consultorios
        consultorios = []
        for _ in range(3):
            consultorio = Consultorio.objects.create(
                direccion=fake.address(),
                telefono=fake.phone_number(),
            )
            consultorio.profesionales.set(random.sample(profesionales, k=random.randint(1, len(profesionales))))
            consultorios.append(consultorio)
        self.stdout.write(self.style.SUCCESS(f"Se crearon {len(consultorios)} consultorios."))

        # Crear Pacientes
        pacientes = []
        for _ in range(10):
            paciente = Paciente.objects.create(
                nombre=fake.first_name(),
                apellido=fake.last_name(),
                dni=fake.unique.random_number(digits=8),
                fecha_nacimiento=fake.date_of_birth(minimum_age=18, maximum_age=80),
                telefono=fake.phone_number(),
                email=fake.email(),
                contrasena=fake.password(),
                direccion=fake.address(),
                altura=round(random.uniform(1.5, 2.0), 2),
                peso=round(random.uniform(50, 100), 2),
            )
            pacientes.append(paciente)
        self.stdout.write(self.style.SUCCESS(f"Se crearon {len(pacientes)} pacientes."))

        # Crear Consultas
        consultas = []
        for _ in range(15):
            consulta = Consulta.objects.create(
                fecha=fake.date_time_this_year(),
                profesional=random.choice(profesionales),
                consultorio=random.choice(consultorios),
                paciente=random.choice(pacientes),
                virtual=random.choice([True, False]),
            )
            consultas.append(consulta)
        self.stdout.write(self.style.SUCCESS(f"Se crearon {len(consultas)} consultas."))

        # Crear Trastornos
        trastornos = []
        for _ in range(10):
            trastorno = Trastorno.objects.create(
                nombre=fake.word(),
                descripcion=fake.text(max_nb_chars=200),
                paciente=random.choice(pacientes),
            )
            trastornos.append(trastorno)
        self.stdout.write(self.style.SUCCESS(f"Se crearon {len(trastornos)} trastornos."))

        # Crear Drogas
        drogas = []
        for _ in range(10):
            droga = Droga.objects.create(
                nombre=fake.word(),
                descripcion=fake.text(max_nb_chars=200),
                fabricante=fake.company(),
                paciente=random.choice(pacientes),
            )
            drogas.append(droga)
        self.stdout.write(self.style.SUCCESS(f"Se crearon {len(drogas)} drogas."))

        # Crear Fichas
        fichas = []
        for paciente in pacientes:
            ficha = Ficha.objects.create(
                paciente=paciente,
            )
            fichas.append(ficha)
        self.stdout.write(self.style.SUCCESS(f"Se crearon {len(fichas)} fichas."))