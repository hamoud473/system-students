import React from 'react';
import { Users, BookOpen, Calendar, Award } from 'lucide-react';

export default function Dashboard({ stats }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Étudiants</p>
            <p className="text-3xl font-bold text-blue-600">{stats.totalStudents}</p>
          </div>
          <Users className="w-12 h-12 text-blue-600 opacity-20" />
        </div>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Cours</p>
            <p className="text-3xl font-bold text-green-600">{stats.totalCourses}</p>
          </div>
          <BookOpen className="w-12 h-12 text-green-600 opacity-20" />
        </div>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Inscriptions</p>
            <p className="text-3xl font-bold text-purple-600">{stats.totalEnrollments}</p>
          </div>
          <Calendar className="w-12 h-12 text-purple-600 opacity-20" />
        </div>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Moyenne</p>
            <p className="text-3xl font-bold text-yellow-600">{stats.averageGrade}</p>
          </div>
          <Award className="w-12 h-12 text-yellow-600 opacity-20" />
        </div>
      </div>
    </div>
  );
}