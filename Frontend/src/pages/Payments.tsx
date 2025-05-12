import React, { useState } from "react";
import {
  DollarSign,
  Plus,
  Edit2,
  Trash2,
  X,
  Search,
  Download,
  Filter,
  CreditCard,
  CheckCircle,
  XCircle,
} from "lucide-react";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

interface Payment {
  id: string;
  patientName: string;
  amount: number;
  date: string;
  status: "paid" | "pending" | "cancelled";
  method: "cash" | "card" | "transfer";
  concept: string;
  invoiceNumber: string;
}

const mockPayments: Payment[] = [
  {
    id: "1",
    patientName: "Ana López",
    amount: 80,
    date: "2024-03-26",
    status: "paid",
    method: "card",
    concept: "Sesión de terapia",
    invoiceNumber: "INV-2024-001",
  },
  {
    id: "2",
    patientName: "Jorge Sánchez",
    amount: 60,
    date: "2024-03-25",
    status: "pending",
    method: "transfer",
    concept: "Consulta inicial",
    invoiceNumber: "INV-2024-002",
  },
  {
    id: "3",
    patientName: "Marta Gómez",
    amount: 80,
    date: "2024-03-24",
    status: "paid",
    method: "cash",
    concept: "Sesión de terapia",
    invoiceNumber: "INV-2024-003",
  },
];

