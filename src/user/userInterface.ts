export interface IUser {
    email: string;
    username: string;
    password: string;
}

export interface IRegisterForm {
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
}

export interface ILoginForm extends Pick<IRegisterForm, 'email' | 'password'> {}

export interface IRegisterFormErrors {
    errors: {
        email?: string;
        username?: string;
        password?: string;
        confirmPassword?: string;
        passwordsEqual?: string;
        emailInUse?: string;
        usernameInUse?: string;
    };
}

export interface ILoginFormErrors {
    errors: {
        email?: string;
        password?: string;
        incorrectCredentials?: string;
    };
}
