import React, { useState, useEffect } from "react";
import { Student, Faculty, ExamHall, SeatingArrangement } from "@/entities/all";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Users, UserCheck, Building, Grid3x3, Upload, FileDown } from "lucide-react";

export default function Dashboard() {
  const [stats, setStats] = useState({
    students: 0,
    faculty: 0,
    halls: 0,
    arrangements: 0
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const [students, faculty, halls, arrangements] = await Promise.all([
        Student.list('', 1000),
        Faculty.list('', 1000),
        ExamHall.list('', 1000),
        SeatingArrangement.list('', 1000)
      ]);

      setStats({
        students: students.length,
        faculty: faculty.length,
        halls: halls.length,
        arrangements: arrangements.length
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-green-900 mb-8">KHIT Examination Dashboard</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100">Students</p>
                  <p className="text-3xl font-bold">{stats.students}</p>
                </div>
                <Users className="w-12 h-12" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-emerald-100">Faculty</p>
                  <p className="text-3xl font-bold">{stats.faculty}</p>
                </div>
                <UserCheck className="w-12 h-12" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-teal-500 to-teal-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-teal-100">Halls</p>
                  <p className="text-3xl font-bold">{stats.halls}</p>
                </div>
                <Building className="w-12 h-12" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-lime-500 to-lime-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lime-100">Seating Plans</p>
                  <p className="text-3xl font-bold">{stats.arrangements}</p>
                </div>
                <Grid3x3 className="w-12 h-12" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link to={createPageUrl("Upload")}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardContent className="p-6 text-center">
                <Upload className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Upload Data</h3>
                <p className="text-gray-600">Import student and faculty details</p>
              </CardContent>
            </Card>
          </Link>

          <Link to={createPageUrl("SeatingChart")}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardContent className="p-6 text-center">
                <Grid3x3 className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Generate Seating</h3>
                <p className="text-gray-600">Create seating arrangements</p>
              </CardContent>
            </Card>
          </Link>

          <Link to={createPageUrl("Export")}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardContent className="p-6 text-center">
                <FileDown className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Export Reports</h3>
                <p className="text-gray-600">Download seating plans</p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}