const Payments: React.FC = () => {
  const [payments, setPayments] = useState<Payment[]>(mockPayments);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingPayment, setEditingPayment] = useState<Payment | null>(null);
  const [newPayment, setNewPayment] = useState<Partial<Payment>>({
    patientName: "",
    amount: 0,
    date: "",
    status: "pending",
    method: "cash",
    concept: "",
  });

  const filteredPayments = payments.filter((payment) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      payment.patientName.toLowerCase().includes(searchLower) ||
      payment.invoiceNumber.toLowerCase().includes(searchLower) ||
      payment.concept.toLowerCase().includes(searchLower)
    );
  });

  const handleAddPayment = () => {
    if (newPayment.patientName && newPayment.amount && newPayment.date) {
      const payment: Payment = {
        id: Date.now().toString(),
        patientName: newPayment.patientName,
        amount: newPayment.amount,
        date: newPayment.date,
        status: newPayment.status as "paid" | "pending" | "cancelled",
        method: newPayment.method as "cash" | "card" | "transfer",
        concept: newPayment.concept || "",
        invoiceNumber: `INV-2024-${(payments.length + 1)
          .toString()
          .padStart(3, "0")}`,
      };
      setPayments([...payments, payment]);
      setNewPayment({
        patientName: "",
        amount: 0,
        date: "",
        status: "pending",
        method: "cash",
        concept: "",
      });
      setShowAddModal(false);
    }
  };

  const handleUpdatePayment = () => {
    if (editingPayment) {
      setPayments(
        payments.map((p) => (p.id === editingPayment.id ? editingPayment : p))
      );
      setEditingPayment(null);
    }
  };

  const handleDeletePayment = (id: string) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este pago?")) {
      setPayments(payments.filter((p) => p.id !== id));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getMethodIcon = (method: string) => {
    switch (method) {
      case "card":
        return <CreditCard className="h-4 w-4" />;
      case "cash":
        return <DollarSign className="h-4 w-4" />;
      case "transfer":
        return <Download className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <DollarSign className="h-6 w-6 text-primary mr-2" />
              <h1 className="text-2xl font-semibold text-gray-900">Pagos</h1>
            </div>
            <Button onClick={() => setShowAddModal(true)}>
              <Plus className="h-5 w-5 mr-2" />
              Nuevo Pago
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Buscar pagos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Filter className="h-5 w-5 mr-2" />
              Filtros
            </Button>
            <Button variant="outline">
              <Download className="h-5 w-5 mr-2" />
              Exportar
            </Button>
          </div>
        </div>

        {/* Payments Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Paciente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Factura
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Importe
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Método
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPayments.map((payment) => (
                <tr key={payment.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-primary text-white rounded-full flex items-center justify-center">
                        {payment.patientName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {payment.patientName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {payment.concept}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {payment.invoiceNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(payment.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {payment.amount.toLocaleString("es-ES", {
                        style: "currency",
                        currency: "EUR",
                      })}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                        payment.status
                      )}`}
                    >
                      {payment.status === "paid" && (
                        <CheckCircle className="h-4 w-4 mr-1" />
                      )}
                      {payment.status === "cancelled" && (
                        <XCircle className="h-4 w-4 mr-1" />
                      )}
                      {payment.status === "paid"
                        ? "Pagado"
                        : payment.status === "pending"
                        ? "Pendiente"
                        : "Cancelado"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center text-sm text-gray-500">
                      {getMethodIcon(payment.method)}
                      <span className="ml-1">
                        {payment.method === "card"
                          ? "Tarjeta"
                          : payment.method === "cash"
                          ? "Efectivo"
                          : "Transferencia"}
                      </span>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => setEditingPayment(payment)}
                      className="text-primary hover:text-primary-dark mr-3"
                    >
                      <Edit2 className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDeletePayment(payment.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Payment Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">
                  Nuevo Pago
                </h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            <div className="px-6 py-4">
              <div className="space-y-4">
                <Input
                  label="Paciente"
                  value={newPayment.patientName}
                  onChange={(e) =>
                    setNewPayment({
                      ...newPayment,
                      patientName: e.target.value,
                    })
                  }
                  placeholder="Nombre del paciente"
                />
                <Input
                  label="Importe"
                  type="number"
                  value={newPayment.amount}
                  onChange={(e) =>
                    setNewPayment({
                      ...newPayment,
                      amount: Number(e.target.value),
                    })
                  }
                  placeholder="0.00"
                />
                <Input
                  label="Fecha"
                  type="date"
                  value={newPayment.date}
                  onChange={(e) =>
                    setNewPayment({ ...newPayment, date: e.target.value })
                  }
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Método de pago
                  </label>
                  <select
                    value={newPayment.method}
                    onChange={(e) =>
                      setNewPayment({
                        ...newPayment,
                        method: e.target.value as "cash" | "card" | "transfer",
                      })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                  >
                    <option value="cash">Efectivo</option>
                    <option value="card">Tarjeta</option>
                    <option value="transfer">Transferencia</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Estado
                  </label>
                  <select
                    value={newPayment.status}
                    onChange={(e) =>
                      setNewPayment({
                        ...newPayment,
                        status: e.target.value as
                          | "paid"
                          | "pending"
                          | "cancelled",
                      })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                  >
                    <option value="paid">Pagado</option>
                    <option value="pending">Pendiente</option>
                    <option value="cancelled">Cancelado</option>
                  </select>
                </div>
                <Input
                  label="Concepto"
                  value={newPayment.concept}
                  onChange={(e) =>
                    setNewPayment({ ...newPayment, concept: e.target.value })
                  }
                  placeholder="Concepto del pago"
                />
              </div>
            </div>
            <div className="px-6 py-4 bg-gray-50 rounded-b-lg flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setShowAddModal(false)}>
                Cancelar
              </Button>
              <Button onClick={handleAddPayment}>Guardar</Button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Payment Modal */}
      {editingPayment && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">
                  Editar Pago
                </h3>
                <button
                  onClick={() => setEditingPayment(null)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            <div className="px-6 py-4">
              <div className="space-y-4">
                <Input
                  label="Paciente"
                  value={editingPayment.patientName}
                  onChange={(e) =>
                    setEditingPayment({
                      ...editingPayment,
                      patientName: e.target.value,
                    })
                  }
                />
                <Input
                  label="Importe"
                  type="number"
                  value={editingPayment.amount}
                  onChange={(e) =>
                    setEditingPayment({
                      ...editingPayment,
                      amount: Number(e.target.value),
                    })
                  }
                />
                <Input
                  label="Fecha"
                  type="date"
                  value={editingPayment.date}
                  onChange={(e) =>
                    setEditingPayment({
                      ...editingPayment,
                      date: e.target.value,
                    })
                  }
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Método de pago
                  </label>
                  <select
                    value={editingPayment.method}
                    onChange={(e) =>
                      setEditingPayment({
                        ...editingPayment,
                        method: e.target.value as "cash" | "card" | "transfer",
                      })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                  >
                    <option value="cash">Efectivo</option>
                    <option value="card">Tarjeta</option>
                    <option value="transfer">Transferencia</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Estado
                  </label>
                  <select
                    value={editingPayment.status}
                    onChange={(e) =>
                      setEditingPayment({
                        ...editingPayment,
                        status: e.target.value as
                          | "paid"
                          | "pending"
                          | "cancelled",
                      })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                  >
                    <option value="paid">Pagado</option>
                    <option value="pending">Pendiente</option>
                    <option value="cancelled">Cancelado</option>
                  </select>
                </div>
                <Input
                  label="Concepto"
                  value={editingPayment.concept}
                  onChange={(e) =>
                    setEditingPayment({
                      ...editingPayment,
                      concept: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="px-6 py-4 bg-gray-50 rounded-b-lg flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setEditingPayment(null)}>
                Cancelar
              </Button>
              <Button onClick={handleUpdatePayment}>Guardar cambios</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payments;
