# Formm server

## Running locally

Clone the repo

```bash
git clone https://github.com/hussamkhatib/formm-server.git
```

Go to the project directory

```bash
cd formm-server
```

Install packages with yarn

```bash
yarn
```

Create a .env file:

```
touch .env
```

update the contents of .env file

```bash
# .env
PORT = 3001
NODE_ENV = "development"
FIREBASE_CREDS={"type": "","project_id": "","private_key_id": "","private_key": "","client_email": "","client_id": "","auth_uri": "","token_uri": "","auth_provider_x509_cert_url": "","client_x509_cert_url": ""}
# To generate a private key file for your service account:
# - Open your project in Firebase console,  open Settings > Project Settings > Service Accounts.
# - Click Generate New Private Key, then confirm by clicking Generate Key.
# - Securely store the JSON file containing the key.
```

Start the server at `http://localhost:3001`

```bash
yarn dev
```
