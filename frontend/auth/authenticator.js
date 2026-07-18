export class AuthGuard {
    constructor(checkUrl, loginUrl) {
        this.checkUrl = checkUrl;
        this.loginUrl = loginUrl;
    }

    async verify() {
        try {
            const response = await fetch(this.checkUrl, {
                method: 'GET',
                credentials: 'include'
            });

            const data = await response.json();

            if (data.success || data.approved) {
                return true;
            } else {
                this.redirectToLogin();
                console.error(data.error);
                return false;
            }
        } catch (err) {
            console.error("Auth check failed");
            this.redirectToLogin();
            return false;
        }
    }

    redirectToLogin() {
        window.location.href = this.loginUrl;
    }
}
