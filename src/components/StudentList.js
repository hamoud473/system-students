import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';

export default function StudentList({ students, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b bg-gray-50">
            <th className="text-left py-3 px-4 font-semibold">Nom</th>
            <th className="text-left py-3 px-4 font-semibold">Prénom</th>
            <th className="text-left py-3 px-4 font-semibold">Email</th>
            <th className="text-left py-3 px-4 font-semibold">Date de naissance</th>
            <th className="text-left py-3 px-4 font-semibold">Téléphone</th>
            <th className="text-left py-3 px-4 font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center py-8 text-gray-500">
                Aucun étudiant trouvé
              </td>
            </tr>
          ) : (
            students.map((student) => (
              <tr key={student.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">{student.nom}</td>
                <td className="py-3 px-4">{student.prenom}</td>
                <td className="py-3 px-4">{student.email}</td>
                <td className="py-3 px-4">{student.date_naissance}</td>
                <td className="py-3 px-4">{student.telephone}</td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => onEdit(student)}
                    className="text-blue-600 hover:text-blue-800 mr-3 inline-flex items-center"
                  >
                    <Edit2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => onDelete(student.id)}
                    className="text-red-600 hover:text-red-800 inline-flex items-center"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}