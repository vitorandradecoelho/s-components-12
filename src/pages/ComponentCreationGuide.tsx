import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Alert } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Code2, Package, FileText, Settings, CheckCircle, Users, Database, Zap, GitBranch } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ComponentCreationGuide() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    { id: 1, title: "Análise e Planejamento", icon: <Settings className="h-4 w-4" />, status: "active" },
    { id: 2, title: "DTOs e Interfaces", icon: <Database className="h-4 w-4" />, status: "pending" },
    { id: 3, title: "Criação do Componente", icon: <Code2 className="h-4 w-4" />, status: "pending" },
    { id: 4, title: "Hooks e Lógica", icon: <Zap className="h-4 w-4" />, status: "pending" },
    { id: 5, title: "Documentação", icon: <FileText className="h-4 w-4" />, status: "pending" },
    { id: 6, title: "Exports e Integração", icon: <Package className="h-4 w-4" />, status: "pending" },
    { id: 7, title: "Testes e Validação", icon: <CheckCircle className="h-4 w-4" />, status: "pending" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar ao Início
          </Button>
          
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent mb-4">
              🛠️ Guia de Criação de Componentes
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Passo-a-passo completo para criar componentes seguindo os melhores padrões do projeto
            </p>
          </div>
        </div>

        {/* Progress Steps */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Fluxo de Desenvolvimento</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap justify-between items-center gap-4">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div 
                    className={`flex items-center gap-2 px-3 py-2 rounded-full cursor-pointer transition-all ${
                      currentStep === step.id 
                        ? 'bg-primary text-primary-foreground' 
                        : currentStep > step.id 
                          ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
                          : 'bg-muted text-muted-foreground'
                    }`}
                    onClick={() => setCurrentStep(step.id)}
                  >
                    {step.icon}
                    <span className="text-sm font-medium">{step.title}</span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="w-8 h-px bg-border ml-4" />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Tabs value={currentStep.toString()} onValueChange={(value) => setCurrentStep(Number(value))}>
          {/* Step 1: Analysis and Planning */}
          <TabsContent value="1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Passo 1: Análise e Planejamento
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">🔍 Análise do LinhaTrajetoSelector (Base)</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg">
                      <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">✅ Padrões Identificados</h4>
                      <ul className="text-sm space-y-1">
                        <li>• <strong>DTOs bem definidos:</strong> Interfaces Linha e Trajeto</li>
                        <li>• <strong>Props interface:</strong> LinhaTrajetoSelectorProps</li>
                        <li>• <strong>React.forwardRef:</strong> Para referências</li>
                        <li>• <strong>useState + useEffect:</strong> Gerenciamento de estado</li>
                        <li>• <strong>Handlers personalizados:</strong> onLinhaChange, onTrajetoChange</li>
                        <li>• <strong>Composição:</strong> Usa ComboBox como base</li>
                        <li>• <strong>Props opcionais:</strong> Placeholders, labels, size</li>
                        <li>• <strong>Type exports:</strong> Exporta types junto com componente</li>
                      </ul>
                    </div>

                    <div className="bg-green-50 dark:bg-green-950/30 p-4 rounded-lg">
                      <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2">🎯 Estrutura de Arquivos</h4>
                      <div className="text-sm font-mono space-y-1">
                        <div>📁 lib/src/components/</div>
                        <div>├── LinhaTrajetoSelector.tsx</div>
                        <div>📁 src/components/library/</div>
                        <div>├── LinhaTrajetoSelector.tsx (cópia)</div>
                        <div>├── docs/</div>
                        <div>└── LinhaTrajetoSelectorDocs.tsx</div>
                        <div>📁 src/pages/</div>
                        <div>└── LinhaTrajetoDocs.tsx</div>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold mb-3">📋 Planejamento do Novo Componente</h3>
                  
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 p-6 rounded-lg">
                    <h4 className="font-semibold mb-4">Vamos criar um componente de exemplo: <code>UserRoleSelector</code></h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-semibold mb-2">📝 Funcionalidades:</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Seleção de usuário</li>
                          <li>• Seleção de roles do usuário</li>
                          <li>• Busca por nome/email</li>
                          <li>• Multi-seleção de roles</li>
                          <li>• Validação de permissões</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h5 className="font-semibold mb-2">🏗️ DTOs necessários:</h5>
                        <ul className="text-sm space-y-1">
                          <li>• <code>User</code> (dados do usuário)</li>
                          <li>• <code>Role</code> (função/permissão)</li>
                          <li>• <code>UserRoleSelectorProps</code></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={() => setCurrentStep(2)}>
                    Próximo: DTOs e Interfaces
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Step 2: DTOs and Interfaces */}
          <TabsContent value="2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Passo 2: DTOs e Interfaces
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">🎯 Definindo os DTOs</h3>
                  
                  <div className="bg-secondary/30 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">lib/src/components/UserRoleSelector.tsx</h4>
                    <pre className="text-sm bg-white dark:bg-gray-900 p-4 rounded border overflow-x-auto">
{`// ====== DTOs e Interfaces ======

/**
 * Representa uma função/permissão no sistema
 */
interface Role {
  id: string;
  name: string;
  description?: string;
  level: 'basic' | 'admin' | 'super';
  permissions: string[];
  isActive: boolean;
  createdAt: string;
}

/**
 * Representa um usuário do sistema
 */
interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  department?: string;
  isActive: boolean;
  roles: Role[];
  createdAt: string;
  lastLogin?: string;
}

/**
 * Props do componente UserRoleSelector
 */
interface UserRoleSelectorProps {
  // Dados obrigatórios
  users: User[];
  availableRoles: Role[];
  
  // Seleção atual (controlled)
  selectedUserId?: string;
  selectedRoleIds?: string[];
  
  // Callbacks
  onUserChange?: (user: User | null) => void;
  onRoleChange?: (roles: Role[]) => void;
  
  // Customização de labels
  userLabel?: string;
  roleLabel?: string;
  userPlaceholder?: string;
  rolePlaceholder?: string;
  
  // Comportamento
  disabled?: boolean;
  multiSelectRole?: boolean;
  showUserAvatar?: boolean;
  filterInactiveUsers?: boolean;
  
  // Estilos
  size?: "sm" | "md" | "lg";
  className?: string;
  
  // Validação
  maxRoles?: number;
  minRoles?: number;
  requiredRoleLevel?: Role['level'];
}`}
                    </pre>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">🔍 Boas Práticas para DTOs</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-green-50 dark:bg-green-950/30 p-4 rounded-lg">
                      <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2">✅ Fazer</h4>
                      <ul className="text-sm space-y-1">
                        <li>• Usar nomes descritivos e consistentes</li>
                        <li>• Comentários JSDoc para interfaces</li>
                        <li>• Props opcionais com valores padrão</li>
                        <li>• Separar dados de comportamento</li>
                        <li>• Union types para valores limitados</li>
                        <li>• Campos obrigatórios bem definidos</li>
                      </ul>
                    </div>

                    <div className="bg-red-50 dark:bg-red-950/30 p-4 rounded-lg">
                      <h4 className="font-semibold text-red-700 dark:text-red-300 mb-2">❌ Evitar</h4>
                      <ul className="text-sm space-y-1">
                        <li>• Interfaces muito genéricas (any, object)</li>
                        <li>• Misturar dados com lógica de UI</li>
                        <li>• Campos obrigatórios sem necessidade</li>
                        <li>• Nomes inconsistentes (id vs _id)</li>
                        <li>• DTOs muito profundos (muitos níveis)</li>
                        <li>• Duplicação de interfaces</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">📋 Exemplo de Dados de Teste</h3>
                  
                  <div className="bg-secondary/30 p-4 rounded-lg">
                    <pre className="text-sm bg-white dark:bg-gray-900 p-4 rounded border overflow-x-auto">
{`// Dados de exemplo para testes
const sampleRoles: Role[] = [
  {
    id: "role-1",
    name: "Administrador",
    description: "Acesso completo ao sistema",
    level: "admin",
    permissions: ["read", "write", "delete", "manage_users"],
    isActive: true,
    createdAt: "2024-01-01"
  },
  {
    id: "role-2", 
    name: "Editor",
    description: "Pode editar conteúdo",
    level: "basic",
    permissions: ["read", "write"],
    isActive: true,
    createdAt: "2024-01-02"
  }
];

const sampleUsers: User[] = [
  {
    id: "user-1",
    name: "Ana Silva",
    email: "ana@empresa.com",
    avatar: "https://avatar.com/ana",
    department: "TI",
    isActive: true,
    roles: [sampleRoles[0]],
    createdAt: "2024-01-15",
    lastLogin: "2024-03-01"
  }
];`}
                    </pre>
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setCurrentStep(1)}>
                    Anterior: Planejamento
                  </Button>
                  <Button onClick={() => setCurrentStep(3)}>
                    Próximo: Componente
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Step 3: Component Creation */}
          <TabsContent value="3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code2 className="h-5 w-5" />
                  Passo 3: Criação do Componente
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">🏗️ Estrutura do Componente</h3>
                  
                  <div className="bg-secondary/30 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">lib/src/components/UserRoleSelector.tsx</h4>
                    <pre className="text-sm bg-white dark:bg-gray-900 p-4 rounded border overflow-x-auto">
{`import React, { useState, useEffect, useMemo } from "react";
import { ComboBox, type ComboOption } from "./ComboBox";
import { cn } from "../lib/utils";

// [DTOs já definidos no passo anterior]

/**
 * Componente para seleção de usuário e suas funções
 */
const UserRoleSelector = React.forwardRef<HTMLDivElement, UserRoleSelectorProps>(
  ({
    users,
    availableRoles,
    selectedUserId,
    selectedRoleIds = [],
    onUserChange,
    onRoleChange,
    userLabel = "Usuário",
    roleLabel = "Funções",
    userPlaceholder = "Selecione um usuário",
    rolePlaceholder = "Selecione funções",
    disabled = false,
    multiSelectRole = true,
    showUserAvatar = true,
    filterInactiveUsers = true,
    size = "md",
    className,
    maxRoles,
    minRoles,
    requiredRoleLevel,
    ...props
  }, ref) => {
    // ====== Estados Locais ======
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [roleOptions, setRoleOptions] = useState<ComboOption[]>([]);

    // ====== Memoized Values ======
    const filteredUsers = useMemo(() => {
      return filterInactiveUsers 
        ? users.filter(user => user.isActive)
        : users;
    }, [users, filterInactiveUsers]);

    const userOptions: ComboOption[] = useMemo(() => {
      return filteredUsers.map(user => ({
        label: user.name,
        value: user.id,
        description: \`\${user.email}\${user.department ? \` - \${user.department}\` : ""}\`,
        icon: showUserAvatar ? user.avatar : undefined
      }));
    }, [filteredUsers, showUserAvatar]);

    const filteredRoles = useMemo(() => {
      let roles = availableRoles.filter(role => role.isActive);
      
      if (requiredRoleLevel) {
        const levelOrder = { basic: 1, admin: 2, super: 3 };
        const requiredLevel = levelOrder[requiredRoleLevel];
        roles = roles.filter(role => levelOrder[role.level] >= requiredLevel);
      }
      
      return roles;
    }, [availableRoles, requiredRoleLevel]);

    // ====== Effects ======
    useEffect(() => {
      if (selectedUserId) {
        const user = filteredUsers.find(u => u.id === selectedUserId);
        setSelectedUser(user || null);
      } else {
        setSelectedUser(null);
      }
    }, [selectedUserId, filteredUsers]);

    useEffect(() => {
      if (selectedUser) {
        const options: ComboOption[] = filteredRoles.map(role => ({
          label: role.name,
          value: role.id,
          description: role.description,
          badge: role.level
        }));
        setRoleOptions(options);
      } else {
        setRoleOptions([]);
      }
    }, [selectedUser, filteredRoles]);

    // ====== Handlers ======
    const handleUserChange = (userId: string) => {
      const user = filteredUsers.find(u => u.id === userId) || null;
      setSelectedUser(user);
      onUserChange?.(user);
      
      // Limpa roles quando usuário muda
      onRoleChange?.([]);
    };

    const handleRoleChange = (roleIds: string[]) => {
      if (selectedUser) {
        // Validações
        if (maxRoles && roleIds.length > maxRoles) {
          return; // Não permite mais que o máximo
        }
        
        if (minRoles && roleIds.length < minRoles && roleIds.length > 0) {
          // Permite 0 (vazio) mas não menos que o mínimo se tiver algo
        }

        const roles = roleIds
          .map(id => filteredRoles.find(r => r.id === id))
          .filter(Boolean) as Role[];
        
        onRoleChange?.(roles);
      }
    };

    const handleUserClear = () => {
      setSelectedUser(null);
      onUserChange?.(null);
      onRoleChange?.([]);
    };

    const handleRoleClear = () => {
      onRoleChange?.([]);
    };

    // ====== Validações ======
    const isRoleDisabled = disabled || !selectedUser;
    const hasMaxRoles = maxRoles && selectedRoleIds.length >= maxRoles;

    // ====== Render ======
    return (
      <div 
        ref={ref} 
        className={cn("space-y-4", className)} 
        {...props}
      >
        {/* Seleção de Usuário */}
        <ComboBox
          options={userOptions}
          value={selectedUserId ? [selectedUserId] : []}
          onValueChange={(values) => {
            const userId = values[0];
            if (userId) {
              handleUserChange(userId);
            } else {
              handleUserClear();
            }
          }}
          placeholder={userPlaceholder}
          label={userLabel}
          disabled={disabled}
          size={size}
          clearable
          searchable
        />

        {/* Seleção de Funções */}
        <ComboBox
          options={roleOptions}
          value={selectedRoleIds}
          onValueChange={(values) => {
            if (values.length > 0) {
              handleRoleChange(values);
            } else {
              handleRoleClear();
            }
          }}
          placeholder={rolePlaceholder}
          label={roleLabel}
          disabled={isRoleDisabled}
          size={size}
          multiple={multiSelectRole}
          clearable
          searchable
          helper={
            hasMaxRoles 
              ? \`Máximo de \${maxRoles} funções atingido\`
              : minRoles 
                ? \`Mínimo de \${minRoles} função(ões) necessário\`
                : undefined
          }
        />
        
        {/* Informações do usuário selecionado */}
        {selectedUser && (
          <div className="text-sm text-muted-foreground">
            Último login: {selectedUser.lastLogin || "Nunca"}
          </div>
        )}
      </div>
    );
  }
);

UserRoleSelector.displayName = "UserRoleSelector";

export { 
  UserRoleSelector, 
  type User, 
  type Role, 
  type UserRoleSelectorProps 
};`}
                    </pre>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">🎯 Pontos-chave do Componente</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg">
                      <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">🏗️ Estrutura</h4>
                      <ul className="text-sm space-y-1">
                        <li>• <strong>forwardRef:</strong> Para refs externos</li>
                        <li>• <strong>Memoization:</strong> useMemo para cálculos</li>
                        <li>• <strong>Controlled:</strong> Props controlam estado</li>
                        <li>• <strong>Composição:</strong> Reutiliza ComboBox</li>
                        <li>• <strong>Validações:</strong> Máximo/mínimo roles</li>
                      </ul>
                    </div>

                    <div className="bg-green-50 dark:bg-green-950/30 p-4 rounded-lg">
                      <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2">🎨 UX</h4>
                      <ul className="text-sm space-y-1">
                        <li>• <strong>Feedback visual:</strong> Estados disabled</li>
                        <li>• <strong>Helpers:</strong> Mensagens de limite</li>
                        <li>• <strong>Auto-limpeza:</strong> Roles quando usuário muda</li>
                        <li>• <strong>Filtros:</strong> Usuários/roles inativos</li>
                        <li>• <strong>Informações contextuais:</strong> Último login</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setCurrentStep(2)}>
                    Anterior: DTOs
                  </Button>
                  <Button onClick={() => setCurrentStep(4)}>
                    Próximo: Hooks e Lógica
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Step 4: Hooks and Logic */}
          <TabsContent value="4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Passo 4: Hooks e Lógica Avançada
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">🎣 Hooks Personalizados (Opcional)</h3>
                  
                  <div className="bg-secondary/30 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">lib/src/components/UserRoleSelector/hooks.ts</h4>
                    <pre className="text-sm bg-white dark:bg-gray-900 p-4 rounded border overflow-x-auto">
{`import { useState, useEffect, useMemo, useCallback } from 'react';
import type { User, Role } from './types';

/**
 * Hook para gerenciar a lógica do UserRoleSelector
 */
export const useUserRoleSelector = ({
  users,
  availableRoles,
  selectedUserId,
  selectedRoleIds = [],
  onUserChange,
  onRoleChange,
  filterInactiveUsers = true,
  maxRoles,
  minRoles,
  requiredRoleLevel
}: {
  users: User[];
  availableRoles: Role[];
  selectedUserId?: string;
  selectedRoleIds?: string[];
  onUserChange?: (user: User | null) => void;
  onRoleChange?: (roles: Role[]) => void;
  filterInactiveUsers?: boolean;
  maxRoles?: number;
  minRoles?: number;
  requiredRoleLevel?: Role['level'];
}) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Usuários filtrados
  const filteredUsers = useMemo(() => {
    return filterInactiveUsers 
      ? users.filter(user => user.isActive)
      : users;
  }, [users, filterInactiveUsers]);

  // Roles filtrados por nível
  const filteredRoles = useMemo(() => {
    let roles = availableRoles.filter(role => role.isActive);
    
    if (requiredRoleLevel) {
      const levelOrder = { basic: 1, admin: 2, super: 3 };
      const requiredLevel = levelOrder[requiredRoleLevel];
      roles = roles.filter(role => levelOrder[role.level] >= requiredLevel);
    }
    
    return roles;
  }, [availableRoles, requiredRoleLevel]);

  // Atualiza usuário selecionado
  useEffect(() => {
    if (selectedUserId) {
      const user = filteredUsers.find(u => u.id === selectedUserId);
      setSelectedUser(user || null);
    } else {
      setSelectedUser(null);
    }
  }, [selectedUserId, filteredUsers]);

  // Handlers
  const handleUserChange = useCallback((userId: string | null) => {
    const user = userId ? filteredUsers.find(u => u.id === userId) || null : null;
    setSelectedUser(user);
    onUserChange?.(user);
    
    // Limpa roles quando usuário muda
    onRoleChange?.([]);
  }, [filteredUsers, onUserChange, onRoleChange]);

  const handleRoleChange = useCallback((roleIds: string[]) => {
    if (!selectedUser) return;

    // Validações
    if (maxRoles && roleIds.length > maxRoles) {
      return;
    }

    const roles = roleIds
      .map(id => filteredRoles.find(r => r.id === id))
      .filter(Boolean) as Role[];
    
    onRoleChange?.(roles);
  }, [selectedUser, filteredRoles, maxRoles, onRoleChange]);

  // Validações
  const validation = useMemo(() => {
    const hasMaxRoles = maxRoles && selectedRoleIds.length >= maxRoles;
    const hasMinRoles = minRoles && selectedRoleIds.length >= minRoles;
    
    return {
      hasMaxRoles,
      hasMinRoles,
      canAddMoreRoles: !hasMaxRoles,
      needsMoreRoles: minRoles && selectedRoleIds.length < minRoles,
      isValid: !minRoles || selectedRoleIds.length >= minRoles
    };
  }, [maxRoles, minRoles, selectedRoleIds]);

  return {
    selectedUser,
    filteredUsers,
    filteredRoles,
    validation,
    handleUserChange,
    handleRoleChange
  };
};

/**
 * Hook para buscar usuários de uma API
 */
export const useUsersAPI = (apiUrl?: string) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    if (!apiUrl) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error('Erro ao carregar usuários');
      
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  }, [apiUrl]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return {
    users,
    loading,
    error,
    refetch: fetchUsers
  };
};`}
                    </pre>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">🧪 Utilitários e Helpers</h3>
                  
                  <div className="bg-secondary/30 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">lib/src/components/UserRoleSelector/utils.ts</h4>
                    <pre className="text-sm bg-white dark:bg-gray-900 p-4 rounded border overflow-x-auto">
{`import type { User, Role } from './types';

/**
 * Utilitários para o UserRoleSelector
 */

/**
 * Formata o nome do usuário para exibição
 */
export const formatUserDisplay = (user: User): string => {
  return \`\${user.name} (\${user.email})\`;
};

/**
 * Verifica se um usuário tem uma role específica
 */
export const userHasRole = (user: User, roleId: string): boolean => {
  return user.roles.some(role => role.id === roleId);
};

/**
 * Filtra roles por nível mínimo
 */
export const filterRolesByLevel = (
  roles: Role[], 
  minLevel: Role['level']
): Role[] => {
  const levelOrder = { basic: 1, admin: 2, super: 3 };
  const minLevelValue = levelOrder[minLevel];
  
  return roles.filter(role => levelOrder[role.level] >= minLevelValue);
};

/**
 * Valida se a seleção de roles é válida
 */
export const validateRoleSelection = (
  selectedRoles: Role[],
  options: {
    maxRoles?: number;
    minRoles?: number;
    requiredPermissions?: string[];
  }
): {
  isValid: boolean;
  errors: string[];
  warnings: string[];
} => {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Validar máximo
  if (options.maxRoles && selectedRoles.length > options.maxRoles) {
    errors.push(\`Máximo de \${options.maxRoles} funções permitido\`);
  }

  // Validar mínimo
  if (options.minRoles && selectedRoles.length < options.minRoles) {
    errors.push(\`Mínimo de \${options.minRoles} função(ões) necessário\`);
  }

  // Validar permissões obrigatórias
  if (options.requiredPermissions?.length) {
    const allPermissions = selectedRoles.flatMap(role => role.permissions);
    const missingPermissions = options.requiredPermissions.filter(
      perm => !allPermissions.includes(perm)
    );
    
    if (missingPermissions.length > 0) {
      errors.push(\`Permissões obrigatórias: \${missingPermissions.join(', ')}\`);
    }
  }

  // Avisos
  if (selectedRoles.some(role => !role.isActive)) {
    warnings.push('Algumas funções selecionadas estão inativas');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
};

/**
 * Agrupa usuários por departamento
 */
export const groupUsersByDepartment = (users: User[]): Record<string, User[]> => {
  return users.reduce((groups, user) => {
    const department = user.department || 'Sem Departamento';
    if (!groups[department]) {
      groups[department] = [];
    }
    groups[department].push(user);
    return groups;
  }, {} as Record<string, User[]>);
};`}
                    </pre>
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setCurrentStep(3)}>
                    Anterior: Componente
                  </Button>
                  <Button onClick={() => setCurrentStep(5)}>
                    Próximo: Documentação
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Step 5: Documentation */}
          <TabsContent value="5">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Passo 5: Documentação Completa
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">📚 Criando a Documentação</h3>
                  
                  <div className="bg-secondary/30 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">src/components/library/docs/UserRoleSelectorDocs.tsx</h4>
                    <pre className="text-sm bg-white dark:bg-gray-900 p-4 rounded border overflow-x-auto">
{`import React, { useState } from 'react';
import { UserRoleSelector, type User, type Role } from '../UserRoleSelector';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert } from '../Alert';
import { useToastHelper } from '../Toast';

// Dados de exemplo
const sampleRoles: Role[] = [
  {
    id: "role-1",
    name: "Administrador",
    description: "Acesso completo ao sistema",
    level: "admin",
    permissions: ["read", "write", "delete", "manage_users"],
    isActive: true,
    createdAt: "2024-01-01"
  },
  {
    id: "role-2",
    name: "Editor",
    description: "Pode editar conteúdo",
    level: "basic",
    permissions: ["read", "write"],
    isActive: true,
    createdAt: "2024-01-02"
  },
  {
    id: "role-3",
    name: "Visualizador",
    description: "Apenas leitura",
    level: "basic",
    permissions: ["read"],
    isActive: true,
    createdAt: "2024-01-03"
  }
];

const sampleUsers: User[] = [
  {
    id: "user-1",
    name: "Ana Silva",
    email: "ana@empresa.com",
    avatar: "https://ui-avatars.com/api/?name=Ana+Silva",
    department: "TI",
    isActive: true,
    roles: [sampleRoles[0]],
    createdAt: "2024-01-15",
    lastLogin: "2024-03-01T10:30:00Z"
  },
  {
    id: "user-2",
    name: "Bruno Santos",
    email: "bruno@empresa.com",
    avatar: "https://ui-avatars.com/api/?name=Bruno+Santos",
    department: "Marketing",
    isActive: true,
    roles: [sampleRoles[1]],
    createdAt: "2024-01-20",
    lastLogin: "2024-02-28T15:45:00Z"
  },
  {
    id: "user-3",
    name: "Carla Oliveira",
    email: "carla@empresa.com",
    department: "RH",
    isActive: false,
    roles: [sampleRoles[2]],
    createdAt: "2024-02-01"
  }
];

const UserRoleSelectorDocs: React.FC = () => {
  const { success, error } = useToastHelper();
  
  // Estado para exemplo básico
  const [selectedUserId, setSelectedUserId] = useState<string>("");
  const [selectedRoleIds, setSelectedRoleIds] = useState<string[]>([]);
  
  // Estado para exemplo avançado
  const [selectedUserId2, setSelectedUserId2] = useState<string>("");
  const [selectedRoleIds2, setSelectedRoleIds2] = useState<string[]>([]);

  return (
    <div className="space-y-8">
      {/* Exemplo Básico */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Exemplo Básico
            <Badge>Interativo</Badge>
          </CardTitle>
          <CardDescription>
            Seleção simples de usuário e suas funções
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <UserRoleSelector
            users={sampleUsers}
            availableRoles={sampleRoles}
            selectedUserId={selectedUserId}
            selectedRoleIds={selectedRoleIds}
            onUserChange={(user) => {
              setSelectedUserId(user?.id || '');
              success(\`Usuário: \${user?.name || 'Nenhum'}\`);
            }}
            onRoleChange={(roles) => {
              setSelectedRoleIds(roles.map(r => r.id));
              success(\`\${roles.length} função(ões) selecionada(s)\`);
            }}
            userPlaceholder="Escolha um usuário..."
            rolePlaceholder="Escolha funções..."
            userLabel="👤 Usuário"
            roleLabel="🔑 Funções"
            showUserAvatar={true}
          />
          
          {selectedUserId && selectedRoleIds.length > 0 && (
            <Alert variant="success" title="Seleção Completa">
              Usuário e funções selecionados com sucesso!
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Exemplo Avançado */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Exemplo com Validações
            <Badge variant="secondary">Avançado</Badge>
          </CardTitle>
          <CardDescription>
            Demonstra validações de máximo/mínimo roles e filtros
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <UserRoleSelector
            users={sampleUsers}
            availableRoles={sampleRoles}
            selectedUserId={selectedUserId2}
            selectedRoleIds={selectedRoleIds2}
            onUserChange={(user) => setSelectedUserId2(user?.id || '')}
            onRoleChange={(roles) => setSelectedRoleIds2(roles.map(r => r.id))}
            maxRoles={2}
            minRoles={1}
            filterInactiveUsers={true}
            requiredRoleLevel="basic"
            size="lg"
            userLabel="Selecionar Usuário Ativo"
            roleLabel="Funções (mín. 1, máx. 2)"
          />
          
          <div className="grid grid-cols-2 gap-4 pt-4 border-t text-sm">
            <div>
              <div className="font-medium text-muted-foreground mb-1">Usuário:</div>
              <div>{selectedUserId2 ? sampleUsers.find(u => u.id === selectedUserId2)?.name : "Nenhum"}</div>
            </div>
            <div>
              <div className="font-medium text-muted-foreground mb-1">Funções:</div>
              <div>{selectedRoleIds2.length} selecionada(s)</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Estrutura dos Dados */}
      <Card>
        <CardHeader>
          <CardTitle>Props e Estrutura dos Dados</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted p-4 rounded-lg">
            <pre className="text-sm overflow-x-auto">
{\`// Props principais
interface UserRoleSelectorProps {
  users: User[];
  availableRoles: Role[];
  selectedUserId?: string;
  selectedRoleIds?: string[];
  onUserChange?: (user: User | null) => void;
  onRoleChange?: (roles: Role[]) => void;
  
  // Validações
  maxRoles?: number;
  minRoles?: number;
  requiredRoleLevel?: 'basic' | 'admin' | 'super';
  
  // Customização
  size?: 'sm' | 'md' | 'lg';
  showUserAvatar?: boolean;
  filterInactiveUsers?: boolean;
}\`}
            </pre>
          </div>
          
          <Alert variant="default" title="Flexibilidade">
            O componente é totalmente controlado, permitindo integração com formulários 
            e gerenciadores de estado externos como React Hook Form ou Zustand.
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserRoleSelectorDocs;`}
                    </pre>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">📄 Página de Documentação</h3>
                  
                  <div className="bg-secondary/30 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">src/pages/UserRoleDocs.tsx</h4>
                    <pre className="text-sm bg-white dark:bg-gray-900 p-4 rounded border overflow-x-auto">
{`import React from 'react';
import ComponentDocs from '@/components/ComponentDocs';
import UserRoleSelectorDocs from '@/components/library/docs/UserRoleSelectorDocs';

const UserRoleDocs = () => {
  return (
    <ComponentDocs
      title="UserRoleSelector"
      description="Componente para seleção de usuário e suas funções com validações"
      importExample={\`import { UserRoleSelector, type User, type Role } from '@vitorandradecoelho/sd-components';\`}
      usageExample={\`<UserRoleSelector
  users={users}
  availableRoles={roles}
  selectedUserId={selectedUserId}
  selectedRoleIds={selectedRoleIds}
  onUserChange={handleUserChange}
  onRoleChange={handleRoleChange}
  maxRoles={3}
  filterInactiveUsers
/>\`}
      propsData={[
        {
          name: "users",
          type: "User[]",
          required: true,
          description: "Lista de usuários disponíveis para seleção"
        },
        {
          name: "availableRoles", 
          type: "Role[]",
          required: true,
          description: "Lista de funções disponíveis"
        },
        {
          name: "selectedUserId",
          type: "string",
          required: false,
          description: "ID do usuário atualmente selecionado"
        },
        {
          name: "selectedRoleIds",
          type: "string[]", 
          required: false,
          description: "IDs das funções selecionadas"
        },
        {
          name: "onUserChange",
          type: "(user: User | null) => void",
          required: false,
          description: "Callback quando usuário é selecionado"
        },
        {
          name: "onRoleChange",
          type: "(roles: Role[]) => void",
          required: false, 
          description: "Callback quando funções são selecionadas"
        },
        {
          name: "maxRoles",
          type: "number",
          required: false,
          description: "Número máximo de funções selecionáveis"
        },
        {
          name: "minRoles", 
          type: "number",
          required: false,
          description: "Número mínimo de funções obrigatórias"
        },
        {
          name: "filterInactiveUsers",
          type: "boolean",
          required: false,
          default: "true",
          description: "Se deve filtrar usuários inativos"
        }
      ]}
    >
      <UserRoleSelectorDocs />
    </ComponentDocs>
  );
};

export default UserRoleDocs;`}
                    </pre>
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setCurrentStep(4)}>
                    Anterior: Hooks
                  </Button>
                  <Button onClick={() => setCurrentStep(6)}>
                    Próximo: Exports
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Step 6: Exports and Integration */}
          <TabsContent value="6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Passo 6: Exports e Integração
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">📦 Adicionando aos Exports</h3>
                  
                  <div className="bg-secondary/30 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">lib/src/index.ts</h4>
                    <pre className="text-sm bg-white dark:bg-gray-900 p-4 rounded border overflow-x-auto">
{`// Componentes existentes
export { Alert, type AlertProps } from './components/Alert';
export { Input, type InputProps } from './components/Input';
export { Select, type SelectProps, type SelectOption } from './components/Select';
// ... outros componentes

// NOVO: Adicionar o UserRoleSelector
export { 
  UserRoleSelector, 
  type User, 
  type Role, 
  type UserRoleSelectorProps 
} from './components/UserRoleSelector';

// Utilitários
export { cn } from './lib/utils';`}
                    </pre>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">🔄 Cópia para Documentação</h3>
                  
                  <div className="bg-secondary/30 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">src/components/library/UserRoleSelector.tsx</h4>
                    <pre className="text-sm bg-white dark:bg-gray-900 p-4 rounded border overflow-x-auto">
{`// Re-export do componente da biblioteca publicada
export {
  UserRoleSelector,
  type User,
  type Role,
  type UserRoleSelectorProps
} from '@vitorandradecoelho/sd-components';`}
                    </pre>
                  </div>

                  <div className="bg-secondary/30 p-4 rounded-lg mt-4">
                    <h4 className="font-semibold mb-2">src/components/library/index.ts</h4>
                    <pre className="text-sm bg-white dark:bg-gray-900 p-4 rounded border overflow-x-auto">
{`// Componentes existentes
export * from './Alert';
export * from './Input';
export * from './Select';
// ... outros

// NOVO: Adicionar UserRoleSelector
export * from './UserRoleSelector';`}
                    </pre>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">🚀 Adicionando à Navegação</h3>
                  
                  <div className="bg-secondary/30 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">src/App.tsx</h4>
                    <pre className="text-sm bg-white dark:bg-gray-900 p-4 rounded border overflow-x-auto">
{`// Imports existentes
import UserRoleDocs from "./pages/UserRoleDocs";

// Routes
<Routes>
  {/* Rotas existentes */}
  <Route path="/user-role-docs" element={<UserRoleDocs />} />
</Routes>`}
                    </pre>
                  </div>

                  <div className="bg-secondary/30 p-4 rounded-lg mt-4">
                    <h4 className="font-semibold mb-2">src/pages/Documentation.tsx</h4>
                    <pre className="text-sm bg-white dark:bg-gray-900 p-4 rounded border overflow-x-auto">
{`const components = [
  // Componentes existentes...
  {
    name: "UserRoleSelector",
    description: "Seleção de usuário e funções",
    href: "/user-role-docs",
    badge: "Novo"
  }
];`}
                    </pre>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">🔖 Atualizando Homepage</h3>
                  
                  <div className="bg-secondary/30 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">src/pages/Index.tsx</h4>
                    <pre className="text-sm bg-white dark:bg-gray-900 p-4 rounded border overflow-x-auto">
{`// Adicionar demonstração na homepage
import { UserRoleSelector, type User, type Role } from "@/components/library";

// Na grid de componentes, adicionar:
<Card className="gradient-card border-card-border shadow-medium">
  <CardHeader>
    <CardTitle className="flex items-center gap-2">
      UserRoleSelector
      <Badge variant="secondary">Novo</Badge>
    </CardTitle>
    <CardDescription>
      Seleção de usuário e suas funções com validações
    </CardDescription>
  </CardHeader>
  <CardContent className="space-y-4">
    <UserRoleSelector
      users={sampleUsers}
      availableRoles={sampleRoles}
      selectedUserId={selectedUserId}
      selectedRoleIds={selectedRoleIds}
      onUserChange={handleUserChange}
      onRoleChange={handleRoleChange}
      userLabel="Usuário"
      roleLabel="Funções"
    />
  </CardContent>
</Card>`}
                    </pre>
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setCurrentStep(5)}>
                    Anterior: Documentação
                  </Button>
                  <Button onClick={() => setCurrentStep(7)}>
                    Próximo: Testes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Step 7: Tests and Validation */}
          <TabsContent value="7">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Passo 7: Testes e Validação
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">✅ Checklist Final</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-green-50 dark:bg-green-950/30 p-4 rounded-lg">
                      <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2">📁 Arquivos Criados</h4>
                      <ul className="text-sm space-y-1">
                        <li>✅ lib/src/components/UserRoleSelector.tsx</li>
                        <li>✅ src/components/library/UserRoleSelector.tsx</li>
                        <li>✅ src/components/library/docs/UserRoleSelectorDocs.tsx</li>
                        <li>✅ src/pages/UserRoleDocs.tsx</li>
                      </ul>
                    </div>

                    <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg">
                      <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">⚙️ Configurações</h4>
                      <ul className="text-sm space-y-1">
                        <li>✅ Atualizado lib/src/index.ts</li>
                        <li>✅ Atualizado src/components/library/index.ts</li>
                        <li>✅ Adicionado rota em App.tsx</li>
                        <li>✅ Adicionado à navegação</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">🧪 Testes Manuais</h3>
                  
                  <div className="space-y-4">
                    <Alert>
                      <CheckCircle className="h-4 w-4" />
                      <div>
                        <h4 className="font-semibold">Testes a Realizar:</h4>
                        <ol className="list-decimal ml-4 mt-2 space-y-1 text-sm">
                          <li><strong>Desenvolvimento:</strong> <code>npm run watch</code> em lib/</li>
                          <li><strong>Build:</strong> <code>npm run build:auto</code> sem erros</li>
                          <li><strong>Navegação:</strong> Acessar /user-role-docs</li>
                          <li><strong>Interatividade:</strong> Testar seleções e callbacks</li>
                          <li><strong>Validações:</strong> Testar máximo/mínimo roles</li>
                          <li><strong>Estados:</strong> Disabled, loading, error</li>
                        </ol>
                      </div>
                    </Alert>

                    <div className="bg-yellow-50 dark:bg-yellow-950/30 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
                      <h4 className="font-semibold text-yellow-700 dark:text-yellow-300 mb-2">⚠️ Verificações Importantes</h4>
                      <ul className="text-sm space-y-1">
                        <li>• <strong>TypeScript:</strong> Sem erros de tipo</li>
                        <li>• <strong>Props:</strong> Todas opcionais têm defaults</li>
                        <li>• <strong>Performance:</strong> useMemo e useCallback onde necessário</li>
                        <li>• <strong>Acessibilidade:</strong> Labels e aria-labels</li>
                        <li>• <strong>Responsividade:</strong> Funciona em mobile</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">🚀 Publicação</h3>
                  
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/30 dark:to-blue-950/30 p-6 rounded-lg">
                    <h4 className="font-semibold mb-4">Comandos para Publicar:</h4>
                    
                    <div className="space-y-3">
                      <div className="bg-white dark:bg-gray-900 p-3 rounded font-mono text-sm">
                        <div># 1. Navegue para a biblioteca</div>
                        <div>cd lib</div>
                      </div>
                      
                      <div className="bg-white dark:bg-gray-900 p-3 rounded font-mono text-sm">
                        <div># 2. Execute o export interativo</div>
                        <div>npm run export</div>
                      </div>
                      
                      <div className="bg-white dark:bg-gray-900 p-3 rounded font-mono text-sm">
                        <div># 3. Escolha o destino:</div>
                        <div># - NPM Registry (público)</div>
                        <div># - BitBucket Repository (privado)</div>
                        <div># - Apenas build</div>
                      </div>
                      
                      <div className="bg-white dark:bg-gray-900 p-3 rounded font-mono text-sm">
                        <div># 4. Escolha o tipo de versão:</div>
                        <div># - patch: 0.1.0 → 0.1.1 (correções)</div>
                        <div># - minor: 0.1.0 → 0.2.0 (nova funcionalidade)</div>
                        <div># - major: 0.1.0 → 1.0.0 (breaking changes)</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">📝 Próximos Passos</h3>
                  
                  <div className="bg-secondary/30 p-4 rounded-lg">
                    <ul className="space-y-2 text-sm">
                      <li>🔄 <strong>Iteração:</strong> Colete feedback dos usuários</li>
                      <li>📊 <strong>Analytics:</strong> Monitore uso do componente</li>
                      <li>🐛 <strong>Bugs:</strong> Documente e corrija problemas</li>
                      <li>✨ <strong>Melhorias:</strong> Adicione funcionalidades baseadas em feedback</li>
                      <li>📚 <strong>Documentação:</strong> Mantenha exemplos atualizados</li>
                      <li>🧪 <strong>Testes:</strong> Considere adicionar testes automatizados</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 p-6 rounded-lg text-center">
                  <h4 className="text-2xl font-bold mb-2">🎉 Parabéns!</h4>
                  <p className="text-lg text-muted-foreground mb-4">
                    Você criou um componente completo seguindo todos os melhores padrões!
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    <Badge>TypeScript</Badge>
                    <Badge>React Best Practices</Badge>
                    <Badge>Documentação Completa</Badge>
                    <Badge>Reutilizável</Badge>
                    <Badge>Testado</Badge>
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setCurrentStep(6)}>
                    Anterior: Exports
                  </Button>
                  <Button onClick={() => navigate('/')}>
                    Finalizar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Navigation Buttons */}
        <div className="flex justify-center mt-8">
          <div className="flex gap-2">
            {steps.map((step) => (
              <Button
                key={step.id}
                variant={currentStep === step.id ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentStep(step.id)}
                className="w-10 h-10 p-0"
              >
                {step.id}
              </Button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center py-8 border-t border-border">
          <p className="text-muted-foreground">
            🛠️ Guia completo para criação de componentes com melhores práticas
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Baseado no padrão LinhaTrajetoSelector
          </p>
        </div>
      </div>
    </div>
  );
}