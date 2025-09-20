import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Index from "./pages/Index";
import ComboBoxDocs from "./pages/ComboBoxDocs";
import Documentation from "./pages/Documentation";
import DeploymentDocs from "./pages/DeploymentDocs";
import InputDocs from "./pages/InputDocs";
import SelectDocs from "./pages/SelectDocs";
import TextFieldDocs from "./pages/TextFieldDocs";
import RadioButtonDocs from "./pages/RadioButtonDocs";
import CheckBoxDocs from "./pages/CheckBoxDocs";
import DataTableDocs from "./pages/DataTableDocs";
import FileUploadDocs from "./pages/FileUploadDocs";
import LightBoxDocs from "./pages/LightBoxDocs";
import FormModalDocs from "./pages/FormModalDocs";
import AlertDocs from "./pages/AlertDocs";
import ToastDocs from "./pages/ToastDocs";
import SweetAlertDocs from "./pages/SweetAlertDocs";
import DatePickerDocs from "./pages/DatePickerDocs";
import TimePickerDocs from "./pages/TimePickerDocs";
import MapDocs from "./pages/MapDocs";
import LinhaTrajetoDocs from "./pages/LinhaTrajetoDocs";
import TestePage from "./pages/TestePage";
import BitBucketDocs from "./pages/BitBucketDocs";
import BitBucketTestPage from "./pages/BitBucketTestPage";
import ProjectArchitectureDocs from "./pages/ProjectArchitectureDocs";
import ComponentCreationGuide from "./pages/ComponentCreationGuide";
import { ViagemModeloPage } from "./pages/ViagemModeloPage";
import CssCustomizationGuide from "./pages/CssCustomizationGuide";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/viagem-modelo" element={<ViagemModeloPage />} />
            <Route path="/docs" element={<Documentation />} />
            <Route path="/docs/deployment" element={<DeploymentDocs />} />
            <Route path="/docs/input" element={<InputDocs />} />
            <Route path="/docs/select" element={<SelectDocs />} />
            <Route path="/docs/textfield" element={<TextFieldDocs />} />
            <Route path="/docs/radiobutton" element={<RadioButtonDocs />} />
            <Route path="/docs/checkbox" element={<CheckBoxDocs />} />
            <Route path="/docs/combobox" element={<ComboBoxDocs />} />
            <Route path="/docs/datatable" element={<DataTableDocs />} />
            <Route path="/docs/fileupload" element={<FileUploadDocs />} />
            <Route path="/docs/lightbox" element={<LightBoxDocs />} />
            <Route path="/docs/formmodal" element={<FormModalDocs />} />
            <Route path="/docs/alert" element={<AlertDocs />} />
            <Route path="/docs/toast" element={<ToastDocs />} />
            <Route path="/docs/sweetalert" element={<SweetAlertDocs />} />
            <Route path="/docs/datepicker" element={<DatePickerDocs />} />
            <Route path="/docs/timepicker" element={<TimePickerDocs />} />
            <Route path="/docs/map" element={<MapDocs />} />
            <Route path="/docs/linhatrajeto" element={<LinhaTrajetoDocs />} />
            <Route path="/docs/css-customization" element={<CssCustomizationGuide />} />
        <Route path="/teste" element={<TestePage />} />
        <Route path="/bitbucket-docs" element={<BitBucketDocs />} />
        <Route path="/bitbucket-test" element={<BitBucketTestPage />} />
        <Route path="/architecture-docs" element={<ProjectArchitectureDocs />} />
        <Route path="/component-guide" element={<ComponentCreationGuide />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
