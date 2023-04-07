const ManagementClient = require("auth0").ManagementClient;
const AuthenticationClient = require("auth0").AuthenticationClient;
const { auth0Config } = require('config.json');

class Auth0 {
	createManagementClient() {
		return new Promise((resolve, reject) => {
			const auth0 = new AuthenticationClient({
				domain: auth0Config.AUTH0_DOMAIN,
				clientId: auth0Config.AUTH0_CLIENT_ID,
				clientSecret: auth0Config.AUTH0_CLIENT_SECRET,
			});

			auth0.clientCredentialsGrant(
				{
					audience: auth0Config.AUTH0_AUDIENCE,
				},
				(err, response) => {
					if (err) {
						console.log("%c19 - err: ", "background-color: yellow", err);
						// Handle error.
						reject();
					} else {
						const management = new ManagementClient({
							domain: auth0Config.AUTH0_DOMAIN,
							token: response.access_token,
						});
						this.managementClient = management;
						resolve();
					}
				}
			);
		});
	}

	async getManagementClient() {
		if (!this.managementClient) await this.createManagementClient();
		return this.managementClient;
	}
}

module.exports = new Auth0();
