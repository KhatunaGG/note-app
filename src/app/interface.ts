import {
  ChangePasswordSchema,
  confirmPasswordSchema,
  createNoteSchema,
  forgotPasswordSchema,
  signInSchema,
  signUpSchema,
} from "@/schema/schema";
import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";
import z from "zod";

export interface ErrorResponse {
  message: string;
}

export type IconName = "Home" | "Search" | "Archives" | "Tag" | "Setting";

export type NavItemType = {
  href: string;
  iconName: IconName;
  label: string;
};

export type ArchivesPropsType = {
  width: string;
  height: string;
  isActive?: boolean;
};

export type ArrowLeftPropsType = {
  selectedButton?: string | null;
  isFontThemePage?: boolean;
  noteParam?: string;
  isTagsPage?: boolean;
};

export type ArrowRightPropsType = {
  isActive?: boolean;
};

export type DeletePropsType = {
  width: string;
  height: string;
};

export type HomePropsType = {
  width: string;
  height: string;
  isActive?: boolean;
};

export type RadioPropsType = {
  isSelected?: boolean;
};

export type RestorePropsType = {
  width: string;
  height: string;
};

export type SearchPropsType = {
  width: string;
  height: string;
  isActive?: boolean;
};

export type SettingPropsType = {
  width: string;
  height: string;
  isActive?: boolean;
};

export type TagPropsType = {
  width: string;
  height: string;
  isActive?: boolean;
};

export type ArchiveButtonPropsType = {
  isOverlay?: boolean;
  isArchivedPage?: boolean;
};

export type DeleteButtonPropsType = {
  isOverlay?: boolean;
};

export type EmailInputPropsType<T extends FieldValues> = {
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  fieldName: Path<T>;
};

export type PasswordInputPropsType<T extends FieldValues> = {
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  fieldName: Path<T>;
  isSignInPage?: boolean;
};

export type NewNoteType = {
  title: string;
  content: string;
  tags: string[];
  isArchived: boolean;
  lastEdited: string;
  _id: string;
};

export type ResetButtonPropsType = {
  isOverlay?: boolean;
  isNoteDetailsPage?: boolean;
  noteById?: NewNoteType | null;
  noteParam?: string;
};

export type SubmitButtonPropsType = {
  isSubmitting: boolean;
  createNote?: boolean;
  settingsParam?: string;
};

export type TagInputPropsType<T extends FieldValues> = {
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  fieldName: Path<T>;
};

export type TextareaPropsType<T extends FieldValues> = {
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  fieldName: Path<T>;
};

export type TitlePropsType = {
  isSignInPage?: boolean;
  isForgotPassword?: boolean;
  isResetPassword?: boolean;
};

export type TitleInputPropsType<T extends FieldValues> = {
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  fieldName: Path<T>;
};

export type ChangePasswordFormData = z.infer<typeof ChangePasswordSchema>;

export type ForgotPasswordType = z.infer<typeof forgotPasswordSchema>;

export type SignUpType = z.infer<typeof signUpSchema>;

export type NoteType = z.infer<typeof createNoteSchema>;

export type ResetPasswordType = z.infer<typeof confirmPasswordSchema>;

export type SignInType = z.infer<typeof signInSchema>;

export type changePasswordPropsType = {
  settingsParam: string;
};

export type FooterPropsType = {
  isSubmitting: boolean;
  createNote: boolean;
};

export type GoBackPropsType = {
  isNoteDetailsPage?: boolean;
  isNotePage?: boolean;
  noteById?: NewNoteType | null;
  isArchivedPage?: boolean;
  isTagsPage?: boolean;
  isSubmitting?: boolean;
  createNote?: boolean;
  selectedTags?: string | null;
  settingsParam?: string;
  isActive?: boolean;
  noteParam?: string;
};

export type NavPropsTypes = {
  noteParam?: string;
};

export type NotePropsType = {
  title: string;
  content: string;
  tags: string[];
  _id: string;
  isArchived: boolean;
  lastEdited: string;
  isFirstNote: boolean;
  isLastNote: boolean;
  isSelected: boolean;
};

export type SettingDetailsPropsType = {
  settingsParam?: string;
};

export type SettingDataType = {
  text: string;
  logoName: string;
};

export type SettingListPropsType = {
  settingParams?: string | undefined;
};

export type SignInFormPropsType = {
  isSignInPage: boolean;
};

export interface IArchivedNotes {
  archiveModal: boolean;
  setArchiveModal: (archiveModal: boolean) => void;
}

export interface IChangePassword {
  isLoading: boolean;
  axiosError: string;
  resendEmail: string;
  success: boolean;
  newPassword: string;
  sendVerificationLink: (formData: ForgotPasswordType) => void;
}

export interface SettingThemeItem {
  icon: string;
  mode: string;
  pText: string;
}

export interface SettingItem {
  text: string;
  logoName: string;
  pText?: string;
  settingTheme?: SettingThemeItem[];
}

