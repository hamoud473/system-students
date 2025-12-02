import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';

export default function CourseList({ courses, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b bg-gray-50">
            <th className="text-left py-3 px-4 font-semibold">Code</th>
            <th className="text-left py-3 px-4 font-semibold">Nom du cours</th>
            <th className="text-left py-3 px-4 font-semibold">Crédits</th>
            <th className="text-left py-3 px-4 font-semibold">Description</th>
            <th className="text-left py-3 px-4 font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center py-8 text-gray-500">
                Aucun cours trouvé
              </td>
            </tr>
          ) : (
            courses.map((course) => (
              <tr key={course.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4 font-medium">{course.code_cours}</td>
                <td className="py-3 px-4">{course.nom_cours}</td>
                <td className="py-3 px-4">{course.credits}</td>
                <td className="py-3 px-4">{course.description}</td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => onEdit(course)}
                    className="text-blue-600 hover:text-blue-800 mr-3 inline-flex items-center"
                  >
                    <Edit2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => onDelete(course.id)}
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