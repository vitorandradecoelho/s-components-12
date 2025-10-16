import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

// Lazy load pages for better performance
const Index = lazy(() => import('@/pages/Index'));
const Documentation = lazy(() => import('@/pages/Documentation'));
const DeploymentDocs = lazy(() => import('@/pages/DeploymentDocs'));
const ViagemModeloPage = lazy(() => import('@/pages/ViagemModeloPage').then(m => ({ default: m.ViagemModeloPage })));
const TestePage = lazy(() => import('@/pages/TestePage'));
const NotFound = lazy(() => import('@/pages/NotFound'));

// Component Docs
const InputDocs = lazy(() => import('@/pages/InputDocs'));
const SelectDocs = lazy(() => import('@/pages/SelectDocs'));
const TextFieldDocs = lazy(() => import('@/pages/TextFieldDocs'));
const RadioButtonDocs = lazy(() => import('@/pages/RadioButtonDocs'));
const CheckBoxDocs = lazy(() => import('@/pages/CheckBoxDocs'));
const ComboBoxDocs = lazy(() => import('@/pages/ComboBoxDocs'));
const DataTableDocs = lazy(() => import('@/pages/DataTableDocs'));
const FileUploadDocs = lazy(() => import('@/pages/FileUploadDocs'));
const LightBoxDocs = lazy(() => import('@/pages/LightBoxDocs'));
const FormModalDocs = lazy(() => import('@/pages/FormModalDocs'));
const AlertDocs = lazy(() => import('@/pages/AlertDocs'));
const ToastDocs = lazy(() => import('@/pages/ToastDocs'));
const SweetAlertDocs = lazy(() => import('@/pages/SweetAlertDocs'));
const DatePickerDocs = lazy(() => import('@/pages/DatePickerDocs'));
const TimePickerDocs = lazy(() => import('@/pages/TimePickerDocs'));
const MapDocs = lazy(() => import('@/pages/MapDocs'));
const LinhaTrajetoDocs = lazy(() => import('@/pages/LinhaTrajetoDocs'));

// Guide Pages
const BitBucketDocs = lazy(() => import('@/pages/BitBucketDocs'));
const BitBucketTestPage = lazy(() => import('@/pages/BitBucketTestPage'));
const ProjectArchitectureDocs = lazy(() => import('@/pages/ProjectArchitectureDocs'));
const ComponentCreationGuide = lazy(() => import('@/pages/ComponentCreationGuide'));
const CssCustomizationGuide = lazy(() => import('@/pages/CssCustomizationGuide'));
const LinhaTrajetoCssGuide = lazy(() => import('@/pages/LinhaTrajetoCssGuide'));

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Index />
  },
  {
    path: '/viagem-modelo',
    element: <ViagemModeloPage />
  },
  {
    path: '/docs',
    element: <Documentation />
  },
  {
    path: '/docs/deployment',
    element: <DeploymentDocs />
  },
  {
    path: '/docs/input',
    element: <InputDocs />
  },
  {
    path: '/docs/select',
    element: <SelectDocs />
  },
  {
    path: '/docs/textfield',
    element: <TextFieldDocs />
  },
  {
    path: '/docs/radiobutton',
    element: <RadioButtonDocs />
  },
  {
    path: '/docs/checkbox',
    element: <CheckBoxDocs />
  },
  {
    path: '/docs/combobox',
    element: <ComboBoxDocs />
  },
  {
    path: '/docs/datatable',
    element: <DataTableDocs />
  },
  {
    path: '/docs/fileupload',
    element: <FileUploadDocs />
  },
  {
    path: '/docs/lightbox',
    element: <LightBoxDocs />
  },
  {
    path: '/docs/formmodal',
    element: <FormModalDocs />
  },
  {
    path: '/docs/alert',
    element: <AlertDocs />
  },
  {
    path: '/docs/toast',
    element: <ToastDocs />
  },
  {
    path: '/docs/sweetalert',
    element: <SweetAlertDocs />
  },
  {
    path: '/docs/datepicker',
    element: <DatePickerDocs />
  },
  {
    path: '/docs/timepicker',
    element: <TimePickerDocs />
  },
  {
    path: '/docs/map',
    element: <MapDocs />
  },
  {
    path: '/docs/linhatrajeto',
    element: <LinhaTrajetoDocs />
  },
  {
    path: '/docs/css-customization',
    element: <CssCustomizationGuide />
  },
  {
    path: '/docs/css-guide/linha-trajeto',
    element: <LinhaTrajetoCssGuide />
  },
  {
    path: '/teste',
    element: <TestePage />
  },
  {
    path: '/bitbucket-docs',
    element: <BitBucketDocs />
  },
  {
    path: '/bitbucket-test',
    element: <BitBucketTestPage />
  },
  {
    path: '/architecture-docs',
    element: <ProjectArchitectureDocs />
  },
  {
    path: '/component-guide',
    element: <ComponentCreationGuide />
  },
  {
    path: '*',
    element: <NotFound />
  }
];
