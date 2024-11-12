export interface UserData {
  uid: string; // Identificador único do usuário
  name: string; // Nome do usuário
  email: string; // E-mail do usuário
  role?: string; // Função do usuário (ex.: 'admin', 'user', etc.)
  phoneNumber?: string; // Número de telefone (opcional)
  address?: string; // Endereço do usuário (opcional)
  profileImageUrl?: string; // URL da imagem de perfil (opcional)
  createdAt?: Date; // Data de criação do usuário
  updatedAt?: Date; // Data de última atualização do usuário
}
