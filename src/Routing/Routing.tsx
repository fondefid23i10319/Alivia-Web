import React from "react";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";

import SignIn from "../pages/Auth/SignIn";
import Crisis from "../pages/Crisis";
import Dashboard from "../pages/Dashboard";
import Files from "../pages/Files";
import Messaging from "../pages/Messaging";
import MyPatients from "../pages/MyPatients/MyPatients";
import PatientDiagnosisAccount from "../pages/Diagnosis/Account/Patient";
import PatientDiagnosisExams from "../pages/Diagnosis/Exams/Patient";
import PatientDiagnosisInformation from "../pages/Diagnosis/Information/Patient";
import PatientDiagnosisMedicines from "../pages/Diagnosis/Medicines/Patient";
import PatientDiagnosisQuestionnaires from "../pages/Diagnosis/Questionnaires/Patient";
import PatientDiagnosisSelfReports from "../pages/Diagnosis/SelfReports/Patient";
import PatientDiagnosisStatistics from "../pages/Diagnosis/Statistics/Patient";
import PatientDiagnosisTasks from "../pages/Diagnosis/Tasks/Patient";
import PatientDiagnosisWearable from "../pages/Diagnosis/Wearable/Patient";
import ProfessionalDiagnosisAccount from "../pages/Diagnosis/Account/Professional";
import ProfessionalDiagnosisExams from "../pages/Diagnosis/Exams/Professional";
import ProfessionalDiagnosisInformation from "../pages/Diagnosis/Information/Professional";
import ProfessionalDiagnosisMedicines from "../pages/Diagnosis/Medicines/Professional";
import ProfessionalDiagnosisQuestionnaires from "../pages/Diagnosis/Questionnaires/Professional";
import ProfessionalDiagnosisSelfReports from "../pages/Diagnosis/SelfReports/Professional";
import ProfessionalDiagnosisStatistics from "../pages/Diagnosis/Statistics/Professional";
import ProfessionalDiagnosisTasks from "../pages/Diagnosis/Tasks/Professional";
import ProfessionalDiagnosisWearable from "../pages/Diagnosis/Wearable/Patient";
import Questionnaires from "../pages/Questionnaires";
import Requests from "../pages/MyPatients/components/Requests";

import AuthLayout from "../layouts/AuthLayout";
import PatientDiagnosisLayout from "../layouts/DiagnosisLayout/Patient";
import ProfessionalDiagnosisLayout from "../layouts/DiagnosisLayout/Professional";

import RequireAuth from "./components/RequireAuth";
import RequireRole from "./components/RequireRole";

const router = createBrowserRouter(
  createRoutesFromElements(
    <React.Fragment>
      <Route path="/" element={<SignIn />} />
      <Route path={"/sign-in"} element={<SignIn />} />
      <Route
        element={
          <RequireAuth>
            <AuthLayout />
          </RequireAuth>
        }
      >
        <Route path={"/dashboard"} element={<Dashboard />} />
        <Route path={"/files"} element={<Files />} />
        <Route path={"/messaging"} element={<Messaging />} />
        <Route path={"/questionnaires"} element={<Questionnaires />} />

        {/* Rutas solo para pacientes */}
        <Route
          element={
            <RequireRole role="patient">
              <PatientDiagnosisLayout />
            </RequireRole>
          }
        >
          <Route path="/diagnosis">
            <Route index element={<PatientDiagnosisInformation />} />
            <Route path={"account"} element={<PatientDiagnosisAccount />} />
            <Route path={"exams"} element={<PatientDiagnosisExams />} />
            <Route path={"information"} element={<PatientDiagnosisInformation />} />
            <Route path={"medicines"} element={<PatientDiagnosisMedicines />} />
            <Route path={"questionnaires"} element={<PatientDiagnosisQuestionnaires />} />
            <Route path={"self-reports"} element={<PatientDiagnosisSelfReports />} />
            <Route path={"statistics"} element={<PatientDiagnosisStatistics />} />
            <Route path={"tasks"} element={<PatientDiagnosisTasks />} />
            <Route path={"wearable"} element={<PatientDiagnosisWearable />} />
          </Route>
        </Route>

        {/* Rutas solo para profesionales */}
        <Route path="my-patients">
          <Route
            index
            element={
              <RequireRole role="professional">
                <MyPatients />
              </RequireRole>
            }
          />
          <Route
            element={
              <RequireRole role="professional">
                <ProfessionalDiagnosisLayout />
              </RequireRole>
            }
          >
            <Route path=":patientId/diagnosis">
              <Route index element={<ProfessionalDiagnosisInformation />} />
              <Route path={"account"} element={<ProfessionalDiagnosisAccount />} />
              <Route path={"exams"} element={<ProfessionalDiagnosisExams />} />
              <Route path={"information"} element={<ProfessionalDiagnosisInformation />} />
              <Route path={"medicines"} element={<ProfessionalDiagnosisMedicines />} />
              <Route path={"questionnaires"} element={<ProfessionalDiagnosisQuestionnaires />} />
              <Route path={"self-reports"} element={<ProfessionalDiagnosisSelfReports />} />
              <Route path={"statistics"} element={<ProfessionalDiagnosisStatistics />} />
              <Route path={"tasks"} element={<ProfessionalDiagnosisTasks />} />
              <Route path={"wearable"} element={<ProfessionalDiagnosisWearable />} />
            </Route>
          </Route>
          <Route
            path={"requests"}
            element={
              <RequireRole role="professional">
                <Requests />
              </RequireRole>
            }
          />
        </Route>
        <Route
          path={"crisis"}
          element={
            <RequireRole role="professional">
              <Crisis />
            </RequireRole>
          }
        />
      </Route>
    </React.Fragment>
  )
);

function Routing() {
  return <RouterProvider router={router} />;
}

export default Routing;
