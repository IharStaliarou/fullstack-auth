import { create } from 'zustand';
import { IUser } from '@/shared/interfaces/auth.interfaces';
import userService from '@/services/user.service';
import { handleHttpError } from '@/shared/utils/errors/handle-http-error';

interface IUseUserStore {
  users: IUser[];
  selectedUser: IUser | null;
  isLoading: boolean;
  error: unknown | null;

  fetchUsers: () => void;
  fetchUserById: (id: string) => void;
  fetchUserByUsername: (username: string) => void;
  fetchUserByEmail: (email: string) => void;
  fetchUserByPhone: (phone: string) => void;

  createUser: (user: Partial<IUser>) => void;
  updateUser: (id: string, user: Partial<IUser>) => void;
  deleteUser: (id: string) => void;

  clearSelectedUser: () => void;
}

const useUserStore = create<IUseUserStore>((set) => ({
  users: [],
  selectedUser: null,
  isLoading: false,
  error: null,

  fetchUsers: () => {
    set({ isLoading: true, error: null });
    userService
      .findAll()
      .then((users) => set({ users }))
      .catch((error) => {
        handleHttpError(error, 'Failed to fetch users');
        set({ error });
      })
      .finally(() => set({ isLoading: false }));
  },

  fetchUserById: (id: string) => {
    set({ isLoading: true, error: null });
    userService
      .findById(id)
      .then((user) => set({ selectedUser: user }))
      .catch((error) => {
        handleHttpError(error, 'Failed to fetch user by ID');
        set({ error });
      })
      .finally(() => set({ isLoading: false }));
  },

  fetchUserByUsername: (username: string) => {
    set({ isLoading: true, error: null });
    userService
      .findByUsername(username)
      .then((user) => set({ selectedUser: user }))
      .catch((error) => {
        handleHttpError(error, 'Failed to fetch user by username');
        set({ error });
      })
      .finally(() => set({ isLoading: false }));
  },

  fetchUserByEmail: (email: string) => {
    set({ isLoading: true, error: null });
    userService
      .findByEmail(email)
      .then((user) => set({ selectedUser: user }))
      .catch((error) => {
        handleHttpError(error, 'Failed to fetch user by email');
        set({ error });
      })
      .finally(() => set({ isLoading: false }));
  },

  fetchUserByPhone: (phone: string) => {
    set({ isLoading: true, error: null });
    userService
      .findByPhone(phone)
      .then((user) => set({ selectedUser: user }))
      .catch((error) => {
        handleHttpError(error, 'Failed to fetch user by phone');
        set({ error });
      })
      .finally(() => set({ isLoading: false }));
  },

  createUser: (user: Partial<IUser>) => {
    set({ isLoading: true, error: null });
    userService
      .create(user)
      .then((newUser) => {
        set((state) => ({ users: [...state.users, newUser] }));
      })
      .catch((error) => {
        handleHttpError(error, 'Failed to create user');
        set({ error });
      })
      .finally(() => set({ isLoading: false }));
  },

  updateUser: (id: string, user: Partial<IUser>) => {
    set({ isLoading: true, error: null });
    userService
      .update(id, user)
      .then((updatedUser) => {
        set((state) => ({
          users: state.users.map((u) => (u.id === id ? updatedUser : u)),
          selectedUser: updatedUser,
        }));
      })
      .catch((error) => {
        handleHttpError(error, 'Failed to update user');
        set({ error });
      })
      .finally(() => set({ isLoading: false }));
  },

  deleteUser: (id: string) => {
    set({ isLoading: true, error: null });
    userService
      .remove(id)
      .then(() => {
        set((state) => ({
          users: state.users.filter((u) => u.id !== id),
          selectedUser:
            state.selectedUser?.id === id ? null : state.selectedUser,
        }));
      })
      .catch((error) => {
        handleHttpError(error, 'Failed to delete user');
        set({ error });
      })
      .finally(() => set({ isLoading: false }));
  },

  clearSelectedUser: () => {
    set({ selectedUser: null });
  },
}));

export default useUserStore;
