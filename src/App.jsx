import React, { useState, useEffect } from 'react';
import { Plus, Search } from 'lucide-react';
import Dashboard from './components/Dashboard';
import StudentList from './components/StudentList';
import CourseList from './components/CourseList';
import EnrollmentList from './components/EnrollmentList';
import Modal from './components/Modal';
import * as api from './services/api';

export default function App() {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [activeTab, setActiveTab] = useState('students');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [editingItem, setEditingItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  const [studentForm, setStudentForm] = useState({
    nom: '',
    prenom: '',
    email: '',
    date_naissance: '',
    telephone: ''
  });

  const [courseForm, setCourseForm] = useState({
    nom_cours: '',
    code_cours: '',
    credits: '',
    description: ''
  });

  // Charger les données au démarrage
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [studentsRes, coursesRes, enrollmentsRes] = await Promise.all([
        api.getStudents(),
        api.getCourses(),
        api.getEnrollments()
      ]);
      setStudents(studentsRes.data);
      setCourses(coursesRes.data);
      setEnrollments(enrollmentsRes.data);
    } catch (error) {
      console.error('Erreur lors du chargement des données:', error);
      alert('Erreur lors du chargement des données');
    } finally {
      setLoading(false);
    }
  };

  // CRUD Étudiants
  const handleAddStudent = async () => {
    try {
      if (editingItem) {
        await api.updateStudent(editingItem.id, studentForm);
      } else {
        await api.createStudent(studentForm);
      }
      loadData();
      resetStudentForm();
      setShowModal(false);
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur lors de l\'enregistrement');
    }
  };

  const handleEditStudent = (student) => {
    setEditingItem(student);
    setStudentForm(student);
    setModalType('student');
    setShowModal(true);
  };

  const handleDeleteStudent = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet étudiant?')) {
      try {
        await api.deleteStudent(id);
        loadData();
      } catch (error) {
        console.error('Erreur:', error);
        alert('Erreur lors de la suppression');
      }
    }
  };

  const resetStudentForm = () => {
    setStudentForm({ nom: '', prenom: '', email: '', date_naissance: '', telephone: '' });
    setEditingItem(null);
  };

  // CRUD Cours
  const handleAddCourse = async () => {
    try {
      if (editingItem) {
        await api.updateCourse(editingItem.id, courseForm);
      } else {
        await api.createCourse(courseForm);
      }
      loadData();
      resetCourseForm();
      setShowModal(false);
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur lors de l\'enregistrement');
    }
  };

  const handleEditCourse = (course) => {
    setEditingItem(course);
    setCourseForm(course);
    setModalType('course');
    setShowModal(true);
  };

  const handleDeleteCourse = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce cours?')) {
      try {
        await api.deleteCourse(id);
        loadData();
      } catch (error) {
        console.error('Erreur:', error);
        alert('Erreur lors de la suppression');
      }
    }
  };

  const resetCourseForm = () => {
    setCourseForm({ nom_cours: '', code_cours: '', credits: '', description: '' });
    setEditingItem(null);
  };

  // Filtrage
  const filteredStudents = students.filter(s =>
    s.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredCourses = courses.filter(c =>
    c.nom_cours.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.code_cours.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Statistiques
  const stats = {
    totalStudents: students.length,
    totalCourses: courses.length,
    totalEnrollments: enrollments.length,
    averageGrade: enrollments.length > 0 && enrollments.some(e => e.note)
      ? (enrollments.filter(e => e.note).reduce((acc, e) => acc + parseFloat(e.note), 0) / enrollments.filter(e => e.note).length).toFixed(2)
      : '0'
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold">Système de Gestion d'Étudiants</h1>
          <p className="text-blue-100 mt-1">Plateforme complète de gestion académique</p>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-4 py-6">
        <Dashboard stats={stats} />

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="flex border-b">
            <button
              onClick={() => { setActiveTab('students'); setSearchTerm(''); }}
              className={`px-6 py-3 font-medium ${activeTab === 'students' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}
            >
              Étudiants
            </button>
            <button
              onClick={() => { setActiveTab('courses'); setSearchTerm(''); }}
              className={`px-6 py-3 font-medium ${activeTab === 'courses' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}
            >
              Cours
            </button>
            <button
              onClick={() => { setActiveTab('enrollments'); setSearchTerm(''); }}
              className={`px-6 py-3 font-medium ${activeTab === 'enrollments' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}
            >
              Inscriptions
            </button>
          </div>

          {/* Toolbar */}
          <div className="p-4 flex justify-between items-center border-b">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Rechercher..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {activeTab !== 'enrollments' && (
              <button
                onClick={() => {
                  setModalType(activeTab === 'students' ? 'student' : 'course');
                  setShowModal(true);
                  setEditingItem(null);
                  resetStudentForm();
                  resetCourseForm();
                }}
                className="ml-4 bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700"
              >
                <Plus className="w-5 h-5 mr-2" />
                Ajouter
              </button>
            )}
          </div>

          {/* Content */}
          <div className="p-4">
            {loading ? (
              <div className="text-center py-8">
                <p className="text-gray-500">Chargement...</p>
              </div>
            ) : (
              <>
                {activeTab === 'students' && (
                  <StudentList
                    students={filteredStudents}
                    onEdit={handleEditStudent}
                    onDelete={handleDeleteStudent}
                  />
                )}
                {activeTab === 'courses' && (
                  <CourseList
                    courses={filteredCourses}
                    onEdit={handleEditCourse}
                    onDelete={handleDeleteCourse}
                  />
                )}
                {activeTab === 'enrollments' && (
                  <EnrollmentList enrollments={enrollments} />
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          resetStudentForm();
          resetCourseForm();
        }}
        title={`${editingItem ? 'Modifier' : 'Ajouter'} ${modalType === 'student' ? 'un étudiant' : 'un cours'}`}
      >
        {modalType === 'student' ? (
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Nom"
              value={studentForm.nom}
              onChange={(e) => setStudentForm({ ...studentForm, nom: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Prénom"
              value={studentForm.prenom}
              onChange={(e) => setStudentForm({ ...studentForm, prenom: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              placeholder="Email"
              value={studentForm.email}
              onChange={(e) => setStudentForm({ ...studentForm, email: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="date"
              value={studentForm.date_naissance}
              onChange={(e) => setStudentForm({ ...studentForm, date_naissance: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="tel"
              placeholder="Téléphone"
              value={studentForm.telephone}
              onChange={(e) => setStudentForm({ ...studentForm, telephone: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => {
                  setShowModal(false);
                  resetStudentForm();
                }}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                Annuler
              </button>
              <button
                onClick={handleAddStudent}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                {editingItem ? 'Modifier' : 'Ajouter'}
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Code du cours"
              value={courseForm.code_cours}
              onChange={(e) => setCourseForm({ ...courseForm, code_cours: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Nom du cours"
              value={courseForm.nom_cours}
              onChange={(e) => setCourseForm({ ...courseForm, nom_cours: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              placeholder="Crédits"
              value={courseForm.credits}
              onChange={(e) => setCourseForm({ ...courseForm, credits: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              placeholder="Description"
              value={courseForm.description}
              onChange={(e) => setCourseForm({ ...courseForm, description: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
            />
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => {
                  setShowModal(false);
                  resetCourseForm();
                }}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                Annuler
              </button>
              <button
                onClick={handleAddCourse}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                {editingItem ? 'Modifier' : 'Ajouter'}
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}