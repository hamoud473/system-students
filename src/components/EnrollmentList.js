import React from 'react';

export default function EnrollmentList({ enrollments }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b bg-gray-50">
            <th className="text-left py-3 px-4 font-semibold">Étudiant</th>
            <th className="text-left py-3 px-4 font-semibold">Cours</th>
            <th className="text-left py-3 px-4 font-semibold">Note</th>
            <th className="text-left py-3 px-4 font-semibold">Date d'inscription</th>
          </tr>
        </thead>
        <tbody>
          {enrollments.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center py-8 text-gray-500">
                Aucune inscription trouvée
              </td>
            </tr>
          ) : (
            enrollments.map((enrollment) => (
              <tr key={enrollment.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">
                  {enrollment.prenom} {enrollment.nom}
                </td>
                <td className="py-3 px-4">
                  {enrollment.nom_cours} ({enrollment.code_cours})
                </td>
                <td className="py-3 px-4">
                  {enrollment.note ? (
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      enrollment.note >= 80 ? 'bg-green-100 text-green-800' :
                      enrollment.note >= 60 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {enrollment.note}/100
                    </span>
                  ) : (
                    <span className="text-gray-400">Non noté</span>
                  )}
                </td>
                <td className="py-3 px-4">{enrollment.date_inscription}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}