export interface IUseManageNotes {
  isLoading: boolean;
  axiosError: string;
  success: boolean;
  createNote: boolean;
  title: string;
  content: string;
  tags: string[];
  isArchived: boolean;
  lastEdited: Date;
  allNotes: NewNoteType[] | [];
  noteById: NewNoteType | null;
  activeNote: string | null;
  modal: boolean;
  setFormState: (
    title: string,
    content: string,
    tags: string[],
    isArchived: boolean,
    lastEdited: Date
  ) => void;
  setModal: (modal: boolean) => void;
  setActiveNote: (id: string) => void;
  setNoteById: (noteById: NewNoteType | null) => void;
  setSuccess: (success: boolean) => void;
  setIsLoading: (isLoading: boolean) => void;
  setCreateNote: (createNote: boolean) => void;
  setAxiosError: (axiosError: string) => void;
  createNewNote: (formData: NoteType) => Promise<boolean>;
  getAllNotes: () => void;
  setAllNotes: (allNotes: NewNoteType[] | []) => void;
  getNoteById: (id: string) => Promise<void>;
  toggleCreateNote: () => void;
  deleteNote: (id: string) => void;
  showModal: () => void;
  closeModal: () => void;
  resetNewNote: () => void;
  updateNote: (noteById: NewNoteType) => void;
  getSearchedNotes: () => NewNoteType[];
}

export interface IUseSettingsStore {
  activeSetting: string | null;
  filteredSettings: SettingThemeItem[];
  isLoading: boolean;
  currentTheme: string;
  selectedTheme: string;
  filteredData: SettingItem | null;
  selectedButton: string | null;
  axiosError: string | null;
  newPassword: string;
  passwordNew: string;
  currentFont: string;
  selectedFont: string;
  setSelectedFont: (font: string) => void;
  applySelectedFont: () => void;
  setAxiosError: (msg: string | null) => void;
  setSelectedButton: (button: string | null) => void;
  setIsLoading: (isLoading: boolean) => void;
  applySelectedTheme: () => void;
  resetSelectedTheme: () => void;
  setFilteredData: (filteredData: SettingItem | null) => void;
  setSelectedTheme: (selectedTheme: string) => void;
  setActiveSetting: (val: string | null) => void;
  setFilteredSettings: (title: string) => void;
  changePassword: (formData: ChangePasswordFormData) => Promise<boolean>;
}

export interface IUser {
  _id: string;
  email: string;
  createdAt: Date;
  avatar: string;
}

export interface ISignInStore {
  isLoading: boolean;
  axiosError: string;
  signInEmail: string;
  signInPassword: string;
  success: boolean;
  accessToken: string | null;
  currentUser: IUser | null;
  setCurrentUser: (currentUser: IUser | null) => void;
  setAccessToken: (token: string) => void;
  setSuccess: (success: boolean) => void;
  setFormData: (signInEmail: string, signInPassword: string) => void;
  setIsLoading: (isLoading: boolean) => void;
  setAxiosError: (axiosError: string) => void;
  signIn: (formData: SignInType) => void;
  initialize: () => Promise<void>;
  getCurrentUser: (accessToken: string | undefined) => void;
  logout: () => void;
}

export interface ISignUpStore {
  isLoading: boolean;
  axiosError: string;
  email: string;
  password: string;
  success: boolean;
  setFormData: (email: string, password: string) => void;
  setSuccess: (success: boolean) => void;
  setIsLoading: (isLoading: boolean) => void;
  setAxiosError: (axiosError: string) => void;
  signUp: (formData: SignUpType) => Promise<void>;
}

export interface IUseUtilities {
  currentPath: string;
  isArchivedPage: boolean;
  selectedTags: string | null;
  routeToTags: boolean;
  axiosError: string;
  isLoading: boolean;
  filterAllByTag: boolean;
  isAllNotesPage: boolean;
  isTagsPage: boolean;
  isSearchPage: boolean;
  searchValue: string;
  isNotePage: boolean;
  isSettingsDetailsPage: boolean;
  isNoteDetailsPage: boolean;
  isSettingsPage: boolean;
  previousPath: string;
  showPasswordFields: {
    oldPassword: false;
    passwordNew: false;
    passwordConfirm: false;
  };
  setFilterAllByTag: (val: boolean) => void;
  setIsAllNotesPage: (val: boolean) => void;
  setIsTagsPage: (val: boolean) => void;
  setIsSearchPage: (val: boolean) => void;
  setSearchValue: (value: string) => void;
  setIsNotePage: (val: boolean) => void;
  setIsNoteDetailsPage: (val: boolean) => void;
  setIsSettingsDetailsPage: (val: boolean) => void;
  setIsSettingsPage: (val: boolean) => void;
  setIsLoading: (isLoading: boolean) => void;
  setAxiosError: (axiosError: string) => void;
  setSelectedTag: (tag: string | null) => void;
  setCurrentPath: (path: string) => void;
  setRouteToTags: (value: boolean) => void;
  activeLink: (path: string) => string;
  formatDate: (dateString: string | Date) => string;
  getUniqueTags: (notes: NewNoteType[]) => string[];
  handleRoutes: () => void;
  setIsArchivedPage: (isArchived: boolean) => void;
  capitalize: (v: string) => void;
  getFilteredNotesByTag: (tag: string) => void;
  setPreviousPath: (path: string) => void;
  togglePasswordField: (
    field: keyof IUseUtilities["showPasswordFields"]
  ) => void;
}
